<template>
  <div class="right-container">
    <div class="weatwr">
      <!-- <img :src="require(`../../assets/weatherIcon/${$store.getters.weatherobj.weather}.png`)" />
        <div>{{$store.getters.weatherobj.temperature}}°</div>
        <div class="mony-font">
          <div>风力：{{$store.getters.weatherobj.windPower}}</div>
          <div>湿度：{{$store.getters.weatherobj.humidity}}</div>
        </div> -->
      <div class="rgt">
        <div class="wdb">
          <div>{{ $store.getters.weatherobj.temperature }}°</div>
          <img
            :src="
              require(`../../assets/weatherIcon/${$store.getters.weatherobj.weather}.png`)
            "
          />
        </div>
        <div class="wdb wdb1">
          <div>AQI</div>
          <div style="margin-left: 0.2vw; margin-right: 0.5vw">30</div>
          <div>优</div>
        </div>
      </div>
      <div class="rgt">
        <div>风力：{{ $store.getters.weatherobj.windPower }}</div>
        <div>湿度：{{ $store.getters.weatherobj.humidity }}</div>
        <div>气压：暂无</div>
      </div>
    </div>
    <div class="videobox">
      <iframe
        style="width: 90%; height: 90%"
        src="https://m.huya.com/24565242?platform=7&from=7&shareid=10895011770800932880&shareUid=1199575385525&source=android&pid=1199575385525&share_fm=lianjie&share_by=2"
      ></iframe>
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
            src="//txdirect.hls.huya.com/huyalive/1279528757314-1279528757314-16851177063413972992-2559057638084-10057-A-0-1.m3u8?ratio=2000&wsSecret=1991e97f07d897bafc903848decce6b6&wsTime=607e8d51&fm=RFdxOEJjSjNoNkRKdDZUWV8kMF8kMV8kMl8kMw%3D%3D&ctype=tars_mobile&txyp=o%3Aq6%3B&fs=bgct&t=103"
            type="application/x-mpegURL"
          />
        </video>
      </div> -->
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
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
  width: 100%;
  height: 100%;
  position: relative;
  .weatwr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    .left(0);
    .top(74);
    .vw(440);
    .vh(190);
    .padding(40, 32, 40, 32);
    background: url('../../assets/image/k4@3x.png');
    background-size: 100% 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .rgt {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // align-items: center;
      .font-size(24);
      color: #ffffff;
      .wdb {
        display: flex;
        .font-size(40);
        align-items: center;
        font-weight: 800;
        img {
          .vw(48);
          .vh(36);
        }
        // text-align:left;
      }
      .wdb1 {
        .font-size(33);
      }
      div {
        text-align: left;
      }
    }
  }
  .videobox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    .left(0);
    .bottom(90);
    .vw(440);
    .vh(280);
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../assets/image/k4@3x.png');
    background-size: 100% 100%;
    .video-js-box {
      width: 90%;
      height: 90%;
    }
  }
}
</style>
