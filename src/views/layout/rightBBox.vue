<template>
  <div class="right-container">
    <div class="videobox">
      <!-- <div class="video-js-box"> -->
      <iframe
        class="video-js-box"
        style="width: 95.8%; height: 93%"
        src="http://liveshare.huya.com/iframe/18566248"
      ></iframe>
      <!-- <iframe
        class="video-js-box"
        style="width: 95.8%; height: 93%"
        src="http://liveshare.huya.com/iframe/24712873"
      ></iframe> -->

      <!-- </div> -->
      <!-- <div class="video-js-box">
        <video
          id="my-video"
          muted
          class="video-js"
          controls
          preload="auto"
          poster
          style="width: 100%; height: 100%; object-fit: fill"
        >
          <source
            src="http://liveshare.huya.com/iframe/24565242"
            type="application/x-mpegURL"
          />
        </video>
      </div> -->
    </div>
  </div>
</template>

<script>
// import videojs from 'video.js'
// import 'videojs-contrib-hls'
export default {
  components: {},
  data () {
    return {
      myPlayer: '',  //播放器
      videoUrl: 'blob:https://www.huya.com/0c1f1195-e073-4015-8db6-6f7b8ac9a980'  //直播视频地址
    };
  },
  created () { },
  mounted () {

    // videojs('my-video', {
    //   bigPlayButton: false,
    //   textTrackDisplay: false,
    //   posterImage: true,
    //   errorDisplay: false,
    //   controlBar: true
    // }, function () {
    //   this.play()
    // })
    //初始化视频
    // if(this.videoUrl){
    //     this.myPlayer = this.$video(myVideo, {
    //         controls: true, //启动视频播放的唯一方法是使用autoplay属性或通过Player /v1。
    //         autoplay: true,  //自动播放属性,muted:静音播放 muted 
    //         preload: "auto",    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
    //         "sources": [{
    //             src: this.videoUrl,
    //             type:"blob"
    //         }],
    //     },function(){});
    // }else{
    //     const videoDom = this.$refs.viodeRef;  //不能用document 获取节点
    //     this.$video(videoDom).dispose();  
    // }
  },
  beforeDestroy: function () {
    //离开页面销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
    const videoDom = this.$refs.viodeRef;  //不能用document 获取节点
    this.$video(videoDom).dispose();
  },
  methods: {},


};
</script>
<style lang="less" scoped>
.right-container {
  // width: 100%;
  // height: 100%;
  position: relative;
  .videobox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    .left(0);
    // .bottom(90);
    .vw(600);
    .vh(500);
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../assets/image/k4@3x.png');
    background-size: 100% 100%;
    .margin(130,0 ,0, 0);
    iframe {
      border: none;
    }
    .video-js-box {
      width: 95.8%;
      height: 93%;
      &iframe {
        border: none;
        width: 95.8%;
        height: 93%;
      }
      // z-index: -1;
      .margin (0, 0, 0, 0);
      -webkit-clip-path: polygon(
        38% 0,
        40.5% 3.5%,
        60% 3.5%,
        62.6% 0,
        95.8% 0,
        100% 7%,
        100% 94%,
        96.3% 100%,
        4.2% 100%,
        0 94%,
        0 6.8%,
        4.3% 0
      );
      clip-path: polygon(
        38% 0,
        40.5% 3.5%,
        60% 3.5%,
        62.6% 0,
        95.8% 0,
        100% 7%,
        100% 94%,
        96.3% 100%,
        4.2% 100%,
        0 94%,
        0 6.8%,
        4.3% 0
      );
    }
  }
}
</style>
