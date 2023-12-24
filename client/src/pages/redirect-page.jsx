import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;
export default function RedirectPage() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const urlCode = location.pathname.slice(1);
            const response = await fetch(`${VITE_API_URL}/${urlCode}`);

            if (response.status === 404) {
                return navigate('/urls/not-found');
            }

            const data = await response.json();
            window.location.assign(data.originalUrl); // Redirect to external URL
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}
