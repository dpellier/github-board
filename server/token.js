
const rp = require('request-promise');

function getAuth0AccessToken() {
    const options = {
		method: 'POST',
		uri: 'https://dpellier.eu.auth0.com/oauth/token',
		headers: {
			'content-type': 'application/json'
		},
		body: {
			audience: 'https://dpellier.eu.auth0.com/api/v2/',
			'client_id': process.env.AUTH0_CLIENT_ID,
			'client_secret': process.env.AUTH0_SECRET,
			'grant_type': 'client_credentials'
		},
		json: true
	};

	return rp(options)
		.then((body) => {
			return body.access_token;
		})
		.catch((error) => {
			throw new Error(error);
		});
}

function getGitHubAccessToken(userId, auth0Token) {
    const options = {
		method: 'GET',
        uri: 'https://dpellier.eu.auth0.com/api/v2/users/' + userId,
		headers: {
			Authorization: 'Bearer ' + auth0Token,
			'content-type': 'application/json'
		},
        json: true
	};

	return rp(options)
		.then((body) => {
			return body.identities[0].access_token;
		})
		.catch((error) => {
			throw new Error(error);
		});
}

module.exports = {getAuth0AccessToken, getGitHubAccessToken};
