<template>
  <div>
    <el-col :span="10"
            :xs="24"
            :sm="24"
            :md="10">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="轮播图上传"
                      prop="fileList">
          <el-upload  class="upload-demo"
                     action="http://127.0.0.1:7001/add/banner"
                     :auto-upload="false"
                     accept="image/jpeg,image/png,image/jpg"
                     :multiple="true"
                     :on-change="handleChange"
                     :on-remove="removeFlie"
                     :file-list="ruleForm.fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">第一张图片为封面图，支持上传jpeg,png,jpg类型</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="房源标题"
                      prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="价格"
                      prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="标签"
                      prop="tags">
          <el-checkbox-group v-model="ruleForm.tags"
                             @change="tagChange">
            <el-checkbox label="豪华公寓"
                         name="type"></el-checkbox>
            <el-checkbox label="电梯房"
                         name="type"></el-checkbox>
            <el-checkbox label="学区房"
                         name="type"></el-checkbox>
            <el-checkbox label="游泳池"
                         name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择分类"
                      prop="cate">
          <el-select v-model="ruleForm.cate"
                     placeholder="请选择房源分类"
                     @change="cateChange">
            <el-option :label="item.name"
                       value-key="id"
                       :value="item.id"
                       v-for="(item,index) in cateArray"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>

        <div class="uediter">
          <el-form-item label="详情内容">
            <Uediter :value="ueditor.value"
                     :config="ueditor.config"
                     ref="ue"></Uediter>
          </el-form-item>

        </div>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import ue from '@/components/ue'
export default {
  data () {
    return {
      dat: {
        content: ''
      },
      ueditor: {
        value: '',
        config: {}
      },
      cateArray: [],
      ruleForm: {},
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, message: '长度不低于 5 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        cate: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        tags: [
          { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
        ],
        fileList: [
          { type: 'array',required: true, message: '请至少上传一张图片', trigger: 'change' }
        ]
      }
    };
  },
  created () {
    this.reset()
    this.getHouseCate()
  },
  components: {
    'Uediter': ue
  },
  methods: {
    returnContent () {
      this.dat.content = this.$refs.ue.getUEContent()
    },
    clearContent () {
      this.$refs.ue.clearUEContent()
    },
    getHouseCate () {
      this.$axios.house.houseCate().then(res => {
        console.log('分类', res)
        if (res.errorCode === 1) {
          this.cateArray = res.data
        }
      }).catch(err => {

      })
    },
    cateChange (val) {
      this.ruleForm.cate = val
    },
    submitForm (formName) {
      this.returnContent()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          let tagsJson = JSON.stringify(this.ruleForm.tags)
          formData.append('title', this.ruleForm.title)
          formData.append('price', this.ruleForm.price)
          formData.append('tags', tagsJson)
          formData.append('cateid', this.ruleForm.cate)
          formData.append('value', this.dat.content)
          Object.entries(this.ruleForm.imgs).forEach(file => {
            file[1].forEach((item, index) => {
              console.log('item.raw=>', item.raw)
              formData.append('img' + index, item.raw)
            })
          })
          this.$axios.house.addhouse(formData).then(res => {
            console.log('res=>', res)
            if (res.errorCode === 1) {
              this.$message({
                message: res.msg,
                onClose: () => {
                  this.clearContent()
                  this.reset()
                }
              });
            }
          }).catch(err => {
            console.log('err=>', err)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    handleChange (file, fileList) {
      console.log('fileList=>',fileList)
      this.ruleForm.fileList = fileList
      this.ruleForm.imgs["file"] = fileList;
    },
    removeFlie (val) {
    },
    tagChange (val) {
      this.ruleForm.tags = val
    },
    //初始化参数
    reset () {
      this.ruleForm = {
        title: '',
        price: '',
        tags: [],
        cate: '',
        fileList: [],
        imgs: []
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.uediter >>> .el-form-item__content {
  line-height: 0;
}
</style>