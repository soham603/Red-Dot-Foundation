const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(bodyParser.json());

app.post('/api/submit', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.post('https://script.google.com/macros/s/AKfycbxAHwza_98gOeJci997n91ZQ3pJde6GTiYkWB_e0uxXsOy7XFFAEWUUslCcPqXf6Z1hRw/exec', data);
        
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).send('Error submitting form');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
