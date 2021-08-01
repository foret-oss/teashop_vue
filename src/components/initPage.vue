<template>
  <div>
    <div class="slide">
      <div
        v-for="(imgUrl, index) in bannerList"
        :key="index"
        v-show="index == currentIndex"
        class="slideshow"
      >
        <img :src="imgUrl" style="width: 100%; height: 6rem" />
      </div>
      <div class="bar">
        <span v-for="(item, index) in bannerList" :key="index"></span>
      </div>
    </div>

    <div class="part2">
      <div class="self" @click="self"></div>
      <div class="out"></div>
    </div>

    <div class="part3" @click="teafoods"></div>
    <el-button type="text" @click="open">我的积分   
    </el-button>
     <p id="text">可兑换喜茶券和丰富灵感周边</p>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [
        "http://www.78cyjm.com/uploads/allimg/201230/1-201230140214I9.jpg",
        "http://p2.ssl.cdn.btime.com/t017860562ee4553e9c.jpg",
        "https://qnssl.niaogebiji.com/1894052285605d4368509154.92410444.jpeg",
        "https://qnssl.niaogebiji.com/183166758605d4368c4f773.64246046.jpeg",
      ],
      currentIndex: 0, //默认显示图片
    };
  },
  methods: {
    autoPlay() {
      //console.log(this.currentIndex);
      if (this.currentIndex === this.bannerList.length - 1) {
        //当遍历到最后一张图片置零
        this.currentIndex = 0;
      }
      else{
        this.currentIndex++;
      }
    },
    play() {
     //setInterval(this.autoPlay, 1000);
     setInterval(() => this.autoPlay(), 2500);
    },
    change(i) {
      this.currentIndex = i;
    },
    self() {
      this.$router.push("/order");
    },
    teafoods() {
      this.$router.push("/foods");
    },
    open() {
      this.$mb.alert("100", "我的积分", {
        confirmButtonText: "我知道了", 
      });
    },
  },
 created() {
    this.play();
  },
};
</script>

<style lang="less" scoped>
.part2 {
  display: flex;
  flex-direction: row;
  margin: 0.2rem;
}
.self,
.out {
  flex-grow: 1;
  width: 50%;
  height: 4rem;
  text-align: center;
}
.self {
  background: url(../assets/in.png) no-repeat;
  background-size: contain;
}
.out {
  background: url(../assets/out.png) no-repeat;
  background-size: contain;
}
.c {
  height: 5rem;
  background: oldlace;
}
.slide {
  width: 100%;
  height: 6rem;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.slideshow {
  width: 100%;
}
.bar {
  position: absolute;
  width: 100%;
  bottom: 0.2rem;
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
.active {
  background: #bfd6b6 !important;
}
.part3 {
  display: flex;
  flex-direction: row;
  background: url(../assets/teafoods.jpg) no-repeat;
  background-size: contain;
  width: 100%;
  height: 4.5rem;
}
.el-button{
    font-size: 25px;
    position: absolute;
    top: 80%;
    color: black;
}
#text{
    display: flex;
    padding-top: 10px;
    font-size: 13px;
}
</style>