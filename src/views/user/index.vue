<template>
  <div>
    <div class="table">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="id"
                         label="id"
                         width="180">
        </el-table-column>
        <el-table-column prop="avatar"
                         label="用户头像"
                         width="180">
          <template slot-scope="scope">
            <img :src="scope.row.avatar"
                 class="thumb" />
          </template>
        </el-table-column>
        <el-table-column prop="username"
                         label="用户昵称">
        </el-table-column>
        <el-table-column prop=""
                         label="操作"
                         width="180">
          <template slot-scope="scope">
            <el-button @click="deleteClick(scope.row)"
                       type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background
                     layout="prev, pager, next"
                     :current-page="1"
                     :total="total"
                     :page-size="pageSize"
                     @current-change="sizeChange">
      </el-pagination>
    </div>
  </div>

</template>

  <script>
export default {
  data () {
    return {
      start: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      let params = {
        start: this.start,
        pageSize: this.pageSize
      }
      this.$axios.user.userList(params).then(res => {
        console.log('res=>', res)
        let resData = res.data.data
        this.total = res.data.total
        this.tableData = resData
      }).catch(error => {
        console.log('houseListError=>', error)
      })
    },
    sizeChange (val) {
      this.start = val
      this.getUser()
    },
    deleteClick (val) {
      let params = {
        id: val.id
      }
      this.$axios.user.userDelete(params).then(res => {
        console.log('更新=>', res)
        if (res.errorCode === 1) {
          this.$message({
            message: res.msg
          });
          this.getUser()
        }
      }).catch(err => {
      })
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.pagination {
  margin-top: 20px;
}
.table >>> .el-table td,
.table >>> .el-table th {
  padding: 10px 0;
}
</style>