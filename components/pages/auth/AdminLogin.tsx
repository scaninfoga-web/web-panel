'use client';

import { SpiderWebBackground } from './Auth';
import { AnimatePresence, motion } from 'framer-motion';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Login from './Login';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormRadioGroup } from '@/components/ui/form-radio-group';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { post } from '@/lib/api';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCookie } from 'cookies-next';
import { setCredentials } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(['admin']),
  otp: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin: React.FC<{}> = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'admin',
    },
  });

  const onLogin = async (formData: LoginFormValues) => {
    try {
      const data: any = await post('/api/auth/login', formData);
      if (data.responseData.require_otp) {
        setQrCode(data.responseData.require_otp);
      } else {
        const { user, accessToken } = data.responseData;
        setCookie('accessToken', accessToken, { maxAge: 60 * 60 * 24 * 10 });
        setCookie('userType', user.userType, { maxAge: 60 * 60 * 24 * 10 });
        dispatch(
          setCredentials({
            token: accessToken,
            user,
          }),
        );
        toast.success('Logged in successfully!', { duration: 800 });
        router.push('/userTransactions');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SpiderWebBackground />
      <div className="flex min-h-screen items-center justify-center pt-4 md:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="login"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <span className="flex items-center justify-center text-3xl font-bold tracking-tight">
              <span className="text-emerald-500">scan</span>
              <span>infoga Admin Login</span>
            </span>
            <div className="mb-10 mt-2 w-full text-center text-lg text-white/80">
              access the Scaninfoga Intelligence of Investigation portal
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                />

                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />

                {qrCode && (
                  <>
                    <FormInput
                      form={form}
                      name="otp"
                      label="OTP"
                      type="text"
                      placeholder="Enter OTP"
                    />
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-emerald-500 text-black hover:bg-emerald-400"
                >
                  Login
                </Button>
              </form>
            </FormProvider>

            <div className="mt-6 text-center">
              <span className="text-gray-400">New credentials? </span>
              <button
                className="text-emerald-500 hover:underline"
                //   onClick={() => setIsRegistering(true)}
              >
                Register
              </button>
            </div>

            <span className="mt-8 flex w-full items-center justify-center text-center text-gray-400">
              connection is secured using AES-256 encryption
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default AdminLogin;
