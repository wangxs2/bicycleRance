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

    <rightbbox></rightbbox>
  </div>
</template>

<script>
import rightbbox from "./rightBBox.vue";
import Swiper from "swiper";
import timexs from "./time.vue";
// import 'swiper/dist/css/swiper.min.css'
export default {
  components: {
    timexs,
    rightbbox,
  },
  data () {
    return {
      mySwiper: null,
      currentTime: 0,
      timeObj: null, // 时间对象,下方会用到

    };
  },
  watch: {
    '$store.getters.rankingData': {
      handler: function (newVal, oldVal) {
        // TO DO
        console.log(newVal)


      },
      deep: true,
      immediate: true
    },
  },
  created () {
    // this.testTimer()
  },
  mounted () {
    // this.mySwiper = new Swiper(".swiper-container", {
    //   autoplay: {
    //     delay: 5000,
    //     stopOnLastSlide: false,
    //     disableOnInteraction: true
    //   },
    //   // mousewheel: true,
    //   direction: 'vertical',
    //   loop: true, // 循环模式选项
    //   observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    //   observeParents: true // 修改swiper的父元素时，自动初始化swiper
    // });
    /* 鼠标滑过pagination控制swiper切换*/
  },
  methods: {
    testTimer () {
      this.timeFunction();
      setInterval(() => {
        this.timeFunction();
      }, 1000);
    },
    timeFunction () {
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

<style lang="less" >
@font-face {
  font-family: 'wgsFont';
  src: url('../../assets/font/DS-DIGIB.TTF') format('truetype'); /* Safari, Android, iOS */
}
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
    .font-size(70);
    color: #ffffff;
    background: url('../../assets/image/k1@3x.png');
    background-size: 100% 100%;
    font-family: 'wgsFont';
    font-weight: bold;
    .padding(0, 50, 0, 50);
    // img {
    //   .margin(0, 35, 0, 0);
    // }
    img {
      .vw(68);
      .vh(68);
    }
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
}
</style>
