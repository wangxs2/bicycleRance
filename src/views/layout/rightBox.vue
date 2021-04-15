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
    <div class="videobox"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    
    };
  },
 
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
    background: url("../../assets/image/k4@3x.png");
    background-size: 100% 100%;
  }
}
</style>
