<template>
  <div class="observer"/>
</template>

<script lang="">
export default {
  // Options / Data
  props: ['options'],
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    // Use IntersectionObserver to observe end of scrolling
    const { options } = this;
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect');
      }
    }, options);
    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>
