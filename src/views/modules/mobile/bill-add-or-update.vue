<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="手机用户id" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="手机用户id"></el-input>
      </el-form-item>
      <el-form-item label="0-增值税发票，1-增值税专用发票" prop="type">
        <el-input v-model="dataForm.type" placeholder="0-增值税发票，1-增值税专用发票"></el-input>
      </el-form-item>
      <el-form-item label="0-个人，1-单位" prop="classify">
        <el-input v-model="dataForm.classify" placeholder="0-个人，1-单位"></el-input>
      </el-form-item>
      <el-form-item label="发票抬头/公司名称" prop="companyName">
        <el-input v-model="dataForm.companyName" placeholder="发票抬头/公司名称"></el-input>
      </el-form-item>
      <el-form-item label="纳税人识别号/社会信用代码" prop="creditCode">
        <el-input v-model="dataForm.creditCode" placeholder="纳税人识别号/社会信用代码"></el-input>
      </el-form-item>
      <el-form-item label="开户银行" prop="bankName">
        <el-input v-model="dataForm.bankName" placeholder="开户银行"></el-input>
      </el-form-item>
      <el-form-item label="银行账号" prop="bankAccount">
        <el-input v-model="dataForm.bankAccount" placeholder="银行账号"></el-input>
      </el-form-item>
      <el-form-item label="企业注册地址" prop="registerArea">
        <el-input v-model="dataForm.registerArea" placeholder="企业注册地址"></el-input>
      </el-form-item>
      <el-form-item label="企业注册电话" prop="registerPhone">
        <el-input v-model="dataForm.registerPhone" placeholder="企业注册电话"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
      </el-form-item>
      <el-form-item label="最后操作时间" prop="lastAccess">
        <el-input v-model="dataForm.lastAccess" placeholder="最后操作时间"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          userId: '',
          type: '',
          classify: '',
          companyName: '',
          creditCode: '',
          bankName: '',
          bankAccount: '',
          registerArea: '',
          registerPhone: '',
          createTime: '',
          updateTime: '',
          lastAccess: ''},
        dataRule: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || ''
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: `/mobile/bill/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.bill
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm']
          .validate((valid) => {
            if (valid) {
              this.$http({
                url: `/mobile/bill/${!this.dataForm.id ? 'save' : 'update'}`,
                method: 'post',
                data: this.dataForm
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500
                  })
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            }
          })
      }
    }
  }
</script>
