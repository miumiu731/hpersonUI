<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
      </el-form-item>
      <el-form-item label="用户号码" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="用户号码"></el-input>
      </el-form-item>
      <el-form-item label="用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的" prop="unionId">
        <el-input v-model="dataForm.unionId" placeholder="用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的"></el-input>
      </el-form-item>
      <el-form-item label="普通用户的标识，对当前开发者帐号唯一" prop="openId">
        <el-input v-model="dataForm.openId" placeholder="普通用户的标识，对当前开发者帐号唯一"></el-input>
      </el-form-item>
      <el-form-item label="普通用户昵称" prop="nickName">
        <el-input v-model="dataForm.nickName" placeholder="普通用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="普通用户性别，1为男性，2为女性" prop="sex">
        <el-input v-model="dataForm.sex" placeholder="普通用户性别，1为男性，2为女性"></el-input>
      </el-form-item>
      <el-form-item label="普通用户个人资料填写的省份" prop="province">
        <el-input v-model="dataForm.province" placeholder="普通用户个人资料填写的省份"></el-input>
      </el-form-item>
      <el-form-item label="普通用户个人资料填写的城市" prop="city">
        <el-input v-model="dataForm.city" placeholder="普通用户个人资料填写的城市"></el-input>
      </el-form-item>
      <el-form-item label="国家，如中国为CN" prop="country">
        <el-input v-model="dataForm.country" placeholder="国家，如中国为CN"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="headImgUrl">
        <el-input v-model="dataForm.headImgUrl" placeholder="用户头像"></el-input>
      </el-form-item>
      <el-form-item label="用户特权信息" prop="privilege">
        <el-input v-model="dataForm.privilege" placeholder="用户特权信息"></el-input>
      </el-form-item>
      <el-form-item label="微信信息绑定来源 0-手机版   1-唐山钢市  2-废钢小程序" prop="source">
        <el-input v-model="dataForm.source" placeholder="微信信息绑定来源 0-手机版   1-唐山钢市  2-废钢小程序"></el-input>
      </el-form-item>
      <el-form-item label="" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder=""></el-input>
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
          unionId: '',
          openId: '',
          nickName: '',
          sex: '',
          province: '',
          city: '',
          country: '',
          headImgUrl: '',
          privilege: '',
          source: '',
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
              url: `/mobile/wxinfo/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.wxinfo
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
                url: `/mobile/wxinfo/${!this.dataForm.id ? 'save' : 'update'}`,
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
