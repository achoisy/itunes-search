<template>
  <div>
    <loading-screen :is-loading="isLoading"></loading-screen>
    <header>
      <SearchBar
        @searchQuery="searchQuery"
        @cancel="onUserCancel"
        @selectedMedia="mediaChange"
      ></SearchBar>
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
import Loader from './components/Loader';
import SearchBar from './components/SearchBar';
import ItunesList from './components/ItunesList';
import ItunesDetail from './components/ItunesDetail';
import config from './config/config.json';

export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
      itunesResults: [],
      loading: false,
      searchOffset: 0,
      searchTerm: '',
      selectedItem: '',
      media: 'all',
    };
  },
  mounted() {
    // do something after mounting vue instance
    // this.scroll();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
  methods: {
    // Update search term and make new request
    searchQuery(UpdateTerm) {
      this.searchTerm = UpdateTerm;
      this.searchOffset = 0;
      if (this.searchTerm) {
        this.searchApi();
      }
    },
    // Update media type for search request
    mediaChange({ media }) {
      this.media = media;
    },
    // Axios search request
    searchApi() {
      this.loading = true;
      axios.get(`${config.API_URL}`, {
        crossdomain: true,
        params: {
          country: 'fr',
          limit: '25',
          term: this.searchTerm,
          media: this.media,
          offset: this.searchOffset,
        },
      })
        .then((res) => {
          // Can apply filters here
          return new Promise((resolve, reject) => {
            try {
              if (res.data.results.length) { // if request return results
                if (this.searchOffset === 0) { // This is a new search, start from 0
                  resolve(res.data.results);
                } else { // Adding items to list already shown
                  resolve([...this.itunesResults, ...res.data.results]);
                }
              }
              reject();
            } catch (e) {
              reject(e);
            }
          });
        })
        .then((result) => {
          // Scrolling slow down to avoid multi request to itunes API
          setTimeout(() => {
            this.loading = false;
            this.itunesResults = result;
          }, 1000);
        })
        .catch((err) => {
          if (err) { // if err then this is a request error else just empty result
            console.log('Axios request Error:', err);
          }
          this.loading = false;
        });
    },
    // On scroll if offset under 200 add new offset
    // and make axios request to add new items
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
    'loading-screen': Loader,
  },
};
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  @import "assets/custom.scss";
</style>
