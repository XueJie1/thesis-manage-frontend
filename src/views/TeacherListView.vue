<template>
  <div class="teacher">
    <el-row :gutter="5" style="margin-bottom: 10px">
      <el-col :span="6">
        <el-input v-model="searchName" placeholder="搜索教师"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-col>

      <el-col :span="2" :offset="10">
        <el-button type="danger" @click="deleteSelected()">删除所选</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="toAdd()">添加教师</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="teacherData"
      border
      style="width: 100%"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="departmentName" label="学院"></el-table-column>

      <!-- 详情列,必须要有 template slot-scope="scope" ,-->
      <el-table-column label="详情/编辑">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            @click="checkDetail(scope.row.thesisId)"
            >详情</el-button
          ></template
        >
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        style="margin-top: 10px"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
// import { defineComponent } from '@vue/composition-api'

export default {
  data() {
    return {
      teacherData: [],
      searchName: "",
      total: 0, // 数据总条数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
    };
  },
  methods: {
    fetchData(page = 1, size = 10, searchName = "") {
      const params = {
        page,
        pageSize: size,
        searchName,
      };

      // 调用后端接口
      this.$axios
        .get("/teacher/page", { params })
        .then((response) => {
          console.log("API Response Data:", response.data); // Log the full response data
          const { records, total } = response.data.data;
          this.teacherData = records; // 更新表格数据
          this.total = total; // 更新总条数
          console.log("Fetched Records:", records);
        })
        .catch((error) => {
          this.$message.error("错误：" + error);
        });
    },
    handleSelect(selection, row) {
      console.log("当前选中行：", row);
    },
    handleSelectAll(selection) {
      console.log("全选：", selection);
    },
    // 页码改变时触发
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchData(this.currentPage, this.pageSize, this.searchName);
    },
    // 每页条数改变时触发
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 切换每页条数时回到第一页
      this.fetchData(this.currentPage, this.pageSize, this.searchName);
    },
    // 搜索按钮点击事件
    handleSearch() {
      this.currentPage = 1; // 搜索时回到第一页
      this.fetchData(this.currentPage, this.pageSize, this.searchName);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
