<template>
  <div>
      <div class="main-1">a</div>
      <div class="main-2">
          <p  class="vip"><b>GO会员</b></p>
          <div>
              <el-avatar id="touxiang" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
      </div>
      <div class="main-3">c</div>
      <div class="main-4">d</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.main-1{
    height: 20em;
    background: url(../assets/background1.png);
    background-size: contain;
    opacity: 1;
    overflow:scroll;
  }
.main-2,.main-3,.main-4{
  background: rgb(238, 235, 235);
  height: 10cm;
  overflow: scroll;
}
#touxiang{
    position: absolute;
    top: 23em;
    left: 80%;
    height: 5em;
    width: 5em;
}
.vip{
    display: flex;
    font-size: 1.5em;
    font-family: 'Times New Roman', Times, serif;
}
</style>