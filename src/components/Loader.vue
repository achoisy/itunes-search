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
      if (!this.pleaseWaitInstance) {
        this.pleaseWaitInstance = pleaseWait({
          logo: '/itunes-search/img/logo.svg',
          backgroundColor: '#0A0A0A',
          loadingHtml: '<h1 class="loading-message" style="color: white;">Made with Love</h1> <p style="color: #555555;"><small>Alexandre Choisy</small></p>',
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

  }
</style>
