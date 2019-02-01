<template>

  <div>
    <div class="search">
      <input type="text" class="search-input" v-model.trim="query.name" @keyup.enter="search()" name="search"
             placeholder="请输入搜索内容"/>
      <img src="../../assets/search-btn.png" class="search-btn" @click="search()"/>
    </div>
    <el-card class="box-card">
      <el-radio-group v-model="query.video_type" class="video-filter" size="small" @change="search()">
        <el-radio-button label="" class="choices">不限</el-radio-button>
        <el-radio-button label="movie" class="choices">电影</el-radio-button>
        <el-radio-button label="tvplay" class="choices">电视剧</el-radio-button>
        <el-radio-button label="comic" class="choices">动漫</el-radio-button>
        <el-radio-button label="varietyshow" class="choices">综艺</el-radio-button>
      </el-radio-group>
    </el-card>

    <section class="grid has-search-bar" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
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
  import {fetchMoviesByParams, fetch} from '../../store/api';
  import InfiniteScroll from 'vue-infinite-scroll'

  export default{
    components: {Spinner},
    directives: {InfiniteScroll},
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
        query: {
          name:'',
          page:1,
          video_type: '',
        },
        busy: false,
        isScroll: false,
        links: {}
      }
    },
    methods: {
      // onVideoTypeChange(val){
      //   // 重置页码
      //   this.query.page = 1;
      // },
      search(){
        this.query.page = 1;
        fetchMoviesByParams(this.query)
                .then((data) => {
                  this.videos = data.data;
                  this.loading = false;
                  this.links = data.links;
                });
      },
      loadMore(){
        console.log('--loadmore--')
        // 页码
        if(this.links && this.links.next){
          this.query.page++
          this.busy = true;
          this.isScroll = true;
          fetchMoviesByParams(this.query)
                  .then((data) => {
                    this.videos = this.videos.concat(data.data);
                    this.loading = false;
                    this.links = data.links;

                    this.loading = false;
                    this.isScroll = false;
                    this.busy = false;
                  });
        }
      }
    },
    mounted(){
      var start = 0, count = 9;
      this.search();
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

.video-filter {
  padding-top: 10px;
  // .choices {
  //   padding-right: 10px;
  // }
}
</style>
