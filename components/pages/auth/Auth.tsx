'use client';
import { useState, useEffect, useRef } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/components/providers/AuthProvider';
import Login from './Login';
import { Register } from './Register';
import ChangePassword from './ChangePassword';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function SpiderWebBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 1 - 0.5,
      vy: Math.random() * 1 - 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        let p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 z-0 h-full w-full"
    />
  );
}

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState('login');

  const router = useRouter();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: regRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const { login } = useAuth();

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

      if (data.responseStatus?.status) {
        login(data.responseData.token);
        toast.success('Logged in successfully!');
        router.push('/combinedDash');
      } else {
        toast.error('Login failed. Check your credentials and try again.');
      }
    } catch (error) {
      toast.error('Login failed. Check your credentials and try again.');
    }
  };

  const onLogin = async (payload: any) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/auth/login',
        payload,
        {
          withCredentials: true,
        },
      );
      toast.success('Logged in successfully!');

      router.push('/combinedDash');
    } catch (error) {
      toast.error('Login failed. Check your credentials and try again.');
    }
  };

  return (
    <>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      >
        <SpiderWebBackground />
        <div className="flex min-h-screen items-center justify-center pt-4 md:pt-8">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-[#0e1421]/30 bg-[#11151F] p-8 shadow-2xl shadow-emerald-500 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {isRegistering === 'login' && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex items-center justify-center text-3xl font-bold tracking-tight">
                    <span className="text-emerald-500">scan</span>
                    <span>infoga</span>
                  </span>
                  <div className="mb-10 mt-2 w-full text-center text-lg text-white/80">
                    access the Scaninfoga Intelligence of Investigation portal
                  </div>

                  <Login />

                  <div className="mt-6 text-center">
                    <span className="text-gray-400">New credentials? </span>
                    <button
                      className="text-emerald-500 hover:underline"
                      onClick={() => setIsRegistering('register')}
                    >
                      Register
                    </button>
                  </div>

                  <span className="mt-8 flex w-full items-center justify-center text-center text-gray-400">
                    connection is secured using AES-256 encryption
                  </span>
                </motion.div>
              )}
              {isRegistering === 'register' && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex items-center justify-center text-3xl font-bold tracking-tight">
                    <span className="text-emerald-500">scan</span>
                    <span>infoga</span>
                  </span>
                  <div className="mb-10 mt-2 w-full text-center text-lg text-white/80">
                    access the Scaninfoga Intelligence of Investigation portal
                  </div>
                  <Register type="agent" />

                  <div className="mt-6 text-center">
                    <span className="text-gray-400">
                      Already have an credentials?{' '}
                    </span>
                    <button
                      className="text-emerald-500 hover:underline"
                      onClick={() => setIsRegistering('login')}
                    >
                      Login
                    </button>
                  </div>

                  <span className="mt-8 flex w-full items-center justify-center text-center text-gray-400">
                    connection is secured using AES-256 encryption
                  </span>
                </motion.div>
              )}

              {isRegistering === 'changePass' && (
                <motion.div
                  key="changePass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex items-center justify-center text-3xl font-bold tracking-tight">
                    <span className="text-emerald-500">scan</span>
                    <span>infoga</span>
                  </span>
                  <div className="mb-10 mt-2 w-full text-center text-lg text-white/80">
                    access the Scaninfoga Intelligence of Investigation portal
                  </div>
                  <ChangePassword />
                  <div className="mt-6 text-center">
                    <span className="text-gray-400">
                      Already have an credentials?{' '}
                    </span>
                    <button
                      className="text-emerald-500 hover:underline"
                      onClick={() => setIsRegistering('login')}
                    >
                      Login
                    </button>
                  </div>
                  <span className="mt-8 flex w-full items-center justify-center text-center text-gray-400">
                    connection is secured using AES-256 encryption
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            {isRegistering !== 'changePass' && (
              <div
                className="text-center font-semibold text-emerald-500"
                onClick={() => setIsRegistering('changePass')}
              >
                Forget Password
              </div>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
