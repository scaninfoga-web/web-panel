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
  const router = useRouter();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: 'user',
    },
  });
  const currentType = form.getValues().userType;

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Credential Response:', credentialResponse);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            idToken: credentialResponse.credential,
            backend: 'google-oauth2',
            grant_type: 'convert_token',
          }),
        },
      );

      const data = await response.json();
      console.log('Backend Response:', data);

      if (data.responseStatus?.status) {
        login(data.responseData.token);
        toast.success('Logged in successfully!');
        router.push('/combinedDash');
      } else {
        console.error('Authentication failed:', data.responseStatus?.message);
        toast.error('Login failed. Check your credentials and try again.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Login failed. Check your credentials and try again.');
    }
  };

  const userType = form.watch('userType');

  // const handleGoogleSuccess = async (credentialResponse: any) => {
  //   try {
  //     console.log('Credential Response:', credentialResponse);

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

  //     if (data.responseStatus?.status) {
  //       login(data.responseData.token);
  //       toast.success('Logged in successfully!');
  //       router.push('/combinedDash');
  //     } else {
  //       console.error('Authentication failed:', data.responseStatus?.message);
  //       toast.error('Login failed. Check your credentials and try again.');
  //     }
  //   } catch (error) {
  //     console.error('Authentication error:', error);
  //     toast.error('Login failed. Check your credentials and try again.');
  //   }
  // };

  const [qrCode, setQrCode] = useState<string | null>(null);

  const onLogin = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          ...data,
          type: data.userType,
        },
        {
          withCredentials: true,
        },
      );

      const { responseData } = response.data;

      if (responseData.qr_code) {
        console.log('QR CODE');
        alert('QR CODE');

        setQrCode(responseData.qr_code);
      }
      const { user } = responseData;

      // You will need to manually fetch the cookie for token
      const res = await axios.get(`/api/get/tokens`, {
        withCredentials: true,
      });
      const tokens = res.data;
      if (tokens && tokens.accessToken && tokens.refreshToken) {
        dispatch(
          setCredentials({
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user,
          }),
        );
        toast.success('Logged in successfully!', { duration: 800 });
        return router.push('/combinedDash');
      }
      return await clearCookies();
    } catch (error) {
      await clearCookies();
      toast.error('Login failed. Check your credentials and try again.');
      console.error(error);
    }
  };

  // if(qrCode){
  //   return (

  //   )
  // }
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
                <Image
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code"
                  width={200}
                  height={200}
                />
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

          {
            userType === 'user' && (
              <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error('Login Failed')}
              theme="filled_black"
              text="signin_with"
              shape="rectangular"
            />
            )
          }

         
        </Form>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
