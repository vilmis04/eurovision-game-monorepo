import { useEffect, useState } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	Box,
	Button,
	ButtonBase,
	Snackbar,
	Typography,
} from "@mui/material";
import {
	ICreateGroupFormData,
	initialValues,
	isResponseSuccess,
} from "@eurovision-game-monorepo/core";
import {
	useCreateGroupMutation,
	useDeleteGroupMutation,
	useGenerateInvitationLinkMutation,
	useGetGroupsQuery,
	useUpdateGroupMutation,
} from "../@modules/group.api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import Popup from "../../components/Popup/Popup";
import { IGroupForAction, SubmitTypes } from "./GroupPage.types";
import { getPopupConfig } from "./GroupPage.config";

const GroupPage: React.FC = () => {
	const { data: groups } = useGetGroupsQuery({
		year: new Date().getFullYear().toString(),
	});
	const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
	const [submitType, setSubmitType] = useState(SubmitTypes.CREATE);
	const [link, setLink] = useState("");
	const [showLinkCopiedSnackbar, setShowLinkCopiedSnackbar] = useState(false);
	const [groupToEdit, setGroupToEdit] = useState<IGroupForAction | null>(
		null
	);
	const [
		createGroup,
		// @ts-ignore
		{ isSuccess: isCreateGroupSuccess, reset: resetCreate },
	] = useCreateGroupMutation();
	const [
		updateGroup,
		// @ts-ignore
		{ isSuccess: isUpdateGroupSuccess, reset: resetUpdate },
	] = useUpdateGroupMutation();
	const [
		deleteGroup,
		// @ts-ignore
		{ isSuccess: isDeleteGroupSuccess, reset: resetDelete },
	] = useDeleteGroupMutation();
	const [generateInvitationLink] = useGenerateInvitationLinkMutation();

	const toggleCreateGroupDialog = () => setShowCreateGroupDialog((s) => !s);

	const toggleLinkCopiedSnackbar = () => setShowLinkCopiedSnackbar((s) => !s);

	const handleClose = () => {
		setGroupToEdit(null);
		resetCreate();
		resetDelete();
		resetUpdate();
		toggleCreateGroupDialog();
	};

	const isSuccess =
		isCreateGroupSuccess || isUpdateGroupSuccess || isDeleteGroupSuccess;

	useEffect(() => {
		if (isSuccess) handleClose();
	}, [isSuccess]);

	const handleSubmit = async ({ name, _id }: ICreateGroupFormData) => {
		if (submitType === SubmitTypes.CREATE) createGroup({ name });
		if (submitType === SubmitTypes.DELETE) deleteGroup({ id: `${_id}` });
		if (submitType === SubmitTypes.UPDATE)
			updateGroup({ id: `${_id}`, body: { name } });
		if (submitType === SubmitTypes.INVITE) {
			navigator.clipboard.writeText(link);
			toggleLinkCopiedSnackbar();
		}
	};

	const handleCreate = () => {
		setSubmitType(SubmitTypes.CREATE);
		toggleCreateGroupDialog();
	};

	const handleEdit = (group: IGroupForAction) => {
		setSubmitType(SubmitTypes.UPDATE);
		setGroupToEdit(group);
		toggleCreateGroupDialog();
	};

	const handleDelete = (group: IGroupForAction) => {
		setSubmitType(SubmitTypes.DELETE);
		setGroupToEdit(group);
		toggleCreateGroupDialog();
	};

	const handleInvitation = async (group: IGroupForAction) => {
		setSubmitType(SubmitTypes.INVITE);
		setGroupToEdit(group);
		const response = await generateInvitationLink({
			id: `${group._id}`,
		});
		isResponseSuccess(response) && setLink(`${response.data}`);
		toggleCreateGroupDialog();
	};

	const username = document.cookie
		.split("; ")
		.find((cookie) => cookie.startsWith("username"))
		?.split("=")[1];

	// TODO: dynamic functionality based on ownership of the group

	const popupConfig = getPopupConfig({ groupToEdit, link });

	// TODO: move all sx
	return (
		<Box>
			<Box>
				<Button
					variant="outlined"
					onClick={handleCreate}
					sx={{ margin: 1 }}
				>
					Create group
				</Button>
			</Box>
			<Box>
				{groups && groups.length > 0 ? (
					groups.map(({ _id, name, members }) => (
						<Box key={`${_id}`} sx={{ margin: 2 }}>
							<Accordion sx={{ background: "#9dd2fa" }}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									{name}
								</AccordionSummary>
								<AccordionDetails>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Box>
											<ButtonBase
												sx={{ margin: 1 }}
												onClick={() =>
													handleInvitation({
														_id: `${_id}`,
														name,
													})
												}
											>
												<LinkIcon />
											</ButtonBase>
										</Box>
										<Box>
											<ButtonBase
												sx={{ margin: 1 }}
												onClick={() =>
													handleEdit({
														_id: `${_id}`,
														name,
													})
												}
												value={name}
											>
												<EditIcon />
											</ButtonBase>
											<ButtonBase
												sx={{ margin: 1 }}
												onClick={() =>
													handleDelete({
														_id: `${_id}`,
														name,
													})
												}
											>
												<DeleteIcon />
											</ButtonBase>
										</Box>
									</Box>
									{members.map((member) => (
										<Box key={member}>{member}</Box>
									))}
								</AccordionDetails>
							</Accordion>
						</Box>
					))
				) : (
					<Typography variant="subtitle1">
						No groups to show
					</Typography>
				)}
			</Box>
			<Popup
				cancelLabel={popupConfig[submitType].cancelLabel}
				confirmLabel={popupConfig[submitType].confirmLabel}
				isOpen={showCreateGroupDialog}
				togglePopup={handleClose}
				initialValues={groupToEdit || initialValues}
				handleSubmit={handleSubmit}
				isLoading={popupConfig[submitType].isLoading}
			>
				{popupConfig[submitType].component}
			</Popup>
			<Snackbar
				open={showLinkCopiedSnackbar}
				autoHideDuration={5000}
				onClose={toggleLinkCopiedSnackbar}
			>
				<Alert
					onClose={toggleLinkCopiedSnackbar}
					severity="success"
					sx={{ width: "100%" }}
				>
					Link copied!
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default GroupPage;
