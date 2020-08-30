<template>
  <div>
    <el-row class="add_btn">
      <el-button type="primary"
                 @click="addBanner">添加轮播图</el-button>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="id"
                       label="id"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="轮播图名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="path"
                       label="封面图">
        <template slot-scope="scope">
          <el-image :src="scope.row.path"
                    class="thumb">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop=""
                       label="操作"
                       width="180">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="dialog">
      <el-dialog :title="type==0?'添加轮播图':'修改轮播图'"
                 :visible.sync="dialogFormVisible">
        <el-form :model="form">

          <el-form-item label="分类名称"
                        :label-width="formLabelWidth">
            <el-input v-model="form.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        :label-width="formLabelWidth">
            <el-upload class="avatar-uploader"
                       action="http://127.0.0.1:7001/bannerImage"
                       :with-credentials="true"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="updateClick">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

  <script>
export default {
  data () {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        imgUrl: ''
      },
      formLabelWidth: '120px',
      type: 0,
      fileList: [],
      imageUrl: ''
    }
  },
  created () {
    this.getBanner()
  },
  methods: {
    getBanner () {
      this.$axios.banner.adminBannerList().then(res => {
        if (res.errorCode === 1) {
          this.tableData = res.banner
        }
      }).catch(err => {
      })
    },
    editClick (val) {
      this.dialogFormVisible = true
      this.type = 1
      this.form.id = val.id
      this.form.name = val.name
      this.form.imgUrl = val.path
      this.imageUrl = val.path
    },
    deleteClick (val) {
      let params = {
        id: val.id
      }
      this.$axios.banner.deleteBanner(params).then(res => {
        if (res.errorCode === 1) {
          this.$message({
            message: res.msg
          });
          this.getBanner()
        }
      }).catch(err => {
      })
    },
    updateClick () {
      this.type === 0 ? this.add(this.form) : this.update(this.form)
    },
    update (date) {
      this.$axios.banner.uploadBanner(date).then(res => {
        if (res.errorCode === 1) {
          this.$message({
            message: res.msg
          });
          this.getBanner()
          this.dialogFormVisible = false
        }
      }).catch(err => {
      })

    },
    add (date) {
      this.$axios.banner.addBanner(date).then(res => {
        if (res.errorCode === 1) {
          this.$message({
            message: res.msg
          });
          this.getBanner()
          this.dialogFormVisible = false
        }
      }).catch(err => {
      })
    },
    addBanner () {
      this.dialogFormVisible = true
      this.type = 0
      this.imageUrl = ''
      this.form = {
        id: '',
        name: '',
        imgUrl: ''
      }
    },
    handleAvatarSuccess (res, file) {
      this.form.imgUrl = res.data[0]
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
}
</script>
<style scoped>
.add_btn {
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}
.thumb {
  width: 120px;
  height: 60px;
}
.pagination {
  margin-top: 20px;
}
.dialog .el-input {
  width: 280px;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fbfdff;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>