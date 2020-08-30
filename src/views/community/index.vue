<template>
  <div>
    <div class="table">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="id"
                         label="id"
                         width="180">
        </el-table-column>
        <el-table-column prop="thumb"
                         label="封面图"
                         width="180">
          <template slot-scope="scope">
            <img :src="scope.row.thumb"
                 class="thumb" />
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column prop="price"
                         label="价格"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         label="分类"
                         width="180">
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
    this.getCommunity()
  },
  methods: {
    getCommunity () {
      let params = {
        start: this.start,
        pageSize: this.pageSize
      }
      this.$axios.community.communityList(params).then(res => {
        console.log('res=>', res)
        let resData = res.data.data
        resData.forEach(item => {
          item.thumb = item.imgs[0]
        })
        this.total = res.data.total
        this.tableData = resData
      }).catch(error => {
        console.log('CommunityListError=>', error)
      })
    },
    sizeChange (val) {
      this.start = val
      this.getCommunity()
    },
    deleteClick (val) {
      let params = {
        id:val.id
      }
      this.$axios.community.communityDelete(params).then(res => {
        if (res.errorCode === 1) {
          console.log('删除=>', res)
          this.$message({
            message: res.msg
          });
          this.getCommunity()
          this.dialogFormVisible = false
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
  width: 100px;
  height: 35px;
}
.pagination {
  margin-top: 20px;
}
.table >>> .el-table td,
.table >>> .el-table th {
  padding: 10px 0;
}
</style>