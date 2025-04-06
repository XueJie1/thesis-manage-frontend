<template>
  <div class="thesis">
    <el-row gutter="10" style="margin-bottom: 10px">
      <el-col :span="6">
        <el-input v-model="searchTitle" placeholder="搜索论文标题"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-col>
      <el-col :span="2" offset="10">
        <el-button type="danger" @click="deleteSelected()">删除所选</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="toAdd()">添加论文</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="论文标题" width="180">
      </el-table-column>
      <el-table-column prop="studentName" label="作者（学生）" width="180">
      </el-table-column>
      <el-table-column prop="teacherName" label="指导教师"> </el-table-column>
      <el-table-column prop="completionTime" label="完成时间">
      </el-table-column>
      <el-table-column prop="status" label="评价"></el-table-column>
      <el-table-column prop="departmentName" label="学院"></el-table-column>
      <el-table-column prop="majorName" label="专业"></el-table-column>
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
export default {
  data() {
    return {
      tableData: [],
      total: 0, // 数据总条数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      searchTitle: "", // 用户输入的论文标题
      selectedRows: [],
    };
  },
  methods: {
    fetchData(page = 1, size = 10, title = "") {
      const params = {
        page,
        pageSize: size,
        title,
      };

      // 调用后端接口
      this.$axios
        .get("/thesis/page", { params })
        .then((response) => {
          const { records, total } = response.data.data;
          this.tableData = records; // 更新表格数据
          this.total = total; // 更新总条数
          console.log(records);
        })
        .catch((error) => {
          this.$message.error("错误：", error);
        });
    },
    checkDetail: function (id) {
      // alert(id)
      // vue 路由跳转
      this.$router.push({
        path: `/thesis/detail/${id}`,
        query: { refresh: true }, // 可选：强制详情页刷新数据
      });
    },
    toAdd() {
      this.$router.push({
        path: `/thesis/add`,
        query: { refresh: true }, // 可选：强制详情页刷新数据
      });
    },
    handleSelect(selection, row) {
      this.selectedRows = selection;
      console.log("当前选中行：", row);
    },
    handleSelectAll(selection) {
      console.log("全选：", selection);
    },
    // 页码改变时触发
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchData(this.currentPage, this.pageSize, this.searchTitle);
    },
    // 每页条数改变时触发
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 切换每页条数时回到第一页
      this.fetchData(this.currentPage, this.pageSize, this.searchTitle);
    },
    // 搜索按钮点击事件
    handleSearch() {
      this.currentPage = 1; // 搜索时回到第一页
      this.fetchData(this.currentPage, this.pageSize, this.searchTitle);
    },
    deleteSelected() {
      if (this.selectedRows.length === 0) {
        this.$message.warning("请选择要删除的项");
        return;
      }

      // 提取选中的 ID
      const ids = this.selectedRows.map((row) => row.thesisId).join(",");

      // 调用删除接口
      this.$axios
        .delete(`/thesis?ids=${ids}`)
        .then(() => {
          this.$message.success("删除成功");
          this.fetchData(); // 刷新表格数据
        })
        .catch((error) => {
          console.error("删除失败", error);
          this.$message.error("删除失败");
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.pagination {
  text-align: center;
  margin-top: 20px;
}
</style>