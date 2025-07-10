import { useState } from 'react';
import { Key, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '@/components/ui/form-input';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { post } from '@/lib/api';
import { toast } from 'sonner';
import QrCodeModal from './QrCodeModal';
import { logout } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';

const changePassSchema = z
  .object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    otp: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const changeEmailSchema = z
  .object({
    newEmail: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    otp: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ChangePassFormValues = z.infer<typeof changePassSchema>;
type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;

export const ChangePasswordCard = () => {
  const [passwordQrCode, setPasswordQrCode] = useState<boolean>(false);
  const [emailQrCode, setEmailQrCode] = useState<boolean>(false);

  const [changePasswordLoading, setChangePasswordLoading] =
    useState<boolean>(false);
  const [changeEmailLoading, setChangeEmailLoading] = useState<boolean>(false);

  const email = useSelector(
    (state: RootState) => state?.user?.user?.email ?? '',
  );

  const passwordForm = useForm<ChangePassFormValues>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      otp: '',
    },
  });

  const emailForm = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: '',
      password: '',
      confirmPassword: '',
      otp: '',
    },
  });

  const handlePasswordChange = async (data: ChangePassFormValues) => {
    setChangePasswordLoading(true);

    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      email,
      otp: data.otp,
    };

    try {
      const res = await post('/api/auth/change-password', payload);

      if (res.responseData?.require_otp) {
        setPasswordQrCode(true);
        toast.warning('Please enter OTP from the authenticator.');
      } else {
        toast.success('Password changed successfully');
        passwordForm.reset();
      }
    } catch (error) {
      toast.error('Error changing password');
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const [showQr, setShowQr] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleEmailChange = async (data: ChangeEmailFormValues) => {
    setChangeEmailLoading(true);

    const payload = {
      email,
      ...data,
    };

    try {
      const res = await post('/api/auth/change-email', payload);

      if (res.responseData?.require_otp) {
        setEmailQrCode(true);
        toast.warning('Please enter OTP from the authenticator.');
      } else {
        setShowQr(res.responseData?.qr_code);
        setModalOpen(true);
        toast.success('Email changed successfully');
        emailForm.reset();
      }
    } catch (error) {
      toast.error('Error changing email');
    } finally {
      setChangeEmailLoading(true);
    }
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const handleModalClose = () => {
    dispatch(logout());
    router.replace('/auth');
  };

  return (
    <>
      <Card className="card-bg border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-500">
            <Key className="h-5 w-5" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password " className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-0">
              <TabsTrigger
                value="password"
                className="border border-slate-600 font-semibold data-[state=active]:border data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-500"
              >
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="border border-slate-600 font-semibold data-[state=active]:border data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-500"
              >
                <Mail className="mr-2 h-4 w-4" />
                Change Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="password" className="mt-6">
              <FormProvider {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormInput
                      form={passwordForm}
                      name="newPassword"
                      label="New Password"
                      type="password"
                      placeholder="Enter your new password"
                    />

                    <FormInput
                      form={passwordForm}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm your new password"
                    />
                    <FormInput
                      form={passwordForm}
                      name="oldPassword"
                      label="Old Password"
                      type="password"
                      placeholder="Enter your old password"
                    />

                    {passwordQrCode && (
                      <>
                        <FormInput
                          form={passwordForm}
                          name="otp"
                          label="OTP"
                          type="text"
                          placeholder="Enter OTP"
                        />
                        {passwordForm.formState.errors.otp && (
                          <p className="text-sm text-red-400">
                            {passwordForm.formState.errors.otp.message}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <Button type="submit" loading={changePasswordLoading}>
                    Change Password
                  </Button>
                </form>
              </FormProvider>
            </TabsContent>

            <TabsContent value="email" className="mt-6">
              <FormProvider {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(handleEmailChange)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormInput
                      form={emailForm}
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                    />

                    <FormInput
                      form={emailForm}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm your password"
                    />
                    <FormInput
                      form={emailForm}
                      name="newEmail"
                      label="New Email"
                      type="email"
                      placeholder="Enter your new email address"
                    />

                    {emailQrCode && (
                      <FormInput
                        form={emailForm}
                        name="otp"
                        label="OTP"
                        type="text"
                        placeholder="Enter OTP"
                      />
                    )}
                  </div>

                  <Button type="submit" loading={changeEmailLoading}>
                    Change Email
                  </Button>
                </form>
              </FormProvider>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <QrCodeModal
        open={false}
        onClose={handleModalClose}
        onOk={handleModalClose}
      />
    </>
  );
};
