<template>
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
        <!-- <div class="content">
            {{ item.content }}
          </div> -->
      </el-carousel-item>
    </el-carousel>
  </div>
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
</template>

<script>
export default {
  components: {},
  data () {
    return {
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
  created () { },
  mounted () {

  },
  methods: {},
};
</script>
<style lang="less" >
.gd-box {
  .vw(440);
  .vh(380);
  background: url('../../assets/image/k.png');
  background-size: 100% 100%;
  .margin(16, 0, 0, 0);
  box-sizing: border-box;
  .padding(0,20,20,20);
  position: absolute;
  .left(0);
  .bottom(90);
  .tit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .margin(26,0,0,0);
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
  .el-carousel--horizontal {
    overflow: hidden;
  }
  .el-carousel2 {
    .vw(400);
    .vh(290);
    // background: rgba(6, 69, 161, 0.2);
    .el-carousel-item2 {
      .vw(400);
      .vh(290);
      .el-carousel1 {
        .vw(400);
        .vh(290);

        .margin(10,0,0,0);
        .el-carousel-item1 {
          .imgs {
            .vw(400) !important;
            .vh(290) !important;
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