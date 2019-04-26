<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="手机号码" prop="telephoneNumber">
        <el-input v-model="dataForm.telephoneNumber" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="手机设备类型：0-未知   1-android  2-iphone   " prop="phoneClientType">
        <el-input v-model="dataForm.phoneClientType" placeholder="手机设备类型：0-未知   1-android  2-iphone   "></el-input>
      </el-form-item>
      <el-form-item label="推送token-手机" prop="phonePushToken">
        <el-input v-model="dataForm.phonePushToken" placeholder="推送token-手机"></el-input>
      </el-form-item>
      <el-form-item label="个推用户ID-手机" prop="phonePushCid">
        <el-input v-model="dataForm.phonePushCid" placeholder="个推用户ID-手机"></el-input>
      </el-form-item>
      <el-form-item label="手机品牌,手机型号,手机系统版本" prop="phoneMachineInfo">
        <el-input v-model="dataForm.phoneMachineInfo" placeholder="手机品牌,手机型号,手机系统版本"></el-input>
      </el-form-item>
      <el-form-item label="终端软件版本-手机" prop="phoneSoftVersion">
        <el-input v-model="dataForm.phoneSoftVersion" placeholder="终端软件版本-手机"></el-input>
      </el-form-item>
      <el-form-item label="第一次登陆时间-手机" prop="phoneFirstLoginTime">
        <el-input v-model="dataForm.phoneFirstLoginTime" placeholder="第一次登陆时间-手机"></el-input>
      </el-form-item>
      <el-form-item label="最后登录时间-手机" prop="phoneLastLoginTime">
        <el-input v-model="dataForm.phoneLastLoginTime" placeholder="最后登录时间-手机"></el-input>
      </el-form-item>
      <el-form-item label="登录次数-手机" prop="phoneLoginTimes">
        <el-input v-model="dataForm.phoneLoginTimes" placeholder="登录次数-手机"></el-input>
      </el-form-item>
      <el-form-item label="开发版本" prop="phoneVersionCode">
        <el-input v-model="dataForm.phoneVersionCode" placeholder="开发版本"></el-input>
      </el-form-item>
      <el-form-item label="pad设备类型-pad：0-未知   1-androidPad  2-iPad" prop="padClientType">
        <el-input v-model="dataForm.padClientType" placeholder="pad设备类型-pad：0-未知   1-androidPad  2-iPad"></el-input>
      </el-form-item>
      <el-form-item label="推送token-pad" prop="padPushToken">
        <el-input v-model="dataForm.padPushToken" placeholder="推送token-pad"></el-input>
      </el-form-item>
      <el-form-item label="pad品牌,型号,系统版本-pad" prop="padMachineInfo">
        <el-input v-model="dataForm.padMachineInfo" placeholder="pad品牌,型号,系统版本-pad"></el-input>
      </el-form-item>
      <el-form-item label="终端软件版本-pad" prop="padSoftVersion">
        <el-input v-model="dataForm.padSoftVersion" placeholder="终端软件版本-pad"></el-input>
      </el-form-item>
      <el-form-item label="第一次登陆时间-pad" prop="padFirstLoginTime">
        <el-input v-model="dataForm.padFirstLoginTime" placeholder="第一次登陆时间-pad"></el-input>
      </el-form-item>
      <el-form-item label="最后登录时间-pad" prop="padLastLoginTime">
        <el-input v-model="dataForm.padLastLoginTime" placeholder="最后登录时间-pad"></el-input>
      </el-form-item>
      <el-form-item label="登录次数-pad" prop="padLoginTimes">
        <el-input v-model="dataForm.padLoginTimes" placeholder="登录次数-pad"></el-input>
      </el-form-item>
      <el-form-item label="个推用户ID-pad" prop="padPushCid">
        <el-input v-model="dataForm.padPushCid" placeholder="个推用户ID-pad"></el-input>
      </el-form-item>
      <el-form-item label="pad开发版本" prop="padVersionCode">
        <el-input v-model="dataForm.padVersionCode" placeholder="pad开发版本"></el-input>
      </el-form-item>
      <el-form-item label="设备IP" prop="ip">
        <el-input v-model="dataForm.ip" placeholder="设备IP"></el-input>
      </el-form-item>
      <el-form-item label="运营商" prop="operator">
        <el-input v-model="dataForm.operator" placeholder="运营商"></el-input>
      </el-form-item>
      <el-form-item label="网络类型" prop="network">
        <el-input v-model="dataForm.network" placeholder="网络类型"></el-input>
      </el-form-item>
      <el-form-item label="屏幕尺寸" prop="screenSize">
        <el-input v-model="dataForm.screenSize" placeholder="屏幕尺寸"></el-input>
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
          phoneClientType: '',
          phonePushToken: '',
          phonePushCid: '',
          phoneMachineInfo: '',
          phoneSoftVersion: '',
          phoneFirstLoginTime: '',
          phoneLastLoginTime: '',
          phoneLoginTimes: '',
          phoneVersionCode: '',
          padClientType: '',
          padPushToken: '',
          padMachineInfo: '',
          padSoftVersion: '',
          padFirstLoginTime: '',
          padLastLoginTime: '',
          padLoginTimes: '',
          padPushCid: '',
          padVersionCode: '',
          ip: '',
          operator: '',
          network: '',
          screenSize: '',
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
              url: `/mobile/userinfo/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.userinfo
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
                url: `/mobile/userinfo/${!this.dataForm.id ? 'save' : 'update'}`,
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
