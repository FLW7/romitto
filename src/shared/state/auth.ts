import { create } from 'zustand';

import { setCookie, getCookie, removeCookie } from '@/shared/lib/cookies';
// import { resetProfile } from '@/shared/model/profile';
interface TokenAuth {
  token: string;
}

interface AuthStore {
  token: string | null;
  isAuth: boolean;
  login: (data: TokenAuth) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  token: getCookie('token'),
  isAuth: !!getCookie('token'),

  login: (data) => {
    setCookie('token', data.token);
    set({ token: data.token, isAuth: !!data.token });
  },
  logout: () => {
    removeCookie('token');

    // resetProfile();
    set({ token: null, isAuth: false });
  },
}));
