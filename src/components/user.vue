<template>
  <div>
    <div class="main-1" @click="changeBackgroung">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        class="background"
        :on-preview="handleBackgroundPreview"
        :on-remove="handleRemove"
      ><p id="backtext">点击更换背景图</p>
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="背景图" />
      </el-dialog>
      <el-button type="info" @click="loginOut" class="btn">退出</el-button>
    </div>

    <div class="main-2">
      <p class="viptext1">Hey，chen</p>
      <p class="viptext2">一口max多料灵感</p>
      <p class="vip"><b>GO会员</b></p>
      <div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          >上传头像
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus"></i>
        </el-upload>
        <el-avatar
          id="touxiang"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
    </div>
    <div class="main-3">c
    </div>
    <div class="main-4">d</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //文件上传成功的勾子
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //上传文件之前的钩子：要满足格式要求
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //文件列表移除时候的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //惦记文件列表中已上传的文件时候的钩子
    handleBackgroundPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.main-1 {
  height: 8rem;
  background: url(../assets/background1.png);
  background-size: contain;
  overflow: scroll;
}
.main-2,
.main-3,
.main-4 {
  background: rgb(238, 235, 235);
  height: 10cm;
  overflow: scroll;
}
#touxiang {
  position: absolute;
  top: 45%;
  left: 65%;
  height: 3rem;
  width: 3rem;
}
.vip {
  display: flex;
  margin-top: 0.2rem;
  font-size: 1rem;
  font-family: "Times New Roman", Times, serif;
}
.btn {
  position: absolute;
  left: 90%;
  top: 4%;
  transform: translate(-50%, -50%);
}
.viptext1,
.viptext2 {
  display: flex;
  margin: 0.1rem;
  font-family: "Times New Roman", Times, serif;
}
.viptext1 {
  font-size: 0.8rem;
  color: rgb(138, 122, 33);
}
.viptext2 {
  font-size: 0.5rem;
}

.avatar-uploader {
  border: 1px dashed #222020;
  border-radius: 1rem;
  cursor: pointer;
  position: absolute;
  width: 3rem;
  height: 3rem;
  top: 45%;
  left: 64%;
  overflow: hidden;
}
.avatar-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 30px;
  color: #0f1011;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 3rem;
  height: 3rem;
  display: block;
}
.background{
  font-size: 0.5rem;
  width: 100%;
  height: 8rem;
  opacity: 1;
  overflow: hidden;
}
#backtext{
  color: #409eff;
  display: flex;
  right: 0.2rem;
}
</style>