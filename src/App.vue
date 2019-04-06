<template>
  <div>
    <header>
      <SearchBar @searchQuery="searchQuery" @cancel="onUserCancel"></SearchBar>
    </header>
    <b-container>
      <ItunesList
        :itunesResults="itunesResults"
        :scroll="scroll"
        @selectItem="selectItem"
      ></ItunesList>
      <div v-show="loading" class="text-center">
        <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
      </div>
      <ItunesDetail :selectedItem="selectedItem"></ItunesDetail>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
// import _ from 'lodash';
import SearchBar from './components/searchBar';
import ItunesList from './components/ItunesList';
import ItunesDetail from './components/ItunesDetail';
import config from './config/config.json';

export default {
  name: 'App',
  data() {
    return {
      itunesResults: [],
      loading: false,
      searchOffset: 0,
      searchTerm: '',
      selectedItem: '',
    };
  },
  mounted() {
    // do something after mounting vue instance
    // this.scroll();
  },
  methods: {
    searchQuery(UpdateTerm) {
      this.searchTerm = UpdateTerm;
      this.searchOffset = 0;
      if (this.searchTerm) {
        this.searchApi();
      }
    },
    searchApi() {
      this.loading = true;
      axios.get(`${config.API_URL}`, {
        crossdomain: true,
        params: {
          country: 'fr',
          limit: '25',
          term: this.searchTerm,
          offset: this.searchOffset,
        },
      })
        .then((res) => {
          return new Promise((resolve, reject) => {
            try {
              if (res.data.results.length) {
                if (this.searchOffset === 0) {
                  this.itunesResults = res.data.results;
                } else {
                  this.itunesResults = [...this.itunesResults, ...res.data.results];
                }
              }
              resolve(this.itunesResults);
            } catch (e) {
              reject();
            }
          });
        })
        .then(() => {
          this.loading = false;
        })
        .catch((err) => {
          console.log('Axios request Error:', err);
          this.loading = false;
        });
    },
    scroll() {
      if (
        this.searchTerm
        && !this.loading
        && this.itunesResults.length >= this.searchOffset
        && this.searchOffset <= 175
      ) {
        this.loading = true;
        this.searchOffset = this.itunesResults.length + 25;
        this.searchApi();
      }
    },
    onUserCancel() {
      this.searchTerm = '';
      this.searchOffset = 0;
      this.loading = false;
      this.itunesResults = [];
    },
    selectItem(item) {
      this.selectedItem = item;
    },
  },
  components: {
    SearchBar,
    ItunesList,
    ItunesDetail,
  },
};
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  @import "assets/custom.scss";
</style>
