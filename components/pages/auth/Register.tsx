'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FormInput } from '@/components/ui/form-input';
import { Progress } from '@/components/ui/progress';
import { Clock, Mail, Shield, CheckCircle } from 'lucide-react';
import { post } from '@/lib/api';
import { cn } from '@/lib/utils';
import TermsModal from '@/components/common/TermsModal';

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

// OTP schema
const otpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
});

type RegistrationType = 'agent' | 'corporate' | 'developer';
type RegistrationStep = 'details' | 'otp' | 'qr';

interface RegisterProps {
  type: RegistrationType;
}

export function Register({ type: initialType }: RegisterProps) {
  const [type, setType] = useState<RegistrationType>('agent');
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('details');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [resendTimeLeft, setResendTimeLeft] = useState(60); // 1 minute in seconds
  const [open, setIsOpen] = useState(false);

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

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 'otp' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep, timeLeft]);

  // Resend timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 'otp' && !resendAvailable && resendTimeLeft > 0) {
      interval = setInterval(() => {
        setResendTimeLeft((time) => {
          if (time <= 1) {
            setResendAvailable(true);
            return 60;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep, resendAvailable, resendTimeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    switch (currentStep) {
      case 'details':
        return 33;
      case 'otp':
        return 66;
      case 'qr':
        return 100;
      default:
        return 0;
    }
  };

  // Password strength checker
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
    setCurrentStep('details');
    setQrCode(null);
    setTimeLeft(600);
    setResendAvailable(false);
    setResendTimeLeft(60);
  }, [type, form]);

  // Handle initial registration

  const onSubmitDetailsUtil = () => {
    setIsOpen(true);
  };

  const handleAgree = () => {
    onSubmitDetails();
    setIsOpen(false);
  };

  const onSubmitDetails = async () => {
    const payload = form.getValues();
    setIsSubmitting(true);
    try {
      const endpoint =
        type === 'agent'
          ? '/api/auth/register'
          : type === 'corporate'
            ? '/api/auth/register-corporate'
            : '/api/auth/register-developer';

      // Mock API call - replace with actual endpoint
      // const mockResponse = {
      //   responseStatus: {
      //     status: true,
      //     message: "OTP sent to email"
      //   },
      //   responseData: null
      // };

      // // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // setCurrentStep("otp")

      // toast.error('Registeration is Off Now');
      // return;

      if (process.env.NEXT_PUBLIC_BACKEND_URL?.includes('dev')) {
        return toast.error('Registeration is Off');
      }
      if (type !== 'agent') {
        toast.error(type + ' registeration are OFF');
        return;
      }
      const data = await post(endpoint, payload);

      if (data.responseStatus.status) {
        setUserEmail(payload.email);
        setCurrentStep('otp');
        setTimeLeft(600); // Reset timer
        setResendAvailable(false);
        setResendTimeLeft(60);
        toast.success('OTP sent to your email!');
      }
    } catch (error: any) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP verification
  const onSubmitOTP = async (formData: { otp: string }) => {
    setIsSubmitting(true);

    const payload = {
      email: userEmail,
      otp: formData.otp,
    };

    try {
      const data = await post('/api/auth/verifyOTP', payload);
      if (data.responseStatus.status && data.responseData.qr_code) {
        setQrCode(data.responseData.qr_code);
        setCurrentStep('qr');
        toast.success('Registration completed successfully!');
      }
    } catch (error) {
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    setIsSubmitting(true);
    try {
      await post('/api/auth/resendOTP', { email: userEmail });
      setResendAvailable(false);
      setResendTimeLeft(60);
      toast.success('OTP resent to your email!');
    } catch (error: any) {
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'details':
        return (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitDetailsUtil)}
              className="space-y-4"
            >
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
                  label="Secure Email ID"
                  type="email"
                  placeholder="Enter your email address"
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
                  label="Enter Passkey"
                  type="password"
                  placeholder="Enter your password"
                />

                <FormInput
                  form={form}
                  name="confirmPassword"
                  label="Confirm Passkey"
                  type="password"
                  placeholder="Confirm your password"
                />

                {passwordValue && (
                  <div className="space-y-1">
                    <div className="flex h-2 gap-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded transition-all duration-300 ${
                            strength > i
                              ? strengthColors[strength - 1]
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">
                      Encryption Level:{' '}
                      {strengthLabels[strength - 1] || 'Very Weak'}
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending OTP...' : 'Request Authorization'}
              </Button>
            </form>
          </Form>
        );

      case 'otp':
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <Mail className="mx-auto h-12 w-12 text-emerald-500" />
              <h3 className="text-xl font-semibold text-white">
                Check Your Email
              </h3>
              <p className="text-gray-400">
                We've sent a 6-digit verification code to <br />
                <span className="text-emerald-400">{userEmail}</span>
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-orange-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Code expires in {formatTime(timeLeft)}
              </span>
            </div>

            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(onSubmitOTP)}
                className="space-y-4"
              >
                <FormInput
                  form={otpForm}
                  name="otp"
                  label="Enter Verification Code"
                  placeholder="000000"
                  className="text-center text-2xl tracking-widest"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || timeLeft === 0}
                  className="w-full bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50"
                >
                  {isSubmitting ? 'Verifying...' : 'Verify Code'}
                </Button>
              </form>
            </Form>

            {/* Resend OTP Button */}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={!resendAvailable || isSubmitting}
                className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black disabled:opacity-50"
              >
                {!resendAvailable
                  ? `Resend OTP in ${resendTimeLeft}s`
                  : 'Resend OTP'}
              </Button>
            </div>

            {timeLeft === 0 && (
              <div className="text-center">
                <p className="mb-2 text-sm text-red-400">
                  Verification code expired
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentStep('details');
                    setTimeLeft(600);
                    setResendAvailable(false);
                    setResendTimeLeft(60);
                  }}
                  className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black"
                >
                  Start Over
                </Button>
              </div>
            )}
          </div>
        );

      case 'qr':
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
              <h3 className="text-xl font-semibold text-white">
                Registration Complete!
              </h3>
              <p className="text-gray-400">
                Scan the QR code below with your authenticator app to complete
                the setup.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="rounded-lg bg-white p-4">
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code for authenticator setup"
                  className="h-48 w-48"
                />
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-400">
              <p>
                • Open your authenticator app (Google Authenticator, Authy,
                etc.)
              </p>
              <p>• Scan this QR code</p>
              <p>• Save the generated codes for future logins</p>
            </div>

            <Button
              onClick={() => (window.location.href = '/login')}
              className="w-full bg-emerald-500 text-black hover:bg-emerald-400"
            >
              Continue to Login
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Registration</h2>
          <div className="text-sm text-gray-400">
            Step {currentStep === 'details' ? 1 : currentStep === 'otp' ? 2 : 3}{' '}
            of 3
          </div>
        </div>
        {/* <Progress value={70} className="h-2 bg-white" /> */}

        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full bg-gray-800">
          <div
            className={cn(
              'h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500',
              currentStep === 'details' && 'w-1/3',
              currentStep === 'otp' && 'w-2/3',
              currentStep === 'qr' && 'w-full',
            )}
          />
        </div>
      </div>

      {/* Type Selection - Only show on details step */}
      {currentStep === 'details' && (
        <div className="mb-8 rounded-2xl">
          <div className="flex gap-2 rounded-2xl bg-[#0A0D14] p-1">
            <button
              type="button"
              className={`flex-1 rounded-2xl px-4 py-2 transition-colors ${
                type === 'agent'
                  ? 'bg-emerald-500 text-black'
                  : 'text-white hover:bg-emerald-500/20'
              }`}
              onClick={() => setType('agent')}
            >
              Agent
            </button>
            {/* <button
              type="button"
              className={`flex-1 rounded-md px-4 py-2 transition-colors ${
                type === 'developer'
                  ? 'bg-emerald-500 text-black'
                  : 'text-white hover:bg-emerald-500/20'
              }`}
              onClick={() => setType('developer')}
            >
              Developer
            </button> */}
            <button
              type="button"
              className={`flex-1 rounded-2xl px-4 py-2 transition-colors ${
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
      )}

      <TermsModal
        open={open}
        onClose={() => setIsOpen(false)}
        onAgree={handleAgree}
      />

      {/* Step Content */}
      {renderStepContent()}
    </div>
  );
}
