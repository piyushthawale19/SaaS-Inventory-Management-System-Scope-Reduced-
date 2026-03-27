import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await api.post("/auth/login", formData);
      login(data.user, data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <p className="text-2xl font-extrabold text-[#004ac6] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
            StockFlow
          </p>
          <h1 className="text-2xl font-bold text-[#191c1d]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-[#434655]">
            Enter your credentials to access your account.
          </p>
        </div>

        <Card>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[#ffdad6] text-[#93000a] p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <InputField
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-[#434655] mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-semibold text-[#004ac6] hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
