const owApiKeyName = "OPENWEATHER_API_KEY";

var readEnvironment = function (name) {
  if (typeof process !== "undefined" && process.env[name]) {
    // Process is undefined in the Electron app.
    return process.env[name];
  }
  console.log("Unable to find " + name + " in environment. Functionality may be missing.");
};

var config = {
  address: "localhost",
  port: 8080,
  ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
  language: "en",
  timeFormat: 24,
  units: "imperial",

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
