#Davon's Weather App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## What it does
The goal of this project is to show you your current local weather and the upcoming 5-day forecast. The
workflow is as follows:
1. User lands on home page.
2. User clicks *Get Forecast* button to get their forecast.
3. We kick off the Browser's Geolocation API to grab the user's current location.
4. We send the lat/lon to two OpenWeatherMap API endpoints.
    * The first to /weather to grab the current weather forecast
    * The second to /forecast to grab the 5-day forecast
5. Upon retrieving both calls, it renders the current weather and the 5-day forecast.
6. User's can click through the days by clicking on the bottom bar with the dates.

## Running the App

### 1. Requirements
You must have the following installed on your host machine for this project to work:
* Node.js

### 2. Installing Dependencies
In the project's root directory, run `npm install` to install the necessary modules.

### 3. Setting Environment Variables
Before running this project, you *must* create a `.env` file in the project's root directory. It should
contain one entry: `REACT_APP_OPEN_WEATHER_API_KEY=REPLACE_WITH_YOUR_API_KEY`. This is to avoid exposing
your API Key in a public repository.

### 4. Running the App
In the project's root directory, run `npm run start`. You should see the local development running
on http://localhost:3000.

### 5. Testing the App
In the project's root directory, run `npm run test`. This will run the Jest test suite.

## Caveats and Thoughts

1. Ideally, with more time, I'd like to move the 5-day Forecast Chart out of the Forecast component. This
would be for easier testing (runs on canvas) and it would make more sense to separate out since it could
be rendered in more places than just the Forecast section of the app. Furthermore, you'll see that the
testing actually passes, but it `console.error`s with a Chart.js error, since we aren't correctly mocking
the canvas.

2. With more time, I'd handle the DateTime discrepancies. Upon finishing most of the functionality of the app, I realized that the
dates I've received from OpenWeatherMap are in UTC, which is a problem for local weather, as it messes
up how times are rendered. That's why on the Chart you'll see that it actually starts at 8PM EST (or 12AM UTC).
Even though I can handle this semi-easily on the frontend, ideally I'd be able to get the correct forecast starting at 12:00AM EST,
not 12:00AM UTC. I couldn't find this on OpenWeatherMap's API call but maybe it's buried somewhere in the docs. Instead,
they provide the timezone offset.
