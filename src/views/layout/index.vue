<template>
  <div class="all-box" id="container">
    <div class="infowindow">
      <div class="name">Id:{{ curInfoWindow.id }}</div>
      <div class="name">姓名:{{ curInfoWindow.userName }}</div>
      <div class="name">设备号：{{ curInfoWindow.imei }}</div>
    </div>
    <div class="header-box"></div>
    <div class="left-box">
      <leftbox></leftbox>
    </div>
    <div class="right-t-box">
      <righttbox></righttbox>
    </div>
    <div class="right-b-box">
      <rightbbox></rightbbox>
    </div>
  </div>
</template>

<script>
import leftbox from "./leftBox.vue";
import righttbox from "./rightTBox.vue";
import rightbbox from "./rightBBox.vue";
import linePath from './linePath'
export default {
  components: {
    leftbox,
    righttbox,
    rightbbox
  },
  data () {
    return {
      MyMip: null,
      passedPolyline: null,
      timer: null, //d定时掉接口
      allpoint: [],
      carGroup: new AMap.OverlayGroup(), // 参赛群组
      heatmap: null,
      heatmapData: [],
      query: {
        page: 1,
        pageSize: 15,
        imei: ""
      },
      websock: null,
      timerSocket: null,
      timerHeatMap: null,

      curMarkerList: [],
      linePathList: [],
      curDataList: [],
      curInfoWindow: {},

    };
  },
  created () {
    this.getImeis()
    let that = this
    this.timerHeatMap = setInterval(() => {
      if (that.heatmap) {
        that.heatmap.setMap(null)
      }
      that.curDataList.forEach(item => {
        item.count = 0
      })
      that.allpoint.forEach((item, index) => {
        that.curDataList.forEach((items, indexs) => {
          var p1 = [items.lng, items.lat];
          var p2 = [item.getExtData().lng, item.getExtData().lat];
          let distance = AMap.GeometryUtil.distance(p1, p2);
          if (item.getExtData().lng != 0 && item.getExtData.lat != 0 && distance <= 200) {
            items.count = items.count + 1
          }
        })
      })
      that.heatMap()
      that.heatmapData = that.cloneObj(that.curDataList)
      that.heatmap.setDataSet({ data: that.heatmapData, min: 1, max: 100 });
    }, 10000);
  },
  mounted () {
    this.initmap();
    if (sessionStorage.getItem("isReload")) {
      console.log("页面被刷新");
      clearInterval(this.timerSocket);
      if (this.websock) {
        this.websock.close(); //离开路由之后断开websocket连接
      }
    } else {
      console.log("首次被加载");
      sessionStorage.setItem("isReload", true)
    }

    let mypath = linePath.linePath
    this.linePathList = this.separateArr(mypath, 2);
    this.curDataList = []
    this.linePathList.forEach(item => {
      let obj = {
        lng: item[0],
        lat: item[1],
        count: 0
      }
      this.curDataList.push(obj)
    })

  },
  destroyed () {
    this.websock.close(); //离开路由之后断开websocket连接
    clearInterval(this.timerHeatMap);
  },
  methods: {
    getImeis () {
      let arpoly = [];
      this.$fetchGet('/cycling/user/getImeis').then(res => {
        res.content.forEach((items, indexs) => {
          items.curMarkerObj = items
          items.curMarkerObj.curMarkerData = []
          items.curMarkerObj.curMarkerData.push([items.lng, items.lat])
          items.count = 0;
          items.rankNumber = 0;
          this.allpoint.push(this.setMarker(items));
          // this.carGroup.addOverlays(this.allpoint);
          // 计算点位是否在当前路线点200米之内
          this.curDataList.forEach((item, index) => {
            var p1 = [item.lng, item.lat];
            var p2 = [items.lng, items.lat];
            let distance = AMap.GeometryUtil.distance(p1, p2);
            if (distance <= 200) {
              item.count = item.count + 1
            }
          })
        })
        this.heatmapData = this.cloneObj(this.curDataList)
        this.heatmap.setDataSet({ data: this.heatmapData, min: 1, max: 100 });
        let arrw = res.content.slice(0, 10)
        this.$store.commit("SET_RANK", arrw);
        this.initWebSocket();
      })
    },
    countTime () { },
    initWebSocket () {
      //初始化weosocket
      const wsuri = "ws://101.231.47.116:50000/cycling/realtime/socket";
      // const wsuri = "ws://192.168.1.106:8080/cycling/realtime/socket";
      // const wsuri = "ws://192.168.1.103:8080/cycling/realtime/socket";

      // const wsuri = "ws://10.1.30.202:50000/cycling/realtime/socket";
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = event => {
        console.log("数据已经链接", event);
        let that = this
        this.timerSocket = setInterval(() => {
          this.allpoint.forEach(item => {
            that.websock.send('cycling_' + item.getExtData().imei)
          })
        }, 1000);

      };
      this.websock.onmessage = res => {
        console.log("接收数据");
        this.curMarkerAllData = []
        this.curMarkerList = []
        this.$store.commit("SET_RANK", []);
        let objme = JSON.parse(res.data).content[0];

        // console.log(objme.id, objme.userName, objme.lng, objme.lat)
        if (objme) {
          this.allpoint.forEach((item, index) => {
            item.getExtData().oldLng = item.getExtData().lng
            item.getExtData().oldLat = item.getExtData().lat
            if (objme.lng !== 0 && objme.lat !== 0 && objme.imei == item.getExtData().imei) {

              if (item.getExtData().curMarkerObj) {
                this.curMarkerAllData.push(item.getExtData().curMarkerObj)
              }
              this.allpoint[index].setPosition(
                new AMap.LngLat(objme.lng, objme.lat)
              ); //实时更新自行车的位置
              let curInfo = item.getExtData().curMarkerObj
              for (let i in curInfo) {
                for (let z in objme) {
                  if (i == z) {
                    curInfo[i] = objme[z]
                  }
                }
              }
              if (curInfo) {
                curInfo.curMarkerData.push([objme.lng, objme.lat])
              }
              curInfo.rankNumber = AMap.GeometryUtil.distanceOfLine(curInfo.curMarkerData);
              // console.log(curInfo.userName, curInfo.rankNumber)
              item.getExtData().lng = objme.lng
              item.getExtData().lat = objme.lat

              this.curMarkerList = this.curMarkerAllData
              let arr = this.curMarkerList.sort(
                this.createComprisonFunction("rankNumber")
              );
              this.$store.commit("SET_RANK", arr.slice(0, 10));
            } else if (objme.lng == 0 && objme.lat == 0 && objme.imei == item.getExtData().imei) {
              this.allpoint[index].setMap(null);

              item.getExtData().lng = objme.lng
              item.getExtData().lat = objme.lat
            }

          })

        }
      };
      this.websock.onerror = e => {
        console.log("链接失败", e);
      };
      this.websock.onclose = e => {
        let that = this

        clearInterval(this.timerSocket);
        console.log("断开连接", e);
        this.websock.close(); //离开路由之后断开websocket连接
        if (e.currentTarget.readyState === 3) {
          this.initWebSocket();
        }
      };
    },
    heatMap () {
      this.MyMip.plugin(["AMap.HeatMap"], () => {
        //初始化heatmap对象
        this.heatmap = new AMap.HeatMap(this.MyMip, {
          radius: 65, //给定半径
          opacity: [0, 0.8]
        });
      });
    },
    initmap () {
      this.MyMip = new AMap.Map("container", {
        resizeEnable: true,
        // zoom: 11.6,
        // center: [121.003735, 31.021249],
        zoom: 13.5,
        center: [121.008434, 31.038352],

        mapStyle: "amap://styles/acd388fb971c7574c3c9219b4b04d90d"
      });
      if (!this.isSupportCanvas()) {
        alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
      }
      // this.MyMip.add(this.carGroup);
      let mypath = linePath.linePath
      let markerq = new AMap.Marker({
        icon: require("../../assets/image/qw.png"),
        position: [120.991449, 31.05981],
        offset: new AMap.Pixel(-40, -45)
      });
      markerq.setMap(this.MyMip);
      let markerz = new AMap.Marker({
        icon: require("../../assets/image/dx.png"),
        position: [121.032578, 31.060097],
        offset: new AMap.Pixel(-40, -40)
      });
      markerz.setMap(this.MyMip);
      let wdata = this.separateArr(mypath, 2);
      let poyline = new AMap.Polyline({
        path: wdata,
        map: this.MyMip,
        strokeColor: "red", //线颜色
        strokeWeight: 0,
        strokeOpacity: 0.5,
        outlineColor: "yellow",
        borderWeight: 9,
        lineJoin: "round",
        outlineColor: "#FF0ABBC5",
        isOutline: true
      });
      AMap.plugin("AMap.Weather", () => {
        var weather = new AMap.Weather();
        weather.getLive("青浦区", (err, data) => {
          this.$store.commit("SET_WEATER", data);
        });
      });

      this.heatMap()
    },
    isSupportCanvas () {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    },
    setMarker (row) {
      let marker = new AMap.Marker({
        map: this.MyMip,
        position: [row.lng, row.lat],
        icon: require("./arrow2@3x.png"),
        offset: new AMap.Pixel(-17, -16),
        extData: row
      });
      marker.on('click', e => {
        this.curInfoWindow = e.target.getExtData()
      })
      return marker;
    },
    setPolyline () {
      let passedPolyline = new AMap.Polyline({
        map: this.MyMip,
        strokeColor: "#AF5", //线颜色
        strokeWeight: 0.1 //线宽
      });
      return passedPolyline;
    },
    //数组的排序
    createComprisonFunction (propertyName) {
      return function (a, b) {
        var value1 = a[propertyName];
        var value2 = b[propertyName];
        /*
        * value2 - value1; ——> 降序
        * value1 - value2; ——> 升序
        */
        return value2 - value1;//升序排序
      };
    },

    //分隔数组，10
    separateArr (data, n) {
      //获取要切割的数组的长度
      let len = data.length;
      let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
      let res = [];
      for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = data.slice(i * n, i * n + n);
        res.push(temp);
      }

      return res;
    },
  }
};
</script>

<style lang="less" scoped>
.all-box {
  width: 100%;
  height: 100%;
  background-color: rgba(10, 28, 54, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  .infowindow {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    border: 1px solid #fff;
    background: blue;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
    line-height: 24px;
    z-index: 300;
    text-align: left;
    font-size: 18px;
  }

  .header-box {
    .vh(219);
    width: 100%;
    background: url('../../assets/image/TOP@3x.png') no-repeat;
    background-size: 100% 100%;
    z-index: 10;
  }
  .left-box {
    position: absolute;
    .vw(480);
    height: 100%;
    .left(0);
    .top(74);
    .padding(35,0,30,22);
    z-index: 10;
  }
  .right-t-box {
    position: absolute;
    .vw(480);
    // height: 100%;
    .right(0);
    .top(74);
    z-index: 10;
  }

  .right-b-box {
    position: absolute;
    .vw(480);
    // height: 100%;
    .right(0);
    .bottom(-60);
    z-index: 10;
  }
}
</style>
