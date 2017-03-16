
import Q from 'q';
//import React from 'react';
import Reflux from 'reflux';
import $http from 'nanoajax';
import RepositoryActions from '../actions/repository.js';
import AuthService from '../auth/AuthService.js';

class RepositoryStore extends Reflux.Store {
	constructor() {
		super();
        this.state = {organizations: [], loading: false};
		this.listenables = RepositoryActions;
        this.profile = AuthService.getProfile();
	}

	onFetch() {
        this.setState({organizations: this.state.organizations, loading: true});
        this.trigger(this.state);

        //TODO add personal repo
        $http.ajax({
            url: `${__API_URL__}${this.profile.user_id}/organizations`
        }, (code, response) => {
            const organizations = JSON.parse(response);

            const promises = Q.all(organizations.map((organization) => {
                const deferred = Q.defer();

                $http.ajax({
                    url: `${__API_URL__}${AuthService.getProfile().user_id}/repositories/${organization.login}`
                }, (code, response) => {
                    organization.repositories = JSON.parse(response);
                    deferred.resolve();
                });

                return deferred.promise;
            }));

            promises.then(() => {
                this.setState({organizations: organizations, loading: false});
                this.trigger(this.state);
            });
        });
	}
}

export default RepositoryStore;
