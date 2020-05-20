<template>
  <div>
    <el-form ref="form" :model="goodlist" label-width="100px">
      <el-form-item label="商品编号">
        <el-input v-model="goodlist.Id"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
        class="upload-demo"
        :before-upload="beforeupload"
        action="http://localhost:3000/swiper/upload"
        :on-success="uploadSuccess"
        :show-file-list="false"
        :on-progress="progress"
      >
        <el-button type="primary" size="small">上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="goodlist.title"></el-input>
      </el-form-item>
       <el-form-item label="商品价格">
        <el-input v-model="goodlist.price"></el-input>
      </el-form-item>
      <el-form-item label="商品供应商">
        <el-input v-model="goodlist.supplier"></el-input>
      </el-form-item>
       <el-form-item label="商品销量">
        <el-input v-model="goodlist.nice"></el-input>
      </el-form-item>
      <el-form-item label="商品类别一">
        <el-input v-model="goodlist.type_one"></el-input>
      </el-form-item>
       <el-form-item label="商品类别二">
        <el-input v-model="goodlist.type_two"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addGoods } from "@/api/good.js";
export default {
  data: function() {
    return {
      goodlist: {
          Id:'例如：1',
          title:'手冲咖啡6杯装(定制款)',
          price:'39',
          supplier:'星巴克咖啡基地制造商直供',
          nice:'100',
          type_one:'咖啡',
          type_two:'手冲咖啡',
          mack:'<span style="color: #FB4C81;background: ; border-color: #FB4C81">&#x4E00;&#x8D77;&#x62FC;</span>',
          src:'',
          img_list_url: ''
      },
      param:"",//表单要提交的参数
    };
  },
  created() {
  },
  methods: {
    beforeupload(file) {
        console.log(file);
        //创建临时的路径来展示图片
        var windowURL = window.URL || window.webkitURL;
                
        this.goodlist.src = windowURL.createObjectURL(file);
        this.goodlist.img_list_url = windowURL.createObjectURL(file);
        return false;
    },
     onSubmit() {
      addGoods({
        data: this.goodlist,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        if(res.code == 20000) {
            this.$router.back();
        }
      })
    },
    onCancel() {
      //  点击取消返回到歌单列表
      this.$router.back();
    }
  }
};
</script>
<style scope>
.edit {
  margin-top: 30px;
}
</style>