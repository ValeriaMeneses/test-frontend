
import { Routes, Route } from 'react-router-dom';
import NavBarComponent from './components/NavBar';
import { HomePage, EmployeesPage, LoginPage, UploadPage } from './pages';

export const App = () => {
	return (
		<div>
			<NavBarComponent />
			<Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/login" element={ <LoginPage /> } />
                <Route path="/employees" element={ <EmployeesPage /> } />
				<Route path="/upload" element={ <UploadPage /> } />
            </Routes>
		</div>
	)
}

export default App;
