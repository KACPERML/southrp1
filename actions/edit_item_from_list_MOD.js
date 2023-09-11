module.exports = {
  name: 'Edit Item from List MOD',
  displayName: 'Edit Item from List',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.7',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/edit_item_from_list_MOD.js',
  },

  subtitle(data) {
    return `Edit "${data.value}" at position ${data.position}`;
  },

  fields: ['storage', 'varName', 'position', 'value'],

  html() {
    return `
<div>
  <store-in-variable dropdownLabel="Source List" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
</div>
<br><br><br>

<div>
  <div style="float: left; width: 39%;">
    <span class="dbminputlabel">Position</span>
    <input id="position" class="round" type="text"><br>
  </div>
  <div style="padding-left: 8px; float: left; width: 61%;">
    <span class="dbminputlabel">Value</span>
    <input id="value" class="round" type="text">
  </div>
</div>`;
  },

  init() {
    const { glob, document } = this;
    glob.refreshVariableList(document.getElementById('storage'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const list = this.getVariable(storage, varName, cache);
    const position = parseInt(this.evalMessage(data.position, cache), 10);
    const val = this.evalMessage(data.value, cache);

    if (list.length > position) list[position] = val;

    this.callNextAction(cache);
  },

  mod() {},
};
