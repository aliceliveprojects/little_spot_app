# little_spot_app
A simple (read: thrown-together) ionic + cordova app which builds on [little_list](https://github.com/AliceDigitalLabs/little_list).
It interfaces to the spotify API. 

To use, you must have: 

* [Spotify Developer Account](https://developer.spotify.com/dashboard/)

Optionally:
* [Heroku account](https://www.heroku.com/)

You will need to deploy an extra server. The server is used as part of the authentication process, and keeps the CLIENT SECRET of your Spotify account safe. You can find a deployable example [here](https://github.com/aliceliveprojects/little_spot_authentication_server), which you can deploy on Heroku, or locally.

Please note: You can't play toons with this app! To do this, you will need the following plugin: [cordova-spotify](https://festify.github.io/cordova-spotify/)

This project comprises 3 modules: spotifyjs, mainjs and authenticatejs

**spotifyjs** provides the communications service for getting basic information from the Spotify API  
**mainjs** provides list, update and detail states  
**authenticatejs** provides authenticate_intro and authenticate_secure states  

mainjs:list comes first and presents you with an input box in the header, and an authenticate button in the footer.

The Authenticate button takes you to a Spotify login.  The access token from the login is stored in local storage and is available from the authenticateSrvc.getAuthInfo() at any point afterward. 

Once back to the mains:list state again, the input box can be used to type a term. Currently, it's interpreted as being an artist name, but use the [Spotify API docs](https://developer.spotify.com/documentation/web-api/reference/search/search/) to improve as you like. 

Data is fetched when the input box submits (hit return when you're typing)

If anything is found from the search, it is listed.

Pressing on an itemin the list view will do a fetch on that specific item, and go to the detail view.

The app is the barest of bones as we just needed it quickly - but it works, and shows how easily the list-detail paradigm of Ionic can be  purposed.

Also shows how we can simply add new states and modules and move between them.

Note: Authorised staff can find test credentials [here](https://github.com/CMDT/DigitalLabs_TeachingProjects/tree/master/docs/accounts/alice/spotify)

## Quick Start

1. Obtain a Spotify client id
2. Deploy the little_spotify_authentication_server, locally, or on Heroku
3. Edit the file /www/js/app_specific/authenticate/credentials.service.js
4. ionic cordova platform add android@6.3.0
5. ionic cordova run android

### Notes

1. gulpfile.js is missing. Download from https://github.com/ionic-team/ionic-app-base/blob/master/gulpfile.js place the gulpfile.js in the top level of the ionic project

#### Getting this working in MMU Student Windows 10

You will find most of the apps needed to get this app to build and install on an android phone, but the OS set-up is a little idiosyncratic!

Android Studio and Android SDK 26 are already installed
MS VS Code is installed
npm and node are installed.

You will need to do the following, from the command line. Note: this is cmd.exe **not** powershell, or anything else.
* Install cordova

```
npm install -g cordova
```

* Install ionic
```
npm install -g ionic@3.20.0
```

Note: The latest version (4.3) of the Ionic CLI contains a breaking change. Make sure you use the above version: 3.20.0


* check your installation:

For ionic:  

```
ionic -v
```

For cordova: 
```
cordova -v
```

... you may get a complaint that windows can't find ionic. This is largely due to the way that the OS has been set up with roaming profiles, so that you can use many machines if you need to.

if this happens, it means that you must put npm in your PATH

* add the following to you user-environment variable, PATH:
```
C:\Users\<your windows login number>\AppData\Roaming\npm
```
What's a user environment variable? ([Windows](https://www.computerhope.com/issues/ch000549.htm))


When you can successfully run ionic, you're on to trying a build!  

* Add the android platform to your project.
 * in the top-level of the project (where you can see config.xml) use the following command:

```
ionic cordova platform add android
```

* Adding the platform should go OK.


* Check you have a gulpfile.js in the top level of your project. If not, download it from https://github.com/ionic-team/ionic-app-base/blob/master/gulpfile.js  

* Check that you have Gradle installed.
```
gradle -v
```
We're running version 4.10

* If Gradle is not installed, go to https://gradle.org/install/
 * Download the zip file. DON'T use a package manager!
 * Create a folder in which to put Gradle: 
 ```
 H:\Documents\Gradle
 ```
 * Extract the contents of the .zip file here.
 * Note that you just installed the tool on your shared drive. This means you'll be able to build when you use another machine.
 * You now need to add the location of the Gradle binaries to your PATH environmnent variable:

 For example:
 ```
 H:\Documents\Gradle\gradle-4.10.2\bin
 ```


* you will need to add the ionic v1 toolkit  package to the ionic CLI:
(little_list is an ionic v1 project (yes, we're still using ionic v1 and angularjs. BECAUSE.))
* also note, we're using v1.0.22 of the toolkit

```
npm i -D @ionic/v1-toolkit@1.0.22
```


* Now you're ready to try a build:

```
ionic cordova build android
```

This should create an android .apk file for you, in the little_list\code\little_list\platforms\android\app\build\outputs\apk\debug

* Android Studio is installed, but you will need to put the tools in your PATH before you can deploy to a phone.

```
C:\AndroidSDK\platform-tools
```

* connect up your android phone to your PC, using a USB cable. Make sure the device is ready to accept your deployed app:
 * You will need to do that special ['thing'](https://www.digitaltrends.com/mobile/how-to-get-developer-options-on-android/) to get 'Developer Options' available.
 * In developer options, enable USB debugging.
* check that your device is available
```
adb devices
```

* you should see an entry for your device.

* Now give it a try:


```
ionic cordova run android
```


* Hey, presto! the app is now on your device. You can step through it using VSCode, too. But you will need Cordova Tools installed. Make sure you 'attach to running app'.






