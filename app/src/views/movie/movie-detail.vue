<template>
  <div class="">
    <div class="detail-card" v-if="movie.title">
      <div class="title">{{movie.title }}&nbsp;{{movie.alias}}</div>
      <div>
        <img :src="movie.cover" style="width:100%">
      </div>
      <section class="subject-info">{{getMeta}}</section>
      <section class="subject-mark">
        <div class="mark-item">
          <!-- <a>
            <span>想看({{movie.wish_count}})</span>
          </a>
          <a><span>看过</span></a> -->
        </div>
      </section>
      <section class="subject-intro">
        <h2>{{movie.title}}的剧情介绍</h2>
        <div class="bd">
          <p>
            {{movie.description}}
          </p>
        </div>
      </section>
      <section class="subject-intro">
        <router-link :to="{name: 'movie-play', params: {cid: item.cid, mid: item.mid}}" class="item"
                     v-for="item in chapters">
           <el-tag>{{item.title}}</el-tag>
        </router-link>
      </section>
    </div>
    <spinner :show="loading"></spinner>
  </div>
</template>
<script>
  import Spinner  from '../../components/Spinner.vue'
  import * as types from '../../store/types';
  import {fetchMoviesDetail, fetchMoviesChapters} from '../../store/api';

  export default{
    components: {Spinner},
    data(){
      return {
        loading: true,
        id: '',
        movie: {},
        chapters: [],
      }
    },
    computed: {
      getMeta(){
      //   var cast = this.movie.casts.reduce((name,value)=>{
      //             return name ? name +' / '+ value.name : value.name;
      // }, '');
        return this.movie.year + ' / ' + this.movie.region + ' / '+this.movie.video_type_display + ' / '+ this.movie.author +'(导演) / ' + this.movie.actors;
      },
      getOriginalTitle(){
        return /([A-Za-z])/g.test(this.movie.original_title)? this.movie.original_title : '';
      },
    },
    mounted(){
      this.id = this.$route.params.id;
      fetchMoviesDetail(this.id)
              .then(data =>{
                this.movie = data;
                this.loading = false;
              });
      fetchMoviesChapters(this.id)
              .then(data =>{
                this.chapters = data.data;
              })

    }
  };
</script>
<style scoped lang="scss">
  .detail-card {
    background: #fff;
    border-radius: 10px;
    padding: 10px 15px;;
    -webkit-text-size-adjust: 100%;
    .title {
      font-size: 16px;
      line-height: 32px;
      word-break: break-all;
    }
    section {
      margin-bottom: 30px;
      p {
        font-size: 15px;
        color: #494949;
        line-height: 1.5;
        text-align: justify;
      }
    }
    .subject-info {
      position: relative;
      overflow: hidden;
      margin-top: 10px;
      line-height: 1.5;
    }
    .subject-mark{
      .mark-item{
        margin-bottom: 30px;
        display: -webkit-box;
        display: -moz-box;
        display: box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        box-align: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        -ms-flex-align: center;
        a{
          height: 30px;
          line-height: 30px;
          display: block;
          border: 1px solid #ffb712;
          border-radius: 3px;
          margin-right: 10px;
          color: #ffb712;
          font-size: 15px;
          text-align: center;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          box-flex: 1;
          -webkit-flex: 1;
          -moz-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }
      }
    }
    .subject-intro {

      h2 {
        color: #aaa;
        margin: 0 0 15px;
        font-size: 15px;
      }
    }
  }
</style>
