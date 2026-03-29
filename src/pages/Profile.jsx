import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Calendar,
  LogOut,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatShortDate } from "../utils/formatDate";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (!user) {
    return null;
  }

  const displayName = user.name || user.email || "Member";

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 pt-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="bg-white rounded-4xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-10 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">
                Profile
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight">{displayName}</h1>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <dl className="space-y-5">
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-xl bg-gray-100 text-gray-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Name
                </dt>
                <dd className="text-gray-900 font-semibold mt-0.5">
                  {user.name || "—"}
                </dd>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-xl bg-gray-100 text-gray-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email
                </dt>
                <dd className="text-gray-900 font-semibold mt-0.5 break-all">
                  {user.email || "—"}
                </dd>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-xl bg-gray-100 text-gray-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Role
                </dt>
                <dd className="text-gray-900 font-semibold mt-0.5 capitalize">
                  {user.role || "user"}
                </dd>
              </div>
            </div>
            {user.createdAt ? (
              <div className="flex gap-4 items-start">
                <div className="p-2 rounded-xl bg-gray-100 text-gray-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Member since
                  </dt>
                  <dd className="text-gray-900 font-semibold mt-0.5">
                    {formatShortDate(user.createdAt)}
                  </dd>
                </div>
              </div>
            ) : null}
            {user._id ? (
              <div className="flex gap-4 items-start pt-2 border-t border-gray-100">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    User ID
                  </dt>
                  <dd className="text-gray-600 text-sm font-mono mt-0.5 break-all">
                    {user._id}
                  </dd>
                </div>
              </div>
            ) : null}
          </dl>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
