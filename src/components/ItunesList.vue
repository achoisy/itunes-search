<template>
  <b-row align-v="center">
    <b-card-group columns>
      <itunesListItem
        v-for="(itunesResult, index) in itunesResults"
        :key="index"
        :itunesResult="itunesResult"
        @selectItem="selectItem"
      >
      </itunesListItem>
    </b-card-group>
    <Observer @intersect="intersected"/>
  </b-row>
</template>

<script>
import itunesListItem from './ItuneListItem';
import Observer from './Observer';

export default {
  name: 'ItunesList',
  props: ['itunesResults', 'scroll'],
  methods: {
    // Scrolling observer
    intersected() {
      this.scroll();
    },
    selectItem(item) {
      this.$emit('selectItem', item);
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
