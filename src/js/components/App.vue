<template>
  <body>
    <div class="notes">
      <div class="row">
          <div class="column column-40 sidebar">
          <h5>
            <a href="#" v-on:click="addNote"> + </a>
            <ul>
              <li v-for="note in notes">
                <span :key="note.id" class="{ active: note=== selected}" v-on:click="selectNote(note)">
                  {{ note.body }}
                </span>
                <span><a href="#" v-on:click="removeNote(note)"> x </a></span>
              </li>
            </ul>
          </h5>
          </div>
          <div class="column column-60" style="position:relative;">
            <transition name="fade" appear>
              <editor v-if="selected" v-model="selected.body" :key="selected.id">
              </editor>
            </transition>
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
  methods: { addNote, selectNote, removeNote },
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

function removeNote(note) {
  // filter to remove deleted note
  this.notes = this.notes.filter(e => e !== note);
  // overwrite the notes array in chrome storage with remaining notes
  chrome.storage.sync.set({ [SKEY]: this.notes });
  // Select most recent note
  this.selectNote(this.notes[0]);
}

</script>

<style>
.note-area {
  padding-left: 20px;
  position: absolute;
  width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-in, transform .2s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

li{
  -webkit-column-count: 3;
     -moz-column-count: 3;
          column-count: 3;
  -webkit-column-gap: 5px;
     -moz-column-gap: 5px;
          column-gap: 5px;  
}
</style>
