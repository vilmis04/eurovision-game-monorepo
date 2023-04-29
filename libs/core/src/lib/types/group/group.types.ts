export const initialValues = {
	groupName: "",
};

export interface ICreateGroupFormData {
	groupName: string;
}

export interface IGroup {
	name: string;
	members: string[];
	owner: string;
	yearCreated: string;
}
