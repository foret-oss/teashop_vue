<template>
  <div>
    <div class="part1">
      <div class="btn" @click="changeShop">
        <el-button class="el-icon-map-location">{{
          this.NowShop.shopname
        }}</el-button>
      </div>
      <el-switch
        class="chooseBtn"
        v-model="value1"
        active-text="自取"
        inactive-text="外卖"
      >
      </el-switch>
    </div>

    <!--茶和列表联动页面-->
    <div class="wrapper">
      <div class="content" ref="wrapper">
        <!--左侧导航栏-->
        <div class="goodMenu" ref="goodMenu">
          <ul>
            <li
              v-for="(item, index) in goodMenu"
              :key="index"
              :class="{ active: currentWrapIndex === index }"
              @click="selectLeft(index)"
              ref="lItem"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <!--右上滚动栏-->
        <div class="banner">
          <div class="topBanner1">
            <div
              v-for="(imgUrl, index) in bannerList1"
              :key="index"
              v-show="index == currentIndex"
              class="topBannershow1"
            >
              <img :src="imgUrl" style="width: 100%" />
            </div>
            <div class="bar">
              <span v-for="(item, index) in bannerList1" :key="index"></span>
            </div>
          </div>

          <div class="topBanner2">
            <div
              v-for="(imgUrl, index) in bannerList2"
              :key="index"
              v-show="index == currentIndex"
              class="topBannershow2"
            >
              <img :src="imgUrl" style="width: 100%" />
            </div>
            <div class="bar">
              <span v-for="(item, index) in bannerList2" :key="index"></span>
            </div>
          </div>

          <!--右下奶茶栏-->
          <div class="goodList" ref="goodList">
            <ul>
              <li v-for="(items, index) in goodList" :key="index" ref="rItem">
                <div class="title">{{ items.name }}</div>

                <div
                  class="milkTea"
                  v-for="(item, key) in items.data"
                  :key="key"
                >
                  <!--奶茶图片展示-->
                  <div class="milk-icon" @click="showAboutmilk(index, key)">
                    <img
                      :src="items.icons"
                      alt=""
                      width="70px"
                      height="70px"
                      style="border-radius: 5px"
                    />
                  </div>
                  <!--奶茶信息展示-->
                  <div class="milk-content" @click="showAboutmilk(index, key)">
                    <p class="name">{{ item.teaname }}</p>
                    <p class="desc">{{ item.profile }}</p>
                    <p class="price">￥{{ item.basicprice }}</p>
                  </div>
                  <!--奶茶信息弹窗展示-->
                  <p class="text">选规格</p>
                </div>
              </li>
            </ul>
            <el-drawer
              title="欢迎光临喜茶"
              :visible.sync="showAbout"
              :wrapperClosable="true"
              ref="drawer"
              direction="rtl"
              size="70%"
            >
              <div class="aboutIcon">
                <img
                  src="../assets/id0022.jpg"
                  alt=""
                  width="250px"
                  height="250px"
                  style="border-radius: 5px"
                />
              </div>
              <div class="aboutContent">
                <p class="aboutName">{{ this.currentClickMilk.teaname }}</p>
                <p class="aboutDesc">
                  {{ this.currentClickMilk.introduction }}
                </p>
                <div class="aboutChoice">
                  <div class="choices" v-for="(choice, i) in choices" :key="i">
                    <p>{{ choice.name }}</p>
                    <p class="ch1" @click="ch1Click(i)">
                      {{ choice.ch1 }}
                    </p>
                    <p class="ch2" @click="ch2Click(i)">
                      {{ choice.ch2 }}
                    </p>
                  </div>
                </div>
                <div class="aboutPrice">
                  <p>￥{{ this.currentClickMilk.basicprice }}</p>
                  <el-input-number
                    v-model="num"
                    @change="handleChange"
                    :min="0"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                  <p class="cartDesc">{{ this.chNow }}</p>
                  <el-button class="aboutBtn" @click="addToCart"
                    >加入购物车</el-button
                  >
                </div>
              </div>
            </el-drawer>
          </div>
        </div>
        <div v-show="this.shopCartNumAll !== 0" class="shopcartBox">
          <el-badge :value="shopCartNumAll">
            <el-button size="small">购物车</el-button>
          </el-badge>
          <div class="priceNow">￥{{ this.priceNow }}</div>
          <div class="payBtn">
            <el-button type="primary" @click="PayAll">结算</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--右侧的奶茶栏-->
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      value1: true,
      bannerList1: [
        require("../assets/bnr1.jpg"),
        require("../assets/bnr2.jpg"),
        require("../assets/bnr3.jpg"),
        require("../assets/bnr4.jpg"),
      ],
      bannerList2: [
        require("../assets/bnr8.png"),
        require("../assets/bnr8.png"),
        require("../assets/bnr8.png"),
        require("../assets/bnr8.png"),
      ],
      currentIndex: 0, //默认显示图片
      NowShop: JSON.parse(window.sessionStorage.getItem("NowShop")),
      number: 30,
      showAbout: false,
      goodMenu: [
        "暴柠家族",
        "果茶家族",
        "波波家族",
        "喜茶制冰",
        "茗/牛乳茶",
        "热饮推荐",
        "喜茶咖啡",
        "瓶装饮品",
        "每日鲜食",
        "当季限定",
        "人气必喝榜",
        "茶12",
      ],
      scrollY: 0, //获取实时滚动位置
      heightList: [], //获取每一个li的高度
      choices: [
        { name: "绿色喜茶", ch1: "PLA可降解吸管(推荐)", ch2: "不使用吸管" },
        { name: "状态", ch1: "冰", ch2: "温", ch23: "一点温", ch24: "比较烫" },
        {
          name: "甜度",
          ch1: "标准甜(推荐)",
          ch2: "少甜",
          ch33: "少少甜",
          ch34: "少少少少甜",
          ch35: "不另外加糖",
        },
        { name: "加料", ch1: "果粒", ch2: "红豆", ch3: "芋泥", ch44: "燕麦" },
        { name: "分装", ch1: "分装", ch2: "不分装" },
      ],
      choicesNow: [],
      chNow: '',
      goodList: [
        {
          name: "暴柠家族",
          icons: require("../assets/id0004.jpg"),
          data: JSON.parse(window.sessionStorage.getItem("teaGroup0")),
          chNow: JSON.parse(window.sessionStorage.getItem("choicesNow")),
        },

        {
          name: "果茶家族",
          icons: require("../assets/id0005.jpg"),
          data: JSON.parse(window.sessionStorage.getItem("teaGroup1")),
          chNow: JSON.parse(window.sessionStorage.getItem("choicesNow")),
        },

        {
          name: "波波家族",
          icons: require("../assets/id0006.jpg"),
          data: JSON.parse(window.sessionStorage.getItem("teaGroup2")),
          chNow: JSON.parse(window.sessionStorage.getItem("choicesNow")),
        },

        {
          name: "喜茶制冰",
          icons: require("../assets/id0007.jpg"),
          data: JSON.parse(window.sessionStorage.getItem("teaGroup3")),
          chNow: JSON.parse(window.sessionStorage.getItem("choicesNow")),
        },

        {
          name: "纯茶",
          icons: require("../assets/id0008.jpg"),
          data: JSON.parse(window.sessionStorage.getItem("teaGroup4")),
          chNow: JSON.parse(window.sessionStorage.getItem("choicesNow")),
        },
        {
          name: "茗茶/牛乳茶",
          icons: require("../assets/id0010.jpg"),
          data: JSON.parse(window.sessionStorage.getItem("teaGroup5")),
          chNow: JSON.parse(window.sessionStorage.getItem("choicesNow")),
        },
      ],
      loading: false,
      num: 0,
      shopCartNumNow: 0,
      shopCartNumAll: Number(window.sessionStorage.getItem("shopCartNumAll")),
      currentClickMilk: "",
      priceNow: window.sessionStorage.getItem("priceNow"),
      AllTeas:[],
      AllChoices: [],
    };
  },

  computed: {
    //当前想要选中的茶
    currentWrapIndex() {
      const index = this.heightList.findIndex((item, index) => {
        return (
          this.scrollY >= this.heightList[index] &&
          this.scrollY < this.heightList[index + 1]
        );
      });

      return index > 0 ? index : 0;
    },
  },

  methods: {
    changeShop() {
      this.$router.push("/changeShop");
    },
    autoPlay() {
      //console.log(this.currentIndex);
      if (this.currentIndex === this.bannerList1.length - 1) {
        //当遍历到最后一张图片置零
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    },
    play() {
      //定时器
      //setInterval(this.autoPlay, 1000);
      setInterval(() => this.autoPlay(), 3000);
    },
    change(i) {
      this.currentIndex = i;
    },
    selectLeft(index) {
      //点击左边茶栏，立马高亮，不会等到右侧滚动结束后，左侧茶栏才开始高亮（优化）
      this.scrollY = this.heightList[index];

      console.log(
        "selectLeft中的scrollY, index, this.currentWrapIndex:",
        this.scrollY,
        index,
        this.currentWrapIndex
      );
      window.addEventListener("scroll", () => {
        console.log("监听实时滚动距离", window.scrollY);
      });

      //点击了左侧茶，获取相应右侧列表的元素，并使用Bscroll提供的scrollToElement()  Api跳转
      let rItem = this.$refs.rItem;
      let el = rItem[index];
      this.goodmenu.scrollToElement(el, 500);
    },

    //初始化 better-scroll
    _scrollInit() {
      this.menuList = new BScroll(this.$refs.goodMenu, {
        //设置点击为true，左边茶栏才能点击
        click: true,
      });

      this.goodmenu = new BScroll(this.$refs.goodList, {
        //选中模式2，避免惯性的滑动也触发事件
        probeType: 2,
        click: true,
      });

      this.goodmenu.on("scroll", (pos) => {
        //获取实时滚动的距离 使用scrollY接收
        this.scrollY = Math.abs(pos.y);
        window.addEventListener("scroll", () => {
          console.log("监听实时滚动距离", window.scrollY);
        });
        console.log("实时滚动距离：", this.scrollY);
      });

      this.goodmenu.on("scrollEnd", (pos) => {
        //结束时触发事件获取一次位置，因为使用了模式2，惯性滚动不触发事件
        this.scrollY = Math.abs(pos.y);
      });
    },
    //获取右侧列表每一个li的高度，存入数组中
    getHeight() {
      //获取每一个li的高度
      const lis = this.$refs.rItem;
      //heightList的第一个元素为0
      let height = 0;
      this.heightList.push(height);
      //之后的高度即为当前li的高度加上之前面li的高度和
      lis.forEach((item) => {
        //clientHeight = content + padding
        height += item.clientHeight;
        this.heightList.push(height);
      });
      console.log("每一个Li的高度", this.heightList);
      window.addEventListener("scroll", () => {
        console.log("监听实时滚动距离", window.scrollY);
      });
    },
    handleChange(value) {
      this.shopCartNumNow = value;
      console.log("当前提交奶茶数：", this.shopCartNumNow);
    },
    showAboutmilk(index, key) {
      this.showAbout = true;
      console.log("当前点击第几组的第几杯奶茶", index, key);
      this.currentClickMilk = this.goodList[Number(index)].data[Number(key)];
      console.log("当前点击的奶茶", this.currentClickMilk);
    },
    addToCart() {
      this.shopCartNumAll = Number(this.shopCartNumAll) + Number(this.shopCartNumNow);
      window.sessionStorage.setItem("shopCartNumAll", this.shopCartNumAll);
      this.priceNow = Number(this.currentClickMilk.basicprice) * Number(this.shopCartNumNow) + Number(this.priceNow);
      window.sessionStorage.setItem("priceNow", this.priceNow);
      this.AllTeas.push(this.currentClickMilk);
      window.sessionStorage.setItem('AllTeas',JSON.stringify(this.AllTeas));
      this.AllChoices.push(this.choicesNow);
      window.sessionStorage.setItem('AllChoices',JSON.stringify(this.AllChoices))
      this.showAbout = false;
      this.$message.success("成功加入购物车！");
    },
    handleClose(done) {
      this.$confirm("确定要购买吗？")
        .then((_) => {
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch((_) => {});
    },
    ch1Click(i) {
      console.log(i, this.choices[i].ch1);
      let i2 = this.choicesNow.indexOf(this.choices[i].ch2);
      if (i2 > -1) {
        //包含ch2
        this.choicesNow.splice(i2, 1);
        this.choicesNow.push(this.choices[i].ch1);
      } else if (this.choicesNow.indexOf(this.choices[i].ch1) > -1) {
        //包含ch1
      } else this.choicesNow.push(this.choices[i].ch1);
      console.log("当前选择", this.choicesNow);
      window.sessionStorage.setItem(
        "choicesNow",
        JSON.stringify(this.choicesNow)
      );
    },
    ch2Click(i) {
      console.log(i, this.choices[i].ch2);
      let i1 = this.choicesNow.indexOf(this.choices[i].ch1);
      if (i1 > -1) {
        //包含ch1
        console.log("包含ch1,先删掉ch1, ch1下标", i1);
        this.choicesNow.splice(i1, 1);
        this.choicesNow.push(this.choices[i].ch2);
      } else if (this.choicesNow.indexOf(this.choices[i].ch2) > -1) {
        //包含ch2
      } else this.choicesNow.push(this.choices[i].ch2);
      console.log("当前选择", this.chNow);
    },
    PayAll(){
      this.$router.push('../payForTea');
    }
    //获取后台数据时修改使用
    /*
    order(){
      this.$axios.get('/order').then( (res) => {
        if(res.status == 200) this.goods = res.data;
        this.$nextTick(()=>{
          if (!this.scroll) {
	this.scroll = new BScroll(this.$refs.goodMenu, { click: true});
	console.log("监听",this.scroll)
    }

      this._scrollInit();
      this.getHeight();
        })
      })
    }*/
  },

  created() {
    //因为 _scrollInit函数需要操作DOM，因此必须在DOM元素存在文档中才能获取DOM节点
    //因此在 nextTick回调函数里面调用可以是实现此功能
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.goodMenu, { click: true });
        console.log("监听", this.scroll);
      }

      this._scrollInit();
      this.getHeight();
    });
    window.addEventListener('setItem', ()=> {
	      this.chNow= JSON.parse(window.sessionStorage.getItem("choicesNow"));
	})
  },
  destroyed() {},
};
</script>

<style lang="less" scoped>
.part1 {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0.9rem;
  padding: 10px;
}
.el-icon-map-location {
  padding-left: 15px;
}
.btn {
  transform: translate(-8px, -25px);
}

* {
  margin: 0;
  padding: 0;
}
.banner {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
}
.wrapper {
  position: relative;
  top: 90px;
  background: rgb(251, 253, 253);
}
.content {
  display: flex;
  width: 100%;
  background-color: rgb(245, 246, 247);
  border: 10px;
  padding: 5px;
  top: 10px;
}
.active {
  background-color: rgb(240, 239, 238);
  color: black;
}
.goodMenu {
  width: 200px;
  position: sticky;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  color: rgb(112, 109, 109);
  background-color: rgb(211, 209, 209);
  height: 800px;
  overflow: auto;
  top: 0;
  left: 0;
}
.goodList {
  background: rgb(240, 239, 238);
  width: 300px;
  height: 62rem;
  top: 4.5rem;
  right: 20px;
  padding-left: 20px;
  font-size: 15px;
  overflow: hidden;
}
.goodList > ul {
  width: 300px;
}
.milkTea {
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  padding-left: 10px;
}
.text {
  display: flex;
  background: rgba(197, 187, 131, 0.452);
  height: 0.6rem;
  border-radius: 10px;
  transform: translate(0, 45px);
}
.title {
  position: absolute;
  line-height: 30px;
  right: 220px;
  color: #7d7e80;
}
.milk-content {
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  line-height: 20px;
  width: 150px;
  .name {
    font-size: 15px;
  }
  .desc {
    font-size: 10px;
    color: rgb(70, 67, 67);
  }
  .price {
    font-size: 20px;
    font-weight: bold;
    font-family: "Times New Roman", Times, serif;
  }
}
.topBanner1,
.topBanner2 {
  background: #e9ecee;
  position: relative !important;
  left: 8px !important;
  top: 0 !important;
  padding-left: 5px;
}
.topBanner2 {
  top: 2.2rem;
  left: 2rem;
}
.topBannershow1,
.topBannershow2 {
  width: 7rem;
}
.bar {
  position: absolute;
  width: 100%;
  bottom: 0.1rem;
  text-align: center;
}
.bar span {
  width: 20px;
  height: 5px;
  border: 1px;
  background: rgb(192, 189, 189);
  display: inline-block;
  margin-right: 10px;
}

.aboutIcon {
  transform: translate(15px);
}
.aboutContent {
  width: 6.5rem;
  .aboutName {
    font-size: 20px;
    line-height: 50px;
    padding: 10px;
  }
  .aboutDesc {
    font-size: 15px;
    display: flex;
    padding: 0px 0 20px 10px;
    color: gray;
    overflow: scroll;
  }
  .aboutPrice {
    position: fixed;
    bottom: 0px;
    display: flex;
    background: rgb(247, 245, 245);
    height: 3rem;
    font-size: 20px;
    line-height: 40px;
    .el-input-number {
      transform: translate(1.6rem);
    }
    .aboutBtn {
      transform: translate(-60px, 80px);
      height: 1rem;
      width: 3rem;
      background: rgb(243, 187, 152);
    }
    .cartDesc {
      font-size: 10px;
      position: absolute;
      left: 0;
      top: 0.7rem;
    }
  }
  .aboutChoice {
    height: 15rem;
  }
  .choices {
    display: flex;
    flex-direction: column;
    height: 3rem;
    line-height: 30px;
    transform: translate(10px);
    .ch1,
    .ch2 {
      color: rgb(75, 73, 73);
      background: rgb(235, 230, 230);
    }
  }
}
.shopcartBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  background: rgb(192, 196, 192);
  position: fixed;
  bottom: 50px;
  .priceNow {
    font-size: 30px;
    align-self: center;
  }
  .payBtn{
    justify-self: center;
    transform: translate(185px);
  }
}
</style>