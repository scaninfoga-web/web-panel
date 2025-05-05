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
import { GoogleLogin } from '@react-oauth/google';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  userType: z.enum(['user', 'corporate', 'developer']),
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

  return (
    <div className="w-full space-y-6">
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
            label="Agent ID"
            type="email"
            placeholder="Enter your email ID"
          />

          <FormInput
            form={form}
            name="password"
            label="Encrypted passkey"
            type="password"
            placeholder="Enter your secure passkey"
          />

          <Button
            type="submit"
            className="w-full bg-emerald-500 text-black hover:bg-emerald-400"
          >
            Access System
          </Button>
          {currentType === 'user' ? (
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
          ) : null}
        </form>
      </Form>
    </div>
  );
};

export default Login;
