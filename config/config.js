﻿
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
      module: "currentweather",
      position: "top_right",
      config: {
        location: "Hillsboro",
        locationID: "5731371", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        appid: "OPENWEATHER_API_KEY"
      }
    },
    {
      module: "weatherforecast",
      position: "top_right",
      header: "Weather Forecast",
      config: {
        location: "Hillsboro",
        locationID: "5731371", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
        appid: "OPENWEATHER_API_KEY"
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

// Replace the environment secrets - this doesn't seem to work if
// you just call it inline in the JSON.
if (!process.env.OPENWEATHER_API_KEY) {
  console.log("You must define the OPENWEATHER_API_KEY for weather support.");
} else {
  var owApiKey = process.env.OPENWEATHER_API_KEY;
  console.log("Updating modules that require the OPENWEATHER_API_KEY.");
  config.modules.forEach(function (mmModule) {
    if (mmModule.config && mmModule.config.appid == "OPENWEATHER_API_KEY") {
      console.log("- " + mmModule.module);
      mmModule.config.appid = owApiKey;
    }
  });
}

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = config;
}
