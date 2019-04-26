<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="活动ID" prop="activityId">
        <el-input v-model="dataForm.activityId" placeholder="活动ID"></el-input>
      </el-form-item>
      <el-form-item label="活动名称" prop="activityName">
        <el-input v-model="dataForm.activityName" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="用户号码" prop="number">
        <el-input v-model="dataForm.number" placeholder="用户号码"></el-input>
      </el-form-item>
      <el-form-item label="用户类型1-预售中新用户送15天试用 2-预售有权限不送 3-预售权限到期送到活动开始" prop="type">
        <el-input v-model="dataForm.type" placeholder="用户类型1-预售中新用户送15天试用 2-预售有权限不送 3-预售权限到期送到活动开始"></el-input>
      </el-form-item>
      <el-form-item label="红包数额" prop="amount">
        <el-input v-model="dataForm.amount" placeholder="红包数额"></el-input>
      </el-form-item>
      <el-form-item label="是否已使用0-未使用 1-已使用" prop="status">
        <el-input v-model="dataForm.status" placeholder="是否已使用0-未使用 1-已使用"></el-input>
      </el-form-item>
      <el-form-item label="是否提醒 0-否 1-是" prop="remind">
        <el-input v-model="dataForm.remind" placeholder="是否提醒 0-否 1-是"></el-input>
      </el-form-item>
      <el-form-item label="支付记录id，红包使用于哪条支付记录" prop="payId">
        <el-input v-model="dataForm.payId" placeholder="支付记录id，红包使用于哪条支付记录"></el-input>
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-input v-model="dataForm.source" placeholder="来源"></el-input>
      </el-form-item>
      <el-form-item label="管理员id" prop="adminId">
        <el-input v-model="dataForm.adminId" placeholder="管理员id"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
      </el-form-item>
      <el-form-item label="过期时间" prop="expireTime">
        <el-input v-model="dataForm.expireTime" placeholder="过期时间"></el-input>
      </el-form-item>
      <el-form-item label="" prop="lastAccess">
        <el-input v-model="dataForm.lastAccess" placeholder=""></el-input>
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
          activityId: '',
          activityName: '',
          number: '',
          type: '',
          amount: '',
          status: '',
          remind: '',
          payId: '',
          source: '',
          adminId: '',
          createTime: '',
          expireTime: '',
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
              url: `/mobile/userredpacket/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.userredpacket
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
                url: `/mobile/userredpacket/${!this.dataForm.id ? 'save' : 'update'}`,
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
