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
        <span class="titc">周边景点</span>

        <span class="line"></span>
      </div>

      <el-carousel
        class="el-carousel2"
        indicator-position="none"
        :interval="16000"
        arrow="never"
      >
        <el-carousel-item
          class="el-carousel-item2"
          v-for="(item, index) in neerImgList"
          :key="index"
        >
          <el-carousel :interval="4000" class="el-carousel1" arrow="never">
            <el-carousel-item
              class="el-carousel-item1"
              v-for="(items, indexs) in item.imgList"
              :key="indexs"
            >
              <img class="imgs" :src="items" alt="" />
            </el-carousel-item>
          </el-carousel>
          <div class="content">
            {{ item.content }}
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- <div class="tit">
        <div class="titl">当前排名</div>
        <div class="titlin"></div>
      </div>
      <div class="tab-tit">
        <div class="tab-tit1">姓名</div>
        <div class="tab-tit2">设备号</div>
        <div class="tab-tit3">速度<br />km/h</div>
      </div>
      <div class="lb-box">
      
            <div
              class=""
              v-for="(itam, index) in $store.getters.rankingData"
              :key="index"
            >
              <div class="itampaiming">
                <div class="indexname">
                  <div
                    :class="
                      index + 1 == 1
                        ? 'numberimg1'
                        : index + 1 == 2
                        ? 'numberimg2'
                        : index + 1 == 3
                        ? 'numberimg3'
                        : ''
                    "
                  >
                    {{
                      index + 1 == 1
                        ? ''
                        : index + 1 == 2
                        ? ''
                        : index + 1 == 3
                        ? ''
                        : index + 1
                    }}
                  </div>
                  <div class="nawe">{{ itam.userName }}</div>
                </div>
                <div class="indexnum">{{ itam.name }}</div>
                <div class="indexnum">{{ itam.speed }}km/h</div>
              </div>
            </div>
       
      </div> -->
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
  data () {
    return {
      mySwiper: null,
      currentTime: 0,
      timeObj: null, // 时间对象,下方会用到
      neerImgList: [
        {
          content: '青西郊野公园，座落于青浦西侧的金泽。总规划面积22平方公里，现已建成一期4.6平方公里。与上海其他郊野公园相比，这里景区主要环绕与淀山湖连通的近3平方公里大莲湖设置，生态环境极佳。另外还有一片生长在水泊中的衫林作为旅游特色。',
          imgList: [
            require('../../assets/image/img/qx1.jpg'),
            require('../../assets/image/img/qx2.jpg'),
            require('../../assets/image/img/qx3.jpg'),
            require('../../assets/image/img/qx4.jpg'),
          ]
        }, {
          content: '金泽镇位于上海市青浦境域西南，是江、浙两省进入上海的西大门，也是上海唯一与江苏省和浙江省交界的镇。金泽全镇总面积108.42平方公里。金泽镇有市级非物质文化遗产“商榻宣卷”和“商榻阿婆茶”。每逢农历三月二十八和九月初九的庙会是金泽的特色民俗风情。',
          imgList: [
            require('../../assets/image/img/jz1.jpg'),
            require('../../assets/image/img/jz2.jpg'),
            require('../../assets/image/img/jz3.jpg'),
          ]
        }, {
          content: '春日的淀山湖，明晃晃的阳光洒在水面，所到之处水光潋滟。气势恢宏的彩虹桥像一条明亮的长蛇蜿蜒横跨在淀山湖上。漫步在彩虹桥上，湖面的微风徐徐扑面，让人惬意放松。桥体呈连环s曲线，既像蜿蜒的游龙，又像连绵的缎带，为淀山湖增添了一道亮丽的风景线。',
          imgList: [
            require('../../assets/image/img/ds1.jpg'),
            require('../../assets/image/img/ds2.jpg'),
          ]
        }
      ],

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
  .gd-box {
    .vw(440);
    .vh(750);
    background: url('../../assets/image/k.png');
    background-size: 100% 100%;
    .margin(16, 0, 0, 0);
    box-sizing: border-box;
    .padding(0,20,20,20);
    .tit {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      .margin(36,0,0,0);
      .titc {
        .font-size(24);
        color: #ffffff;
        font-family: PingFang SC;
        font-weight: bold;
      }
      .line {
        .vw(30);
        .vh(4);
        background: #ffffff;
        .margin(3,0,0,0);
      }
    }
    .el-carousel2 {
      .vw(400);
      .vh(650);
      background: rgba(6, 69, 161, 0.2);
      .el-carousel-item2 {
        .vw(400);
        .vh(650);
        .el-carousel1 {
          .vw(400);
          .vh(360);

          .margin(10,0,0,0);
          .el-carousel-item1 {
            .imgs {
              .vw(400) !important;
              .vh(360) !important;
            }
          }
          .el-carousel__indicator--horizontal {
            padding: 0;
          }
          .el-carousel__indicators--horizontal {
            top: 85% !important;
          }
          .el-carousel__indicator {
            border-radius: 50%;
            background: #fff;
            .el-carousel__button {
              background: #fff !important;
            }
            .margin(0,0,0,9);
            &:first-child {
              .margin(0,0,0,0);
            }
            &.is-active {
              .el-carousel__button {
                background: #3c95ff !important;
              }
            }
          }
          .el-carousel__button {
            .vw(10);
            .vh(10);
            border-radius: 50%;
          }
        }
        .content {
          width: 100%;
          .font-size(20);
          color: #ffffff;
          font-family: PingFang SC;
          font-weight: 500;
          text-align: left;
          text-indent: 2em;
          .line-height(32);
          // .margin(24,0,0,0);
          .padding(0,12,0,12);
        }
      }
    }

    // .lb-box {
    //   flex: 1;

    //   .itampaiming {
    //     width: 100%;
    //     .vh(60);
    //     display: flex;
    //     justify-content: space-around;
    //     .font-size(20);
    //     color: #ffffff;
    //     background: RGBA(2, 23, 63, 0.6);
    //     align-items: center;
    //     border-bottom: 1.5px solid RGBA(45, 65, 97, 0.3);
    //     .numberimg1 {
    //       .vw(30);
    //       .vh(30);
    //       background: url('../../assets/image/TOP1@3x.png');
    //       background-size: 100% 100%;
    //     }
    //     .numberimg2 {
    //       .vw(30);
    //       .vh(30);
    //       background: url('../../assets/image/TOP2@3x.png');
    //       background-size: 100% 100%;
    //     }
    //     .numberimg3 {
    //       .vw(30);
    //       .vh(30);
    //       background: url('../../assets/image/TOP3@3x.png');
    //       background-size: 100% 100%;
    //     }
    //     .indexname {
    //       display: flex;
    //       align-items: center;
    //       .nawe {
    //         .margin(0,0,0,6);
    //       }
    //     }
    //   }
    // }
    // .tab-tit {
    //   width: 100%;
    //   .vh(54);
    //   display: flex;
    //   .font-size(20);
    //   .margin(20,0,0,0);
    //   box-sizing: border-box;
    //   .padding(8,0,8,0);
    //   color: #ffffff;
    //   align-items: center;
    //   background: RGBA(15, 38, 79, 0.8);
    //   .tab-tit1 {
    //     .vw(180);
    //   }
    //   .tab-tit2 {
    //     flex: 1;
    //   }
    //   .tab-tit3 {
    //     flex: 1;
    //   }
    // }
  }
}
</style>
<style lang="less">
.lb-box {
  .header-item {
    .font-size(20);
  }
  .ceil {
    .font-size(20);
  }
}
</style>
