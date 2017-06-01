
# Missing Children Society of Canada

## Description

This project is to capture users who want to register with the system. Registration is done by authenticating against 3rd party social media providers; such as Twitter, Instagram and Facebook.

## Getting Ready For Development
### Prerequisites
You need the following items installed in order to work on this application
- <a href="https://nodejs.org/en/">Node.js</a>
- <a href="https://nodejs.org/en/">npm</a> (Comes packaged with every node installation)
- <a href="https://www.mongodb.com/download-center?jmp=nav#community">MongoDB</a>

### Setting up the Application
Create a fork of this repository on GitHub to your account. 

Clone the fork on your machine

Open up your console and start mongodb
```shell
mongod
```
Change your directory to the root of the project if you haven't done so and install all the node modules.
```shell
cd C:/project/directory/here
npm install
```

### Running the Application
We need to set the environment variable MONGO_DB to the url of the mongo database you want to use. This will differ for Windows and Linux/Mac users

Linux/Mac
```shell 
MONGO_DB=mongodb://url-to-your-database:port
```

Windows
```shell 
set MONGO_DB=mongodb://url-to-your-database:port
```

Double-check if the variable has been set by outputting the variable

Linux/Mac
```shell 
echo $MONGO_DB
```

Windows
```shell 
echo %MONGO_DB%
```

After we confirm MONGO_DB has the correct value we can run the application
```shell
node server.js
```
Congrats the app is now running at <a href="http://localhost:8080">http://localhost:8080</a> 

To make our lives easier during development, install nodemon for automatic restart of the node server.

```shell
npm install -g nodemon
nodemon server.js
```

### Configuration
* FACEBOOK_CONSUMER_KEY: Consumer Key
* FACEBOOK_CONSUMER_SECRET: Consumer Secret
* FACEBOOK_CALLBACK_URL: Call Back URL
* TWITTER_CONSUMER_KEY: Consumer Key
* TWITTER_CONSUMER_SECRET: Consumer Secret
* TWITTER_CALLBACK_URL: Call Back URL
* INSTAGRAM_CONSUMER_KEY: Consumer Key
* INSTAGRAM_CONSUMER_SECRET: Consumer Secret
* INSTAGRAM_CALLBACK_URL: Call Back Url
* INSTAGRAM_REGISTRATION_CALLBACK_URL: Registration Call Back URL
* IG_VERIFY_TOKEN: Instagram Verify Token
* CALLBACK_URL: 
* MONGO_DB: Connection to datastore
* PORT: Port service runs on; default is 8080