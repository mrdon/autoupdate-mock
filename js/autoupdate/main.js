/**
 * The main module
 *
 * @context atl.admin
 */
var $ = require('speakeasy/jquery').jQuery;
var dialogTemplate = require('./dialog');
var remote = require('./remote');
var prettyDate = require('./date').prettyDate;

function validateDialog(dialog) {
  return true;
}

function savePluginSettings(plugin, callback) {

  remote.saveSettings(plugin.key, {
    enabled : $('#autoupdate-enabled').is(':checked'),
    repository : $('#autoupdate-repository').val(),
    frequency : $('#autoupdate-frequency').val()
  }, callback, function(err) { alert("ERROR: " + err);});
}

function showPluginDialog(row) {
  var plugin = $.data(row, 'autoupdate');
  var dialog = new AJS.Dialog({width:470, height:400, id:'autoupdate-dialog'});
  dialog.addHeader("Auto Update Settings");
  dialog.addPanel("Details", dialogTemplate.render(plugin));
  dialog.addButton("Save", function (dialog) {
      if (validateDialog(dialog)) {
        savePluginSettings(plugin, function(plugin) {
          $.data(row, 'autoupdate', plugin);
          addRepositoryInfo(row, plugin);
          dialog.remove();
        });
      }
  }, "autoupdate-submit");
  dialog.addButton("Cancel", function (dialog) {
      dialog.remove();
  }, "autoupdate-cancel");

  var toggleSettingsFunc = function(enabledBox) {
    if (enabledBox.is(':checked')) {
      $('#autoupdate-settings').removeClass('hidden');
    } else {
      $('#autoupdate-settings').addClass('hidden');
    }
  };

  var enabledBox = $('#autoupdate-enabled');
  toggleSettingsFunc(enabledBox);
  $('#autoupdate-enabled').change(function() {toggleSettingsFunc(enabledBox);});
  dialog.show();
}

function addAutoUpdateButton(row, plugin) {
  $('<button id="autoupdate-' + plugin.key + '">Auto Update</button>')
    .appendTo('.upm-plugin-actions', row)
    .click(function(e) {
      e.preventDefault();
      showPluginDialog(row);
    });
}

function addRepositoryInfo(row, plugin) {
  var list = $('.upm-details dl', row);
  $('.autoupdate-added', list).remove();
  if (plugin.autoupdateEnabled) {
    list.append('<dt class="autoupdate-added">Auto Update Repository:</dt>');
    list.append('<dd class="autoupdate-added autoupdate-repository">Auto updated every ' + plugin.frequency.label + ' from ' + plugin.repository.name + '</dd>');
    list.append('<dt class="autoupdate-added">Last Updated:</dt>');
    list.append('<dd class="autoupdate-added autoupdate-lastmodified">' + prettyDate(plugin.lastModified) + '</dd>');
  }
}

$(document).ready(function() {
  console.log('autoupdate loaded');
  $('#upm-panel-manage').bind('pluginLoaded', function(e) {
    console.log('pluginLoaded');
    var row = $(e.target).closest('div.upm-plugin');
    var selfLink = $('.upm-plugin-link-self', row).val();
    if (selfLink) {
      var key = selfLink.replace(
        /.*\/rest\/plugins\/1.0\/(.*)-key/, "$1");
      var plugin = remote.getPlugin(key, function(plugin) {
        $.data(row, 'autoupdate', plugin);
        addAutoUpdateButton(row, plugin);
        addRepositoryInfo(row, plugin);
      });
    }
  });
});
