<template>
  <div class="">
    <div class="detail-card">
      <d-player :options="options"
              @play="play"
              ref="player">
      </d-player>
      <el-button-group>
        <router-link :to="{name: 'movie-play', params: {mid: this.mid, cid: this.chapter_link.previous_cid.cid}}" class="item" v-if="has_previous">
          上一集
        </router-link>
        <router-link :to="{name: 'movie-play', params: {mid: this.mid, cid: this.chapter_link.next_cid.cid}}" class="item" v-if="has_next">
          下一集
        </router-link>
      </el-button-group>
      <spinner :show="loading"></spinner>
    </div>
  </div>
</template>
<script>
  import Spinner  from '../../components/Spinner.vue'
  import * as types from '../../store/types';
  import {fetchMoviesChaptersDetail} from '../../store/api';

  import VueDPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'
  // require('videojs-contrib-hls')
  require(['hls.js'], function (Hls) {
  	window.Hls = Hls;
  })

  export default{
    components: {
      Spinner,
      'd-player': VueDPlayer
    },
    data(){
      return {
        options: {
            video: {
              // url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
              // pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
            },
            autoplay: false,
            contextmenu: [
                {
                    text: 'GitHub',
                    link: 'https://github.com/MoePlayer/vue-dplayer'
                }
            ]
          },
        player: null,
        loading: true,
        mid: '',
        cid: '',
        chapter: {},
        chapter_link: {},
      }
    },
    computed: {
      has_next(){
        return this.chapter_link.next_cid && this.chapter_link.next_cid.cid
      },
      has_previous(){
        return this.chapter_link.previous_cid && this.chapter_link.previous_cid.cid
      },
    },
    methods: {
      play() {
        console.log('play callback')
      },
      playByMidCid(mid, cid){
        this.mid = mid;
        this.cid = cid;
        fetchMoviesChaptersDetail(this.mid, this.cid)
                .then(data =>{
                  console.log(data)
                  this.chapter = data.data;

                  this.chapter_link = data.chapter_link;
                  this.loading = false;
                  // this.player.fullScreen.request('web');
                  this.player.switchVideo({
                    url: this.chapter.source,
                    type: 'hls'
                  })
                });
      }
    },
    mounted(){
      this.player = this.$refs.player.dp
      this.mid = this.$route.params.mid;
      this.cid = this.$route.params.cid;
      console.log(this.mid, this.cid);
      this.playByMidCid(this.mid, this.cid);
      // fetchMoviesChaptersDetail(this.mid, this.cid)
      //         .then(data =>{
      //           console.log(data)
      //           this.chapter = data.data;
      //
      //           this.chapter_link = data.chapter_link;
      //           this.loading = false;
      //           // this.player.fullScreen.request('web');
      //           this.player.switchVideo({
      //             url: this.chapter.source,
      //             type: 'hls'
      //           })
      //         });
      // fetchMoviesChapters(this.id)
      //         .then(data =>{
      //           this.chapters = data.data;
      //         })

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
