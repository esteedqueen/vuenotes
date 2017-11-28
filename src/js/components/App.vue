<template>
  <body>
    <div class="notes">
      <div class="row">
          <div class="column column-20 sidebar">
          <h5>
            <a href="#" v-on:click="addNote"> + </a>
            <ul>
              <li v-for="note in notes" :key="note.id" class="{ active: note=== selected}" v-on:click="selectNote(note)">
                {{ note.body }}
              </li>
            </ul>
          </h5>
          </div>
          <div class="column column-80" style="position:relative;">
            <textarea v-if="selected" v-model="selected.body" placeholder="Edit me">
            </textarea>
          </div>        
      </div>
      
    </div>
  </body>
</template>

<script>
// requiring milligram framework styles
require('milligram');

export default {
  data: () => {
    return {
      notes: [],
      selected: undefined
    };
  },
  methods: { addNote, selectNote },
  mounted: function() {
    const vm = this;
    loadNotes(this);

    this.$watch(
      watchable.bind(this),
      onChange.bind(this),
      { deep: true }
    );
  }  
};

const SKEY = 'ZENOTES';

function selectNote(note) {
  if (note === this.selected) return;
  this.selected = note;
}

function addNote() {
  const note = { id: guid(), body: '# ' };
  this.notes.unshift(note);
  this.selectNote(note);
  save(this.notes)
}

function save(notes) {
  if (!notes) return;
  chrome.storage.sync.set({ [SKEY]: notes });
}

function loadNotes(vm) {
  chrome.storage.sync.get(SKEY, ({ [SKEY]: list = [] }) => {
    // Push all notes to our array with ES6 fancy splat syntax
    vm.notes.push(...list);
    // Select most recent note
    vm.selectNote(list[0]);
  });
}

// generate unique IDs
function guid () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function watchable() {
  if (!this.selected) return undefined;
  return { id: this.selected.id, body: this.selected.body }
}

function onChange(val, prev) {
  if (!prev) return;
  save(this.notes)
}
</script>

<style>
  h1 { font-size: 22px; }
</style>