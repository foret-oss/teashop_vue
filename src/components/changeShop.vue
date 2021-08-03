<template>
  <div>
    <p class="title">切换门店</p>
    <div v-for="(shop, index) in shops" :key="index" class="AllShop">
      <div class="aShop" @click="change(index)">
        <p>{{ shop.shopname }}</p>
        <p class="el-icon-map-location" id="address">{{shop.address}}</p>
        <el-button id="btn1" @click="open">去下单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shops: JSON.parse(window.sessionStorage.getItem("shops")),
    };
  },
  methods :{
      change(index){
          console.log(index);
          window.sessionStorage.setItem('NowShop',JSON.stringify(this.shops[Number(index)]));
      },
      open() {
        this.$mb.confirm('您当前所在位置距离该门店较远, 是否继续点单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已成功切换门店!',
          });
          this.$router.push("/order");
        });
        
      }
    }
};
</script>

<style lang="less" scoped>
.title{
    font-size: 0.7rem;
    position: absolute;
    transform: translate(20px,20px);
    color: rgb(85, 82, 82);
}
.AllShop{
    height: 6rem;
    background: rgb(236, 232, 232);
}
.aShop {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 80%;
  height: 100%;
  font-size: 0.5rem;
  transform: translate(0.9rem,2.5rem);
  background: rgb(223, 221, 221);
  border-bottom: solid 1px;
}
.aShop:hover{
    border: gold solid 2px;
}
#btn1{
  width: 180px;
  justify-self: center;
  align-self: center;
  transform: translate(-10px,20px);
  background: rgb(177, 176, 175);
}
#address{
    font-size: 0.4rem;
    color: rgb(78, 76, 76);
}
</style>