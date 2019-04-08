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
      <b-row align-v="center" align-h="center" class="no-gutters">
        <b-col cols="3">
          <b-dropdown variant="dark" class="d-flex" no-caret right>
            <template slot="button-content">
              <div class="d-flex align-items-center justify-content-end">
                <component :is="seletedDropdown.icon"
                  w="30" h="40"
                  class="dropicon float-left mr-2"
                ></component>
                <p class="m-0 mr-2 d-none d-lg-block">
                  {{seletedDropdown.text}}
                </p>
                <img src="../../public/img/down.svg"  />
              </div>
            </template>
            <b-dropdown-item
              v-for="(item, index) in dropdownMenu"
              :key="index"
              @click="onDropdownClick(item)"
              class="d-flex align-items-center"
            >
              <component :is="item.icon"
                w="30" h="30"
                class="dropicon float-left mr-2"
              ></component>
              <p class="m-0">
                {{item.text}}
              </p>
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="9">
          <div class="serachbar">
            <div class="searchinput">
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
              <div v-if="showCancel" class="d-flex">
                <button
                  @click="onCancelclick"
                  class="btn btn-link cancel text-center"
                >
                  Annuler
                </button>
                <button
                  @click="onSubmit"
                  class="btn btn-link cancel text-center d-none d-lg-block"
                >
                  Chercher
                </button>
              </div>
            </transition>
          </div>
        </b-col>
      </b-row>
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
      dropdownMenu: [
        {
          media: 'all',
          text: 'Tous',
          icon: 'md-search-icon',
        },
        {
          media: 'movie',
          text: 'Films',
          icon: 'md-videocam-icon',
        },
        {
          media: 'podcast',
          text: 'Podcasts',
          icon: 'md-wifi-icon',
        },
        {
          media: 'music',
          text: 'Musique',
          icon: 'md-musical-notes-icon',
        },
        {
          media: 'audiobook',
          text: 'Livres audio',
          icon: 'md-book-icon',
        },
        {
          media: 'tvShow',
          text: 'Séries TV',
          icon: 'md-tv-icon',
        },
      ],
      seletedDropdown: {
        media: 'all',
        text: 'Tous',
        icon: 'md-search-icon',
      },
    };
  },
  methods: {
    onDropdownClick(item) {
      this.seletedDropdown = item;
      this.$emit('selectedMedia', this.seletedDropdown);

      // if searchterm then send new axios request with new selected media
      if (this.searchTerm) {
        this.$emit('searchQuery', this.searchTerm);
      }
    },
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
      this.$refs.search.blur();
      this.$emit('searchQuery', this.searchTerm);
    },
  },
};
</script>

<style lang="css" scoped>
  .header {
    display: flex;
    height: 100%;
    background: rgb(10, 10, 10);

  }
  .headertitle {
    align-self: center;
  }
  .headertitle h1 {
    margin: 0px;
  }
  .serachbar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    padding-right: 2px;
  }
  .searchinput {
    display: flex;
    align-self: center;
    align-items: center;
    width: 100%;
    margin-left: 0px;
    margin-right: 0.50rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    background: rgba(142, 142, 147, 0.3);
    border-radius: 10px;
    border: 0px;
    flex-grow: 1;
  }
  .dropdown-item {
    padding-right: 0.75rem !important;
    padding-left: 0.75rem !important;
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
    padding-left: 10px;
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
  .dropicon {
    fill: #fff;
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
