<!-- 图片 -->
<template>
  <div>
    <div class="bill-area" ref="bill">
      <div>
        <el-container>
          <el-header class="header">高阳县医院检验报告单</el-header>
          <el-main>
              <!-- 用户资料 -->
              <div>
                  
              </div>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </div>
    </div>

    <div class="canvas-bill">
      <img :src="canvasImageUrl" alt="" />
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      // isDom:true
      canvasImageUrl: "",
    };
  },
  created() {
    this.$nextTick(() => {
      // 跳用html转化canvas函数
      this.htmlToCanvas();
    });
  },
  components: {},

  computed: {},

  methods: {
    htmlToCanvas() {
      html2canvas(this.$refs.bill, {}).then((canvas) => {
        let imageUrl = canvas.toDataURL("image/png"); // 将canvas转成base64图片格式
        this.canvasImageUrl = imageUrl;
        this.isDom = false;
      });
    },
  },
};
</script>
<style scoped>
.header{
    /* text-align: center; */

}
</style>
