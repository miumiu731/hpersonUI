<template>
  <div class="mod-article">
    <el-form :inline="true" :model="searchForm" ref="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item label="名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="handleFormReset">重置</el-button>
        <el-button v-if="isAuth('news:article:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('news:article:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="channelId"
        header-align="center"
        align="center"
        label="文章所属频道的id">
      </el-table-column>
      <el-table-column
        prop="websiteId"
        header-align="center"
        align="center"
        label="站点的id">
      </el-table-column>
      <el-table-column
        prop="sourceArticleId"
        header-align="center"
        align="center"
        label="同步源文章id">
      </el-table-column>
      <el-table-column
        prop="sourceType"
        header-align="center"
        align="center"
        label="来源方式 0:后台录入 1:一稿多投 2:频道同步 3:爬虫抓取">
      </el-table-column>
      <el-table-column
        prop="syncId"
        header-align="center"
        align="center"
        label="同步Id">
      </el-table-column>
      <el-table-column
        prop="contentTemplate"
        header-align="center"
        align="center"
        label="输入模版:0-标准 1-快播 2-**模版">
      </el-table-column>
      <el-table-column
        prop="canOriginal"
        header-align="center"
        align="center"
        label="是否原创">
      </el-table-column>
      <el-table-column
        prop="template"
        header-align="center"
        align="center"
        label="文章页面模板">
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="文章的标题">
      </el-table-column>
      <el-table-column
        prop="titleColor"
        header-align="center"
        align="center"
        label="标题的颜色">
      </el-table-column>
      <el-table-column
        prop="titleBold"
        header-align="center"
        align="center"
        label="标题是否加粗（0否 1是）">
      </el-table-column>
      <el-table-column
        prop="titleItalic"
        header-align="center"
        align="center"
        label="标题是否斜体（0否 1是）">
      </el-table-column>
      <el-table-column
        prop="titleUnderline"
        header-align="center"
        align="center"
        label="标题是否加下划线（0否 1是）">
      </el-table-column>
      <el-table-column
        prop="importLevel"
        header-align="center"
        align="center"
        label="推荐程度（普通 0 一级1 二级2 三级3 四级4 五级5）">
      </el-table-column>
      <el-table-column
        prop="toped"
        header-align="center"
        align="center"
        label="是否置顶0-不 1-置顶">
      </el-table-column>
      <el-table-column
        prop="label"
        header-align="center"
        align="center"
        label="标签">
      </el-table-column>
      <el-table-column
        prop="articleTime"
        header-align="center"
        align="center"
        label="文章显示时间">
      </el-table-column>
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="文章的URL">
      </el-table-column>
      <el-table-column
        prop="videoUrl"
        header-align="center"
        align="center"
        label="视频地址">
      </el-table-column>
      <el-table-column
        prop="icon"
        header-align="center"
        align="center"
        label="文章缩略图">
      </el-table-column>
      <el-table-column
        prop="outletUrl"
        header-align="center"
        align="center"
        label="外部链接地址">
      </el-table-column>
      <el-table-column
        prop="limitTerminal"
        header-align="center"
        align="center"
        label="显示产品终端">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态（已发布0，未发布1，待发布2）">
      </el-table-column>
      <el-table-column
        prop="editorId"
        header-align="center"
        align="center"
        label="编辑者id">
      </el-table-column>
      <el-table-column
        prop="editorDeptCode"
        header-align="center"
        align="center"
        label="部门编码">
      </el-table-column>
      <el-table-column
        prop="editorDeptName"
        header-align="center"
        align="center"
        label="编辑人部门名称">
      </el-table-column>
      <el-table-column
        prop="editorName"
        header-align="center"
        align="center"
        label="编辑人">
      </el-table-column>
      <el-table-column
        prop="editTime"
        header-align="center"
        align="center"
        label="编辑时间">
      </el-table-column>
      <el-table-column
        prop="publisherId"
        header-align="center"
        align="center"
        label="发布者id">
      </el-table-column>
      <el-table-column
        prop="publisherName"
        header-align="center"
        align="center"
        label="发布人姓名">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        header-align="center"
        align="center"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="lastEditorId"
        header-align="center"
        align="center"
        label="最后修改人">
      </el-table-column>
      <el-table-column
        prop="lastEditorName"
        header-align="center"
        align="center"
        label="最后修改人姓名">
      </el-table-column>
      <el-table-column
        prop="lastEditTime"
        header-align="center"
        align="center"
        label="最后修改时间">
      </el-table-column>
      <el-table-column
        prop="version"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="relationArticleId"
        header-align="center"
        align="center"
        label="相关的文章Id">
      </el-table-column>
      <el-table-column
        prop="relationArticleUrl"
        header-align="center"
        align="center"
        label="相关文章url">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('news:article:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('news:article:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './article-add-or-update'

  export default {
    data () {
      return {
        searchForm: {
          name: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.$http({
          url: '/news/article/list',
          method: 'get',
          params: {
            'page': this.pageIndex,
            'limit': this.pageSize,
            'name': this.searchForm.name
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.records
            this.totalPage = data.page.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
       //重置
    handleFormReset() {
      this.$refs.searchForm.resetFields();
    },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        let ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: '/news/article/delete',
            method: 'post',
            data: ids
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
              this.getDataList()
            }
          })
        }).catch(() => {
        })
      }
    }
  }
</script>
