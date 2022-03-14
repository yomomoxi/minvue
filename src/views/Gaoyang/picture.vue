<!-- vue转图片 -->
<template>
  <div>
   #html
<div id="screenViewBox">
<!--里面是需要转为图片的html代码       -->
</div>
          <el-button :loading='savePosterLoading' class="savePoster" type="primary" size="medium" @click="savePoster()">保存为图片</el-button>
  </div>
</template>

<script>
//引用
import Canvas2Image from './canvas2Image'
import html2canvas from 'html2canvas'
//具体代码
export default {
  data () {
    return {
           savePosterLoading : false
    };
  },

  components: {},

  computed: {},

  methods: {

 savePoster(){
      let that = this
      //打开loading
      that.savePosterLoading = true
      //生成图片之前，需先将整体的滚动条隐藏掉，否则生成出来的照片会偏移
      document.getElementById('app').style.overflowY = 'hidden'
       //两个参数：所需要截图的元素id，截图后要执行的函数， canvas为截图后返回的最后一个canvas
       var shareContent = document.getElementById('screenViewBox');
      var width = shareContent.offsetWidth;
      var height = shareContent.offsetHeight;
      var canvas = document.createElement("canvas");
      var scale = 5; //这里为了下载出更清晰的图片，值越大越清晰

      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.getContext("2d").scale(scale, scale);

      var opts = {
          scale: 1,//不管上面的scale是多少倍，这里只能取1，否则会显示不完全
          canvas: canvas,
          logging: true,
          width: width,
          height: height
      };
      let downloadName = '下载的图片名称'
      html2canvas(shareContent,opts).then(
        function(canvas) {
        //这个方式是直接将canvas保存为图片的，具体参数可自行查看源码
         var img = Canvas2Image.saveAsImage(canvas, canvas.width, canvas.height,'PNG',downloadName);
        //这个方式只是提供展示图片的功能，暂时没有用到
        // var img = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height,'PNG');
        //  document.body.appendChild(img);

         //生成图片之前，需先将整体的滚动恢复为之前的状态
         document.getElementById('app').style.overflowY = 'scroll'
        //关闭loading
         that.savePosterLoading = false
        },

          );
    },
  }
}

</script>
<style  scoped>
</style>