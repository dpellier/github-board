
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const githubApi = require('./github');

require('dotenv').config({path: path.join(__dirname, '/.env')});

if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_SECRET){
	throw 'Make sure you have AUTH0_CLIENT_ID and AUTH0_SECRET in your .env file'
}

app.use(bodyParser.json());
app.use(cors());

app.get('/api/:userId/repositories/:organization/', (req, res) => {
    githubApi.getRepositories(req.params.organization, req.params.userId)
        .then((repositories) => {
            res.status(200).json(repositories);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.get('/api/:userId/organizations/', (req, res) => {
    githubApi.getOrganizations(req.params.userId)
        .then((organizations) => {
            res.status(200).json(organizations);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.post('/api/:userId/repository', (req, res) => {
    githubApi.getRepository(req.body.url, req.params.userId)
        .then((repository) => {
            res.status(200).json(repository);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.post('/api/:userId/repository/pulls', (req, res) => {
    githubApi.getPulls(req.body.url, req.params.userId)
        .then((pulls) => {
            res.status(200).json(pulls);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.post('/api/:userId/repository/pulls/review-status', (req, res) => {
    githubApi.getReviewStatus(req.body.url, req.params.userId)
        .then((status) => {
            res.status(200).send(status);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.get('/api/:userId/logout', (req, res) => {
    githubApi.removeToken(req.params.userId);
    res.status(200).send();
});

app.listen(3001);
console.log('Server started');
