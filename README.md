
# swapcard-challenge
Little demonstration of react-redux-express with SSR 

# Context
This application is part of a 1 week technical challenge for an internship interview.  
This repository is a as of today representation of my web development knowledge. (May 2018)

# Get started  

1. Install dependencies

```npm i``` 

 2. Provide credentials
 This application use the [client credential flow authorization](https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow) from Spotify API.
 In order to access service, you can either : 
  
Add a .env file at the root of the repository with 
```
CLIENT_ID=<your client id>
CLIENT_SECRET=<your client secret>
```
or 

load it within the environnement at start
```
CLIENT_ID=<your client id> CLIENT_SECRET=<your client secret> npm start
```
See [the Spotify developer guide](https://beta.developer.spotify.com/dashboard/applications) for your crendentials.

 3. Start the application

```npm start``` 
and open http://localhost:3000 on your browser

# License
MIT