<template>
  <div class="login-container">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             class="login-form">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <div class="input-container">
        <el-form-item prop="username">
          <el-input placeholder="用户名"
                    prefix-icon="el-icon-user"
                    v-model="ruleForm.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码"
                    prefix-icon="el-icon-lock"
                    type="password"
                    :show-password="true"
                    v-model="ruleForm.password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     style="width:100%"
                     @click="submitForm('ruleForm')"
                     :loading="false">立即登录</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="tips">
      <span class="tips-text">默认账号：admin</span>
      <span class="tips-text">默认密码：admin</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('this.ruleForm=>', this.ruleForm)
          this.$axios.adminlogin.login(this.ruleForm).then(res => {
            console.log('res=>', res)
            if (res.errorCode === 1) {
              this.$message({
                message: res.msg,
                onClose: () => {
                  this.$router.push('/')
                }
              })
            } else {
              this.$message(res.msg)
            }
          }).catch(err => {
            console.log('err=>', err)
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.login-container >>> .el-input__inner {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #fff;
}
.title {
  font-size: 26px;
  color: #eee;
  margin: 0 auto 40px auto;
  text-align: center;
  font-weight: 700;
}
.tips {
  text-align: center;
  color: #fff;
}
.tips .tips-text {
  display: block;
  margin-bottom: 10px;
}
</style>