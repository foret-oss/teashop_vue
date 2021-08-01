<template>
  <div>
    <el-row class="part1">
      <el-button class="el-icon-map-location" @click="changeShop"
        >门店切换</el-button
      >
      <el-switch
        class="chooseBtn"
        v-model="value1"
        active-text="自取"
        inactive-text="外卖"
      >
      </el-switch>
    </el-row>

    <!--右侧顶部的幻灯片1-->

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
              <p class="title">{{ items.name }}</p>

              <div class="milkTea" v-for="(item, key) in items.data" :key="key">
                <!--奶茶图片展示-->
                <div class="milk-icon">
                  <img
                    :src="item.icon"
                    alt=""
                    width="70px"
                    height="70px"
                    style="border-radius: 5px"
                  />
                </div>
                <!--奶茶信息展示-->
                <div class="milk-content">
                  <p class="name">{{ item.name }}</p>
                  <p class="desc">{{ item.description }}</p>
                  <p class="price">￥{{ item.price }}</p>
                </div>
              </div>
            </li>
          </ul>
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
      number: 30,
      goodMenu: ["茶1", "茶2", "茶3", "茶4", "茶5", "茶6", "茶7", "茶8",'茶9','茶10','茶11','茶12'],
      goodList: [
        {
          name: "茶1",
          data: [
            {
              icon: require("../assets/id0001.jpg"),
              name: "暴柠",
              description: "好喝爽口",
              price: "19",
            },
            {},
            {},
            {},
            {},
          ],
        },
        { name: "茶2", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "茶3", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "茶4", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        {
          name: "茶5",
          data: ["1.1", "1.2", "1.3", "1.4", "1.5"],
        },
        { name: "茶6", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "茶7", data: ["1.1", "1.2", "1.3", "1.4", "1.1"] },
        { name: "茶8", data: ["1.1", "1.2", "1.1", "1.2", "1.1", "1.2"] },
        { name: "茶9", data: ["1.1", "1.2", "1.1", "1.2", "1.1", "1.2"] },
        { name: "茶10", data: ["1.1", "1.2", "1.1", "1.2", "1.1", "1.2"] },
        { name: "茶11", data: ["1.1", "1.2", "1.1", "1.2", "1.1", "1.2"] },
      ],
      scrollY: 0, //获取实时滚动位置
      heightList: [], //获取每一个li的高度

      goods: [
        {
          name: "当季限定",
          foods: [
            {
              icon: require("../assets/id0012.jpg"),
              name: "浓暴柠",
              description: "原创粤红茶底，超浓出涩",
              price: "21",
            },
            {
              icon: require("../assets/id0013.jpg"),
              name: "嫩暴柠",
              description: "全新高温烘烤嫩芽茶",
              price: "21",
            },
            {
              icon: require("../assets/id0004.jpg"),
              name: "多金海盐菠萝",
              description: "原创粤红茶底，超浓出涩",
              price: "29",
            },
          ],
        },

        {
          name: "人气必喝榜",
          foods: [
            {
              icon: require("../assets/id0012.jpg"),
              name: "浓暴柠",
              description: "原创粤红茶底，超浓出涩",
              price: "21",
            },
            {
              icon: require("../assets/id0013.jpg"),
              name: "嫩暴柠",
              description: "全新高温烘烤嫩芽茶",
              price: "21",
            },
            {
              icon: require("../assets/id0004.jpg"),
              name: "多金海盐菠萝",
              description: "原创粤红茶底，超浓出涩",
              price: "29",
            },
          ],
        },

        {
          name: "每日鲜食",
          foods: [
            {
              icon: require("../assets/id0012.jpg"),
              name: "浓暴柠",
              description: "原创粤红茶底，超浓出涩",
              price: "21",
            },
            {
              icon: require("../assets/id0013.jpg"),
              name: "嫩暴柠",
              description: "全新高温烘烤嫩芽茶",
              price: "21",
            },
            {
              icon: require("../assets/id0004.jpg"),
              name: "多金海盐菠萝",
              description: "原创粤红茶底，超浓出涩",
              price: "29",
            },
          ],
        },

        {
          name: "喜茶咖啡",
          foods: [
            {
              icon: require("../assets/id0012.jpg"),
              name: "浓暴柠",
              description: "原创粤红茶底，超浓出涩",
              price: "21",
            },
            {
              icon: require("../assets/id0013.jpg"),
              name: "嫩暴柠",
              description: "全新高温烘烤嫩芽茶",
              price: "21",
            },
            {
              icon: require("../assets/id0004.jpg"),
              name: "多金海盐菠萝",
              description: "原创粤红茶底，超浓出涩",
              price: "29",
            },
          ],
        },

        {
          name: "果茶家族",
          foods: [
            {
              icon: require("../assets/id0012.jpg"),
              name: "浓暴柠",
              description: "原创粤红茶底，超浓出涩",
              price: "21",
            },
            {
              icon: require("../assets/id0013.jpg"),
              name: "嫩暴柠",
              description: "全新高温烘烤嫩芽茶",
              price: "21",
            },
            {
              icon: require("../assets/id0004.jpg"),
              name: "多金海盐菠萝",
              description: "原创粤红茶底，超浓出涩",
              price: "29",
            },
          ],
        },
      ],
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
    changeShop() {},
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
  },
  destroyed(){}
};
</script>

<style lang="less" scoped>
.part1 {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0.8rem;
}
.el-icon-map-location {
  display: block;
  padding-left: 15px;
}
.chooseBtn {
  display: block;
  padding: 10px;
}

* {
  margin: 0;
  padding: 0;
}
.wrapper {
  position: relative;
  top: 90px;
  height: 900px;
  background: aquamarine;
}
.content {
  display: flex;
  height: 800px;
  width: 100%;
  background-color: rgb(187, 231, 240);
  position: absolute;
  padding: 5px;
  top: 10px;
}
.active {
  background-color: rgb(187, 231, 240);
  color: black;
}
.goodMenu {
  width: 90px;
  height: 750px;
  position: sticky;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  color: rgb(112, 109, 109);
  background-color: rgb(231, 226, 226);
}
.goodList {
  position: absolute;
  background: bisque;
  width: 70%;
  height: 70rem;
  left: 103px;
  top: 8.3rem;
  padding-left: 10px;
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
.title {
  position: absolute;
  line-height: 30px;
  right: 250px;
}
.milk-content {
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  line-height: 20px;
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
  display: flex;
  height: 4rem;
  position: absolute;
  padding-right: 5px;
  left: 2.5rem;
  overflow: hidden;
}
.topBanner2 {
  top: 4.2rem;
}
.topBannershow1,
.topBannershow2 {
  width: 7.3rem;
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
</style>