<template lang="pug">
  body
    .notes.row
      .column.column-20.sidebar
        h5
          a(href='#' @click="addNote") +
        ul
          li(v-for="note in notes" :key="note.id" :class='{ active: note === selected }' @click="selectNote(note)") {{ note.body }}
      .column.column-80(style='position: relative')
        textarea(v-if='selected' v-model="selected.body" placeholder="Edit me")
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