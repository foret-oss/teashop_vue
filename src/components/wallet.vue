<template>
  <div>
    <div class="walletback"></div>
    <div class="chongzhi">
      <el-card class="box-card">
        <ul class="msg-box">
          <li>
            <p>点击下方充值</p>
          </li>
          <li>
            <h4>充值金额</h4>
            <el-radio-group v-model="amountVal" @change="amountChange">
              <el-radio border :label="'' + 100">充值100</el-radio>
              <el-radio border :label="'' + 500">充值500</el-radio>
              <el-radio border :label="'' + 1000">充值1000</el-radio>
              <el-radio border :label="'' + 2000">充值2000</el-radio>
              <el-radio border :label="'' + 5000">充值5000</el-radio>
              <el-radio border :label="''">自定义</el-radio>
            </el-radio-group>
          </li>

          <li>
            <h4>自定义充值金额</h4>
            <!-- <img src="{:url('qrcode',['text'=>$text])}" /> -->
            <el-input
              :disabled="disabled"
              clearable
              v-model="rechargeParams.totalAmt"
              placeholder="请输入金额"
              style="width: 150px"
            ></el-input>
          </li>
        </ul>
        <div style="text-align: center; margin-top: 30px">
          <el-button type="primary" @click="surePay">确认支付</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amountVal: "",
      disabled: false,
      //充值参数
      rechargeParams: {
        totalAmt: "", //金额
      },
      code: "",
    };
  },

  methods: {
    //充值金额
    amountChange(val) {
      this.rechargeParams.totalAmt = val;
      console.log("充值金额", val, this.rechargeParams.totalAmt);
      if (val == "") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    //确认支付
    surePay() {
      if (this.rechargeParams.totalAmt == "") {
        this.$message.warning("请输入金额");
        return;
      }
      //未获得后端数据时先使用该代码
      else {
        console.log("确认支付", "支付金额", this.rechargeParams.totalAmt);
        this.$message.success(
          "充值成功！充值金额为 " + this.rechargeParams.totalAmt
        );

        this.$axios
        .post("/recharge",{username: window.sessionStorage.getItem('userName'),
                          password: window.sessionStorage.getItem('password'),
                          money: this.rechargeParams.totalAmt})
        .then((res) => {
          console.log("请求充值后的钱包成功，返回数据：", res.data.money);
          window.sessionStorage.setItem('walletNow',res.data.money);
        })
        .catch(function (err) {
          console.log("请求充值后的钱包失败", err);
        });  


        //var w = Number(window.sessionStorage.getItem('walletBefore')) + Number(this.rechargeParams.totalAmt);
       // window.sessionStorage.setItem('walletNow',w);
        this.$router.push({
          path: "/user",
          query: { wallet: this.rechargeParams.totalAmt },
        });
      }

      /*支付需要请求的数据，获得后端数据后使用该段代码
      post("/wallet", this.rechargeParams).then((res) => {
        var result = res.result;
        if (res.code === 20000) {
            console.log("result " + result);
            this.$message.success("充值成功！充值金额为 " + result);
            sessionStorage.qrurl = result.qrurl;
            console.log("qrurl " + result.qrur);
            sessionStorage.amt = this.rechargeParams.totalAmt;
            this.$router.push({ path: "/user", query: { wallet: result } });} 
      });
      */
    },
  },
};
</script>

<style lang="less" scoped>
.walletback {
  background: url(../assets/walletnext.jpg) no-repeat;
  width: 100%;
  height: 53rem;
  background-size: contain;
  position: absolute;
}
.chongzhi {
  display: flex;
  font-size: 20px;
  position: absolute;
  top: 1350px;
}
.msg-box > li {
  list-style: none;
  border-bottom: 1px solid #c5c5c5;
  padding: 10px;
}
.el-radio{
    display: flex;
    width: 150px;
    position:relative;
    padding: 5px;
}
.el-card__body{
  width: 9rem;
}
</style>