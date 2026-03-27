import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  orgId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Will be hydrated on app load
  token: Cookies.get('token') || null,
  login: (user, token) => {
    Cookies.set('token', token, { expires: 7 });
    set({ user, token });
  },
  logout: () => {
    Cookies.remove('token');
    set({ user: null, token: null });
  },
}));
