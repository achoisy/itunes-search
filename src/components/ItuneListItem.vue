<template>
  <b-card
    @click="selectItem"
    text-variant="white"
    no-body
    class="overflow-hidden mr-2 ml-2 carditem"
  >
    <b-row no-gutters align-v="start" class="p-2">
      <b-col cols="12" class="text-center footer mb-2">
        <small class="text-white">{{itunesResult.kind.toUpperCase()}}</small>
      </b-col>
      <b-col cols="4">
        <b-img-lazy v-bind="mainProps" :src="thumbnailUrl" rounded ></b-img-lazy>
      </b-col>
      <b-col cols="8">
        <b-card-body class="p-0 pl-3">
          <b-card-title>
            <h6>{{itunesResult.trackName}}</h6>
          </b-card-title>
          <b-card-text>
            <p class="m-0"><small>{{itunesResult.collectionName}}</small></p>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'ItuneslistItem',
  props: ['itunesResult'],
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: '#bbb',
        width: '100',
        height: '100',
      },
    };
  },
  computed: {
    thumbnailUrl() {
      return this.itunesResult.artworkUrl100;
    },
  },
  methods: {
    selectItem() {
      this.$emit('selectItem', this.itunesResult);
    },
  },
};
</script>

<style lang="css" scoped>
  .footer {
    color: white;
    background-color: #007AFF;
    border-radius: 2px;
  }
  .carditem {
    background-color: #231f20;
  }
  .book, .pdf, .interactive-booklet {
    background-color: #FF3B30;
  }
  .album, .music-video, .coached-audio, .song {
    background-color: #666;
  }
  .feature-movie, .tv-episode {
    background-color: #FF2D55;
  }
  .podcast, .podcast-episode {
    background-color: #FF9500;
  }
  .software-package {
    background-color: #5AC8FA;
  }

</style>
