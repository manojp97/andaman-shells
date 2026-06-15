import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { useAuth } from "@/context/AuthContext";

export default function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { adminRegister } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authResult = await adminRegister({
        name,
        email,
        password,
      });

      const role =
        authResult?.user?.role ||
        authResult?.role ||
        "admin";

      if (role !== "admin") {
        setError("Registration failed. Contact super admin.");
        return;
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err.message ||
        "Admin registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <Helmet>
        <title>Admin Register | Andaman Shells</title>
      </Helmet>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16">
        <Card className="w-full max-w-xl overflow-hidden border">
          <CardHeader className="">
            <CardTitle className="text-3xl">Create Admin Account</CardTitle>
            <CardDescription className="mt-2 text-gray-500">
              Register a new admin to manage the platform.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Admin Name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </Field>

              {error && (
                <p className="text-sm text-black">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full text-white bg-blue-500 cursor-pointer border shadow"
                disabled={loading}
              >
                {loading
                  ? "Creating admin account..."
                  : "Register as Admin"}
              </Button>
            </form>

            <p className="border-t pt-6 text-center text-sm text-gray-500">
              Already have admin account?{" "}
              <Link
                className="font-medium text-blue-500"
                to="/admin/login"
              >
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}