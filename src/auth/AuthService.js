
import Auth0Lock from 'auth0-lock';
import $http from 'nanoajax';
import {isTokenExpired} from './jwtHelper.js'
import {browserHistory} from 'react-router';

export default class AuthService {
	constructor(clientId, domain) {
		this.lock = new Auth0Lock(clientId, domain, {
			auth: {
				redirectUrl: __REDIRECT_URL__,
				responseType: 'token'
			},
            closable: false
		});

		this.lock.on('authenticated', this._doAuthentication.bind(this));
		this.login = this.login.bind(this);

		this.lock.on('authorization_error', function(error) {
			console.log(error);
		});

        this.lock.on('unrecoverable_error', function(error) {
            console.log(error);
        });
	}

	_doAuthentication(authResult) {
        AuthService.setToken(authResult.idToken);
		this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
			if (error) {
				console.error('Error loading the Profile', error);
			} else {
				AuthService.setProfile(profile);
                browserHistory.replace('/home');
			}
		});
	}

	login() {
		this.lock.show();
	}

	static loggedIn() {
		const token = AuthService.getToken();
		return !!token && !isTokenExpired(token)
	}

	static setToken(idToken) {
		localStorage.setItem('id_token', idToken);
	}

	static getToken() {
		return localStorage.getItem('id_token');
	}

	static setProfile(profile){
		localStorage.setItem('profile', JSON.stringify(profile));
	}

	static getProfile(){
		const profile = localStorage.getItem('profile');
		return profile ? JSON.parse(localStorage.profile) : {};
	}

	static logout() {
        $http.ajax({
            url: `${__API_URL__}${AuthService.getProfile().user_id}/logout`
        }, () => {});

		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
	}
}
