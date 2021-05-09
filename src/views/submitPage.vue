<template>
  <div class="submit-page">
    <div class="title">
      2021首届“英宇杯”上海公安自行车公路邀请赛定位设备登录系统
    </div>

    <div class="input-from">
      <van-form @submit="onSubmit" @failed="onFailed">
        <div class="input-wrapper1">
          <div class="label"><span>*</span> 姓名:</div>
          <div class="input-content">
            <van-field
              v-model="form.name"
              :rules="[{ required: true, message: '请输入姓名' }]"
            ></van-field>
          </div>
        </div>
        <div class="input-wrapper1">
          <div class="label">手机:</div>
          <div class="input-content">
            <van-field
              v-model="form.tel"
              :rules="[{ required: false, message: '请输入11位手机' }]"
            ></van-field>
          </div>
        </div>
        <div class="input-wrapper1">
          <div class="label"><span>*</span> 设备号:</div>
          <div class="input-content">
            <van-field
              v-model="form.imei"
              :readonly="true"
              :rules="[{ required: true, message: '请输入' }]"
            ></van-field>
          </div>
        </div>

        <div
          v-if="submitBtn"
          style="
            display: flex;
            justify-content: center;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10;
            background: rgb(30, 90, 155);
          "
        >
          <van-button block type="info" native-type="submit">提 交</van-button>
        </div>
      </van-form>
    </div>

    <!-- 监管人员选择弹框 -->
    <van-dialog
      v-model="layoutShow"
      title="提交"
      show-cancel-button
      @confirm="confirmDialog"
    >
      <div style="text-align: center; margin-top: 20px; margin-bottom: 20px">
        确认提交吗？
      </div>
    </van-dialog>
    <van-overlay :z-index="9999" :show="showimg">
      <div class="wrapperfast">
        <van-loading size="64px" color="#1989fa" vertical
          >提交中...</van-loading
        >
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: 'submitPage',
  data () {
    return {
      form: {
        name: '',
        tel: '',
        imei: ''
      },
      layoutShow: false,
      showimg: false,
      submitBtn: true,
    }
  },
  components: {
  },
  created () {

    // console.log(window.location.search.substring(1))
    this.form.imei = window.location.href.split('imei=')[1]
  },
  mounted () {
    console.log(window.location.href)

  },
  methods: {
    // 提交
    onSubmit (values) {
      let reg = /^1[2|3|4|5|7|8][0-9]{9}$/
      console.log(reg.test(this.form.tel))
      if (this.form.tel && !reg.test(this.form.tel)) {
        this.$toast("请输入正确手机号码")
      } else {
        this.layoutShow = true
      }
    },
    onFailed (errorInfo) {
      this.$toast("请输入完整信息")
    },
    confirmDialog () {
      this.showimg = true
      // this.$fetchPost(`user/editName?name=${this.form.name}&imei=${this.form.imei}&tel=${this.form.tel}`).then(res => {
      this.$fetchPost(`user/editName`, this.form).then(res => {
        this.showimg = false
        this.$toast(res.message)
        if (res.code == 0) {
          this.submitBtn = false
        }
      }).catch(err => {
        this.showimg = false
        this.$toast("提交失败")
      })
    },

  },
}
</script>

<style lang="scss">
.submit-page {
  .title {
    font-size: 16px;
    line-height: 30px;
    color: #fff;
    font-weight: 600;
    font-family: YaHei;
    text-align: center;
    background: rgb(30, 90, 155);
    padding: 10px 10px;
    border-bottom: 2px solid rgb(236, 238, 238);
  }
  .input-from {
    padding: 18px;
    .input-wrapper1 {
      margin-top: 12px;
      .label {
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: 700;
        font-family: YaHei;
        span {
          color: red;
        }
      }
      .input-content {
        border: 2px solid rgb(236, 238, 238);
      }
    }
  }
  .van-button--info {
    background: rgb(30, 90, 155);
    font-size: 18px;
  }
  .wrapperfast {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
