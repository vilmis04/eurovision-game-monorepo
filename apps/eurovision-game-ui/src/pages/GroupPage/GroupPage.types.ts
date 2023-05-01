export enum SubmitTypes {
	CREATE = "CREATE",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
	INVITE = "INVITE",
}

export interface IGroupForAction {
	name: string;
	_id: string;
}
