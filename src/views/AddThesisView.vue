<template>
  <div class="addThesis">
    <!-- <p>hello</p> -->
    <h3>添加论文</h3>
    <el-form ref="form" :model="thesisForm" label-width="80px" :rules="rules">
      <el-form-item label="论文名称" prop="title">
        <el-input v-model="thesisForm.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="abstractText">
        <el-input v-model="thesisForm.abstractText"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="thesisForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="文件">
        <el-upload
          class="upload-demo"
          action="http://localhost:8082/api/upload"
          :limit="1"
          accept="pdf"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :on-error="handleUploadError"
          :on-success="handleSuccess"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传单个PDF文件，且不超过50MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="评级">
        <el-select v-model="thesisForm.status" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学生">
        <el-button type="primary" @click="openStudentDialog"
          >选择学生</el-button
        >
        <span v-if="selectedStudent">{{ selectedStudent.name }} </span>
        <span v-if="selectedStudent"
          >学号：{{ selectedStudent.studentNo }}</span
        >
      </el-form-item>
      <el-form-item label="选择教师">
        <el-button type="primary" @click="openTeacherDialog"
          >选择教师</el-button
        >
        <span v-if="selectedTeacher">{{ selectedTeacher.name }} </span>
        <span v-if="selectedTeacher"
          >工号：{{ selectedTeacher.teacherNo }}</span
        >
      </el-form-item>
      <el-form-item label="完成日期" prop="completeDate">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="completeDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitThesis(thesisForm)"
          >提交</el-button
        >
        <!-- <el-button @click="resetForm(form)">重置</el-button> -->
        <el-button plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 学生选择弹窗 -->
    <el-dialog
      title="选择学生"
      :visible.sync="studentDialogVisible"
      width="50%"
    >
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input v-model="studentName" placeholder="搜索学生"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleStudentSearch"
            >搜索</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="studentList" @row-click="selectStudent">
        <el-table-column
          prop="studentNo"
          label="学号"
          width="100"
        ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="departmentName" label="学院"></el-table-column>
        <el-table-column prop="majorName" label="专业"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="currentPage"
          :page-size="studentPageSize"
          :total="studentTotal"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
          style="margin-top: 10px"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 教师选择弹窗 -->
    <el-dialog
      title="选择教师"
      :visible.sync="teacherDialogVisible"
      width="50%"
    >
      <el-table :data="teacherList" @row-click="selectTeacher">
        <el-table-column
          prop="teacherId"
          label="ID"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="teacherNo"
          label="工号"
          width="80"
        ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="departmentName" label="学院"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { UPLOAD_URL } from "@/utils/config";
export default {
  data() {
    return {
      thesisForm: {
        title: "",
        status: "EXCELLENT",
      },
      selectedStudent: null, // 当前选中的学生
      selectedTeacher: null, // 当前选中的教师
      studentList: [], // 学生列表
      teacherList: [], // 教师列表
      studentDialogVisible: false, // 学生弹窗是否可见
      teacherDialogVisible: false, // 教师弹窗是否可见
      statusOptions: [
        {
          value: "EXCELLENT",
          label: "优秀",
        },
        {
          value: "PASS",
          label: "及格",
        },
        {
          value: "FAIL",
          label: "不及格",
        },
      ],
      studentPageSize: 10,
      currentPage: 1,
      studentName: "", // 搜索学生
      studentTotal: 0, // 查询到的总学生数
      thesisFile: {},
      uploadURL: UPLOAD_URL,
      fileList: [],
      completeDate: "",
      // 表单规则
      rules: {
        title: [{ required: true, message: "请输入论文名称", trigger: "blur" }],
        abstractText: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
        keywords: [
          { required: true, message: "请输入关键词", trigger: "blur" },
        ],
        // 可以根据需要添加其他字段的验证规则
        completeDate: [
          { required: true, message: "请选择完成时间", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 打开学生弹窗并加载数据
    openStudentDialog() {
      this.studentDialogVisible = true;
      this.fetchStudents();
    },

    // 打开教师弹窗并加载数据
    openTeacherDialog() {
      this.teacherDialogVisible = true;
      this.fetchTeachers();
    },

    // 获取学生数据
    fetchStudents() {
      this.$axios
        .get("/student/all")
        .then((response) => {
          this.studentList = response.data.data;
        })
        .catch((error) => {
          console.error("获取学生数据失败", error);
          this.$message.error("获取学生数据失败");
        });
    },

    fetchStudents(page = 1, size = 10, studentName = "") {
      const params = {
        page,
        pageSize: size,
        searchName: studentName,
      };

      // 调用后端接口
      this.$axios
        .get("/student/page", { params })
        .then((response) => {
          const { records, total } = response.data.data;
          this.studentList = records; // 更新表格数据
          this.studentTotal = total; // 更新总条数
          console.log(records);
        })
        .catch((error) => {
          this.$message.error("错误：", error);
        });
    },

    // 获取教师数据
    fetchTeachers() {
      this.$axios
        .get("/teacher/all")
        .then((response) => {
          this.teacherList = response.data.data;
        })
        .catch((error) => {
          console.error("获取教师数据失败", error);
          this.$message.error("获取教师数据失败");
        });
    },

    // 选择学生
    selectStudent(row) {
      this.selectedStudent = row;
      this.thesisForm.studentId = row.id;
      this.studentDialogVisible = false; // 关闭弹窗
    },

    // 选择教师
    selectTeacher(row) {
      this.selectedTeacher = row;
      this.thesisForm.teacherId = row.id;
      this.teacherDialogVisible = false; // 关闭弹窗
    },

    submitThesis(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const submitData = {
            title: form.title,
            keywords: form.keywords,
            abstractText: form.abstractText,
            filePath: this.fileList[0].response.data, // 文件路径
            completionTime: this.completeDate, // 完成时间
            status: "PASS", // 状态：EXCELLENT, PASS, FAIL
            downloadCount: 0, // 下载次数
            studentId: this.selectedStudent.studentId, // 学生ID
            teacherId: this.selectedTeacher.teacherId, // 教师ID
            departmentId: this.selectedStudent.departmentId, // 部门ID
            majorId: this.selectedStudent.majorId, // 专业ID
            // studentName: "张三", // 扩展字段：学生姓名
            // teacherName: "李四", // 扩展字段：教师姓名
            // departmentName: "计算机学院", // 扩展字段：部门名称
            // majorName: "软件工程", // 扩展字段：专业名称
          };

          this.$axios
            .post("/thesis", submitData)
            .then((response) => {
              if (response.data.code === 0) {
                console.log("论文添加成功了！");
                this.$message.success("论文添加成功");
                this.$router.push({
                  path: `/thesis`,
                  query: { refresh: true },
                });
              } else {
                this.$message.error("论文添加失败");
              }
            })
            .catch((error) => {
              this.$message.error("请求错误", error);
            });
        } else {
          this.$message.error(请检查输入是否正确);
        }
      });
    },
    cancel() {
      this.$router.push({
        path: `/thesis`,
        query: { refresh: true },
      });
    },
    cancel() {
      this.$router.push({
        path: `/thesis`,
        query: { refresh: true },
      });
    },
    // 页码改变时触发
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchStudents(
        this.currentPage,
        this.studentPageSize,
        this.studentName
      );
    },
    // 每页条数改变时触发
    handleSizeChange(size) {
      this.studentPageSize = size;
      this.currentPage = 1; // 切换每页条数时回到第一页
      this.fetchStudents(
        this.currentPage,
        this.studentPageSize,
        this.studentName
      );
    },
    handleStudentSearch() {
      this.currentPage = 1;
      this.fetchStudents(
        this.currentPage,
        this.studentPageSize,
        this.studentName
      );
    },
    handleUploadError(err, file, fileList) {
      this.$message.error(err);
    },
    handleSuccess(response, file, fileList) {
      // console.log(response);
      if (response.code == 0) {
        this.$message.success("文件上传成功！");
        this.fileList = fileList;
        console.log("fileList: ", this.fileList);
      } else {
        this.$message.error("后端返回错误！");
      }
      this.thesisFile = file;
      // console.log(this.thesisFile);
    },
    beforeUpload(file) {
      const isPDF = file.type === "application/pdf";
      const isLt50M = file.size / 1024 / 1024 < 50;

      if (!isPDF) {
        this.$message.error("上传的论文只能是 PDF 格式!");
      }
      if (!isLt50M) {
        this.$message.error("上传论文大小不能超过 50MB!");
      }
      return isPDF && isLt50M;
    },
    // 超出文件上传个数限制的钩子
    handleExceed() {
      this.$message.error("只允许上传1个文件");
    },
    handleRemove() {
      console.log("准备清空fileList: ", this.fileList);
      this.fileList = [];
    },
    handlePreview(file) {
      console.log("选中文件：", file);
      console.log("要上传的目录：", this.fileList[0].response.data);
    },
  },
  created() {},
};
</script>

<style>
.el-form {
  width: 80vh;
}
.el-button {
  margin-right: 15px;
}
</style>