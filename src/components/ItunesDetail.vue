<template>
  <div id="">
    <b-modal
      v-model="show"
      size="xl"
      id="modal-xl"
      centered
      scrollable
      :title="title"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="dark"
      footer-text-variant="light"
    >
    <b-img-lazy v-if="thumbnailUrl" v-bind="mainProps" :src="thumbnailUrl" rounded class="float-left mr-2" ></b-img-lazy>
    <b-card-body>
      <b-card-title>{{selectedItem.trackName}}</b-card-title>
      <b-card-sub-title class="mb-2">{{selectedItem.artistName}}</b-card-sub-title>
      <b-card-text>
        {{selectedItem.collectionName}}
      </b-card-text>
    </b-card-body>
      <div slot="modal-footer" class="w-100">
        <b-button
          variant="light"
          size="sm"
          class="float-right"
          @click="show=false"
        >
          Fermer
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['selectedItem'],
  data() {
    return {
      show: false,
      mainProps: {
        blank: true,
        blankColor: '#bbb',
        width: '100',
        height: '100',
      },
    };
  },
  watch: {
    selectedItem(value) {
      this.show = !!value;
    },
  },
  computed: {
    title() {
      return this.selectedItem && this.selectedItem.kind
        ? this.selectedItem.kind.toUpperCase() : '';
    },
    thumbnailUrl() {
      if (!this.selectedItem.artworkUrl100) {
        return '';
      }
      return this.selectedItem.artworkUrl100;
    },
  },
};
</script>

<style lang="css" scoped>
#modal-xl {
  height: 80%;
}
</style>
