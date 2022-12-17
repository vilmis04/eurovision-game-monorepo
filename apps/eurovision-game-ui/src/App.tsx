import React from "react";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "@mui/system";
import VotingPage from "./pages/VotingPage/VotingPage";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";

function App() {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<GlobalStyles />
				<Routes>
					<Route path="/" element={<VotingPage />}></Route>
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
}

export default App;
