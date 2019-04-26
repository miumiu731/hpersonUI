<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="文章所属频道的id" prop="channelId">
        <el-input v-model="dataForm.channelId" placeholder="文章所属频道的id"></el-input>
      </el-form-item>
      <el-form-item label="站点的id" prop="websiteId">
        <el-input v-model="dataForm.websiteId" placeholder="站点的id"></el-input>
      </el-form-item>
      <el-form-item label="同步源文章id" prop="sourceArticleId">
        <el-input v-model="dataForm.sourceArticleId" placeholder="同步源文章id"></el-input>
      </el-form-item>
      <el-form-item label="来源方式 0:后台录入 1:一稿多投 2:频道同步 3:爬虫抓取" prop="sourceType">
        <el-input v-model="dataForm.sourceType" placeholder="来源方式 0:后台录入 1:一稿多投 2:频道同步 3:爬虫抓取"></el-input>
      </el-form-item>
      <el-form-item label="同步Id" prop="syncId">
        <el-input v-model="dataForm.syncId" placeholder="同步Id"></el-input>
      </el-form-item>
      <el-form-item label="输入模版:0-标准 1-快播 2-**模版" prop="contentTemplate">
        <el-input v-model="dataForm.contentTemplate" placeholder="输入模版:0-标准 1-快播 2-**模版"></el-input>
      </el-form-item>
      <el-form-item label="是否原创" prop="canOriginal">
        <el-input v-model="dataForm.canOriginal" placeholder="是否原创"></el-input>
      </el-form-item>
      <el-form-item label="文章页面模板" prop="template">
        <el-input v-model="dataForm.template" placeholder="文章页面模板"></el-input>
      </el-form-item>
      <el-form-item label="文章的标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="文章的标题"></el-input>
      </el-form-item>
      <el-form-item label="标题的颜色" prop="titleColor">
        <el-input v-model="dataForm.titleColor" placeholder="标题的颜色"></el-input>
      </el-form-item>
      <el-form-item label="标题是否加粗（0否 1是）" prop="titleBold">
        <el-input v-model="dataForm.titleBold" placeholder="标题是否加粗（0否 1是）"></el-input>
      </el-form-item>
      <el-form-item label="标题是否斜体（0否 1是）" prop="titleItalic">
        <el-input v-model="dataForm.titleItalic" placeholder="标题是否斜体（0否 1是）"></el-input>
      </el-form-item>
      <el-form-item label="标题是否加下划线（0否 1是）" prop="titleUnderline">
        <el-input v-model="dataForm.titleUnderline" placeholder="标题是否加下划线（0否 1是）"></el-input>
      </el-form-item>
      <el-form-item label="推荐程度（普通 0 一级1 二级2 三级3 四级4 五级5）" prop="importLevel">
        <el-input v-model="dataForm.importLevel" placeholder="推荐程度（普通 0 一级1 二级2 三级3 四级4 五级5）"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶0-不 1-置顶" prop="toped">
        <el-input v-model="dataForm.toped" placeholder="是否置顶0-不 1-置顶"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="dataForm.label" placeholder="标签"></el-input>
      </el-form-item>
      <el-form-item label="文章显示时间" prop="articleTime">
        <el-input v-model="dataForm.articleTime" placeholder="文章显示时间"></el-input>
      </el-form-item>
      <el-form-item label="文章的URL" prop="url">
        <el-input v-model="dataForm.url" placeholder="文章的URL"></el-input>
      </el-form-item>
      <el-form-item label="视频地址" prop="videoUrl">
        <el-input v-model="dataForm.videoUrl" placeholder="视频地址"></el-input>
      </el-form-item>
      <el-form-item label="文章缩略图" prop="icon">
        <el-input v-model="dataForm.icon" placeholder="文章缩略图"></el-input>
      </el-form-item>
      <el-form-item label="外部链接地址" prop="outletUrl">
        <el-input v-model="dataForm.outletUrl" placeholder="外部链接地址"></el-input>
      </el-form-item>
      <el-form-item label="显示产品终端" prop="limitTerminal">
        <el-input v-model="dataForm.limitTerminal" placeholder="显示产品终端"></el-input>
      </el-form-item>
      <el-form-item label="状态（已发布0，未发布1，待发布2）" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态（已发布0，未发布1，待发布2）"></el-input>
      </el-form-item>
      <el-form-item label="编辑者id" prop="editorId">
        <el-input v-model="dataForm.editorId" placeholder="编辑者id"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="editorDeptCode">
        <el-input v-model="dataForm.editorDeptCode" placeholder="部门编码"></el-input>
      </el-form-item>
      <el-form-item label="编辑人部门名称" prop="editorDeptName">
        <el-input v-model="dataForm.editorDeptName" placeholder="编辑人部门名称"></el-input>
      </el-form-item>
      <el-form-item label="编辑人" prop="editorName">
        <el-input v-model="dataForm.editorName" placeholder="编辑人"></el-input>
      </el-form-item>
      <el-form-item label="编辑时间" prop="editTime">
        <el-input v-model="dataForm.editTime" placeholder="编辑时间"></el-input>
      </el-form-item>
      <el-form-item label="发布者id" prop="publisherId">
        <el-input v-model="dataForm.publisherId" placeholder="发布者id"></el-input>
      </el-form-item>
      <el-form-item label="发布人姓名" prop="publisherName">
        <el-input v-model="dataForm.publisherName" placeholder="发布人姓名"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" prop="publishTime">
        <el-input v-model="dataForm.publishTime" placeholder="发布时间"></el-input>
      </el-form-item>
      <el-form-item label="最后修改人" prop="lastEditorId">
        <el-input v-model="dataForm.lastEditorId" placeholder="最后修改人"></el-input>
      </el-form-item>
      <el-form-item label="最后修改人姓名" prop="lastEditorName">
        <el-input v-model="dataForm.lastEditorName" placeholder="最后修改人姓名"></el-input>
      </el-form-item>
      <el-form-item label="最后修改时间" prop="lastEditTime">
        <el-input v-model="dataForm.lastEditTime" placeholder="最后修改时间"></el-input>
      </el-form-item>
      <el-form-item label="" prop="version">
        <el-input v-model="dataForm.version" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="相关的文章Id" prop="relationArticleId">
        <el-input v-model="dataForm.relationArticleId" placeholder="相关的文章Id"></el-input>
      </el-form-item>
      <el-form-item label="相关文章url" prop="relationArticleUrl">
        <el-input v-model="dataForm.relationArticleUrl" placeholder="相关文章url"></el-input>
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
          channelId: '',
          websiteId: '',
          sourceArticleId: '',
          sourceType: '',
          syncId: '',
          contentTemplate: '',
          canOriginal: '',
          template: '',
          title: '',
          titleColor: '',
          titleBold: '',
          titleItalic: '',
          titleUnderline: '',
          importLevel: '',
          toped: '',
          label: '',
          articleTime: '',
          url: '',
          videoUrl: '',
          icon: '',
          outletUrl: '',
          limitTerminal: '',
          status: '',
          editorId: '',
          editorDeptCode: '',
          editorDeptName: '',
          editorName: '',
          editTime: '',
          publisherId: '',
          publisherName: '',
          publishTime: '',
          lastEditorId: '',
          lastEditorName: '',
          lastEditTime: '',
          version: '',
          relationArticleId: '',
          relationArticleUrl: ''},
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
              url: `/news/article/info/${this.dataForm.id}`,
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.article
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
                url: `/news/article/${!this.dataForm.id ? 'save' : 'update'}`,
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
