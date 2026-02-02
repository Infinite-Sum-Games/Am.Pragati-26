export interface GroupRegistrationOutput {
	teamName: string;
	members: Array<{
		name: string;
		email: string;
	}>;
}
