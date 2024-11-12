const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Replace this with your actual Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyG4jQi50GWXCeFyVvQ2GF4auQydVZs584ouUnopcYr7Kxj28Nza8nXVbPxdIGRA6mzvQ/exec';

// POST endpoint to submit form data
app.post('/api/submit', async (req, res) => {
    const data = req.body;

    try {
        // Make a POST request to the Google Apps Script URL
        const response = await axios.post(GOOGLE_SCRIPT_URL, data, {
            headers: { 'Content-Type': 'application/json' } // Ensure correct content type
        });

        // Check if Google Apps Script responded with success
        if (response.status === 200) {
            return res.status(200).json({
                message: 'Form submitted successfully!',
                responseData: response.data,
            });
        } else {
            console.error('Unexpected response:', response.data);
            return res.status(response.status).json({
                message: 'Failed to submit the form.',
                error: response.data,
            });
        }
    } catch (error) {
        console.error('Error submitting form:', error.message);

        // Handle different error scenarios
        if (error.response) {
            // Server responded with a status other than 2xx
            return res.status(error.response.status).json({
                message: 'Error from Google Apps Script.',
                error: error.response.data,
            });
        } else if (error.request) {
            // No response received from Google Apps Script
            return res.status(500).json({
                message: 'No response from Google Apps Script.',
                error: 'Network error or server not reachable.',
            });
        } else {
            // Other errors (e.g., configuration)
            return res.status(500).json({
                message: 'Internal server error.',
                error: error.message,
            });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
