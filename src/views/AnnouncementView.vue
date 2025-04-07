<template>
  <div class="announcement">
    <el-row :gutter="5" style="margin-bottom: 10px">
      <el-col :span="6">
        <el-input v-model="searchName" placeholder="搜索公告"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="toAdd()">添加公告</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="announcementData"
      border
      style="width: 100%"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="标题" width="300"></el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="180"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="publisherId"
        label="发布者id"
        width="180"
      ></el-table-column>
      <el-table-column label="详情/编辑">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            @click="checkDetail(scope.row.announcementId)"
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
      announcementData: [],
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
        .get("/announcement/page", { params })
        .then((response) => {
          console.log("API Response Data:", response.data); // Log the full response data
          const { records, total } = response.data.data;
          this.announcementData = records; // 更新表格数据
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
    // 跳转到添加页面
    toAdd() {
      this.$router.push({
        path: `/announcement/add`,
        query: { refresh: true },
      });
    },
    checkDetail(id) {
      console.log(id);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
