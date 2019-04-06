<template>
  <div id="">
    <b-modal v-model="show" size="xl" id="modal-xl" centered scrollable :title="title">
      {{JSON.stringify(selectedItem)}}
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
  },
};
</script>

<style scoped>
#modal-xl {
  height: 80%;
}
</style>
