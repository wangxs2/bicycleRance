<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
  },
  data () {
    return {
      userAccount: ''
    }
  },
  created () {
    // if (window.location.href.indexOf('/orderFeedback') != -1 || window.location.href.indexOf('/submitSuccess') != -1 || window.location.href.indexOf('/filePage') != -1) {
    //   return
    // } else {
    //   this.getLocationInit()
    // }
  },
  mounted () {
    this.userAccount = localStorage.getItem("userAccount")
  },
  methods: {
    getGeolocation () {
      let _this = this
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)
        //定位成功
        function onComplete (data) {
          var lat = data.position.lat; //纬度
          var lag = data.position.lng; //经度
          _this.getLocation(lat, lag)
        }
        // 定位失败
        function onError (data) {
          switch (data.message) {
            case 'Browser not Support html5 geolocation.':
              alert("定位失败,用户拒绝请求地理定位");
              break;
            case 'Geolocation permission denied.':
              alert("定位失败,位置信息不可用");
              break;
            case 'Get geolocation time out.':
              alert("定位失败,请求获取用户位置超时");
              break;
            case 'Get geolocation failed.':
              alert("定位失败,定位系统失效");
              break;
          }
        }
      })
    },
    getLocationInit () {
      var timer = null;
      clearInterval(timer);
      this.getGeolocation();
      timer = setInterval(this.getGeolocation, 300000);
    },
    getLocation (lat, lon) {
      this.$fetchPost("supervisionapp/RcdIAppUserPosition/insert", {
        userAccount: this.userAccount,
        lng: lon,
        lat: lat
      }, "json").then(res => {
        // console.log(res, '111')
      })
      // this.$fetchGet("supervisionapp/RcdIAppUserPosition/select", {
      //   username: this.userAccount,
      // }).then(res => {
      //   // console.log(res, '2222')
      // })
    },
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
img {
  pointer-event: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.van-nav-bar {
  width: 100%;
}
.van-nav-bar__title {
  font-size: 18px !important;
  font-family: PingFang SC;
  font-weight: bold !important;
  color: rgba(51, 51, 51, 1) !important;
}
.van-nav-bar {
  .van-icon {
    font-size: 20px !important;
    color: #333 !important;
  }
}
.van-nav-bar__right {
  .van-nav-bar__text {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(90, 107, 255, 1);
  }
}
</style>
