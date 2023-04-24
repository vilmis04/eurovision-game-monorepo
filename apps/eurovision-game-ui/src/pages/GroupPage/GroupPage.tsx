import { useState } from "react";
import {
	Box,
	Button,
	Dialog,
	FormControlLabel,
	Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import FormField from "../../components/FormField/FormField";

const initialValues = {
	groupName: "",
};

interface ICreateGroupFormData {
	groupName: string;
}

const GroupPage: React.FC = () => {
	const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);

	const toggleCreateGroupDialog = () => setShowCreateGroupDialog((s) => !s);
	const handleSubmit = (values: ICreateGroupFormData) => {
		console.log(values);
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
				{/* TODO: map user groups as accordions with member names in it and name as a summary */}
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
