import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/app.css";

const App = () => {
	/*
	const { globalTheme } = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
	}));
	*/
	return (
		<BrowserRouter>
			<Routes>
				<Route index></Route>
				{/*Missed routes*/}
				<Route path="*" />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
