<template>
  <div class="all-box" id="container">
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
      allpoint1: [],
      allpolyine: [],
      allpolyPath: [],
      carGroup: new AMap.OverlayGroup(), // 参赛群组
      carGroup1: new AMap.OverlayGroup(), // 参赛群组
      PolylineGroup: new AMap.OverlayGroup(), // 参赛群组的路径
      num: 0,
      testData: [],
      heatmap: null,
      heatmapData: [],
      query: {
        page: 1,
        pageSize: 15,
        imei: ""
      },
      websock: null,
      timerSocket: null,

      curMarkerList: [],
      linePathList: [],
      curDataList: []

    };
  },
  created () {
    this.getImeis()
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
  },
  methods: {
    getImeis () {
      let arpoly = [];
      this.$fetchGet('/cycling/user/getImeis').then(res => {
        res.content.forEach((items, indexs) => {
          items.curMarkerObj = {}
          items.curMarkerData = []
          items.count = 0;
          items.rankNumber = 0;
          this.allpoint.push(this.setMarker(items));
          // 计算点位是否在当前路线点200米之内
          this.curDataList.forEach((item, index) => {
            this.allpoint1.push(this.setMarker(item));
            var p1 = this.allpoint1[index].getPosition();
            var p2 = this.allpoint[indexs].getPosition();
            var textPos = p1.divideBy(2).add(p2.divideBy(2));
            var distance = Math.round(p1.distance(p2));
            if (distance <= 200) {
              item.count = item.count + 1
              this.$set(this.curDataList, 'count', items.count + 1)
            }
          })
        })
        this.heatmapData = this.cloneObj(this.curDataList)
        this.heatmap.setDataSet({ data: this.heatmapData, max: 100 });
        let arrw = res.content.slice(0, 10)
        this.$store.commit("SET_RANK", arrw);
        this.carGroup.addOverlays(this.allpoint);
        this.carGroup1.addOverlays(this.allpoint1);
        this.initWebSocket();
      })
    },
    countTime () { },
    initWebSocket () {
      //初始化weosocket
      // const wsuri = "ws://101.231.47.116:50000/cycling/realtime/socket";
      // const wsuri = "ws://192.168.1.106:8080/cycling/realtime/socket";
      // const wsuri = "ws://192.168.1.104:8080/cycling/realtime/socket";

      const wsuri = "ws://10.1.30.202:50000/cycling/realtime/socket";
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
        this.curDataList = []
        this.curMarkerList = []
        this.$store.commit("SET_RANK", []);
        let objme = JSON.parse(res.data);
        objme.content.forEach((iteam, index) => {
          if (iteam.id == 1202 || iteam.id == 1203) {
            console.log(iteam.id, iteam.lng, iteam.lat, '777777777777')
          }
          this.allpoint.forEach((item, indexs) => {
            if (iteam.imei == item.getExtData().imei) {
              item.lng = iteam.lng
              item.lat = iteam.lat
              this.allpoint[indexs].setPosition(
                new AMap.LngLat(iteam.lng, iteam.lat)
              ); //实时更新自行车的位置
              item.getExtData().curMarkerObj = iteam
              item.getExtData().curMarkerData.push([iteam.lng, iteam.lat])
              item.getExtData().curMarkerObj.rankNumber = AMap.GeometryUtil.distanceOfLine(item.getExtData().curMarkerData);
            }
          })
        });

        this.allpoint.forEach(item => {
          if (item.getExtData().curMarkerObj) {
            this.curMarkerAllData.push(item.getExtData().curMarkerObj)
          }
          // // 计算点位是否在当前路线点200米之内
          // this.curDataList.forEach((item, index) => {
          //   this.allpoint1.push(this.setMarker(item));
          //   var p1 = this.allpoint1[index].getPosition();
          //   var p2 = this.allpoint[indexs].getPosition();
          //   var textPos = p1.divideBy(2).add(p2.divideBy(2));
          //   var distance = Math.round(p1.distance(p2));
          //   if (distance <= 200) {
          //     item.count = item.count + 1
          //     this.$set(this.curDataList, 'count', items.count + 1)
          //   }
          // })
        })

        this.curMarkerList = this.curMarkerAllData
        // this.curMarkerList.forEach(item => {
        //   // console.log(item.userName, item.rankNumber)
        // })
        let arr = this.curMarkerList.sort(
          this.createComprisonFunction("rankNumber")
        );
        this.$store.commit("SET_RANK", arr.slice(0, 10));

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
    initmap () {
      this.MyMip = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13,
        center: [121.003735, 31.021249],
        mapStyle: "amap://styles/acd388fb971c7574c3c9219b4b04d90d"
      });
      if (!this.isSupportCanvas()) {
        alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
      }
      this.MyMip.add(this.carGroup);
      this.MyMip.add(this.PolylineGroup);
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

      this.MyMip.plugin(["AMap.HeatMap"], () => {
        //初始化heatmap对象
        this.heatmap = new AMap.HeatMap(this.MyMip, {
          radius: 50, //给定半径
          opacity: [0, 0.8],          //热力图的透明度,分别对应heatmap.js的minOpacity和maxOpacity
          gradient: {          //热力图的颜色渐变区间。   {JSON}:key 插值的位置, 0-1;  value颜色值 
            0.5: 'blue',
            0.65: 'rgb(117,211,248)',
            0.7: 'rgb(0, 255, 0)',
            0.9: '#ffea00',
            1.0: 'red'
          }
        });
      });
    },
    isSupportCanvas () {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    },
    setMarker (row) {
      let marker = new AMap.Marker({
        position: [row.lng, row.lat],
        icon: require("./car.png"),
        offset: new AMap.Pixel(-17, -16),
        extData: row
      });
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
  .header-box {
    .vh(219);
    width: 100%;
    background: url('../../assets/image/TOP@3x.png');
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
