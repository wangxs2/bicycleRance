<template>
  <div class="right-container" id="container"></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      MyMip: null,
      passedPolyline: null,
      timer: null, //d定时掉接口
      allpoint: [],
      allpolyine: [],
      allpolyPath: [],
      carGroup: new AMap.OverlayGroup(), // 参赛群组
      PolylineGroup: new AMap.OverlayGroup(), // 参赛群组的路径
      num:0,
      testData: [
        { name: 45 },
        { name: 47 },
        { name: 5 },
        { name: 4 },
        { name: 8 },
        { name: 45 },
        { name: 1 },
        { name: 45 },
        { name: 60.5 },
        { name: 80.1 },
        { name: 45.2 },
        { name: 45.3 }
      ]
    };
  },
  created() {
    this.getAllData();
    this.countDown()
    // console.log(this.testData.sort(this.createComprisonFunction("rankNumber")))
    // console.log(this.separateArr(this.testData,5))
  },
  destroyed() {
    // clearInterval(this.timer);
    // this.timer = null;
  },

  mounted() {
    this.initmap();
    
    
  },
  methods: {
    countDown(){
        this.timer = setTimeout(() => {
                this.getPath()
                clearTimeout(this.timer)
                return this.countDown()
            }, 5000)
    },
    countTime(){

    },
    initmap() {
      this.MyMip = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13,
        center: [121.003735, 31.021249],
        mapStyle: "amap://styles/90097c1f0b3d113e3a7d76ab05cbc420"
      });
      this.MyMip.add(this.carGroup);
      this.MyMip.add(this.PolylineGroup);
      let mypath = [
        120.991449,
        31.05981,
        120.991294,
        31.054582,
        120.991282,
        31.05412,
        120.989471,
        31.04876,
        120.989448,
        31.048534,
        120.988008,
        31.049107,
        120.986872,
        31.049273,
        120.984436,
        31.049539,
        120.98397,
        31.049788,
        120.979931,
        31.054778,
        120.979385,
        31.055119,
        120.973743,
        31.055628,
        120.970282,
        31.054489,
        120.970154,
        31.054161,
        120.972907,
        31.045519,
        120.972952,
        31.044903,
        120.972929,
        31.044171,
        120.972749,
        31.043266,
        120.972728,
        31.041001,
        120.973166,
        31.03849,
        120.973084,
        31.020724,
        120.976782,
        31.020865,
        120.977932,
        31.020396,
        120.984888,
        31.02056,
        120.985545,
        31.020589,
        120.987619,
        31.021436,
        120.989872,
        31.022228,
        120.99039,
        31.022603,
        120.991022,
        31.022811,
        120.992011,
        31.02277,
        120.992983,
        31.022436,
        120.994953,
        31.022507,
        120.9962,
        31.022638,
        120.996991,
        31.023498,
        120.998694,
        31.023602,
        121.000846,
        31.023789,
        121.001482,
        31.023512,
        121.001838,
        31.023235,
        121.002301,
        31.022496,
        121.002355,
        31.022052,
        121.002506,
        31.021748,
        121.002851,
        31.021507,
        121.003735,
        31.021249,
        121.005234,
        31.021193,
        121.009411,
        31.021367,
        121.010231,
        31.02168,
        121.01076,
        31.021695,
        121.01116,
        31.021477,
        121.01167,
        31.021508,
        121.02632,
        31.022205,
        121.028961,
        31.022583,
        121.043294,
        31.024305,
        121.047763,
        31.024894,
        121.049934,
        31.025402,
        121.053981,
        31.025858,
        121.072274,
        31.028352,
        121.07305,
        31.02886,
        121.073301,
        31.029358,
        121.073369,
        31.029867,
        121.073289,
        31.030443,
        121.072913,
        31.031039,
        121.072286,
        31.031411,
        121.0694,
        31.033062,
        121.066613,
        31.035064,
        121.062578,
        31.038179,
        121.061418,
        31.038583,
        121.060874,
        31.038645,
        121.060442,
        31.038566,
        121.060021,
        31.038487,
        121.059467,
        31.03905,
        121.059364,
        31.039366,
        121.059364,
        31.039665,
        121.059713,
        31.039745,
        121.060288,
        31.039745,
        121.061192,
        31.039806,
        121.061613,
        31.039921,
        121.061572,
        31.040167,
        121.061243,
        31.040695,
        121.059212,
        31.043915,
        121.057837,
        31.045467,
        121.056509,
        31.046498,
        121.056493,
        31.046672,
        121.056509,
        31.04698,
        121.055978,
        31.047663,
        121.054044,
        31.048831,
        121.052329,
        31.049555,
        121.051014,
        31.049837,
        121.048971,
        31.050642,
        121.045518,
        31.05207,
        121.044015,
        31.052614,
        121.043075,
        31.052815,
        121.042488,
        31.053016,
        121.041525,
        31.054183,
        121.040116,
        31.054867,
        121.039599,
        31.055491,
        121.039247,
        31.055793,
        121.032788,
        31.060078,
        121.032578,
        31.060097
      ];
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
        outlineColor: "#0368c6",
        isOutline: true
      });
      AMap.plugin("AMap.Weather", () => {
        var weather = new AMap.Weather();
        weather.getLive("青浦区", (err, data) => {
          this.$store.commit("SET_WEATER", data);
        });
      });
    },
    setMarker(row) {
      let marker = new AMap.Marker({
        position: [row.lng, row.lat],
        icon: require("./car.png"),
        offset: new AMap.Pixel(-17, -16)
      });
      return marker;
    },
    setPolyline() {
      let passedPolyline = new AMap.Polyline({
        map: this.MyMip,
        strokeColor: "#AF5", //线颜色
        strokeWeight: 0.1 //线宽
      });
      return passedPolyline;
    },
    getAllData() {
      let arpoly = [];
      this.$fetchGet("/cycling/user/getPositions")
        .then(res => {
          res.content.forEach((iteam, index) => {
            this.allpoint.push(this.setMarker(iteam));
            this.allpolyine.push(this.setPolyline());
            this.allpolyPath.push(arpoly);
            iteam.rankNumber = 0;
          });
          let arrw = this.separateArr(res.content, 10);
          this.$store.commit("SET_RANK", arrw);
          this.carGroup.addOverlays(this.allpoint);
          this.PolylineGroup.addOverlays(this.allpolyine);
          // this.MyMip.setCenter([res.content[0].lng,res.content[0].lat])
        })
        .catch(er => {});
    },

    //接受路径的
    getPath() {
      console.log("一次")
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
        .catch(er => {});
    },
    //数组的排序
    createComprisonFunction(propertyName) {
      return function(object1, object2) {
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
    separateArr(data, n) {
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
    }
  }
};
</script>

<style lang="less" scoped>
.right-container {
  width: 100%;
  height: 100%;
}
</style>
