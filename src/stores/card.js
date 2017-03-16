
import Q from 'q';
//import React from 'react';
import Reflux from 'reflux';
import $http from 'nanoajax';
import CardActions from '../actions/card.js';
import Card from './models/Card.js';
import AuthService from '../auth/AuthService.js';

const localStorageKey = 'github-board-cards';

class CardStore extends Reflux.Store {
	constructor() {
		super();
		this.listenables = CardActions;

        const savedCards = JSON.parse(localStorage.getItem(localStorageKey));
        this.state = {cards: savedCards || []};
	}

    onAdd(repository) {
        const newCard = new Card();

        this.setState({cards: this.state.cards.concat([newCard])});
        this.trigger(this.state);

        fetch(newCard, repository.url).then(() => {
            this.setState({cards: this.state.cards});
            this.trigger(this.state);

            localStorage.setItem(localStorageKey, JSON.stringify(this.state.cards));
        });
    }

    onRefresh(card) {
        const newCard = new Card();

        this.state.cards = this.state.cards.map((currentCard) => {
            if (currentCard.id === card.id) {
                return newCard;
            }
            return currentCard;
        });

        this.setState({cards: this.state.cards});
        this.trigger(this.state);

        fetch(newCard, card.url).then(() => {
            this.setState({cards: this.state.cards});
            this.trigger(this.state);

            localStorage.setItem(localStorageKey, JSON.stringify(this.state.cards));
        });
    }

    onRemove(repository) {
        this.setState({
            cards: this.state.cards.filter((card) => {
                return card.id !== repository.id;
            })
        });

        localStorage.setItem(localStorageKey, JSON.stringify(this.state.cards));
    }
}

export default CardStore;

function fetch(newCard, url) {
    return getRepository(url)
        .then((card) => {
            newCard.id = card.id;
            newCard.name = card.name;
            newCard.private = card.private;
            newCard.url = url;

            return getPullRequests(url);
        })
        .then((pullRequests) => {
            newCard.pullRequests = pullRequests;

            return Q.all(newCard.pullRequests.map((pullRequest) => {
                return getPullRequestStatus(pullRequest).then((status) => {
                    return pullRequest.status = status;
                });
            }));
        });
}

function getRepository(url) {
    const deferred = Q.defer();

    $http.ajax({
        url: `${__API_URL__}${AuthService.getProfile().user_id}/repository/`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url
        })
    }, (code, card) => {
        deferred.resolve(JSON.parse(card));
    });

    return deferred.promise;
}

function getPullRequests(url) {
    const deferred = Q.defer();

    $http.ajax({
        url: `${__API_URL__}${AuthService.getProfile().user_id}/repository/pulls`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url
        })
    }, (code, pullRequests) => {
        deferred.resolve(JSON.parse(pullRequests) || []);
    });

    return deferred.promise;
}

function getPullRequestStatus(pullRequest) {
    const deferred = Q.defer();

    $http.ajax({
        url: `${__API_URL__}${AuthService.getProfile().user_id}/repository/pulls/review-status`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: pullRequest.url
        })
    }, (code, status) => {
        deferred.resolve(status);
    });

    return deferred.promise;
}
