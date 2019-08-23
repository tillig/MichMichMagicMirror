const owApiKeyName = "OPENWEATHER_API_KEY";
var remote = null;
if (typeof window !== "undefined") {
  remote = window.require("electron").remote;
}

var readEnvironment = function (name) {
  if (typeof process !== "undefined" && process.env[name]) {
    // process is undefined in the Electron app.
    return process.env[name];
  }
  if (remote && remote.process.env[name]) {
    // remote is null if the Electron nodeIntegration value isn't set to true.
    return remote.process.env[name];
  }
};

var config = {
  address: "localhost",
  port: 8080,
  ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
  language: "en",
  timeFormat: 24,
  units: "imperial",

  electronOptions: {
    webPreferences: {
      nodeIntegration: true
    }
  },

  modules: [
    {
      module: "alert"
    },
    {
      module: "updatenotification",
      position: "top_bar"
    },
    {
      module: "clock",
      position: "top_left"
    },
    {
      module: "calendar",
      header: "US Holidays",
      position: "top_left",
      config: {
        calendars: [{
          symbol: "calendar-check",
          url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
        }]
      }
    },
    {
      module: "compliments",
      position: "lower_third"
    },
    {
      // ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
      module: "currentweather",
      position: "top_right",
      config: {
        location: "Hillsboro",
        locationID: "5731371",
        appid: readEnvironment(owApiKeyName)
      }
    },
    {
      // ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
      module: "weatherforecast",
      position: "top_right",
      header: "Weather Forecast",
      config: {
        location: "Hillsboro",
        locationID: "5731371",
        appid: readEnvironment(owApiKeyName),
        forecastEndpoint: "forecast"
      }
    },
    {
      module: "newsfeed",
      position: "bottom_bar",
      config: {
        feeds: [{
          title: "New York Times",
          url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
        }],
        showSourceTitle: true,
        showPublishDate: true,
        broadcastNewsFeeds: true,
        broadcastNewsUpdates: true
      }
    }
  ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = config;
}
