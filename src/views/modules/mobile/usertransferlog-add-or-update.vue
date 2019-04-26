<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户Id" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户Id"></el-input>
      </el-form-item>
      <el-form-item label="手机号  key" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="手机号  key"></el-input>
      </el-form-item>
      <el-form-item label="原管理员id" prop="oldAdminId">
        <el-input v-model="dataForm.oldAdminId" placeholder="原管理员id"></el-input>
      </el-form-item>
      <el-form-item label="原管理员姓名" prop="oldAdminName">
        <el-input v-model="dataForm.oldAdminName" placeholder="原管理员姓名"></el-input>
      </el-form-item>
      <el-form-item label="新管理员id" prop="newAdminId">
        <el-input v-model="dataForm.newAdminId" placeholder="新管理员id"></el-input>
      </el-form-item>
      <el-form-item label="新管理员姓名" prop="newAdminName">
        <el-input v-model="dataForm.newAdminName" placeholder="新管理员姓名"></el-input>
      </el-form-item>
      <el-form-item label="划转人id" prop="transferPersonId">
        <el-input v-model="dataForm.transferPersonId" placeholder="划转人id"></el-input>
      </el-form-item>
      <el-form-item label="划转人" prop="transferPersonName">
        <el-input v-model="dataForm.transferPersonName" placeholder="划转人"></el-input>
      </el-form-item>
      <el-form-item label="划转时间" prop="transferTime">
        <el-input v-model="dataForm.transferTime" placeholder="划转时间"></el-input>
      </el-form-item>
      <el-form-item label="原因" prop="reason">
        <el-input v-model="dataForm.reason" placeholder="原因"></el-input>
      </el-form-item>
      <el-form-item label="最新操作时间" prop="lastAccess">
        <el-input v-model="dataForm.lastAccess" placeholder="最新操作时间"></el-input>
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
          telephoneNumber: '',
          oldAdminId: '',
          oldAdminName: '',
          newAdminId: '',
          newAdminName: '',
          transferPersonId: '',
          transferPersonName: '',
          transferTime: '',
          reason: '',
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
              url: `/mobile/usertransferlog/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.usertransferlog
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
                url: `/mobile/usertransferlog/${!this.dataForm.id ? 'save' : 'update'}`,
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
