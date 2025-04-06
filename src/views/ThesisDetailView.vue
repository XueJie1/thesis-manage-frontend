<template>
  <div class="thesisdetail">
    <el-switch v-model="isEditable" active-text="编辑" inactive-text="仅查看">
    </el-switch>
    <el-form ref="form" :model="thesisData" label-width="150px">
      <el-form-item label="论文标题">
        <el-input v-model="thesisData.title" :disabled="!isEditable"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input
          v-model="thesisData.abstractText"
          :disabled="!isEditable"
        ></el-input>
      </el-form-item>
      <el-form-item label="作者（学生）姓名">
        <span class="student-name">{{ thesisData.studentName }}</span>
        <el-button @click="showEditStudent()">更改</el-button>
      </el-form-item>
      <el-form-item label="指导教师">
        <span class="student-name">{{ thesisData.teacherName }}</span>
        <el-button @click="showEditTeacher()">更改</el-button>
      </el-form-item>
      <el-form-item label="论文文件">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传PDF文件，且不超过50MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存更改</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thesisData: [],
      isEditable: false,
    };
  },
  methods: {
    load() {
      const id = this.$route.params.id;
      this.$axios
        .get(`/thesis/${id}`)
        .then((res) => {
          console.log("res:", res);
          this.thesisData = res.data.data;
        })
        .catch((err) => {
          console.error("数据加载失败", err);
        });
    },
    showEditStudent() {
      console.log("展示更改学生窗口");
    },
    showEditTeacher() {
      console.log("展示更改教师窗口");
    },
    cancel() {
      this.$router.push({
        path: `/thesis`,
        query: { refresh: true },
      });
    },
    handlePreview() {
      console.log("预览函数");
    },
  },
  created() {
    // const id = this.$route.params.id;
    this.load();
    // console.log('thesisData:'+this.thesisData);
  },
};
</script>

<style>
.el-form {
  width: 80vh;
  font-size: large;
}
.el-switch {
  margin: 6px;
  padding-bottom: 12px;
}
.tableText {
  /* font-size: large; */
  text-align: left;
}

.student-name {
  margin: 0;
  padding-right: 10px;
}
</style>