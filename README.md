# Little_spot_app

### Basic Overview 

#### A simple ionic + cordova app which builds on [little_list](https://github.com/AliceDigitalLabs/little_list).

Little Spot App is a *JAM Stack* application created to demonstrate how Ionic V1 and Cordova can be used to create a cross - platform mobile app and how spotify authentication can be achieved on a mobile device.

Little Spot App works as a cross-platform mobile application that connects to the Spotify Web API.

Little Spot App lets you do three things:

1. Request a Spotify **access token**.
2. Request a Spotify **refresh token** when previous session has expires.
3. **Search**, **view** and **stream** ( with the use of this plugin: [cordova-spotify](https://festify.github.io/cordova-spotify/) ) a selected song.

### Requirements

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](<https://nodejs.org/en/about/>)
- [NPM](<https://docs.npmjs.com/about-npm/>)
- [Spotify Developer Account](https://developer.spotify.com/dashboard/)(Client ID and Client Secret)
- [Ionic](<https://ionicframework.com/docs/v1/>)
- [Gradle](<https://gradle.org/install/>)
- [Android Studio](<https://developer.android.com/studio>)
- [Server](https://github.com/aliceliveprojects/little_spot_authentication_server)
- [Heroku Account](https://www.heroku.com/)(Optional)

### Getting Started

#### Creating Developer Account and Registering Application

1. Navigate to [Spotfiy Developer Dashboard](<https://developer.spotify.com/dashboard/>)
2. Login if you already have a Spotify account; this will add developer credentials to it. Alternatively sign up to create a developer account.
3. Once authenticated, you will be redirected to the dashboard and see a button labeled '**CREATE A CLIENT ID**' click this.
4. Clicking that button will cause a modal to pop up titled '**Create An App or Hardware Integration**'
5. This modal wants information about your application such as the name, short description followed by a checklist on the type of application you are creating.
6. Afterwards the modal will pose the question of whether you're developing a commercial integration, the answer to this is dependent on what or who your app is for. Choose non-commercial.
7. Check the three boxes on the terms and conditions then submit to create and register your app.

#### Completing Application Details

1. Once your application has been registered, spotify will display it as a green card, click on that card to view your app's analytics and settings.
2. Clicking your application's card will show your app's analytics which also features your Client ID and Client Secret; take notes of these.
3. Look for the '**Edit settings**' button and click it, this will reveal an edit settings modal form.
4. Find the input for Redirect URIs and add your URL for the for your project to redirect to once the authentication is a success or failure
5. After you have added your Redirect URI, click save.

### Deploying Server Locally

1. Open project with visual studio code.

2. On the sidebar to the left there is an icon that resembles a lady bug click this and it will expand the sidebar revealing the 'Run and Debug' menu,  click the highlighted piece of text - 'create a launch,json file'.

3. Doing so will cause a dropdown to appear; asking what environment you would like to run and debug, choose **node.js**.

   Once you have chosen node.js, you will be brought to the launch.json file.

4. Now is the time to add your environment variables(config vars) what needs to be added can be [found here](https://github.com/aliceliveprojects/little_spot_authentication_server). Ending result will look similar to this: 

   ```
   {
     // Use IntelliSense to learn about possible attributes.
     // Hover to view descriptions of existing attributes.
     // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "launch",
         "name": "Launch Program",
         "skipFiles": [
           "<node_internals>/**"
         ],
         "program": "${workspaceFolder}/index.js",
         "env":{
           "API_DOMAIN":"localhost", //For us it is localhost
           "API_PORT":	"8000",//Port we are using
           "API_SCHEME":"http",
           "SPOTIFY_API_DOMAIN":"accounts.spotify.com",
           "SPOTIFY_API_PATH":"/api/token",
           "SPOTIFY_CLIENT_CALLBACK_URL": "http://localhost/callback.html",
           "SPOTIFY_CLIENT_ID":"GET ME FROM HERE <https://developer.spotify.com/dashboard/>",
   		"SPOTIFY_CLIENT_SECRET":"GET ME FROM HERE <https://developer.spotify.com/dashboard/>",
           "SPOTIFY_ENCRYPTION_SECRET": "Give me your best secret word"// Can be any arbitary string
         }
       }
     ]
   }
   ```

5. It's imperative that you replace the empty string's of "**SPOTIFY_CLIENT_SECRET**", "**SPOTIFY_CLIENT_ID**" with the ones given to you from your Spotify Developer Account then click launch program. 

### Deploying Server With Heroku

1. Navigate to your [Heroku Dashboard](<https://dashboard.heroku.com/apps>) and click the button labeled 'New'
2. Producing two different options; applications and pipelines. Choose application. **Give your application a name > Select your region > Create App**
3. Taking you to the deploy tab of your application this where you deploy via Github, Heroku, more, however choose Github.
4. Choosing Github will link with your organisation and repository of choice. **Type in the repository's name > click search > connect.**
5. Next find the segment of the page titled '**Manual deploy**'. Choose which branch you want to deploy from then click the button '**Deploy Branch**'
6. Afterwards go into your app's '**Settings**' tab and in the '***Config Vars***' segment click the button '**Reveal Config Vars**'
7. You will need to configure your server to work with your Spotify application you can do this by adding the necessary **vars and values** which can be found [here](<https://github.com/aliceliveprojects/little_spot_authentication_server>)
8. Once you have added the necessary configurations find the segment of the page titled '**Buildpacks**' then click the button 'Add buildpack' then search and select '**nodejs**'
9. Finally go back to the '**Deploy**' tab, then scroll to the '*Manual deploy*' segment and click deploy branch one last time.

### Filling in Client Details

For Filling in Client Details see [little_one_drive_app](https://github.com/aliceliveprojects/little_one_drive_app#filling-in-client-details)

Get `exchangeServiceUri:` URL from your servers UI this can be found by adding /docs to the URL given to your server.

### Deployment on Android

For Android deployment see [little_list](<https://github.com/aliceliveprojects/little_list#quick-start>)

### Deployment on iOS

For iOS deployment see [little_one_drive_app](https://github.com/aliceliveprojects/little_one_drive_app#deployment-on-ios)

### License

This project is licensed under the MIT License - see the [LICENSE.md](https://gist.github.com/PurpleBooth/LICENSE.md) file for details
