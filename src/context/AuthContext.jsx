import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

export const ACCESS_TOKEN_KEY = "accessToken";
export const AUTH_USER_KEY = "authUser";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(readStoredUser);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const stored = readStoredUser();
    if (!token && stored) {
      localStorage.removeItem(AUTH_USER_KEY);
      setUserState(null);
    }
    if (token && !stored) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setUserState(null);
    }
  }, []);

  const loginSession = useCallback(({ accessToken, user: nextUser }) => {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
    if (nextUser) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
      setUserState(nextUser);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setUserState(null);
  }, []);

  const isAuthenticated = Boolean(
    localStorage.getItem(ACCESS_TOKEN_KEY) && user
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loginSession,
      logout,
    }),
    [user, isAuthenticated, loginSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
