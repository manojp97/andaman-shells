import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "@/api/auth";

const AuthContext = createContext(null);
const STORAGE_TOKEN = "authToken";
const STORAGE_REFRESH = "refreshToken";
const STORAGE_USER = "authUser";

function getStoredAuth() {
  if (typeof window === "undefined") {
    return {
      token: null,
      refreshToken: null,
      user: null,
    };
  }

  return {
    token: localStorage.getItem(STORAGE_TOKEN),
    refreshToken: localStorage.getItem(STORAGE_REFRESH),
    user: JSON.parse(localStorage.getItem(STORAGE_USER) || "null"),
  };
}

function saveStoredAuth(auth) {
  if (auth.token) {
    localStorage.setItem(STORAGE_TOKEN, auth.token);
  } else {
    localStorage.removeItem(STORAGE_TOKEN);
  }

  if (auth.refreshToken) {
    localStorage.setItem(STORAGE_REFRESH, auth.refreshToken);
  } else {
    localStorage.removeItem(STORAGE_REFRESH);
  }

  if (auth.user) {
    localStorage.setItem(STORAGE_USER, JSON.stringify(auth.user));
  } else {
    localStorage.removeItem(STORAGE_USER);
  }
}

function clearStoredAuth() {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_REFRESH);
  localStorage.removeItem(STORAGE_USER);
}

function normalizeAuthResponse(data) {
  const payload = data?.data || data;

  return {
    token: payload?.accessToken ?? payload?.token ?? null,
    refreshToken: payload?.refreshToken ?? payload?.refresh_token ?? null,

    user: payload?.user ?? payload?.admin ?? payload?.profile ?? null,
  };
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const storedAuth = getStoredAuth();
  const [token, setToken] = useState(storedAuth.token);
  const [refreshToken, setRefreshToken] = useState(storedAuth.refreshToken);
  const [user, setUser] = useState(storedAuth.user);
  const [isInitializing, setIsInitializing] = useState(true);

  const setAuthState = useCallback((auth) => {
    const nextAuth = normalizeAuthResponse(auth);
    setToken(nextAuth.token);
    setRefreshToken(nextAuth.refreshToken);
    setUser(nextAuth.user);
    saveStoredAuth(nextAuth);
  }, []);

  const clearAuthState = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    clearStoredAuth();
  }, []);

  const refreshAuth = useCallback(async () => {
    if (!refreshToken) {
      throw new Error("Missing refresh token");
    }

    const response = await authApi.refreshToken({ refreshToken });
    const nextAuth = normalizeAuthResponse(response);
    setToken(nextAuth.token);
    setRefreshToken(nextAuth.refreshToken || refreshToken);
    setUser(nextAuth.user || user);
    saveStoredAuth({
      ...nextAuth,
      refreshToken: nextAuth.refreshToken || refreshToken,
    });
    return nextAuth;
  }, [refreshToken, user]);

  useEffect(() => {
    const initialize = async () => {
      if (token && refreshToken) {
        try {
          await refreshAuth();
        } catch (err) {
          clearAuthState();
        }
      }
      setIsInitializing(false);
    };

    initialize();
  }, [refreshAuth, token, refreshToken, clearAuthState]);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);

    console.log("LOGIN RESPONSE =>", response);

    const nextAuth = normalizeAuthResponse(response);

    console.log("NORMALIZED =>", nextAuth);

    setAuthState(nextAuth);

    return nextAuth;
  };

  const adminLogin = async (credentials) => {
    const response = await authApi.adminLogin(credentials);
    const nextAuth = normalizeAuthResponse(response);
    setAuthState(nextAuth);
    return nextAuth;
  };

  const adminRegister = async (payload) => {
    const response = await authApi.adminRegister(payload);
    const nextAuth = normalizeAuthResponse(response);
    setAuthState(nextAuth);
    return nextAuth;
  };

  const register = async (payload) => {
    const response = await authApi.register(payload);
    const nextAuth = normalizeAuthResponse(response);
    setAuthState(nextAuth);
    return nextAuth;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // ignore network errors while logging out
    }
    clearAuthState();
    navigate("/login", { replace: true });
  };

  const updateProfile = async (profile) => {
    const response = await authApi.updateProfile(profile);
    const nextAuth = normalizeAuthResponse(response);
    if (nextAuth.user) {
      setUser(nextAuth.user);
      saveStoredAuth({ token, refreshToken, user: nextAuth.user });
    }
    return nextAuth;
  };

  const changePassword = async (payload) => {
    const response = await authApi.changePassword(payload);
    return response;
  };

  const fetchProfile = async () => {
    const response = await authApi.getProfile();
    const nextAuth = normalizeAuthResponse(response);
    if (nextAuth.user) {
      setUser(nextAuth.user);
      saveStoredAuth({ token, refreshToken, user: nextAuth.user });
    }
    return nextAuth;
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isInitializing,

    login,
    register,

    adminLogin,
    adminRegister,

    logout,
    updateProfile,
    changePassword,
    fetchProfile,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
