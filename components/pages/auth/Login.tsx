'use client';

import { useForm } from 'react-hook-form';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/components/providers/AuthProvider';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { FormRadioGroup } from '@/components/ui/form-radio-group';
import { setCredentials } from '@/redux/userSlice';
import { clearCookies } from '@/actions/clearCookies';
import { useState } from 'react';
import Image from 'next/image';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { post } from '@/lib/api';
import { fetchWalletBalance } from '@/redux/walletSlice';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(['user', 'corporate', 'developer']),
  otp: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const userTypeOptions = [
  { label: 'Agent', value: 'user' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Developer', value: 'developer' },
];

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // const { login } = useAuth();
  const dispatch = useDispatch();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'user',
    },
  });
  // const userType = form.watch('userType');
  // const currentType = form.getValues().userType;

  // const handleGoogleSuccess = async (credentialResponse: any) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //         },
  //         body: JSON.stringify({
  //           idToken: credentialResponse.credential,
  //           backend: 'google-oauth2',
  //           grant_type: 'convert_token',
  //         }),
  //       },
  //     );

  //     const data = await response.json();
  //     const { user } = data.responseData;

  //     const res = await axios.get(`/api/get/tokens`, {
  //       withCredentials: true,
  //     });
  //     const tokens = res.data;
  //     if (tokens && tokens.accessToken && tokens.refreshToken) {
  //       dispatch(
  //         setCredentials({
  //           token: tokens.accessToken,
  //           user,
  //         }),
  //       );
  //       // setCookie('accessToken', tokens.accessToken, {
  //       //   maxAge: 60 * 60 * 24 * 10,
  //       // });
  //       // setCookie('userType', user.userType, { maxAge: 60 * 60 * 24 * 10 });
  //       toast.success('Logged in successfully!', { duration: 800 });
  //       return;
  //     }

  //     if (data.responseStatus?.status) {
  //       login(data.responseData.token);
  //       toast.success('Logged in successfully!');
  //       router.push('/combinedDash');
  //     } else {
  //       toast.error('Login failed. Check your credentials and try again.');
  //     }
  //   } catch (error) {
  //     toast.error('Login failed. Check your credentials and try again.');
  //   }
  // };

  const onLogin = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const response = await post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          ...data,
          type: data.userType,
        },
        {
          withCredentials: true,
        },
      );

      const { responseData } = response;

      if (responseData.require_otp) {
        setQrCode(responseData.require_otp);
      } else {
        const { user, accessToken } = responseData;
        dispatch(
          setCredentials({
            token: accessToken,
            user,
          }),
        );
        toast.success('Logged in successfully!', { duration: 800 });
        router.push('/combinedDash');
        router.refresh();
      }
    } catch (error) {
      await clearCookies();
      toast.error('Login failed. Check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
            <FormRadioGroup
              form={form}
              name="userType"
              label="Account Type"
              options={userTypeOptions}
            />

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
              loading={loading}
            >
              Login
            </Button>
          </form>

          {/* {userType === 'user' && (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error('Login Failed')}
              theme="filled_black"
              text="signin_with"
              shape="rectangular"
            />
          )} */}
        </Form>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
