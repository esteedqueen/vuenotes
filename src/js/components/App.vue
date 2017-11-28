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
  methods: { addNote, selectNote }
};


function selectNote(note) {
  if (note === this.selected) return;
  this.selected = note;
}

function addNote() {
  const note = { id: guid(), body: '# ' };
  this.notes.unshift(note);
  this.selectNote(note);
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
</script>

<style>
  h1 { font-size: 22px; }
</style>