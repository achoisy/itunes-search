<template>
  <div class="header columns col-gapless">
    <transition
      name="slide-fade"
    >
      <div v-if="!showCancel" class="column col-sm-12 col-6 headertitle">
        <h1 class="text-light text-center">Recherche Itunes</h1>
      </div>
    </transition>
    <div class="column col-sm-12 col-6 col-mx-auto">
      <div class="serachbar">
        <div class="searchinput">
          <md-search-icon w="25" h="40" class="searchicon px-2"/>
          <input
            v-model="searchTerm"
            @input="isTyping = true"
            :placeholder="placeholder"
            @focus="onInputFocus"
            @focusout="onInputFocusOut"
            ref="search"
          />
        </div>
        <transition name="slide-out">
          <button
            v-if="showCancel"
            @click="onCancelclick"
            class="btn btn-link cancel text-center"
          >
            Annuler
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'SearchBar',
  props: [],
  data() {
    return {
      placeholder: 'Livre, Music, Film...',
      showCancel: false,
      searchTerm: '',
      isTyping: false,
    };
  },
  watch: {
    searchTerm: _.debounce(function debounce() {
      this.isTyping = false;
    }, 3000),
    isTyping(value) {
      if (!value) {
        console.log('Emit search string');
        this.$emit('searchQuery', this.searchTerm);
      }
    },
  },
  methods: {
    onInputFocus() {
      // On focus in erase placeholder text and show cancel button
      this.placeholder = '';
      this.showCancel = true;
    },
    onInputFocusOut() {
      // On focus out if value null set back placeholder text
      // and hide cancel button
      if (!this.searchTerm) {
        this.placeholder = 'Livre, Music, Film...';
        this.showCancel = false;
      }
    },
    onCancelclick() {
      // this.$emit('searchChange', '');
      this.searchTerm = '';
      this.$refs.search.blur();
      this.onInputFocusOut();
    },
  },
};
</script>

<style scoped>
  .header {
    display: flex;
    height: 100%;
    background: rgba(10, 10, 10, 0.96);
  }
  .headertitle {
    align-self: center;
  }
  .headertitle h1 {
    margin: 0px;
  }
  .serachbar {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .searchinput {
    display: flex;
    align-self: center;
    align-items: center;
    width: 100%;
    margin: 0.75rem;
    background: rgba(142, 142, 147, 0.3);
    border-radius: 40px;
    border: 0px;
    flex-grow: 1;
  }

  input {
    color: white;
    width: 100%;
    background: rgba(142, 142, 147, 0);
    border: 0px;
    min-height: 40px;
    font-size: 20px;
    line-height: 22px;
    letter-spacing: -0.0241176em;
  }

  input::placeholder {
    color: #8E8E93;
  }

  .btn.btn-link.active, .btn.btn-link:active, .btn.btn-link:focus, .btn.btn-link:hover {
    color: #81BCFF;
  }

  .searchicon {
    display: flex;
    fill: #8E8E93;
  }
  *:focus {
    outline: none;
  }
  .cancel {
    font-size: 17px;
    line-height: 1.23543;
    font-weight: 400;
    letter-spacing: -.022em;
    color: #007AFF;
    margin-right: 0.75rem;
    padding: 0px;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s;
  }
  .slide-fade-leave-active {
    transition: opacity .3s, transform .2s;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
  }
  .slide-out-enter-active {
    transition: all .3s ease;
  }
  .slide-out-leave-active {
    transition: all .3s ease;
  }
  .slide-out-enter, .slide-out-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0.25;
  }

</style>
