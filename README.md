# GitHub board

> Display multiples GitHub repo on one page

> TODO URL deployed

Powered by

<img width="30" height="30" src="http://javascriptismagic.github.io/aui/logos/react.png" /> [React](https://facebook.github.io/react/) with [Reflux](https://github.com/reflux/refluxjs)

<img width="30" height="30" src="https://pbs.twimg.com/profile_images/718515839687741440/dGvlzORH.jpg" /> [Auth0](https://auth0.com/)

## How to run your own

### Installation

```
git clone https://github.com/dpellier/github-board
cd github-board
npm install
```

### OAuth configuration

Do not commit the following files in a public repo !

#### Login configuration

In order to allow user to connect with their GitHub account you have to create a SINGLE PAGE APPLICATION auth0 client.

Then create a `.env` file at the root of the project

```
AUTH0_CLIENT_ID=<generated auth0 spa client ID>
AUTH0_DOMAIN=<auth0 client domain>
API_URL=<your local api url>
```

#### Identity Provider configuration

In order to allow the app to discuss with the GitHub API you have to create a NON INTERACTIVE auth0 client.

Then create a `.env` file inside the `server` directory.

```
AUTH0_CLIENT_ID=<generated auth0 non interactive client ID>
AUTH0_SECRET=<generated auth0 non interactive client secret>
```
