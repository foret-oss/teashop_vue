<template>
  <div>
    <el-tabs v-model="activeName" class="head1">
      <el-tab-pane class="tab1" label="当前订单" name="first">
        <div class="head2">
          <el-button class="el-icon-map-location" @click="check" id="btn">{{
            this.NowShop.shopname
          }}</el-button>
          <div class="making">
            <p>制作中</p>
            <p class="el-icon-arrow-right"></p>
          </div>
        </div>
        <div class="part1" @click ="handleClick">
          <p class="orderNumber">8004</p>
          <p class="text1">前方2单/5杯制作中</p>
          <p class="text2">￥21(共1件)</p>
        </div>
      </el-tab-pane>
      <el-tab-pane @click ="handleClick" class="tab2" label="历史订单" name="second" >

        <div class="part2" v-for="(order, i) in historyOrders" :key="i">
          <div class="head2">
            <el-button class="el-icon-map-location" @click="check" v-show="NowShop.shopname !== null"
              >{{ NowShop.shopname }}
            </el-button>
            <div class="making">
              <p>已完成</p>
              <p class="el-icon-arrow-right"></p>
            </div>
          </div>
            <div class="tea">
              <!--奶茶图片展示-->
              <div class="milk-icon">
                <img
                  src="../assets/id0013.jpg"
                  alt=""
                  width="70px"
                  height="70px"
                  style="border-radius: 5px"
                />
              </div>
              <!--奶茶信息展示-->
              <div class="milk-content">
                <p class="name">{{ order.teaname }}</p>
                <p class="price">￥{{ order.basicprice + 'x' + order.number}}</p>
              </div>
            </div>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      NowShop: JSON.parse(window.sessionStorage.getItem("NowShop")),
      historyOrders: [],
    };
  },
  methods: {
    check() {
      console.log("当前门店", this.NowShop.shopname);
    },
    handleClick(){
        this.$axios
          .post("/gethistory", {
            username: window.sessionStorage.getItem("userName"),
            password: window.sessionStorage.getItem('password'),
          })
          .then((res) => {
            console.log("请求历史订单成功，返回数据：", res);
            this.historyOrders.push(res.data);
            console.log("历史订单",this.historyOrders);
          })
          .catch(function (err) {
            console.log("请求历史订单失败", err);
          });
    }
  },
};
</script>


<style lang="less" scoped>
#btn{
    background: rgb(245, 243, 243);
}
.head1 {
  position: absolute;
  top: 30px;
}
.making {
  display: flex;
  flex-direction: row;
  font-size: 15px;
  padding-left: 150px;
}
.head2 {
  display: flex;
  flex-direction: row;
}
.part1 {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 4rem;
  margin: 10px;
  line-height: 30px;
  background: rgb(245, 243, 243);
  border-radius: 10px;
  .orderNumber {
    font-size: 30px;
    transform: translate(10px);
  }
  .text1 {
    font-size: 15px;
    color: rgb(252, 194, 88);
    transform: translate(10px, -40px);
  }
  .text2 {
    font-size: 20px;
    transform: translate(280px, -60px);
  }
}
.part2{
    background: rgb(236, 235, 234);
}
.tea{
    display: flex;
    flex-direction: row;
    transform: translate(10px,10px);
    .milk-content{
        font-size: 15px;
        transform: translate(100px,-10px);
    }
}
</style>
