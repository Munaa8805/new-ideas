import { useState } from "react";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AUTH_LOGIN_URL } from "../constants/api";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:bg-gray-50";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginSession } = useAuth();
  const justRegistered = location.state?.registered === true;
  const redirectTo = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const emailTrim = email.trim();
    if (!emailTrim || !password) return;

    setSubmitting(true);
    try {
      const res = await fetch(AUTH_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailTrim,
          password,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        setFormError(
          typeof json.message === "string"
            ? json.message
            : "Sign in failed. Try again."
        );
        return;
      }

      loginSession({
        accessToken: json.accessToken,
        user:
          json.user ||
          (emailTrim ? { email: emailTrim, name: emailTrim.split("@")[0] } : null),
      });

      setPassword("");
      navigate(redirectTo, { replace: true });
    } catch {
      setFormError("Network error. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 pt-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-500">
          Enter your credentials to access your ideas.
        </p>
      </div>

      <div className="bg-white p-8 rounded-4xl border border-gray-200 shadow-xl shadow-gray-100 space-y-6">
        {justRegistered ? (
          <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
            Account created. You can sign in now.
          </p>
        ) : null}

        {formError ? (
          <p
            className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
            role="alert"
          >
            {formError}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                  aria-hidden
                />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                  aria-hidden
                />
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  required
                  disabled={submitting}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-70 disabled:pointer-events-none"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
