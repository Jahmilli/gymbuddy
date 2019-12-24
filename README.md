# GymBuddy

## Running the Application

Dependencies are managed via [Yarn](https://yarnpkg.com/en/)

To install dependencies, run: `yarn`

To run the application on Android, run: `yarn run android`

To run the application on IOS, run: `yarn run ios`

## Workarounds for Existing Problems
Currently, accessing the server by passing in IP address of computer the server is running on for local development. This was easiest for now but for running on other computers either the fetch requests need to be updated, or a fix needs to be made to not rely on IP address.