import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getEnvVars } from '../../env';

const { VITE_API_URL } = getEnvVars();
export default function RedirectPage() {
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlCode = location.pathname.slice(1);
                const response = await fetch(`${VITE_API_URL}/${urlCode}`);

                if (!response.ok) {
                    throw new Error('An error occurred while fetching the URL.');
                }

                const data = await response.json();
                window.location.assign(data.originalUrl); // Redirect to external URL
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}
