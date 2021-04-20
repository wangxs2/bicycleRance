<template>
  <div class="all-box" id="container">
    <div class="header-box"></div>
    <div class="left-box">
      <leftbox></leftbox>
    </div>
    <div class="right-box">
      <rightbox></rightbox>
    </div>
  </div>
</template>

<script>
import leftbox from "./leftBox.vue";
import rightbox from "./rightBox.vue";
import linePath from './linePath'
export default {
  components: {
    leftbox,
    rightbox
  },
  data () {
    return {
      MyMip: null,
      passedPolyline: null,
      timer: null, //d定时掉接口
      allpoint: [],
      allpolyine: [],
      allpolyPath: [],
      carGroup: new AMap.OverlayGroup(), // 参赛群组
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
      websock: null
    };
  },
  created () {
    this.getAllData();
    this.initWebSocket();
  },

  mounted () {
    this.initmap();
    if (sessionStorage.getItem("isReload")) {
      console.log("页面被刷新");


      this.websock.close(); //离开路由之后断开websocket连接

      this.initWebSocket();
    } else {
      console.log("首次被加载");
      sessionStorage.setItem("isReload", true)
    }
  },
  destroyed () {
    // this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    countDown () {
      this.timer = setTimeout(() => {
        this.getPath();
        clearTimeout(this.timer);
        return this.countDown();
      }, 5000);
    },
    countTime () { },
    initWebSocket () {
      //初始化weosocket
      const wsuri = "ws://10.1.30.202:8080/cycling/realtime/socket";
      this.websock = new WebSocket(wsuri);

      this.websock.onopen = event => {
        console.log("数据已经链接", event);
        //  this.websock.send()
      };
      this.websock.onmessage = res => {
        console.log("接收数据");

        let objme = JSON.parse(res.data);
        console.log(objme);
        objme.content.forEach((iteam, index) => {
          this.allpoint[index].setPosition(
            new AMap.LngLat(iteam.lng, iteam.lat)
          ); //实时更新自行车的位置
          // setTimeout(() => {
          this.heatmapData = this.cloneObj(objme.content)
          this.heatmap.setDataSet({ data: this.heatmapData, max: 100 });
          this.allpolyPath[index].push(new AMap.LngLat(iteam.lng, iteam.lat));
          this.allpolyine[index].setPath(this.allpolyPath[index]);
          iteam.rankNumber = this.allpolyine[index].getLength();

          // }, 5000);
        });
        // setTimeout(() => {
        let arr = this.cloneObj(objme.content).sort(
          this.createComprisonFunction("rankNumber")
        );
        this.$store.commit("SET_RANK", this.separateArr(arr, 10));
        //  }, 5000);
      };
      this.websock.onerror = e => {
        console.log("链接失败");
        console.log(e);
      };
      this.websock.onclose = e => {
        console.log("断开连接", e);
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
          radius: 5, //给定半径
          opacity: [0, 0.8]
          /*,
          gradient:{
              0.5: 'blue',
              0.65: 'rgb(117,211,248)',
              0.7: 'rgb(0, 255, 0)',
              0.9: '#ffea00',
              1.0: 'red'
          }
          */
        });
        //设置数据集：该数据为北京部分“公园”数据
        // this.heatmap.setDataSet({
        //     data: this.heatmapData,
        //     max: 100
        // });
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
        offset: new AMap.Pixel(-17, -16)
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
    getAllData () {
      let arpoly = [];
      this.$fetchGet("/cycling/user/getPositions")
        .then(res => {
          res.content.forEach((iteam, index) => {
            this.allpoint.push(this.setMarker(iteam));
            this.allpolyine.push(this.setPolyline());
            this.allpolyPath.push(arpoly);
            iteam.count = 1;
            iteam.rankNumber = 0;
          });
          this.heatmapData = this.cloneObj(res.content)
          this.heatmap.setDataSet({ data: this.heatmapData, max: 100 });
          let arrw = this.separateArr(res.content, 10);
          this.$store.commit("SET_RANK", arrw);
          this.carGroup.addOverlays(this.allpoint);
          this.PolylineGroup.addOverlays(this.allpolyine);
          // this.MyMip.setCenter([res.content[0].lng,res.content[0].lat])
        })
        .catch(er => { });
    },

    //接受路径的
    getPath () {
      console.log("一次");
      this.$fetchGet("/cycling/user/getPositions")
        .then(res => {
          res.content.forEach((iteam, index) => {
            this.allpoint[index].setPosition(
              new AMap.LngLat(iteam.lng, iteam.lat)
            );
            // this.allpolyPath[index].push(new AMap.LngLat(iteam.lng, iteam.lat));
            // this.allpolyine[index].setPath(this.allpolyPath[index]);
            // iteam.rankNumber = this.allpolyine[index].getLength();
          });
          // let arr = this.cloneObj(res.content).sort(
          //   this.createComprisonFunction("rankNumber")
          // );
          // this.$store.commit("SET_RANK", this.separateArr(arr, 10));
        })
        .catch(er => { });
    },
    //数组的排序
    createComprisonFunction (propertyName) {
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        if (value1 < value2) {
          return -1;
        } else if (value1 > value2) {
          return 1;
        } else {
          return 0;
        }
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
    getPositionData () {
      this.$fetchGet("/cycling/user/getPositionList", this.query).then(res => {
        console.log(res);
      });
    }
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
  .right-box {
    position: absolute;
    .vw(480);
    height: 100%;
    .right(0);
    .top(74);
    z-index: 10;
  }
}
</style>
