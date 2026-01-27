import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
  student_id?: string;
}
type AuthStoreState = {
  user: User | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,   //put some default user if you want for testing. and clear the local storage.
      isHydrated: false,
      setUser: (user: User | null) => set({ user }),
      logout: () => set({ user: null }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-store',
      onRehydrateStorage: () => (state) => {
        (state as AuthStoreState)?.setHydrated();
      },
      partialize: (state: AuthStoreState) =>
        ({
          user: state.user,
        }) as unknown as AuthStoreState,
    },
  ) as any,
);