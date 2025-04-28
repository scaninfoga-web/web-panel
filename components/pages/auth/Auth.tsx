"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from '@/components/providers/AuthProvider';
import Login from "./Login";
import { Register } from "./Register";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

function SpiderWebBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 1 - 0.5,
      vy: Math.random() * 1 - 0.5
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
        ctx.fillStyle = "#10B981";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
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
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const router = useRouter();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: regRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors }
  } = useForm({ resolver: zodResolver(registerSchema) });

  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Credential Response:', credentialResponse);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          idToken: credentialResponse.credential,
          backend: 'google-oauth2',
          grant_type: 'convert_token',
        }),
      });

      const data = await response.json();
      console.log('Backend Response:', data);

      if (data.responseStatus?.status) {
        login(data.responseData.token);
        // window.location.href = '/combinedDash';
        toast.success("Logged in successfully!");
  
        router.push("/combinedDash");
      } else {
        console.error('Authentication failed:', data.responseStatus?.message);
        toast.error("Login failed. Check your credentials and try again.");
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error("Login failed. Check your credentials and try again.");
    }
  };

  // const onLogin = async (payload: any) => {
  //   try{
  //     const data = await axios.post("http://localhost:8000/api/auth/login", payload, { withCredentials: true });

  //     router.push('/combinedDash');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onLogin = async (payload: any) => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/auth/login", payload, {
        withCredentials: true,
      });
  
      toast.success("Logged in successfully!");
  
      router.push("/combinedDash");
    } catch (error) {
      toast.error("Login failed. Check your credentials and try again.");
      console.error(error);
    }
  };
  

  const onRegister = (data: any) => {
    console.log("Register Data:", data);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
        <SpiderWebBackground />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-2xl p-8 bg-[#11151F] rounded-2xl shadow-2xl shadow-emerald-500 bg-[#0e1421]/30 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {!isRegistering ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
                  {/* <form className="space-y-4" onSubmit={handleLoginSubmit(onLogin)}>
                    <input
                      type="email"
                      placeholder="Email"
                      {...loginRegister("email")}
                      className="w-full p-3 rounded-xl border border-emerald-500 bg-[#0A0D14] text-white placeholder-gray-400"
                    />
                    {loginErrors.email && <p className="text-red-500 text-sm">{loginErrors.email.message}</p>}

                    <input
                      type="password"
                      placeholder="Password"
                      {...loginRegister("password")}
                      className="w-full p-3 rounded-xl border border-emerald-500 bg-[#0A0D14] text-white placeholder-gray-400"
                    />
                    {loginErrors.password && <p className="text-red-500 text-sm">{loginErrors.password.message}</p>}

                    <button
                      type="submit"
                      className="w-full bg-emerald-500 text-black py-3 rounded-xl hover:bg-emerald-400 transition"
                    >
                      Login
                    </button>
                  </form> */}
                  <Login />
                  <div className="my-4 text-center text-gray-300">OR</div>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.error("Login Failed")}
                    theme="filled_black"
                    text="signin_with"
                    shape="rectangular"
                  />
                  <div className="mt-6 text-center">
                    <span className="text-gray-400">New user? </span>
                    <button
                      className="text-emerald-500 hover:underline"
                      onClick={() => setIsRegistering(true)}
                    >
                      Register
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-center text-white mb-6">Register</h2>
                  <Register type="normal" />
                  <div className="my-4 text-center text-gray-300">OR</div>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.error("Login Failed")}
                    theme="filled_black"
                    text="signin_with"
                    shape="rectangular"
                  />
                  <div className="mt-6 text-center">
                    <span className="text-gray-400">Already have an account? </span>
                    <button
                      className="text-emerald-500 hover:underline"
                      onClick={() => setIsRegistering(false)}
                    >
                      Login
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}