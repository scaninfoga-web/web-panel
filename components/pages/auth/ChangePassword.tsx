'use client';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { FormRadioGroup } from '@/components/ui/form-radio-group';
import { post } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const changePassSchema = z.object({
  email: z.string().email('Invalid email address'),
  oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(['user', 'corporate', 'developer']),
  otp: z.string().optional(),
});

const userTypeOptions = [
  { label: 'Agent', value: 'user' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Developer', value: 'developer' },
];

type ChangePassFormValues = z.infer<typeof changePassSchema>;

const ChangePassword = () => {
  const [qrCode, setQrCode] = useState<boolean>(true);
  const [step, setStep] = useState(1); // To track the step in the form (1 for first step, 2 for second, etc.)
  const form = useForm<ChangePassFormValues>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      userType: 'user',
    },
  });

  const handleSubmit = async (data: ChangePassFormValues) => {
    try {
      const res = await post('/api/auth/change-password', data);
      if (res.responseData.require_otp) {
        setQrCode(true);
        toast.warning('Please enter OTP from the authenticator.');
        setStep(3); // Move to OTP verification step
      } else {
        toast.success('Password changed successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error changing password');
    }
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1); // Proceed to next step
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Progress Bar */}
        <div className="h-2 w-full bg-gray-300">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${(step - 1) * 33.33}%` }}
          />
        </div>
        {/* Step 1 - User Info */}
        {step === 1 && (
          <>
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
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          </>
        )}

        {/* Step 2 - Password Inputs */}
        {step === 3 && (
          <>
            {/* <FormInput
                            form={form}
                            name="oldPassword"
                            label="Old Password"
                            type="password"
                            placeholder="Enter your old password"
                        /> */}
            <FormInput
              form={form}
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
            />
            <FormInput
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
            />
            {/* <Button type="button" onClick={handleNextStep}>Next</Button> */}
            <Button type="submit">Change Password</Button>
          </>
        )}

        {/* Step 3 - OTP (if required) */}
        {qrCode && step === 2 && (
          <>
            <FormInput
              form={form}
              name="otp"
              label="OTP"
              type="text"
              placeholder="Enter OTP"
            />
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default ChangePassword;
