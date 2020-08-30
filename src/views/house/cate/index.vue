<template>
  <div>
    <el-row class="add_btn">
      <el-button type="primary"
                 @click="addCate">添加分类</el-button>
    </el-row>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="id"
                       label="id"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="分类名称">
      </el-table-column>
      <el-table-column prop="desc"
                       label="描述">
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
      <el-dialog :title="type==0?'添加分类':'修改分类'"
                 :visible.sync="dialogFormVisible">
        <el-form :model="form">

          <el-form-item label="分类名称"
                        :label-width="formLabelWidth">
            <el-input v-model="form.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述"
                        :label-width="formLabelWidth">
            <el-input v-model="form.desc"
                      autocomplete="off"></el-input>
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
        desc: ''
      },
      formLabelWidth: '120px',
      type: 0
    }
  },
  created () {
    this.getHouseCate()
  },
  methods: {
    getHouseCate () {
      this.$axios.house.houseCate().then(res => {
        console.log('分类', res)
        if (res.errorCode === 1) {
          this.tableData = res.data
        }
      }).catch(err => {

      })
    },
    editClick (val) {
      this.dialogFormVisible = true
      this.type = 1
      this.form.id = val.id
      this.form.name = val.name
      this.form.desc = val.desc
    },
    deleteClick (val) {
      let params = {
        id: val.id
      }
      this.$axios.house.houseCateDelete(params).then(res => {
        console.log('更新=>', res)
        if (res.errorCode === 1) {
          this.$message({
            message: res.msg
          });
          this.getHouseCate()
        }
      }).catch(err => {
      })
    },
    updateClick () {
      this.type === 0 ? this.add(this.form) : this.update(this.form)
    },
    update (date) {
      this.$axios.house.houseCateUpdate(date).then(res => {
        if (res.errorCode === 1) {
          this.$message({
            message: res.msg
          });
          this.getHouseCate()
          this.dialogFormVisible = false
        }
      }).catch(err => {
      })
    },
    add (date) {
      this.$axios.house.houseCateAdd(date).then(res => {
        if (res.errorCode === 1) {
          this.$message({
            message: res.msg
          });
          this.getHouseCate()
          this.dialogFormVisible = false
        }
      }).catch(err => {
      })
    },
    addCate () {
      console.log('添加分类')
      this.dialogFormVisible = true,
        this.type = 0
      this.form = {
        id: '',
        name: '',
        desc: ''
      }
    }
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
</style>