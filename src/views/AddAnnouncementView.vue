<template>
  <div class="addAnnouncement">
    <Editor v-model="value" editorStyle="height: 320px">
      <template v-slot:toolbar>
        <span class="ql-formats">
          <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
          <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
          <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
        </span>
      </template>
    </Editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: {},
    };
  },
};
</script>