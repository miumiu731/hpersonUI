<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="手机号码(唯一约束)" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="手机号码(唯一约束)"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="dataForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="会员ID" prop="memberId">
        <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input>
      </el-form-item>
      <el-form-item label="管理员ID" prop="adminId">
        <el-input v-model="dataForm.adminId" placeholder="管理员ID"></el-input>
      </el-form-item>
      <el-form-item label="划转时间" prop="transferTime">
        <el-input v-model="dataForm.transferTime" placeholder="划转时间"></el-input>
      </el-form-item>
      <el-form-item label="头像图片路径" prop="faceIco">
        <el-input v-model="dataForm.faceIco" placeholder="头像图片路径"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nikeName">
        <el-input v-model="dataForm.nikeName" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="dataForm.sex" placeholder="性别"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-input v-model="dataForm.birthday" placeholder="生日"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="job">
        <el-input v-model="dataForm.job" placeholder="职位"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input v-model="dataForm.country" placeholder="国家"></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="provinces">
        <el-input v-model="dataForm.provinces" placeholder="省份"></el-input>
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input v-model="dataForm.city" placeholder="市"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="area">
        <el-input v-model="dataForm.area" placeholder="地区"></el-input>
      </el-form-item>
      <el-form-item label="状态（0-禁用，1-启用）" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态（0-禁用，1-启用）"></el-input>
      </el-form-item>
      <el-form-item label="是否有扫描功能0-不拥有  1-拥有" prop="isScanQr">
        <el-input v-model="dataForm.isScanQr" placeholder="是否有扫描功能0-不拥有  1-拥有"></el-input>
      </el-form-item>
      <el-form-item label="用户类型：0-客户 1-员工 2-首席体验师 3-特殊用户" prop="userType">
        <el-input v-model="dataForm.userType" placeholder="用户类型：0-客户 1-员工 2-首席体验师 3-特殊用户"></el-input>
      </el-form-item>
      <el-form-item label="补丁版本" prop="userPhonePatchVersion">
        <el-input v-model="dataForm.userPhonePatchVersion" placeholder="补丁版本"></el-input>
      </el-form-item>
      <el-form-item label="PAD补丁版本" prop="userPadPatchVersion">
        <el-input v-model="dataForm.userPadPatchVersion" placeholder="PAD补丁版本"></el-input>
      </el-form-item>
      <el-form-item label="注册来源  " prop="source">
        <el-input v-model="dataForm.source" placeholder="注册来源  "></el-input>
      </el-form-item>
      <el-form-item label="注册来源网址" prop="sourceUrl">
        <el-input v-model="dataForm.sourceUrl" placeholder="注册来源网址"></el-input>
      </el-form-item>
      <el-form-item label="试用次数" prop="tryNum">
        <el-input v-model="dataForm.tryNum" placeholder="试用次数"></el-input>
      </el-form-item>
      <el-form-item label="" prop="tryDay">
        <el-input v-model="dataForm.tryDay" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="绑定机器码" prop="machineCode">
        <el-input v-model="dataForm.machineCode" placeholder="绑定机器码"></el-input>
      </el-form-item>
      <el-form-item label="首次登录时间" prop="firstLoginTime">
        <el-input v-model="dataForm.firstLoginTime" placeholder="首次登录时间"></el-input>
      </el-form-item>
      <el-form-item label="最后登录时间" prop="lastLoginTime">
        <el-input v-model="dataForm.lastLoginTime" placeholder="最后登录时间"></el-input>
      </el-form-item>
      <el-form-item label="登录次数" prop="loginTimes">
        <el-input v-model="dataForm.loginTimes" placeholder="登录次数"></el-input>
      </el-form-item>
      <el-form-item label="创建时间-注册时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间-注册时间"></el-input>
      </el-form-item>
      <el-form-item label="最后联系时间" prop="contactTime">
        <el-input v-model="dataForm.contactTime" placeholder="最后联系时间"></el-input>
      </el-form-item>
      <el-form-item label="邀请活动名称" prop="inviteActivityName">
        <el-input v-model="dataForm.inviteActivityName" placeholder="邀请活动名称"></el-input>
      </el-form-item>
      <el-form-item label="微信用户的统一标识" prop="unionId">
        <el-input v-model="dataForm.unionId" placeholder="微信用户的统一标识"></el-input>
      </el-form-item>
      <el-form-item label="用户邀请二维码地址" prop="qrFilePath">
        <el-input v-model="dataForm.qrFilePath" placeholder="用户邀请二维码地址"></el-input>
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
          telephoneNumber: '',
          password: '',
          memberId: '',
          adminId: '',
          transferTime: '',
          faceIco: '',
          name: '',
          nikeName: '',
          sex: '',
          birthday: '',
          job: '',
          phone: '',
          email: '',
          address: '',
          country: '',
          provinces: '',
          city: '',
          area: '',
          status: '',
          isScanQr: '',
          userType: '',
          userPhonePatchVersion: '',
          userPadPatchVersion: '',
          source: '',
          sourceUrl: '',
          tryNum: '',
          tryDay: '',
          machineCode: '',
          firstLoginTime: '',
          lastLoginTime: '',
          loginTimes: '',
          createTime: '',
          contactTime: '',
          inviteActivityName: '',
          unionId: '',
          qrFilePath: '',
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
              url: `/mobile/user/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.user
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
                url: `/mobile/user/${!this.dataForm.id ? 'save' : 'update'}`,
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
