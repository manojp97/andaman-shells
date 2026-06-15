import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authResult = await adminLogin({
        email,
        password,
      });
      const role = authResult?.user?.role || authResult?.role || "user";

      if (role !== "admin") {
        setError("Only admins can access this panel.");
        return;
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Admin login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Admin Login | Andaman Shells</title>
      </Helmet>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16">
        <Card className="w-full max-w-xl overflow-hidden border ">
          <CardHeader className="">
            <CardTitle className="text-3xl">Admin Panel Login</CardTitle>
            <CardDescription className="mt-2 text-gray-500">
              Secure admin access with JWT authentication and automatic token
              refresh.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field>
                <FieldLabel htmlFor="email">Admin Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                />
              </Field>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full text-white bg-blue-500 border shadow cursor-pointer" disabled={loading}>
                {loading ? "Signing in..." : "Sign in as Admin"}
              </Button>
            </form>

            <div className="space-y-3 border-t  pt-6">
              <p className="text-center text-sm text-gray-500">
                Regular user?{" "}
                <Link
                  className="font-medium text-blue-500"
                  to="/admin/login"
                >
                  Login here
                </Link>
              </p>
              <p className="text-center text-sm text-gray-500">
                Need admin registration?{" "}
                <Link
                  className="font-medium text-blue-500"
                  to="/admin/register"
                >
                  Register admin
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
