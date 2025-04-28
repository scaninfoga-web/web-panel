import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/components/providers/AuthProvider";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormRadioGroup } from "@/components/ui/form-radio-group";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(["user", "corporate", "developer"])
});

type LoginFormValues = z.infer<typeof loginSchema>;

const userTypeOptions = [
  { label: "User", value: "user" },
  { label: "Corporate", value: "corporate" },
  { label: "Developer", value: "developer" }
];

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "user"
    },
  });

  const onLogin = async (data: LoginFormValues) => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        ...data,
        type: data.userType
      }, {
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

          <Button 
            type="submit" 
            className="w-full bg-emerald-500 text-black hover:bg-emerald-400"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
