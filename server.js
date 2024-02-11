const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Replace clientID and clientSecret with your clientID and clientSecret from spotify developer API
const clientId = 'Client ID Here';
const clientSecret = 'Client Secret Here';
const redirectUri = 'http://localhost:3000/callback';

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Route to serve the main page ('index.html') at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    const scope = 'user-read-currently-playing';
    res.redirect(`https://accounts.spotify.com/authorize?${qs.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
    })}`);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    if (code) {
        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
                }
            });

            req.session.accessToken = response.data.access_token;
            res.redirect('/visualizer.html');
        } catch (error) {
            res.send(`Error getting access token: ${error.message}`);
        }
    } else {
        res.send('Authorization code not found');
    }
});

app.get('/current-track', async (req, res) => {
    if (!req.session.accessToken) {
        return res.status(401).send('Access Token is missing');
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${req.session.accessToken}`
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
