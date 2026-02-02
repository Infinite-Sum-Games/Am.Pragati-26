import { create } from "zustand";

export type ActiveTab = "tickets" | "transactions" | "profile";

export interface UpdateProfilePayload {
	name: string;
	phone_number: string;
	college_name: string;
	college_city: string;
}

export interface EditProfileState {
	isEditMode: boolean;
	setIsEditMode: (mode: boolean) => void;
	toggleEditMode: () => void;
}

type ProfileFormStore = {
	fields: UpdateProfilePayload;
	setAllFields: (fields: UpdateProfilePayload) => void;
	activeTab: ActiveTab;
	setActiveTab: (tab: ActiveTab) => void;
};

const initialState: UpdateProfilePayload = {
	name: "",
	phone_number: "",
	college_name: "",
	college_city: "",
};

export const profileFormStore = create<ProfileFormStore>((set) => ({
	fields: initialState,
	setAllFields: (fields) =>
		set((state) => ({
			fields: { ...state.fields, ...fields },
		})),
	activeTab: "profile",
	setActiveTab: (tab) => set({ activeTab: tab }),
}));

export const useProfileStore = create<EditProfileState>((set) => ({
	isEditMode: false,
	setIsEditMode: (mode) => set({ isEditMode: mode }),
	toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
}));
