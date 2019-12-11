# Issue-Tracker
Simple Issue Tracker done with [Riot v3](https://v3.riotjs.now.sh/)

![Demo of Issue Tracker](https://media.giphy.com/media/if3rr9Z8AmkHS4UEzX/giphy.gif)

## Demo on Heroku
http://issue-tracker-reloaded.herokuapp.com/

## Implementation
This Issue Tracker is a simple single page application and has been created during my studies at the ZHAW School of Engineering.

The demo on Heroku was integrated with a simple NodeJS web server and uses a predefined [RESTful API](http://zhaw-issue-tracker-api.herokuapp.com/swagger-ui/index.html) provided by the school.
Styling has been realized using the [Bootstrap](https://getbootstrap.com/) Framework and a little bit of JQuery for the Datepicker. Logic of the app was build with JavaScript and the [Riot v3](https://v3.riotjs.now.sh/) Framework with data persisting to localStorage and on the demo also to the backend using the Promise-based HTTP Client [Axios](https://github.com/axios/axios).

## Functionality
You can choose between a light theme and a dark theme :)
![Issue Tracker with both themes](https://github.com/Beomar97/Issue-Tracker/blob/master/docs/Issue%20Tracker%20both%20themes.png)
You can create projects and then issues belonging to the specific project. Projects and issues can also of course be deleted or altered. All changes are persisted into the back end and are reloaded when refreshing the page (except by deleting your localStorage for the page).
