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
      questions:[],
      taskId: "f94fddb9-b2da-447f-ad34-ebcfc88ac844",
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
      // console.log(this.$route.query.id);
      // console.log(this.$route.params.id)

      // axios({
      //   method: "get",
      //   url: "/followup/Paper/sendPaper",
      //   params: {
      //     taskId: "f94fddb9-b2da-447f-ad34-ebcfc88ac844",
      //     currentNo: "1",
      //   },
      // }).then((res) => {
      //   if(res.data.code===200){
      // // console.log(res.data.code);
      //   this.form = res.data.data;
      //   console.log( this.form.questions)
      //   // 问题id
      // //   let paperId=[]
      // //   let  questionType=[]
      // //  this.form.questions.forEach(e=>{
      // //     paperId.push(e.paperId)
      // //     questionType.push(e.questionType)
      // //  })
      // //  console.log(paperId,questionType)

      //   this.form.questions.forEach((question) => {
      //     question.array = [];
      //   });
      //   }else{
      //     console.error(res.data)
      //   }
      // });
      let formm
     formm = {
        msg: "操作成功",
        code: 200,
        data: {
          searchValue: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          params: {},
          paperId: "15686f71-3db4-4ec9-8638-5a6944c13178",
          isDelete: null,
          paperFounder: null,
          paperTitle: "测试模板22",
          paperDesc: null,
          paperTag: null,
          verifyStatus: null,
          paperDept: null,
          twoDimension: 0,
          paperClass: null,
          diseaseId: null,
          pinyin: null,
          employee: null,
          department: null,
          questions: [
            {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              params: {},
              questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
              isDelete: null,
              questionFounder: null,
              questionType: 0,
              questionContent: "今天中午吃什么?",
              paperId: "15686f71-3db4-4ec9-8638-5a6944c13178",
              questionOrder: null,
              verifyStatus: null,
              questionDept: null,
              deptId: null,
              twoDimension: null,
              emplId: null,
              questionClass: null,
              questionKind: 1,
              questionRemarks: null,
              paper: null,
              options: [
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "0932ed3f-3abb-45a6-bf2b-c5350b1c2e73",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "不吃",
                  questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 0,
                    questionContent: "今天中午吃什么?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "84a51dc6-86fd-4ccd-974a-9bddced375f9",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "面条",
                  questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 0,
                    questionContent: "今天中午吃什么?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "91d477ed-c14b-4c24-8407-0d3c2cf5986d",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "水饺",
                  questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 0,
                    questionContent: "今天中午吃什么?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "c4ee29d2-c256-40ce-9eac-f3d63f188873",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "汤圆",
                  questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "e5a3c015-1852-479f-a405-504efdb925bc",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 0,
                    questionContent: "今天中午吃什么?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
              ],
              answerOption: null,
              employee: null,
              department: null,
              addFlag: false,
              answer: null,
              answerText: null,
              answers: null,
              array: null,
            },
            {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              params: {},
              questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
              isDelete: null,
              questionFounder: null,
              questionType: 1,
              questionContent: "最近玩的游戏有哪些?",
              paperId: "15686f71-3db4-4ec9-8638-5a6944c13178",
              questionOrder: null,
              verifyStatus: null,
              questionDept: null,
              deptId: null,
              twoDimension: null,
              emplId: null,
              questionClass: null,
              questionKind: 1,
              questionRemarks: null,
              paper: null,
              options: [
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "4f6da0ac-2f4e-49ec-8b81-5b08ffca3a60",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "LOL",
                  questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 1,
                    questionContent: "最近玩的游戏有哪些?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "79ee5d6a-fb00-44ef-b51c-f214918dfefb",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "绝地求生",
                  questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 1,
                    questionContent: "最近玩的游戏有哪些?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "8ded623e-c1fb-4265-b5cf-01cf847277a6",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "csgo",
                  questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 1,
                    questionContent: "最近玩的游戏有哪些?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "a9deae19-12f1-473d-935b-6c4e4de16ecd",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "永劫无间",
                  questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 1,
                    questionContent: "最近玩的游戏有哪些?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
                {
                  searchValue: null,
                  createBy: null,
                  createTime: null,
                  updateBy: null,
                  updateTime: null,
                  remark: null,
                  params: {},
                  optionId: "b5c78679-2ef3-421b-b42e-a7af780008c9",
                  isDelete: null,
                  optionOrder: null,
                  optionContent: "王者荣耀",
                  questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                  type: null,
                  question: {
                    searchValue: null,
                    createBy: null,
                    createTime: null,
                    updateBy: null,
                    updateTime: null,
                    remark: null,
                    params: {},
                    questionId: "230905d5-3e08-4966-be0f-251c8d6bcb14",
                    isDelete: null,
                    questionFounder: null,
                    questionType: 1,
                    questionContent: "最近玩的游戏有哪些?",
                    paperId: null,
                    questionOrder: null,
                    verifyStatus: null,
                    questionDept: null,
                    deptId: null,
                    twoDimension: null,
                    emplId: null,
                    questionClass: null,
                    questionKind: null,
                    questionRemarks: null,
                    paper: null,
                    options: null,
                    answerOption: null,
                    employee: null,
                    department: null,
                    addFlag: false,
                    answer: null,
                    answerText: null,
                    answers: null,
                    array: null,
                  },
                  department: null,
                  employee: null,
                  num: 0,
                  percentage: null,
                  options: null,
                },
              ],
              answerOption: null,
              employee: null,
              department: null,
              addFlag: false,
              answer: null,
              answerText: null,
              answers: null,
              array: null,
            },
            {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              params: {},
              questionId: "ab6eff8d-7dff-468f-82ca-f6bd49b49c6e",
              isDelete: null,
              questionFounder: null,
              questionType: 2,
              questionContent: "这是一个问答题",
              paperId: "15686f71-3db4-4ec9-8638-5a6944c13178",
              questionOrder: null,
              verifyStatus: null,
              questionDept: null,
              deptId: null,
              twoDimension: null,
              emplId: null,
              questionClass: null,
              questionKind: 1,
              questionRemarks: null,
              paper: null,
              options: [],
              answerOption: null,
              employee: null,
              department: null,
              addFlag: false,
              answer: null,
              answerText: null,
              answers: null,
              array: null,
            },
          ],
          survey: null,
          twoDepts: null,
          depts: null,
          emplName: null,
          disName: null,
          deptName: null,
          taskId: null,
          patienttask: null,
          suveryId: null,
        },
      };
      this.form=formm.data
      this.form.questions.forEach((question) => {
          question.array = [];
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){;
        // 填空
        this.form.questions.forEach((question) => {
          if (question.desc && question.desc.length > 0) {
             if(question.questionId&& question.questionId.length > 0){
         this.dataCloze={"questionType":question.questionType+'',"questionId":question.questionId,"answerText":question.desc}
          }
          }
        });
      // 单选
        this.form.questions.forEach((question) => {
          if (question.optionId && question.optionId.length > 0) {
              if(question.questionId&& question.questionId.length > 0){
              this.dataRadio={"questionType":question.questionType+'',"questionId":question.questionId,"answer":question.optionId}
          }
          }    
        });
        // 多选
        this.form.questions.forEach((question) => {
          if (question.array && question.array.length > 0) {
                 if(question.questionId&& question.questionId.length > 0){
              this.dataArr={"questionType":question.questionType+'',"questionId":question.questionId,"answer":question.array}
          } }
        });
        this.questions.push(this.dataArr, this.dataRadio,this.dataCloze)
        console.log(this.questions);
        // 每一个问题是一个对象 对面里面的答案ID 问题ID以及类型都查出来放在questions里面
        // if (valid) {
        //   axios({
        //     method: "post",
        //     url: "/followup/ANSWER/submitPlanAnswer",
        //     data: {
        //       // paper: {
        //         taskId: this.taskId,
        //         questions: this.questions)
        //       // },
        //     },
        //   }).then((res) => {
        //     console.log(res);
        //   });
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
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
  width: 360px;
}
::v-deep.el-textarea__inner {
  width: 400px;
}
.inline {
  /* display: inline-block; */
  display: flex;
}
</style>
