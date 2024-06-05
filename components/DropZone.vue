<template>
  <div class="main-container">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf"
      />

      <label
        for="fileInput"
        class="file-label h-100 d-flex align-center justify-center"
        v-if="!files.length"
      >
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else class="d-flex flex-column align-center">
          <div class="text-grey">Drag and drop here to add more</div>
          <span class="my-4 d-block text-grey">or</span>
          <div
            class="d-flex rounded-pill bg-grey-lighten-4 text-grey-darken-3 text-center px-8 py-2 text-body-2"
          >
            <v-icon icon="mdi-folder-open" class="mr-4" />
            <span>Browse a file</span>
          </div>
          <div class="font-weight-thin text-body-2 text-grey mt-3">
            Please read our Data & Privacy Policy for any concerns.
          </div>
        </div>
      </label>
      <div class="preview-container justify-center mt-4" v-if="files.length">
        <div
          v-for="file in files"
          :key="file.name"
          class="preview-card"
          :title="file.name"
        >
          <v-icon
            icon="mdi-file-check"
            class="text-h3 text-light-green-darken-1"
          />
          <p class="text-truncate w-100 text-caption text-grey-darken-1 mt-2">
            {{ file.name }}<br />
          </p>

          <button
            type="button"
            @click="remove(files.indexOf(file))"
            title="Remove file"
          >
            <b>×</b>
          </button>
        </div>
        <div class="d-flex justify-center w-100 pt-3">
          <label
            class="d-flex rounded-pill bg-grey-lighten-4 text-grey-darken-3 text-center px-8 py-2 text-body-2"
            for="fileInput"
          >
            <v-icon icon="mdi-folder-open" class="mr-4" />
            <span>Add file</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },
  methods: {
    onChange() {
      this.files.push(...this.$refs.file.files);
      this.$emit("emit-files", this.files);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
      this.$emit("emit-files", this.files);
    },
  },
};
</script>

<style>
.main-container {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.dropzone-container {
  width: 100%;
  height: 196px;
  overflow-y: auto;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.preview-card {
  padding: 5px;
  max-width: 128px;
  position: relative;
  display: inline-grid;
  justify-items: center;
}

.preview-card > button {
  position: absolute;
  right: 10px;
}
</style>
