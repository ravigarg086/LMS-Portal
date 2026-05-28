import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCurrentUser, loginUser, logoutUserRequest, registerUser, updateProfile as updateProfileRequest } from '../api/authApi';
import { ROLE_DASHBOARD_ROUTES, SESSION_USER_KEY } from '../constants/roles';

const AuthContext = createContext(null);

function readCachedUser() {
  try {
    const raw = sessionStorage.getItem(SESSION_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function cacheUser(user) {
  try {
    if (user) {
      sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(SESSION_USER_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readCachedUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let active = true;

    fetchCurrentUser()
      .then(({ user: currentUser }) => {
        if (active) {
          setUser(currentUser);
          cacheUser(currentUser);
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
          cacheUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setInitializing(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (payload) => {
    const { user: signedInUser } = await loginUser(payload);
    setUser(signedInUser);
    cacheUser(signedInUser);
    return signedInUser;
  }, []);

  const signUp = useCallback(async (payload) => registerUser(payload), []);

  const logout = useCallback(async () => {
    try {
      await logoutUserRequest();
    } catch {
      /* proceed with local logout */
    }
    setUser(null);
    cacheUser(null);
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const response = await updateProfileRequest(payload);
    setUser(response.user);
    cacheUser(response.user);
    return response;
  }, []);

  const getDashboardRoute = useCallback((role) => ROLE_DASHBOARD_ROUTES[role] || '/', []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      isAuthenticated: Boolean(user),
      login,
      signUp,
      register: signUp,
      logout,
      updateProfile,
      getDashboardRoute,
    }),
    [user, initializing, login, signUp, logout, updateProfile, getDashboardRoute],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
