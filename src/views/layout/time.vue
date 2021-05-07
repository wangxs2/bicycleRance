<template>
  <div>
    <span
      :sendSync="sendSync"
      :autoStart="autoStart"
      :defaultVal="defaultVal"
      >{{ countString }}</span
    >
<!-- 
       120.991449, 31.05981,
   120.991416,31.058287,
   120.99133,31.055953,
   120.991294, 31.054582,

   120.991282, 31.05412,
   120.990773,31.052616,
   120.990172,31.05087,


   120.989471, 31.04876,
   120.989448, 31.048534,
   120.988008, 31.049107,
   120.986872, 31.049273,
   120.984436, 31.049539,
   120.98397, 31.049788,

   120.98263,31.051409,
   120.981708,31.052604,
   120.979931, 31.054778,


   
   120.979385, 31.055119,
   120.976864,31.055375,
   120.973743, 31.055628,
   120.971971,31.055016,
   120.970282, 31.054489,
   120.970154, 31.054161,
   120.970904,31.051804,
   120.971633,31.049635,
   120.972406,31.047429,
   120.972907, 31.045519,
   120.972952, 31.044903,
   120.972929, 31.044171,
   120.972749, 31.043266, //22
   120.972728, 31.041001,//22
   120.973166, 31.03849,//22
   120.973134,31.03593,
   120.973048,31.033613,
   120.973091,31.030009,
   120.973048,31.02578,
   120.973084, 31.020724,
   120.975001,31.020779,
   120.976782, 31.020865,
   120.97808,31.020388,
   120.977932, 31.020396,
   120.98015,31.020392,
  120.982918,31.020448,
   120.985545, 31.020589,
   120.987619, 31.021436,
   120.989872, 31.022228,
   120.99039, 31.022603,
   120.991022, 31.022811,
   120.992011, 31.02277,
   120.992983, 31.022436,
   120.994953, 31.022507,
   120.9962, 31.022638,
  120.997133,31.023565,
  120.999021,31.023721,
  121.000925,31.023767,
  121.001794,31.023298,
   121.001838, 31.023235,
   121.002301, 31.022496,
   121.002355, 31.022052,
   121.002506, 31.021748,
   121.002851, 31.021507,
   121.003735, 31.021249,
   121.005234, 31.021193,
   121.007094,31.021266,
   121.009411, 31.021367,
   121.010231, 31.02168,
   121.01076, 31.021695,
   121.01116, 31.021477,
   121.013328,31.021597,
   121.015452,31.021689,
   121.018006,31.021781,
   121.021439,31.021983,
   121.024314,31.022057,
   121.02632, 31.022205,
   121.028091,31.022443,
   121.030022,31.022682,
   121.03161,31.022866,
   121.033369,31.023105,
   121.035343,31.023363,
   121.037596,31.023638,
   121.040493,31.023988,
   121.043294, 31.024305,
   121.047763, 31.024894,
   121.047763, 31.024894,
   121.049934, 31.025402,
   121.052016,31.025679,
   121.053981, 31.025858,
   121.05631,31.026135,
   121.058649,31.026374,
   121.060966,31.026686,
   121.063283,31.026944,
   121.065644,31.02733,
   121.068004,31.027698,
   121.070257,31.027992,
   121.072274, 31.028352,
   121.07305, 31.02886,
   121.073301, 31.029358,
   121.072913, 31.031039,
   121.069823,31.032791,
   121.0694, 31.033062,
   121.067773,31.034142,
   121.066613, 31.035064,
   121.064603,31.036661,
   121.062578, 31.038179,
   121.061418, 31.038583,
   121.060874, 31.038645,
   121.060442, 31.038566,
   121.060021, 31.038487,
   121.059467, 31.03905,
   121.059364, 31.039366,
   121.059364, 31.039665,
   121.059713, 31.039745,
  //  121.060288, 31.039745,
   121.061192, 31.039806,
   121.061613, 31.039921,
   121.061572, 31.040167,
   121.061243, 31.040695,
   121.06022,31.042384,
   121.059212, 31.043915,
   121.057837,  31.045467,
   121.056433,31.04658,
   121.056509, 31.04698,
   121.055978, 31.047663,
   121.054044, 31.048831,
   121.052329, 31.049555,
   121.051014, 31.049837,
   121.048971, 31.050642,
   121.046981,31.051488,
   121.045518, 31.05207,
   121.044015, 31.052614,
   121.043075, 31.052815,
   121.042488, 31.053016,
   121.041525, 31.054183,
   121.040116, 31.054867,
   121.039599, 31.055491,
   121.038224,31.056507,
   121.036379,31.057776,
   121.034555,31.058915,
   121.032788, 31.060078,
   121.032578, 31.060097, -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      isStart: false,
      globalTimer: null, //获取setInterval对象值
      countString: "", //用来显示时间
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      countVal: this.defaultVal, //获取初始值
      pauseTime: 0
    };
  },
  watch: {
    countString: {
      deep: true,
      handler: function (val, oldVal) {
        var vm = this;
        if (vm.needSendSunc) {
          vm.passToParent(val);
        }
      }
    },
    needSendSunc: {
      deep: true,
      handler: function (val) {
        var vm = this;
        if (val) {
          vm.passToParent(vm.countString);
        }
      }
    }
  },
  props: {
    sendSync: {
      type: Boolean,
      default: false
    },
    autoStart: {
      type: Boolean,
      default: false
    },
    defaultVal: {
      type: Number,
      default: 0
    }
  },
  mounted () {

    this.countDown()

  },
  computed: {
    needSendSunc: function () {
      return this.sendSync;
    }
  },
  created: function () {
    this.$on("startCount", function () {
      this.startCountFn();
    });
    this.$on("stopCount", function () {
      this.stopCountFn();
    });
  },
  components: {},
  methods: {
    // 倒计时
    countDown () {
      const that = this;
      //设置截止时间
      let outTime = "2021-05-16 13:00:00"
      // let outTime = "2021-05-16 13:00:00"
      let endDate = new Date(outTime).getTime();
      let timeID = setInterval(function () {
        //获取当前时间
        let date = new Date();
        let startDate = date.getTime();
        //时间差  
        let leftTime = endDate - startDate;
        if (leftTime >= 0) {
          that.remainD = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          that.remainH = Math.floor(leftTime / 1000 / 60 / 60 % 24) + that.remainD * 24;
          that.remainM = Math.floor(leftTime / 1000 / 60 % 60) < 10 ? '0' + Math.floor(leftTime / 1000 / 60 % 60) : Math.floor(leftTime / 1000 / 60 % 60);
          that.remainS = Math.floor(leftTime / 1000 % 60) < 10 ? '0' + Math.floor(leftTime / 1000 % 60) : Math.floor(leftTime / 1000 % 60);
          that.countString = `${that.remainH < 10 ? '0' + that.remainH : that.remainH}:${that.remainM}:${that.remainS}`;
        } else {
          if (that.autoStart) {
            that.startCountFn();
          }
          clearInterval(timeID);
        }
      }, 1000)
    },
    // 计算当前比赛进行时间
    counterFn: function (counterTime) {
      var vm = this;
      var nowDate = new Date().getTime();
      if (vm.pauseTime == 0) {
        var num = nowDate - counterTime; //计算时间毫秒差
      } else {
        vm.pauseTime = vm.pauseTime + 10;
        var num = vm.pauseTime - counterTime; //计算时间毫秒差
      }
      var leave1 = num % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      vm.day = Math.floor(num / (24 * 3600 * 1000)); //计算相差天数
      vm.hour = Math.floor(leave1 / (3600 * 1000)) < 10 ? '0' + Math.floor(leave1 / (3600 * 1000)) : Math.floor(leave1 / (3600 * 1000)); //计算相差小时
      vm.minute = Math.floor(leave2 / (60 * 1000)) < 10 ? '0' + Math.floor(leave2 / (60 * 1000)) : Math.floor(leave2 / (60 * 1000)); //计算相差分钟
      vm.second = Math.round(leave3 / 1000) < 10 ? '0' + Math.round(leave3 / 1000) : Math.round(leave3 / 1000); //计算相差秒
      vm.countString = `${vm.hour}:${vm.minute}:${vm.second}`;
    },
    startCountFn: function () {
      var vm = this;
      if (!vm.isStart) {
        vm.countVal = vm.countVal ? vm.countVal : new Date().getTime();
        var timer = setInterval(function () {
          vm.counterFn(vm.countVal);
        }, 10);
        vm.globalTimer = timer;
        vm.isStart = true;
      }
    },
    stopCountFn: function () {
      var vm = this;
      if (vm.isStart) {
        window.clearInterval(vm.globalTimer);
        vm.globalTimer = null;
        vm.isStart = false;
        vm.pauseTime = new Date().getTime();
      }
    },
    passToParent: function (data) {
      var vm = this;
      this.$emit("getDataFromChild", data);
    }
  }
};
</script>
<style>
</style>