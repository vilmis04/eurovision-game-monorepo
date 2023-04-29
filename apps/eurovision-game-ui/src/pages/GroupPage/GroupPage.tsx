import { useEffect, useState } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Dialog,
	FormControlLabel,
	Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import FormField from "../../components/FormField/FormField";
import {
	ICreateGroupFormData,
	initialValues,
} from "@eurovision-game-monorepo/core";
import {
	useCreateGroupMutation,
	useGetGroupsQuery,
} from "./@modules/group.api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GroupPage: React.FC = () => {
	const { data: groups } = useGetGroupsQuery({
		year: new Date().getFullYear().toString(),
	});
	const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
	// @ts-ignore
	const [createGroup, { isSuccess: isCreateGroupSuccess }] =
		useCreateGroupMutation();

	const toggleCreateGroupDialog = () => setShowCreateGroupDialog((s) => !s);

	useEffect(() => {
		if (isCreateGroupSuccess) toggleCreateGroupDialog();
	}, [isCreateGroupSuccess]);

	const handleSubmit = (values: ICreateGroupFormData) => {
		createGroup(values);
		// TODO: add submit handling
	};

	// TODO: move all sx
	return (
		<Box>
			<Box>
				<Button
					variant="outlined"
					onClick={toggleCreateGroupDialog}
					sx={{ margin: 1 }}
				>
					Create group
				</Button>
			</Box>
			<Box>
				{groups && groups.length > 0 ? (
					groups.map(({ _id, name, members }) => (
						<Box key={`${_id}`} sx={{ margin: 1 }}>
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									{name}
								</AccordionSummary>
								<AccordionDetails>
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
			<Dialog
				open={showCreateGroupDialog}
				onClose={toggleCreateGroupDialog}
			>
				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					{() => (
						<Box component={Form} sx={{ padding: 3 }}>
							<FormControlLabel
								control={<FormField name="groupName" />}
								label={
									<Typography
										variant="body1"
										sx={{
											width: "100%",
										}}
									>
										Group name:
									</Typography>
								}
								labelPlacement="top"
							/>
							<Box
								sx={{
									padding: 3,
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Button variant="contained" type="submit">
									Create
								</Button>
								<Button
									variant="outlined"
									onClick={toggleCreateGroupDialog}
								>
									Cancel
								</Button>
							</Box>
						</Box>
					)}
				</Formik>
			</Dialog>
		</Box>
	);
};

export default GroupPage;
