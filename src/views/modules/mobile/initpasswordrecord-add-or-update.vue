<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="被初始密码手机用户号码" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="被初始密码手机用户号码"></el-input>
      </el-form-item>
      <el-form-item label="创建人id" prop="createId">
        <el-input v-model="dataForm.createId" placeholder="创建人id"></el-input>
      </el-form-item>
      <el-form-item label="创建人名称" prop="createName">
        <el-input v-model="dataForm.createName" placeholder="创建人名称"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
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
          telephoneNumber: '',
          createId: '',
          createName: '',
          createTime: ''},
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
              url: `/mobile/initpasswordrecord/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.initpasswordrecord
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
                url: `/mobile/initpasswordrecord/${!this.dataForm.id ? 'save' : 'update'}`,
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
