<template>
  <div class="right-container" >
    <div class="weatwr">
       <!-- <img :src="require(`../../assets/weatherIcon/${$store.getters.weatherobj.weather}.png`)" />
        <div>{{$store.getters.weatherobj.temperature}}°</div>
        <div class="mony-font">
          <div>风力：{{$store.getters.weatherobj.windPower}}</div>
          <div>湿度：{{$store.getters.weatherobj.humidity}}</div>
        </div> -->
        <div class="rgt">
          <div class="wdb">
           <div> {{$store.getters.weatherobj.temperature}}° </div><img :src="require(`../../assets/weatherIcon/${$store.getters.weatherobj.weather}.png`)" />
          </div>
           <div class="wdb wdb1">
             <div>AQI</div>
             <div style="margin-left:0.2vw;margin-right:0.5vw">30</div>
             <div>优</div>
           </div>
        </div>
         <div class="rgt">
           <div>风力：{{$store.getters.weatherobj.windPower}}</div>
            <div>湿度：{{$store.getters.weatherobj.humidity}}</div>
            <div>气压：{{$store.getters.weatherobj.humidity}}7556156</div>
         </div>
    </div>
    <div class="videobox">
        <video
	         id="myVideo"
	         class="video-js vjs-default-skin vjs-big-play-centered vjs-progress-holder"
	         ref="viodeRef"
	         poster=""
	         style="width:90%;height:90%"
	         >
	     </video>

    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
        myPlayer:'',  //播放器
        videoUrl:'rtmp://10.74.20.123/live/record1'  //直播视频地址
    };
  },
    created(){ },
        mounted(){
	        //初始化视频
	        if(this.videoUrl){
	            this.myPlayer = this.$video(myVideo, {
	                controls: true, //启动视频播放的唯一方法是使用autoplay属性或通过Player /v1。
	                autoplay: true,  //自动播放属性,muted:静音播放 muted 
	                preload: "auto",    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
	                "sources": [{
	                    src: this.videoUrl,
	                    type:"application/x-mpegURL"
	                }],
	            },function(){});
	        }else{
	            const videoDom = this.$refs.viodeRef;  //不能用document 获取节点
	            this.$video(videoDom).dispose();  
	        }
        },
        beforeDestroy:function(){
            //离开页面销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
            const videoDom = this.$refs.viodeRef;  //不能用document 获取节点
            this.$video(videoDom).dispose();  
        },
        methods: { },

 
};
</script>

<style lang="less" scoped>
.right-container {
  width: 100%;
  height: 100%;
    position: relative;
  .weatwr{
       display: flex;
    justify-content: space-between;
    align-items: center;
     position: absolute;
     .left(0);
    .top(74);
    .vw(440);
    .vh(190);
     .padding(40, 32, 40, 32);
    background: url("../../assets/image/k4@3x.png");
    background-size: 100% 100%;
    .rgt{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content:space-between;
    // align-items: center;
    .font-size(24);
    color:#ffffff;
    .wdb{
       display: flex;
       .font-size(40);
       align-items: center;
       font-weight: 800;
       img{
       .vw(48);
        .vh(36);
       }
        // text-align:left;
    }
    .wdb1{
      .font-size(33);
    }
    div{
      text-align:left;
    }
    }
  }
  .videobox{
     position: absolute;
     .left(0);
    .bottom(90);
    .vw(440);
    .vh(280);
     display: flex;
      justify-content:center;
    align-items: center;
    background: url("../../assets/image/k4@3x.png");
    background-size: 100% 100%;

  }
}
</style>
