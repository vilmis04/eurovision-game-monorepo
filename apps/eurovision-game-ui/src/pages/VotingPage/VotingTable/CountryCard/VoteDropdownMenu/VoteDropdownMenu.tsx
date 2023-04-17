import { VoteTypes } from "@eurovision-game-monorepo/core";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { ICountryCardProps } from "../CountryCard";
import { TVoteFormData } from "../../VotingTable.types";

interface IVoteDropdownMenuProps extends Pick<ICountryCardProps, "country"> {}

// TODO: count already selected votes and allow to choose only available votes

const VoteDropdownMenu: React.FC<IVoteDropdownMenuProps> = ({ country }) => {
	const { submitForm } = useFormikContext<TVoteFormData>();
	const [field, _meta, { setValue }] = useField(country);

	const handleChange = (event: SelectChangeEvent): void => {
		setValue(event.target.value);
		submitForm();
	};

	const color = field.value ? "success" : "error";

	return (
		<FormControl fullWidth>
			<InputLabel id="voting-select-label">Vote</InputLabel>
			<Select
				{...field}
				onChange={(event) => handleChange(event)}
				fullWidth
				label="Vote"
				labelId="voting-select-label"
				error={!field.value}
				color={color}
			>
				<MenuItem value="">Vote</MenuItem>
				{Object.values(VoteTypes).map((item) => (
					// TODO: disable based on used votes count
					<MenuItem disabled={false} key={item} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default VoteDropdownMenu;
