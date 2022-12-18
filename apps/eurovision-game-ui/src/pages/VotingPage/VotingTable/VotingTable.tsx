import { Grid } from "@mui/material";
import { styles } from "./VotingTable.styles";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import CountryCard from "../CountryCard/CountryCard";
import { Formik } from "formik";

interface ICountry {
	country: string;
	artist: string;
	song: string;
}

const VotingTable: React.FC = () => {
	const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(countries.length === 0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// TODO: replace with RTK query
	useEffect(() => {
		fetch("http://localhost:3004/EV22")
			.then((res) => res.json())
			.then((res) => setCountries(res))
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	}, []);

	const toggleModal = (): void => setIsModalOpen(!isModalOpen);

	const initialValues = countries.reduce(
		(prev, { country, vote }) => ({
			...prev,
			[country]: vote,
		}),
		{}
	);

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const onSubmit = (): void => {};

	return isLoading ? (
		// TODO: replace with spinner or skeleton
		<Box>Loading</Box>
	) : (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			<Grid container sx={styles.tableContainer}>
				{countries.map((entry: ICountry) => (
					<Grid
						item
						md={4}
						sm={6}
						xs={12}
						key={entry.country}
						sx={styles.card}
					>
						<CountryCard
							country={entry.country}
							artist={entry.artist}
							song={entry.song}
							toggleModal={toggleModal}
						/>
					</Grid>
				))}
			</Grid>
		</Formik>
	);
};

export default VotingTable;
