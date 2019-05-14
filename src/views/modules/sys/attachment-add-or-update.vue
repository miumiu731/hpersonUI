<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="附件名" prop="name">
        <el-input v-model="dataForm.name" placeholder="附件名"></el-input>
      </el-form-item>
      <!--
      <el-form-item label="路径" prop="path">
        <el-input v-model="dataForm.path" placeholder="路径"></el-input>
      </el-form-item>
      <el-form-item label="大小" prop="size">
        <el-input v-model="dataForm.size" placeholder="大小"></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="dataForm.version" placeholder="版本"></el-input>
      </el-form-item>
      <el-form-item label="上次执行时间" prop="lastAccess">
        <el-input v-model="dataForm.lastAccess" placeholder="上次执行时间"></el-input>
      </el-form-item>
      -->
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
          name: '',
          path: '',
          size: '',
          version: '',
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
              url: `/sys/attachment/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.attachment
              }
            })
          }
        })
      },
      
      dataFormSubmit () {
        this.$refs['dataForm']
          .validate((valid) => {
            if (valid) {
              this.$http({
                url: `/sys/attachment/${!this.dataForm.id ? 'save' : 'update'}`,
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
