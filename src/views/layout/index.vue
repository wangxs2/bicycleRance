<template>
  <div class="all-box">
    <div class="header-box">内部测试赛数据保障系统</div>
    <div class="innder-box">
      <div class="left-box">
        <leftbox></leftbox>
      </div>
      <div class="right-box">
        <rightbox></rightbox>
      </div>
    </div>
  </div>
</template>

<script>
import leftbox from "./leftBox.vue"
import rightbox from "./rightBox.vue"
export default {
  components: {
    leftbox,
    rightbox
  },
  data() {
    return {
     
    };
  },
  created(){
  },
 
  methods: {
  
  
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
  overflow:hidden;
  .header-box{
    .vh(80);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .font-size(36);
    color: #ffffff;
    
  }
  .innder-box{
    width:100%;
    height:1;
    flex: 1;
    box-sizing:border-box;
    .padding(12,12,12,12);
    display: flex;
  
    .left-box{
      .vw(500);
      height: 100%;
        .margin(0,12,0,0);

      border-right: 1px solid#041948;
    }
    .right-box{
      flex: 1;
    }
  }
}
</style>
