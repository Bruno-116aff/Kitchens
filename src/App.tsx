import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';

function App() {
	// Handle redirect from 404.html
	useEffect(() => {
		const redirect = sessionStorage.redirect;
		if (redirect) {
			sessionStorage.removeItem('redirect');
			// Remove the base path from the URL
			const path = redirect.replace(window.location.origin + '/Kitchens', '');
			window.history.replaceState({}, '', path);
		}
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
