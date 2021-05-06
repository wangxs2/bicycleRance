<template>
  <div>
    <span
      :sendSync="sendSync"
      :autoStart="autoStart"
      :defaultVal="defaultVal"
      >{{ countString }}</span
    >
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