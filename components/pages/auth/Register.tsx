'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { setCredentials } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
import { clearCookies } from '@/actions/clearCookies';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/components/providers/AuthProvider';

// Base schema for common fields
const baseSchema = {
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
};

// Normal registration schema
const normalSchema = z
  .object(baseSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Corporate registration schema
const corporateSchema = z
  .object({
    ...baseSchema,
    domain: z.string().min(3, 'Domain is required'),
    company: z.string().min(2, 'Company name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Developer registration schema
const developerSchema = z
  .object(baseSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationType = 'normal' | 'corporate' | 'developer';

interface RegisterProps {
  type: RegistrationType;
}

export function Register({ type: initialType }: RegisterProps) {
  const [type, setType] = useState<RegistrationType>(initialType);
  const router = useRouter();

  const { login } = useAuth();

  const schema =
    type === 'corporate'
      ? corporateSchema
      : type === 'developer'
        ? developerSchema
        : normalSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      ...(type === 'corporate' ? { domain: '', company: '' } : {}),
    },
  });
  // to check password strenght
  const passwordValue = form.watch('password') || '';
  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 5) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const strength = getStrength(passwordValue);
  const strengthColors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ];
  const strengthLabels = ['Very Weak', 'Weak', 'Good', 'Strong'];

  // Reset form when type changes
  useEffect(() => {
    form.reset({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      ...(type === 'corporate' ? { domain: '', company: '' } : {}),
    });
  }, [type, form]);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
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

      const res = await axios.get(`/api/get/tokens`, {
        withCredentials: true,
      });
      const tokens = res.data;
      console.log('TOKENS SET IS', tokens);
      // if (tokens && tokens.accessToken && tokens.refreshToken) {
      //   dispatch(
      //     setCredentials({
      //       token: tokens.accessToken,
      //       refreshToken: tokens.refreshToken,
      //       user,
      //     }),
      //   );
      //   toast.success('Logged in successfully!');
      //   return router.push('/combinedDash');
      // }
      // return await clearCookies();

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

  const onSubmit = async (data: any) => {
    try {
      const endpoint =
        type === 'normal'
          ? 'register'
          : type === 'corporate'
            ? 'register-corporate'
            : 'register-developer';

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/${endpoint}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const { responseData } = response.data;
      if (responseData) {
        toast.success('Successfully registered', { duration: 1000 });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error('Email already exits ');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.reload();
    }
  };

  return (
    <Form {...form}>
      <div className="my-16">
        <div className="flex gap-2 rounded-lg bg-[#0A0D14] p-1">
          <button
            type="button"
            className={`flex-1 rounded-md px-4 py-2 transition-colors ${
              type === 'normal'
                ? 'bg-emerald-500 text-black'
                : 'text-white hover:bg-emerald-500/20'
            }`}
            onClick={() => setType('normal')}
          >
            Agent
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md px-4 py-2 transition-colors ${
              type === 'developer'
                ? 'bg-emerald-500 text-black'
                : 'text-white hover:bg-emerald-500/20'
            }`}
            onClick={() => setType('developer')}
          >
            Developer
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md px-4 py-2 transition-colors ${
              type === 'corporate'
                ? 'bg-emerald-500 text-black'
                : 'text-white hover:bg-emerald-500/20'
            }`}
            onClick={() => setType('corporate')}
          >
            Corporate
          </button>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-y-4">
          <FormInput
            form={form}
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
          />

          <FormInput
            form={form}
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
          />

          <FormInput
            form={form}
            name="email"
            label="Secure email ID"
            type="email"
            placeholder="Enter your email address encrypted"
          />

          {type === 'corporate' && (
            <>
              <FormInput
                form={form}
                name="domain"
                label="Domain"
                placeholder="Enter your domain"
              />

              <FormInput
                form={form}
                name="company"
                label="Company"
                placeholder="Enter your company name"
              />
            </>
          )}

          <FormInput
            form={form}
            name="password"
            label="Enter passkey"
            type="password"
            placeholder="Enter your password"
          />

          <FormInput
            form={form}
            name="confirmPassword"
            label="Confirm passkey"
            type="password"
            placeholder="Confirm your password"
          />
        </div>
        {passwordValue && (
          <div className="space-y-1">
            <div className="flex h-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded transition-all duration-300 ${
                    strength > i ? strengthColors[strength - 1] : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Encryption Level: {strengthLabels[strength - 1] || 'Very Weak'}
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-emerald-500 text-black hover:bg-emerald-400"
        >
          Request Authorization
        </Button>

        {/* {type === 'normal' ? (
          <>
            <div className="my-4 text-center text-gray-300">OR</div>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.error('Login Failed')}
              theme="filled_black"
              text="signin_with"
              shape="rectangular"
            />
          </>
        ) : null} */}
      </form>
    </Form>
  );
}
