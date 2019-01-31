<template>

  <div>
    <div class="search">
      <input type="text" class="search-input" v-model.trim="query" @keyup.enter="search()" name="search"
             placeholder="请输入搜索内容"/>
      <img src="../../assets/search-btn.png" class="search-btn" @click="search()"/>
    </div>
    <section class="grid has-search-bar">
      <div>
        <div class="card">
          <router-link :to="{name: 'movie-detail', params: {id: item.mid}}" class="item"
                       v-for="item in videos">
            <div class="cover">
              <div class="wp">
                <img class="img-show" :src="item.cover"/>
              </div>
            </div>
            <div class="info">
              <h3>{{item.title}}</h3>
            </div>
          </router-link>
        </div>
      </div>
      <spinner :show="loading"></spinner>
    </section>
  </div>
</template>

<script>
  import Spinner  from '../../components/Spinner.vue'
  import {mapState} from 'vuex';
  import * as types from '../../store/types';
  import {fetchMoviesByParams} from '../../store/api';

  export default{
    components: {Spinner},
    data(){
      return {
        loading: true,
        inTheater: {
          type: ''
        },
        comingSoon: {
          type: ''
        },
        videos: [],
        page:1,
        query: '',
      }
    },
    methods: {
      search(){
        fetchMoviesByParams({name: this.query, page: this.page})
                .then((data) => {
                  // this.inTheater = data;
                  // this.inTheater.type = API_TYPE.movie.in_theaters;
                  this.videos = data.data;
                  console.log(this.videos[0])
                  this.loading = false;
                });
      }
    },
    mounted(){
      var start = 0, count = 9;
      this.search();
      // fetchMoviesByParams()
      //         .then((data) => {
      //           // this.inTheater = data;
      //           // this.inTheater.type = API_TYPE.movie.in_theaters;
      //           this.videos = data.data;
      //           console.log(this.videos[0])
      //           this.loading = false;
      //         });
      // fetchMoviesByType(API_TYPE.movie.coming_soon, start, count)
      //         .then((data) => {
      //           this.comingSoon = data;
      //           this.comingSoon.type = API_TYPE.movie.coming_soon;
      //           this.loading = false;
      //         });

    },
    updated(){
    },
    destroyed(){
    }
  };
</script>
<style scoped lang="scss">
.search {
  background: #fff;
  margin-top: 47px;
  position: relative;
  .search-input {
    -webkit-appearance: none;
    border: 0;
    outline: 0;
    background: #f5f5f5;
    padding: 10px 5px;
    width: 100%;
  }
  .search-btn {
    width: 20px;
    position: absolute;
    right: 5px;
    top: 9px;
  }
}
</style>
