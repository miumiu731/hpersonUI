<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户编码" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户编码"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="原余额" prop="oldAmount">
        <el-input v-model="dataForm.oldAmount" placeholder="原余额"></el-input>
      </el-form-item>
      <el-form-item label="新余额" prop="newAmount">
        <el-input v-model="dataForm.newAmount" placeholder="新余额"></el-input>
      </el-form-item>
      <el-form-item label="余额变更" prop="changeAmount">
        <el-input v-model="dataForm.changeAmount" placeholder="余额变更"></el-input>
      </el-form-item>
      <el-form-item label="变更类型 0-获取 1-消耗" prop="type">
        <el-input v-model="dataForm.type" placeholder="变更类型 0-获取 1-消耗"></el-input>
      </el-form-item>
      <el-form-item label="变更途径 4-邀请  401-全名邀请 6-文章阅读  601-文章打赏  8-支付抵用" prop="channel">
        <el-input v-model="dataForm.channel" placeholder="变更途径 4-邀请  401-全名邀请 6-文章阅读  601-文章打赏  8-支付抵用"></el-input>
      </el-form-item>
      <el-form-item label="有效期(备用)" prop="validTime">
        <el-input v-model="dataForm.validTime" placeholder="有效期(备用)"></el-input>
      </el-form-item>
      <el-form-item label="剩余未使用代金券金额" prop="restChangeAmount">
        <el-input v-model="dataForm.restChangeAmount" placeholder="剩余未使用代金券金额"></el-input>
      </el-form-item>
      <el-form-item label="被推荐人的手机号，阅读兑换的文章id， 支付抵用的订单号" prop="objectId">
        <el-input v-model="dataForm.objectId" placeholder="被推荐人的手机号，阅读兑换的文章id， 支付抵用的订单号"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
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
          oldAmount: '',
          newAmount: '',
          changeAmount: '',
          type: '',
          channel: '',
          validTime: '',
          restChangeAmount: '',
          objectId: '',
          description: '',
          createTime: '',
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
              url: `/mobile/coupondetail/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.coupondetail
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
                url: `/mobile/coupondetail/${!this.dataForm.id ? 'save' : 'update'}`,
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
