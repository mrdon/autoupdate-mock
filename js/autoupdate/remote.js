/**
 */

/*exports.getPlugin = function(pluginKey) {
  var lastModified = new Date();
  lastModified.setHours(-3);
  return {
    key : pluginKey,
    name : pluginKey + " Plugin",
    autoupdateEnabled : true,
    lastModified : lastModified,
    repositories : [
      {
        url : 'http://maven.atlassian.com/public',
        selected : false,
        name : "Atlassian Public"
      },
      {
        url : 'http://maven.atlassian.com/public-snapshot',
        selected : true,
        name : "Atlassian Public Snapshot"
      }],
    frequencies : [
      {
        label : '1 hour',
        value : 1,
        selected : false
      },
      {
        label : '6 hours',
        value : 6,
        selected : true
      },
      {
        label : '1 day',
        value : 24,
        selected : false
      }
    ]
  };
};
*/
var $ = require('speakeasy/jquery').jQuery;

function processData(data) {
  data.autoupdateEnabled = data.settings.enabled;
  $.each(data.repositories, function() {
    if (data.settings.repository == this.url) {
      this.selected = true;
      data.repository = this;
    }
  });
  $.each(data.frequencies, function() {
    if (data.settings.frequency == this.hours) {
      this.selected = true;
      data.frequency = this;
    }
  });
  data.lastModified = new Date(data.lastModified);
  return data;
}
function getPlugin(pluginKey, callback) {
  $.ajax({
    url: "../../rest/autoupdate/1/plugin/" + pluginKey,
    type: 'GET',
    success: function(data) {

      callback(processData(data));
    },
    error: function(data) {
        console.log("unable to retrieve plugin data", data.responseText);
    }
  });
}
exports.getPlugin = getPlugin;
exports.saveSettings = function(pluginKey, params, success, failure) {
    $.ajax({
      url: "../../rest/autoupdate/1/settings/" + pluginKey,
      type: 'PUT',
      contentType: "application/json",
      processData : false,
      data: JSON.stringify(params),
      success: function(data) {
        success(processData(data));
      },
      error: function(data) {
          failure(data.responseText);
      }
    });
};