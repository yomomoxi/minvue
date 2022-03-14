<!-- 核算检验报告 -->
<template>
  <div id="login">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <!-- 标题 -->
    <div>
      <!-- left-arrow -->
      <van-nav-bar title="高阳县医院" >
        <!-- <template #right>
          <van-icon name="cross" color="inherit" size="18" />
        </template> -->
      </van-nav-bar>
    </div>

    <!--信息  -->
    <p class="details">输入身份证查询新冠检测报告详情</p>
    <van-cell-group>
      <van-field
        v-model="value"
        clearable
         maxlength="18"
        left-icon="shenfenzheng"
        label="身份证"
        placeholder="请保持与证件一致"
      >
        <van-icon
          class="iconfont"
          slot="left-icon"
          class-prefix="icon"
          name="shenfenzheng"
        >
        </van-icon>
      </van-field>
    </van-cell-group>

    <div style="margin: 20px">
      <van-button
        round
        block
        type="info"
        @click="submit"
        >查询</van-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      value: "",
    };
  },

  components: {},

  computed: {},

  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    submit() {
      console.log(this.value);
  axios({
        method: "get",
        url: "/nucleicAcid/findNucleicAcidReportList/"+this.value,
        // params: {
        //  identityCard: this.value,
        // },
      }).then((res) => {
        console.log(res.code)
        if(res.data.code==200){
           this.$router.push({
        path: "/nuclearAcidResults",
        query:{
          identityCard:res.data.data.identityCard,
          // 名字
          patient:res.data.data.patient,
          reportList:res.data.data.reportList
        }
        });
        }
    
      })

    },
  },
};
</script>
<style  scoped>
::v-deep .van-icon {
  font-size: 20px !important;
  color: #646566 !important;
}

#login {
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: #eee !important;
}
::v-deep .van-nav-bar__content{
  height: 50px !important;
}
.details {
  margin: 0px;
  font-size: 14px;
  padding: 20px;
  color: #646566;
}

.my-icon {
  background-image: "../assets/身份证.png";
}
.van-button--block {
  top: 30px;
  width: 90%;
  margin-left: 20px;
}
.van-field__label {
  color: black;
}
</style>