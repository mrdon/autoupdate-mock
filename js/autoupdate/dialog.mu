<p>
    Configure the auto update settings for {{name}}
</p>
<form id="autoupdate-form" class="aui" action="#">
    <fieldset>
        <div class="field-group">
            <label for="autoupdate-enabled">Auto Update Enabled</label>
            <input type="checkbox" name="autoupdate-enabled" id="autoupdate-enabled" value="true" {{#autoupdateEnabled}}checked="checked"{{/autoupdateEnabled}} />
        </div>
    </fieldset>
    <fieldset>
        <div class="field-group" id="autoupdate-settings">
            <label for="autoupdate-repository">Repository</label>
            <select name="autoupdate-repository" id="autoupdate-repository">
            {{#repositories}}
                <option value="{{url}}" {{#selected}}selected="selected"{{/selected}}>{{name}}</option>
            {{/repositories}}
            </select>
            <div class="description">The repository to look for new releases</div>
            <label for="autoupdate-frequency">Frequency</label>
            <select name="autoupdate-frequency" id="autoupdate-frequency">
            {{#frequencies}}
                <option value="{{hours}}" {{#selected}}selected="selected"{{/selected}}>{{label}}</option>
            {{/frequencies}}
            </select>
            <div class="description">The frequency in which the auto update will look for new versions</div>
        </div>
    </fieldset>
</form>