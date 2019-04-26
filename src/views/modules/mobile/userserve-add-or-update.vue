<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户Id" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户Id"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="dataForm.name" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item label="服务类型 (保留)" prop="serveType">
        <el-input v-model="dataForm.serveType" placeholder="服务类型 (保留)"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="dataForm.content" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="创建人代码" prop="serveId">
        <el-input v-model="dataForm.serveId" placeholder="创建人代码"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="serveTime">
        <el-input v-model="dataForm.serveTime" placeholder="创建时间"></el-input>
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
          name: '',
          serveType: '',
          content: '',
          serveId: '',
          serveTime: '',
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
              url: `/mobile/userserve/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.userserve
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
                url: `/mobile/userserve/${!this.dataForm.id ? 'save' : 'update'}`,
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
