<template>
  <div class="tile tile-centered">
    <div class="tile-icon">
      <div class="example-tile-icon">
        <img :src="thumbnailUrl" />
      </div>
    </div>
    <div class="tile-content">
      <div class="tile-title">{{itunesResult.trackName}}</div>
      <small class="tile-subtitle text-gray">{{itunesResult.collectionName}}</small>
    </div>
    <div class="tile-action">
      <button class="btn btn-link">
        <i class="icon icon-more-vert"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItuneslistItem',
  props: ['itunesResult'],
  computed: {
    thumbnailUrl() {
      return this.itunesResult.artworkUrl60;
    },
  },
};
</script>

<style scoped>
  li {
    display: flex;
    cursor: pointer;
  }

  li:hover {
    background-color: #eee;
  }
</style>
