<template>
  <b-row class="header justify-content-md-center no-gutters">
    <transition
      name="slide-fade"
    >
      <b-col v-if="!showCancel" cols="12" md="4" class="headertitle text-center">
        <h1 class="text-white">Recherche Itunes</h1>
      </b-col>
    </transition>
    <b-col cols="12" md="8">
      <div class="serachbar">
        <div class="searchinput">
          <md-search-icon w="25" h="40" class="searchicon"/>
          <input
            v-model="searchTerm"
            :placeholder="placeholder"
            @focus="onInputFocus"
            @focusout="onInputFocusOut"
            ref="search"
            @keyup.enter="onSubmit"
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
    </b-col>
  </b-row>
</template>

<script>
// import _ from 'lodash';

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
      this.$emit('cancel');
    },
    onSubmit() {
      this.$emit('searchQuery', this.searchTerm);
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
    border-radius: 10px;
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
    transform: translateX(-10px);
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

  @media screen and (max-width: 720px) {
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
      transform: translateY(-40px);
      opacity: 0;
    }
  }
</style>
