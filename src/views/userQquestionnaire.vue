<template>

  <div>
    <meta content="yes" name="apple-mobile-web-app-capable">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!--查看 问卷信息-->
    <el-form
      ref="form"
      :label-position="labelPosition"
      :model="form"
      label-width="80px"
      :rules="rules"
    >
      <el-row>
        <el-col style="text-align: center">
          <h3>{{ this.form.paperTitle }}</h3>
          <el-divider></el-divider>
        </el-col>
      </el-row>

      <template v-if="form.twoDimension === 0">
        <div :key="index" v-for="(question, index) in this.form.questions">
          <el-form-item
            v-if="question.questionType === 0"
            :label="index + 1 + '. ' + question.questionContent"
            style="margin-left: 10px"
            :prop="'questions.' + index + '.optionId'"
            :rules="rules.optionId"
          >
            <div v-for="(option, index) in question.options" :key="index">
              <span class="span_a" style="margin: 0 20px"
                >{{ option_index[index] }}.</span
              >
              <el-radio-group v-model="question.optionId">
                <el-radio :label="option.optionId">{{
                  option.optionContent
                }}</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <!-- 多选 -->
          <div v-if="question.questionType === 1">
            <el-form-item
              style="margin-left: 10px"
              :label="index + 1 + '. ' + question.questionContent"
              :prop="'questions.' + index + '.array'"
              :rules="[
                {
                  type: 'array',
                  required: true,
                  message: '请至少选择一个选项',
                  trigger: 'change',
                },
              ]"
            >
              <div
                class="inline"
                v-for="(moreItem, oindex) in question.options"
                :key="oindex"
              >
                <span class="span_a" style="margin: 0 20px"
                  >{{ option_index[oindex] }}.</span
                >
                <el-checkbox-group v-model="question.array">
                  <el-checkbox :label="moreItem.optionId">{{
                    moreItem.optionContent
                  }}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </div>

          <!-- 填空 -->
          <div v-if="question.questionType === 2">
            <el-form-item
              style="margin-left: 10px"
              :label="index + 1 + '. ' + question.questionContent"
              :prop="'questions.' + index + '.desc'"
              :rules="rules.desc"
            >
              <el-input
                type="textarea"
                style="width: 360px" 
                :rows="2"
                placeholder="请输入内容"
                v-model="question.desc"
              >
              </el-input>
            </el-form-item>
          </div>
          <!--备注-->
          <!-- <el-input
            style="margin-bottom: 30px"
            type="textarea"
            autosize
            placeholder="请输入备注"
            v-model="question.questionRemarks"
          >

          </el-input> -->
        </div>
      </template>
      <el-form-item size="large" style="text-align: center; margin-top: 30px">
        <el-button type="primary" v-show="show" @click="onSubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  props: [],
  data() {
    return {
      show:false,
      questions:[],
      taskId: "",
      currentNo:'',
      dataArr:null, 
      dataRadio:null,
      dataCloze:null,
      remark: "",
      checkList: [],
      optionId: "",
      checked: false,
      textarea: "",
      rules: {
        optionId: [
          { required: true, message: "请选择选项", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写内容", trigger: "blur" }],
      },
      type: [],
      //问卷标题
      paperTitle: null,
      labelPosition: "top",
      form: {
        desc: "",
        // questions:[{       questionId:'' ,      optionId:"",        questionType:"",}],
      },
      option_index: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "S",
        "Y",
        "Z",
      ],
    };
  },

  watch: {},
  created() {
    this.open();
  },
  mounted() {},
  computed: {},
  methods: {
    open() {
      console.log(this.$route.query.taskId);
      console.log(this.$route.query.currentNo);
      this.currentNo=this.$route.query.currentNo
      this.taskId=this.$route.query.taskId
      // console.log(this.$route.params.currentNo)
      axios({
        method: "get",
        url: "/followup/Paper/sendPaper",
        params: {
          taskId: this.taskId,
          currentNo: this.currentNo,
        },
      }).then((res) => {
        if(res.data.code===200){
        this.form = res.data.data;
        console.log( this.form.questions)
        this.form.questions.forEach((question) => {
          question.array = [];
        });
        this.show=true
        }else{
          console.error(res.data)
        }
      });
      // this.form.questions.forEach((question) => {
      //     question.array = [];
      //   });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){;
           const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'white'
        });
        // 填空
        this.form.questions.forEach((question) => {
          if (question.desc && question.desc.length > 0) {
             if(question.questionId&& question.questionId.length > 0){
         this.dataCloze={"questionType":question.questionType+'',"questionId":question.questionId,"answerText":question.desc}
         this.questions.push(this.dataCloze)
          }
          }
        });
      // 单选
        this.form.questions.forEach((question) => {
          if (question.optionId && question.optionId.length > 0) {
              if(question.questionId&& question.questionId.length > 0){
              this.dataRadio={"questionType":question.questionType+'',"questionId":question.questionId,"answer":question.optionId}
              this.questions.push(this.dataRadio)
          }
          }    
        });
        // 多选
        this.form.questions.forEach((question) => {
          if (question.array && question.array.length > 0) {
                 if(question.questionId&& question.questionId.length > 0){
              this.dataArr={"questionType":question.questionType+'',"questionId":question.questionId,"answers":question.array}
               this.questions.push(this.dataArr)
          } }
        });
           //  console.log(this.questions); 
        // 每一个问题是一个对象 对面里面的答案ID 问题ID以及类型都查出来放在questions里面
        if (valid) {
          axios({
            method: "post",
            url: "/followup/ANSWER/submitPlanAnswer",
            data: {
                taskId: this.taskId,
                questions: this.questions
            },
          }).then((res) => {
         if(res.data.code===200){
        console.log(res); 
         this.$message({
          showClose: true,
          message: '提交成功',
          type: 'success',
        });
            }else{
              console.error(res)
            }
      });
        } else {
          console.log("error submit!!");
          return false;
        }
           loading.close();
        }
      });
    },
  },
};
</script>
<style scoped>
.demo-ruleForm {
  margin-top: 30px;
}
.line {
  text-align: center;
}
.el-button--primary {
  min-width: 300px;
}
::v-deep .el-form-item__label {
  font-weight: 700;
  font-family: "微软雅黑";
  font-size: 16px;
  color: black;
}
.span_a {
  color: #606266;
  font-size: 16px;
}
::v-deep .el-form-item__content {
  font-size: 18px;
  width: 360px !important;
}
::v-deep .el-textarea__inner {
  width: 360px !important;
}
::v-deep .el-input__inner:focus{
    width: 360px !important;
}
.inline {
  /* display: inline-block; */
  display: flex;
}
</style>
