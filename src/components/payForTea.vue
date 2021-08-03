<template>
  <div>
    <el-page-header @back="goBack" content="订单结算"> </el-page-header>
    <div class="part1">
      <div class="btn" @click="changeShop">
        <el-button id="shopname" class="el-icon-location-outline">{{
          this.NowShop.shopname
        }}</el-button>
      </div>
      <el-input :value="phonenumber" class="phonenumber">
        <template slot="prepend">联系电话</template>
      </el-input>
    </div>
    <div class="waitTime">
      <span class="demonstration">取茶时间</span>
      <el-slider v-model="value" :format-tooltip="formatTooltip"></el-slider>
      <p class="waitTimeText">前面 10 单/28 杯制作中,预计28分钟后取茶</p>
    </div>
    <div class="teasOrderd" title="商品详情">
      <p class="title1">商品详情</p>
      <p class="title2">选购商品，注意选对冰度和甜度</p>
      <div
        class="allTeas"
        v-show="num >= 0"
        v-for="(tea, i) in teasOrderd"
        :key="i"
      >
        <!--奶茶图片展示-->
        <div class="milk-icon">
          <img
            src="../assets/id0001.jpg"
            alt=""
            width="70px"
            height="70px"
            style="border-radius: 5px"
          />
        </div>
        <!--奶茶信息展示-->
        <div class="milk-content" v-for="(ch, j) in allChoices" :key="j">
          <p class="name">{{ tea.teaname }}</p>
          <p class="desc">{{ ch }}</p>
          <p class="price">￥{{ tea.basicprice }}</p>
        </div>
      </div>
    </div>
    <div class="pay">
      <p class="price2">合计：￥{{ this.price }} (共{{this.num}}件)</p>
      <el-button class="payBtn" type="primary" @click="Pay">确认支付</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      NowShop: JSON.parse(window.sessionStorage.getItem("NowShop")),
      phonenumber: window.sessionStorage.getItem("phonenumber"),
      value: 20,
      teasOrderd: JSON.parse(window.sessionStorage.getItem("AllTeas")),
      allChoices: JSON.parse(window.sessionStorage.getItem("AllChoices")),
      price: window.sessionStorage.getItem("priceNow"),
      shop: JSON.parse(window.sessionStorage.getItem("NowShop")),
      num: window.sessionStorage.getItem("shopCartNumAll"),
      historyOrders: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changeShop() {
      this.$router.push("/changeShop");
    },
    formatTooltip(val) {
      return val;
    },
    Pay() {
      for (let i = 0; i < this.teasOrderd.length; i++) {
        this.$axios
          .post("/purchase", {
            username: window.sessionStorage.getItem("userName"),
            password: window.sessionStorage.getItem('password'),
            shopname: this.shop.shopname,
            teaname: this.teasOrderd[i].teaname,
            sweet: "微甜",
            condition: "少量冰",
            addmaterial: "不加料",
            number: Number(window.sessionStorage.getItem("shopCartNumAll")),
            totalprice: Number(this.price),
          })
          .then((res) => {
            console.log("请求支付成功，返回数据：", res);
          })
          .catch(function (err) {
            console.log("请求支付失败", err);
          });
      }

      var w =
        Number(window.sessionStorage.getItem("walletNow")) - Number(this.price);
      if (Number(w) < 0) {
        this.$mb.alert("您的余额不足啦", "支付失败", {
          confirmButtonText: "确定",
        });
      } else {
        this.$message.success("成功支付 " + this.price + "元");
        window.sessionStorage.setItem("walletNow", w);
        window.sessionStorage.setItem("shopCartNumAll", 0);
        window.sessionStorage.setItem("priceNow", 0);
        this.historyOrders.push(this.teasOrderd);
        window.sessionStorage.setItem('historyOrders',JSON.stringify(this.historyOrders));
        window.sessionStorage.removeItem('AllTeas');
        window.sessionStorage.removeItem('AllChoices');
        window.sessionStorage.removeItem('choicesNow');
        console.log("奶茶名",this.teasOrderd[0].teaname);
        console.log('店名',this.shop.shopname);
        this.$router.push("/orderForm");
      }
    },
  },
};
</script>

<style lang="less" scoped>
#shopname {
  font-size: 20px;
  transform: translate(10px);
}
.el-page-header {
  line-height: 50px;
  background: rgb(222, 222, 224);
}
.phonenumber {
  width: 300px;
  font-size: 18px;
  transform: translate(5px);
}
.waitTime {
  display: flex;
  flex-direction: column;
  width: 400px;
  font-size: 25px;
  height: 3rem;
  background: rgb(233, 232, 232);
  border-radius: 10px;
  padding-top: 8px;
  border: 10px;
  margin: 5px;
  .waitTimeText {
    font-size: 17px;
  }
}
.teasOrderd {
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px;
  background: rgb(233, 232, 232);
  width: 400px;
  border-radius: 10px;
  border: 10px;
  .title1 {
    font-size: 25px;
  }
  .title2 {
    font-size: 12px;
    color: rgb(119, 117, 117);
    transform: translate(0, -30px);
  }
  .allTeas {
    display: flex;
    flex-direction: row;
    font-size: 15px;
    padding: 10px;
    .milk-content {
      transform: translate(20px, -20px);
    }
  }
}
.pay {
  display: flex;
  flex-direction: row;
  transform: translate(5px, 10px);
  width: 400px;
  border: 10px;
  padding-top: 5px;
  background: rgb(233, 232, 232);
  font-size: 20px;
  .payBtn {
    height: 1.3rem;
    transform: translate(100px, 10px);
    background: rgb(185, 147, 49);
    border: 0px;
  }
}
</style>