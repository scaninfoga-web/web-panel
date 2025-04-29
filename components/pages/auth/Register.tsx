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
  const dispatch = useDispatch();

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
      const { user } = responseData;
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
        toast.success('Logged in successfully!');
        return router.push('/combinedDash');
      }
      return await clearCookies();
    } catch (error: any) {
      await clearCookies();
      console.error('Registration error:', error);
      toast.error(
        error.response?.data?.message ||
          'Registration failed. Please try again.',
      );
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
            User
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
            label="Email"
            type="email"
            placeholder="Enter your email"
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
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <FormInput
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-500 text-black hover:bg-emerald-400"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
