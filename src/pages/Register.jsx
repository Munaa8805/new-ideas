import { useState } from "react";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_REGISTER_URL } from "../constants/api";

const inputClass =
  "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:bg-gray-50";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const name = fullName.trim();
    const emailTrim = email.trim();
    if (!name || !emailTrim || !password) return;

    setSubmitting(true);
    try {
      const res = await fetch(AUTH_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: emailTrim,
          password,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        setFormError(
          typeof json.message === "string"
            ? json.message
            : "Registration failed. Try again."
        );
        return;
      }

      if (json.accessToken) {
        localStorage.setItem("accessToken", json.accessToken);
      }

      setFullName("");
      setEmail("");
      setPassword("");
      navigate("/login", { replace: true, state: { registered: true } });
    } catch {
      setFormError("Network error. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 pt-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-500">
          Start capturing your brilliant ideas today.
        </p>
      </div>

      <div className="bg-white p-8 rounded-4xl border border-gray-200 shadow-xl shadow-gray-100 space-y-6">
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
                htmlFor="register-full-name"
                className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                  aria-hidden
                />
                <input
                  id="register-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="register-email"
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
                  id="register-email"
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
                htmlFor="register-password"
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
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  required
                  minLength={8}
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
                Creating account…
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Sign Up
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
