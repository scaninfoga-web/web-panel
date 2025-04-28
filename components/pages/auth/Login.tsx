import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/components/providers/AuthProvider";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: LoginFormValues) => {
    console.log("CALLED")
    return
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", data, {
        withCredentials: true,
      });

      toast.success("Logged in successfully!");
      router.push("/combinedDash");
    } catch (error) {
      toast.error("Login failed. Check your credentials and try again.");
      console.error(error);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
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

          <Button 
            type="submit" 
            className=""
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
