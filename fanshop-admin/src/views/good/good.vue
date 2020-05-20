<template>
    <div>
        <p>商品管理</p>
        <el-button type="primary" size="small" @click="onAdd">添加商品</el-button>
        <el-pagination style="display:inline-block;margin-left:630px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next, jumper"
        :total="1243">
      </el-pagination>
         <el-table v-loading="loading" :data="goodslist" stripe>
      <el-table-column prop="Id" width="60" label="编号"></el-table-column>
      <el-table-column prop="title" label="商品名称" width="200"></el-table-column>
      <el-table-column label="商品图片" width="100">
        <!-- 凡是需要在表格中插入其他标签的；都可以通过 slot-scope="scope" 获取到表格中数据局 row column -->
        <template slot-scope="scope">
          <img :src="scope.row.img_url" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="supplier" label="商品供应商" width="200"></el-table-column>
      <el-table-column prop="nice" label="商品销量"></el-table-column>
      <el-table-column prop="type_one" label="商品分类一"></el-table-column>
      <el-table-column prop="type_two" label="商品分类二"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog </el-button> -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>你确定删除商品吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next, jumper"
        :total="1243">
      </el-pagination>
    </div>
</template>
<script>
import { fetchList,fetchAll, del } from "@/api/good.js";
import scroll from "@/utils/scroll.js";
export default {
  data: function() {
    return {
      goodslist: [], // 表格中数据 歌单列表
      count: 10, // 页面中数据的数量
      loading: false, // 控制loading是否显示
      dialogVisible: false,
      info: {},
      // 默认显示第一条
      currentPage:1
    };
  },
  created() {
    this.getList();
  },
  mounted() {
  },
  methods: {
    // 获取歌单列表列表
    getList() {
      this.loading = true;
      // 通过发送http请求 中控服务器，获取歌单列表
      fetchList({
        start: this.goodslist.length,
        count: this.count
      })
        .then(res => {
          console.log(res);
          this.loading = false;
          this.goodslist = this.goodslist.concat(res.data);
          if (res.data.length < this.count) {
            // 没有跟多数据了，到底了
            this.$message({
              message: "没有更多数据了",
              type: "info"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.$message({
            message: "获取商品列表失败了",
            type: "warning"
          });
        });
    },
    handleCurrentChange(val) {
      var index = val;
      this.currentPage = index;
      this.loading = true;
      // 通过发送http请求 中控服务器，获取歌单列表
      fetchList({
        start: (index-1) * this.count,
        count: this.count
      })
        .then(res => {
          console.log(res);
          this.loading = false;
          this.goodslist = res.data;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.$message({
            message: "获取商品列表失败了",
            type: "warning"
          });
        });
    },
    onAdd(res) {
      // 跳转到添加页面
      this.$router.push(`/good/add`);
    },
    onDel(res) {
      this.dialogVisible = true;
      this.info.id = res.Id;
    },
    doDel() {
      var index = this.currentPage;
      this.dialogVisible = false;
      del({ id: this.info.id })
        .then(res => {
          this.handleCurrentChange(index);
          if (res.data.deleted > 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "删除失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: "删除的时候，出错了",
            type: "error"
          });
        });
    }
  }
}
</script>