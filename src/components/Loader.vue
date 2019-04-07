<template>
  <div v-once></div>
</template>

<script>
import { pleaseWait } from 'please-wait';
import 'please-wait/build/please-wait.css';

export default {
  name: 'loader',
  props: ['isLoading'],
  data: () => ({

  }),
  watch: {
    isLoading: {
      handler(isLoading) {
        if (isLoading) {
          this.open();
        } else {
          this.close();
        }
      },
      immediate: true,
    },
  },
  methods: {
    open() {
      // Attaching a `pleaseWaitInstance` property (no need to declare)...
      if (!this.pleaseWaitInstance) {
        this.pleaseWaitInstance = pleaseWait({
          logo: '/itunes-search/img/logo.svg',
          backgroundColor: '#0A0A0A',
          loadingHtml: '<p class="loading-message">A good day to you fine user!</p>',
        });
      }
    },
    close() {
      if (this.pleaseWaitInstance) {
        this.pleaseWaitInstance.finish();
        this.pleaseWaitInstance = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .loading-message {
    color: white;
  }
</style>
