import { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import './App.css';
import { getEnvVars } from '../env';

const { VITE_API_URL } = getEnvVars();
function App() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleShortenUrl = async () => {
        try {
            const response = await fetch(`${VITE_API_URL}/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: originalUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                setShortenedUrl(`${window.location.origin}/${data.urlCode}`);
                setErrorMessage('');
            } else {
                setShortenedUrl('');
                setErrorMessage(data.error);
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
            setShortenedUrl('');
            setErrorMessage('An error occurred while shortening the URL.');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedUrl);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h2" align="center" gutterBottom>
                StoicLane URL Shortener
            </Typography>

            <Box className={'text-fields'}>
                <TextField
                    fullWidth
                    label="Enter URL"
                    variant="outlined"
                    value={originalUrl}
                    onChange={(e) => {
                        setOriginalUrl(e.target.value);
                        setErrorMessage('');
                    }}
                    sx={{ marginBottom: 2 }}
                />
                <Button sx={{ marginBottom: 2, marginLeft: 2, height: '56px' }} variant="contained" color="primary" onClick={handleShortenUrl}>
                    Shorten
                </Button>
            </Box>

            {shortenedUrl && (
                    <Box className={'text-fields'}>
                        <TextField
                            fullWidth
                            label="Short URL"
                            variant="outlined"
                            value={shortenedUrl}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button variant="text" onClick={copyToClipboard}>
                                            Copy
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
            )}

            {errorMessage && (
                <Typography variant="body1" color="error" align="center">
                    {errorMessage}
                </Typography>
            )}
        </Box>
    );
}

export default App;
