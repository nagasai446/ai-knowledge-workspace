import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/use-auth";
import {
  loginSchema,
  type LoginFormValues,
} from "../schemas/auth-schema";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      await login(data.email, data.password);

      const from = location.state?.from?.pathname;

      navigate(
        typeof from === "string" && from !== "/login"
          ? from
          : "/dashboard",
        { replace: true },
      );
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Unable to sign in. Please try again.",
      });
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden bg-muted/40 p-10 lg:flex lg:flex-col lg:justify-between">
        <Link
          to="/login"
          className="text-xl font-semibold tracking-tight"
        >
          ✦ AI Knowledge
        </Link>

        <div className="max-w-lg">
          <p className="text-4xl font-semibold tracking-tight">
            Turn your documents into an intelligent knowledge base.
          </p>

          <p className="mt-5 text-muted-foreground">
            Organize information, ask questions and get
            AI-powered answers grounded in your documents.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          AI Knowledge Workspace
        </p>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="mb-6 text-xl font-semibold lg:hidden">
              ✦ AI Knowledge
            </p>

            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your knowledge workspace.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Email
              </label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium"
              >
                Password
              </label>

              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errors.root && (
              <p
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.root.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}