<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户编码" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户编码"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="现金余额(备用)" prop="cash">
        <el-input v-model="dataForm.cash" placeholder="现金余额(备用)"></el-input>
      </el-form-item>
      <el-form-item label="积分余额" prop="score">
        <el-input v-model="dataForm.score" placeholder="积分余额"></el-input>
      </el-form-item>
      <el-form-item label="代金券余额" prop="coupon">
        <el-input v-model="dataForm.coupon" placeholder="代金券余额"></el-input>
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
          telephoneNumber: '',
          cash: '',
          score: '',
          coupon: '',
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
              url: `/mobile/useramount/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.useramount
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
                url: `/mobile/useramount/${!this.dataForm.id ? 'save' : 'update'}`,
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
