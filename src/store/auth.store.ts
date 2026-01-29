import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/login";

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
			user: null,
			isHydrated: false,
			setUser: (user: User | null) => set({ user }),
			logout: () => set({ user: null }),
			setHydrated: () => set({ isHydrated: true }),
		}),
		{
			name: "auth-store",
			onRehydrateStorage: () => (state) => {
				(state as AuthStoreState)?.setHydrated();
			},
			partialize: (state: AuthStoreState) =>
				({
					user: state.user,
				}) as unknown as AuthStoreState,
		},
	),
);
