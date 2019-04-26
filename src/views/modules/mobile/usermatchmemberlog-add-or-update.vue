<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户Id" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户Id"></el-input>
      </el-form-item>
      <el-form-item label="手机用户号码" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="手机用户号码"></el-input>
      </el-form-item>
      <el-form-item label="原匹配的会员id" prop="oldMemberId">
        <el-input v-model="dataForm.oldMemberId" placeholder="原匹配的会员id"></el-input>
      </el-form-item>
      <el-form-item label="新匹配的会员id" prop="newMemberId">
        <el-input v-model="dataForm.newMemberId" placeholder="新匹配的会员id"></el-input>
      </el-form-item>
      <el-form-item label="操作人id" prop="operatorId">
        <el-input v-model="dataForm.operatorId" placeholder="操作人id"></el-input>
      </el-form-item>
      <el-form-item label="操作人姓名" prop="operatorName">
        <el-input v-model="dataForm.operatorName" placeholder="操作人姓名"></el-input>
      </el-form-item>
      <el-form-item label="操作时间" prop="operateTime">
        <el-input v-model="dataForm.operateTime" placeholder="操作时间"></el-input>
      </el-form-item>
      <el-form-item label="操作原因" prop="reason">
        <el-input v-model="dataForm.reason" placeholder="操作原因"></el-input>
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
          oldMemberId: '',
          newMemberId: '',
          operatorId: '',
          operatorName: '',
          operateTime: '',
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
              url: `/mobile/usermatchmemberlog/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.usermatchmemberlog
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
                url: `/mobile/usermatchmemberlog/${!this.dataForm.id ? 'save' : 'update'}`,
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
