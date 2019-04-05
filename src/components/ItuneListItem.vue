<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters align-v="center">
      <b-col cols="4">
        <b-img-lazy v-bind="mainProps" :src="thumbnailUrl" fluid class="rounded-0"></b-img-lazy>
      </b-col>
      <b-col cols="8">
        <b-card-body class="p-2">
          <b-card-title>
            <h5>{{itunesResult.trackName}}</h5>
          </b-card-title>
          <b-card-text>
            <small>{{itunesResult.collectionName}}</small>
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col cols="12" :class=" `text-center ${itunesResult.kind}`">
        <small class="text-white">{{itunesResult.kind}}</small>
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
};
</script>

<style scoped>
  .footer {
    color: white;
    background-color: #007AFF;
    border-radius: 2px;
  }
  .book, .pdf, .interactive-booklet {
    background-color: #FF3B30;
  }
  .album, .music-video, .coached-audio, .song {
    background-color: #4CD964;
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
