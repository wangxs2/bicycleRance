<template>
  <div class="left-container">
    <div class="time-box">
      <img src="../../assets/image/sz.png" alt srcset />
      <timexs :sendSync="true" :autoStart="true" :defaultVal="0"></timexs>
    </div>
    <!-- <div class="weather-box">
      <div class="water-iteam">
        <img :src="require(`../../assets/weatherIcon/${$store.getters.weatherobj.weather}.png`)" />
        <div>{{$store.getters.weatherobj.temperature}}°</div>
        <div class="mony-font">
          <div>风力：{{$store.getters.weatherobj.windPower}}</div>
          <div>湿度：{{$store.getters.weatherobj.humidity}}</div>
        </div>
      </div>
    
    </div>-->
    <div class="gd-box">
      <div class="tit">
        <div class="titl">当前排名</div>
        <div class="titlin"></div>
      </div>
      <div class="tab-tit">
        <div class="tab-tit1">姓名</div>
        <div class="tab-tit2">设备号</div>
        <div class="tab-tit3">速度<br>km/h</div>
      </div>
      <div class="lb-box">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(itam,index) in $store.getters.rankingData"
              :key="index"
            >
              <div class="itampaiming" v-for="(irm,ind) in itam" :key="ind">
                <div class="indexname">
                  <div :class="(ind+index*10+1)==1?'numberimg1':(ind+index*10+1)==2?'numberimg2':(ind+index*10+1)==3?'numberimg3':''"> {{(ind+index*10+1)==1?'':(ind+index*10+1)==2?'':(ind+index*10+1)==3?'':(ind+index*10+1)}}</div>
                  <div class="nawe">{{irm.userName}}</div>
                </div>
                <div class="indexnum">{{irm.name}}</div>
                <div class="indexnum">{{irm.speed}}km/h</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
     
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import timexs from "./time.vue";
// import 'swiper/dist/css/swiper.min.css'
export default {
  components: {
    timexs
  },
  data() {
    return {
      mySwiper: null,
      currentTime: 0,
      timeObj: null, // 时间对象,下方会用到
     
    };
  },
  watch: {},
  created() {
    // this.testTimer()
  },
  mounted() {
    this.mySwiper = new Swiper(".swiper-container", {
      autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true
      },
      // mousewheel: true,
      direction : 'vertical',
      loop: true, // 循环模式选项
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true // 修改swiper的父元素时，自动初始化swiper
    });
    /* 鼠标滑过pagination控制swiper切换*/
  },
  methods: {
    testTimer() {
      this.timeFunction();
      setInterval(() => {
        this.timeFunction();
      }, 1000);
    },
    timeFunction() {
      // 开始执行倒计时
      this.timeObj = {
        // 时间对象
        seconds: Math.floor(this.currentTime % 60),
        minutes: Math.floor(this.currentTime / 60) % 60,
        hours: Math.floor(this.currentTime / 60 / 60) % 24
      };
      // 计算出时分秒
      this.myHours =
        this.timeObj.hours < 10 ? "0" + this.timeObj.hours : this.timeObj.hours;
      this.myMinutes =
        this.timeObj.minutes < 10
          ? "0" + this.timeObj.minutes
          : this.timeObj.minutes;
      this.mySeconds =
        this.timeObj.seconds < 10
          ? "0" + this.timeObj.seconds
          : this.timeObj.seconds;
      this.currentTime++;
    }
  }
};
</script>

<style lang="less" scoped>
.left-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .padding(0, 20, 0, 20);
  border-radius: 8px;
  .time-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .vw(440);
    .vh(150);
    .font-size(72);
    color: #ffffff;
    background: url("../../assets/image/k1@3x.png");
    background-size: 100% 100%;
    font-family: DS-Digital;
    font-weight: bold;
    .padding(0, 50, 0, 50);
    // img {
    //   .margin(0, 35, 0, 0);
    // }
  }
  .weather-box {
    width: 100%;
    background: #0389c7;
    border-radius: 8px;
    box-sizing: border-box;
    .padding(12, 12, 12, 12);
    .water-iteam {
      display: flex;
      justify-content: space-around;
      color: #ffffff;
      .font-size(28);
      align-items: center;
    }
    .mony-font {
      .font-size(18);
      text-align: left;
      .line-height(28);
    }
    .water-iteam1 {
      .font-size(36);
      justify-content: flex-start;
      .padding(0, 0, 0, 36);
      .yx {
        .margin(0, 0, 0, 26);
      }
    }
  }
  .gd-box {
    .vw(440);
    .vh(774);
    display: flex;
    flex-direction: column;
    background: url("../../assets/image/k.png");
    background-size: 100% 100%;
    .margin(16, 0, 0, 0);
    box-sizing:border-box;
    .padding(0,20,20,20);
    .tit {
      width: 100%;
      .font-size(24);
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .margin(36,0,0,0);
      .titlin {
        .vw(30);
        .vh(4);
        background: #fff;
        .margin(10,0,0,0);
      }
    }
    .lb-box{
      flex:1;
      .swiper-container{
        width:100%;
        height:100%;
        overflow:hidden;
        // .swiper-wrapper{
        //    width:100%;
        // height:100%;
        // }
        .swiper-slide{
          width:100%;
          height:100%;
          .itampaiming{
            width:100%;
            .vh(60);
            display:flex;
            justify-content:space-around;
             .font-size(20);
             color:#ffffff;
             background:RGBA(2, 23, 63, 0.6);
               align-items: center;
             border-bottom:1.5px solid RGBA(45, 65, 97,0.3);
             .numberimg1{
               .vw(30);
                .vh(30);
                background: url("../../assets/image/TOP1@3x.png");
                background-size: 100% 100%;
             }
              .numberimg2{
               .vw(30);
                .vh(30);
                background: url("../../assets/image/TOP2@3x.png");
                background-size: 100% 100%;
             }
              .numberimg3{
               .vw(30);
                .vh(30);
                background: url("../../assets/image/TOP3@3x.png");
                background-size: 100% 100%;
             }
            .indexname{
              display:flex;
               align-items: center;
              .nawe{
                .margin(0,0,0,6)
              }
            }
          }
        }
      }
    }
    .tab-tit{
      width:100%;
      .vh(54);
      display:flex;
      .font-size(20);
      .margin(20,0,0,0);
      color:#ffffff;
        align-items: center;
        background:RGBA(15, 38, 79, 0.8);
      .tab-tit1{
        .vw(180);
      }
      .tab-tit2{
        flex:1;
      }
       .tab-tit3{
        flex:1;
      }

    }
  }
}
</style>
<style lang="less">
 .lb-box{
   .header-item{
     .font-size(20);
   }
   .ceil{
     .font-size(20);
   }
 }
</style>
