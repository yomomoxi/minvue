<!-- 核酸结果 -->
<template>
  <div id="login">
    <div>
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <!-- 标题 -->
      <div>
        <van-nav-bar title="核酸检测结果" left-arrow @click-left="onClickLeft">
          <template #right >
            <van-icon name="cross" color="inherit" size="18"  @click="onClickRight" />
          </template>
        </van-nav-bar>
      </div>
    </div>

    <!-- 身份信息 -->
    <div class="details">{{patient}} <span style="margin-left: 20px">{{cardNo}}</span></div>
    <!--详情  -->
    <div v-for="item in reportList" :key="item.id">
    <div class="content" >
      <div class="isFelx">
        <div class="name">
          采样名次:<span style="color: black; margin-left: 10px">{{item.chineseName}}</span>
        </div>
        <div class="name">
          采样时间:<span style="color: black; margin-left: 10px"
            >{{item.samplingTime}}</span
          >
        </div>
        <div class="name" >
          检测结果:<span style="margin-left: 10px; color: #1989fa">{{item.result}}</span>
        </div>
      </div>
      <!-- @click="showPopup" -->
      <div class="otherFelx" >
        <div style="margin-top: -2px">详情</div>
        <van-icon name="arrow" id="arrow" />
      </div>
    </div>
    
    </div>
      <van-popup v-model="show">
      <img style="width:350px;"  src="../../assets/20319FBA1E621A84C64FB45710A80A39.jpg" alt=""></van-popup>
     <div class="bottom">温馨提示：如有疑问，请电话联系0312-6609116</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IDcard:"",
      cardNo:'',
      show: false,
      patient:"",
      reportList:[]
    };
  },

  components: {
    
  },

  computed: {
  
  },
  created(){this.id()},
  methods: {
    //  showPopup() {
    //   this.show = true;
    // },
    id(){
// IDcard 为身份证号码
this.IDcard=this.$route.query.identityCard
this.patient=this.$route.query.patient
this.reportList=this.$route.query.reportList
    console.log(this.reportList)
   let cardNo = this.IDcard.replace(/^(.{6})(?:\w+)(.{4})$/, "\$1********\$2")
   this.cardNo =cardNo
    console.log('隐藏后', cardNo)

    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight(){
       setTimeout(()=> {
  //这个可以关闭安卓系统的手机
   document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
         WeixinJSBridge.call("closeWindow");
      },
     false
   );
    //这个可以关闭ios系统的手机
   WeixinJSBridge.call("closeWindow");},(500))
    }
  },
};
</script>
<style >
body{
    background-color: #eee !important;
}
#login {
  height: 100%;
  width: 100%;
  background-color: #eee !important;
  font-family:"微软雅黑"
}
::v-deep .van-icon {
  font-size: 20px !important;
  color: #646566 !important;
}
.content {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  height: 130px;
  width: 100%;
  color: #646566;
  font-size: 15px;
}
.isFelx {
  display: block;
  margin: 6px;
  flex: 5;

  font-size: 16px;
}
.name {
  margin: 10px;
}
#arrow {
  color: #1989fa !important;
}
::v-deep .van-nav-bar__content{
  height: 50px !important;
}
 .van-icon {
  font-size: 20px !important;
  color: #646566 !important;
}

.otherFelx {
  color: #1989fa;
  display: flex;
  flex: 1;
  margin: 15px;
  font-size: 16px;
}

.details {
  margin: 0px;
  font-size: 20px;
  padding: 10px;
  color: #646566;
  margin-left: 10px;
}
.bottom{
  margin: 46px;
  position: fixed; bottom: 0; 
  font-size: 13px;
  left: 30px;
}
</style>