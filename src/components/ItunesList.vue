<template>
  <div>
    <itunesListItem
      v-for="(itunesResult, index) in itunesResults"
      :key="index"
      :itunesResult="itunesResult"
    >
    </itunesListItem>
    <Observer @intersect="intersected"/>
  </div>
</template>

<script>
import itunesListItem from './ItuneListItem';
import Observer from './Observer';

export default {
  name: 'ItunesList',
  props: ['itunesResults', 'scroll'],
  methods: {
    intersected() {
      console.log('Observer');
      this.scroll();
    },
  },
  components: {
    itunesListItem,
    Observer,
  },

};
</script>

<style>

</style>
