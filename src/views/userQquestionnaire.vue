<template>
  <div>
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
                :rows="2"
                placeholder="请输入内容"
                v-model="question.desc"
              >
              </el-input>
            </el-form-item>
          </div>
          <!--备注-->
          <el-input
            style="margin-bottom: 30px"
            type="textarea"
            autosize
            placeholder="请输入备注"
            v-model="question.questionRemarks"
          >
            <!--     v-model="question.questionRemarks" -->
          </el-input>
        </div>
      </template>
      <el-form-item size="large" style="text-align: center; margin-top: 30px">
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
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
      form: { desc: "" },
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
  computed: {},
  watch: {},
  created() {
    this.open();
  },
  mounted() {},
  methods: {
    open() {
      console.log(this.$route.query.id);
      console.log(this.$route.query.uname);
      // console.log(this.$route.params.id)
      // console.log(this.$route.params.uname)
      // console.log(this.$route.params.token)
      axios({
        method:"get",
        url:"/followup/Paper/sendPaper",
        params:{
          taskId:"f94fddb9-b2da-447f-ad34-ebcfc88ac844",
          currentNo:"1"
        },

      }).then((res)=>{
        console.log(res)
        this.form=res.data.data
         this.form.questions.forEach((question) => {
        question.array = [];
      });
      console.log(this.form.questions);
      })
     
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        // 备注内容
        let Remarks = [];
        this.form.questions.map((e) => {
          if (e.questionRemarks && e.questionRemarks.length > 0) {
            Remarks.push(e.questionRemarks);
          }
        });
        console.log(Remarks);

        let chnalArr = [],
          radioString = [],
          cloze = [];

        this.form.questions.forEach((question) => {
          if (question.desc && question.desc.length > 0) {
            cloze.push(question.desc);
          }
        });
        console.log(cloze, "填空");
        this.form.questions.forEach((question) => {
          if (question.optionId && question.optionId.length > 0) {
            radioString.push(question.optionId);
          }
        });
        console.log(radioString, "单选");

        this.form.questions.forEach((question) => {
          if (question.array && question.array.length > 0) {
            chnalArr = [...chnalArr, ...question.array];
          }
        });
        console.log(chnalArr, "多选");

        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
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
::v-deep .el-form-item--medium .el-form-item__label {
  color: green;
}
.inline {
  /* display: inline-block; */
  display: flex;
}
</style>
