
const Q = require('q');
const rp = require('request-promise');
const tokenProvider = require('./token');

const tokens = {};
const REVIEW_STATUS = {
    approved: 'APPROVED',
    none: 'NONE',
    rejected: 'CHANGES_REQUESTED'
};

function getRepositories(organization, userId) {
    return tokenize('https://api.github.com/orgs/' + organization + '/repos', userId).then((url) => {
        const currentPage = 1;

        return _getRepositories(url, currentPage, true).then((response) => {
            const lastPage = getLastPage(response.headers.link);
            const repositories = response.body;

            if (lastPage === currentPage) {
                return repositories;
            }

            const promises = [];

            for (let i = currentPage + 1; i <= lastPage; i++) {
                promises.push(_getRepositories(url, i, false));
            }

            return Q.all(promises).then((repoList) => {
                return repoList.reduce((all, repos) => {
                    return all.concat(repos);
                }, repositories);
            });
        });
    });
}

function _getRepositories(url, page, full) {
    var options = {
        method: 'GET',
        uri: `${url}&page=${page}&per_page=100`,
        headers: {
            'User-Agent': 'github-board'
        },
        json: true,
        resolveWithFullResponse: full
    };

    return rp(options);
}

function getOrganizations(userId) {
    return tokenize('https://api.github.com/user/orgs', userId).then((url) => {
        var options = {
            method: 'GET',
            uri: url,
            headers: {
                'User-Agent': 'github-board'
            },
            json: true
        };
        return rp(options);
    });
}

function getRepository(repoUrl, userId) {
    return tokenize(repoUrl, userId).then((url) => {
        var options = {
            method: 'GET',
            uri: url,
            headers: {
                'User-Agent': 'github-board'
            },
            json: true
        };

        return rp(options);
    });
}

function getPulls(repoUrl, userId) {
    return tokenize(`${repoUrl}/pulls`, userId).then((url) => {
        var options = {
            method: 'GET',
            uri: url,
            headers: {
                'User-Agent': 'github-board'
            },
            json: true
        };

        return rp(options);
    });
}

function getReviewStatus(pullUrl, userId) {
    return tokenize(`${pullUrl}/reviews`, userId).then((url) => {
        var options = {
            method: 'GET',
            uri: url,
            headers: {
                'Accept': 'application/vnd.github.black-cat-preview+json',
                'User-Agent': 'github-board'
            },
            json: true
        };

        return rp(options).then((reviews) => {
            return reviews.reduce((status, review) => {
                if (status === REVIEW_STATUS.rejected || review.state === REVIEW_STATUS.rejected) {
                    return REVIEW_STATUS.rejected;
                }

                if (review.state === REVIEW_STATUS.approved) {
                    return REVIEW_STATUS.approved;
                }

                return REVIEW_STATUS.none;
            }, REVIEW_STATUS.none)
        });
    });
}

function removeToken(userId) {
    delete tokens[userId];
}

module.exports = {getRepositories, getOrganizations, getRepository, getPulls, removeToken, getReviewStatus};

function tokenize(url, userId) {
    if (tokens[userId]) {
        return Q(`${url}?access_token=${tokens[userId]}`);
    }

    return tokenProvider.getAuth0AccessToken().then((auth0Token) => {
        return tokenProvider.getGitHubAccessToken(userId, auth0Token).then((ghToken) => {
            tokens[userId] = ghToken;
            return `${url}?access_token=${ghToken}`;
        });
    });
}

function getLastPage(links) {
    const split = links.split(',');

    const last = split.findIndex((link) => {
        return link.indexOf('rel="last"') > -1;
    });

    const pageAttr = split[last].match(/&page=\d+/)[0];
    return pageAttr.substring(pageAttr.indexOf('=') + 1)
}
