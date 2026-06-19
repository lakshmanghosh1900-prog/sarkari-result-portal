import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold">
          Admin Login
        </h1>

        <LoginForm />
      </div>
    </div>
  );
}