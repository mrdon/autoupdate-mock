/**
 */

exports.getPlugin = function(pluginKey, callback) {
  var lastModified = new Date();
  lastModified.setHours(-3);
  callback({
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
  });
};

