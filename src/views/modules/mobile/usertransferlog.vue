<template>
  <div class="mod-usertransferlog">
    <el-form :inline="true" :model="searchForm" ref="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item label="名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="handleFormReset">重置</el-button>
        <el-button v-if="isAuth('mobile:usertransferlog:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('mobile:usertransferlog:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        prop="userId"
        header-align="center"
        align="center"
        label="用户Id">
      </el-table-column>
      <el-table-column
        prop="telephoneNumber"
        header-align="center"
        align="center"
        label="手机号  key">
      </el-table-column>
      <el-table-column
        prop="oldAdminId"
        header-align="center"
        align="center"
        label="原管理员id">
      </el-table-column>
      <el-table-column
        prop="oldAdminName"
        header-align="center"
        align="center"
        label="原管理员姓名">
      </el-table-column>
      <el-table-column
        prop="newAdminId"
        header-align="center"
        align="center"
        label="新管理员id">
      </el-table-column>
      <el-table-column
        prop="newAdminName"
        header-align="center"
        align="center"
        label="新管理员姓名">
      </el-table-column>
      <el-table-column
        prop="transferPersonId"
        header-align="center"
        align="center"
        label="划转人id">
      </el-table-column>
      <el-table-column
        prop="transferPersonName"
        header-align="center"
        align="center"
        label="划转人">
      </el-table-column>
      <el-table-column
        prop="transferTime"
        header-align="center"
        align="center"
        label="划转时间">
      </el-table-column>
      <el-table-column
        prop="reason"
        header-align="center"
        align="center"
        label="原因">
      </el-table-column>
      <el-table-column
        prop="lastAccess"
        header-align="center"
        align="center"
        label="最新操作时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('mobile:usertransferlog:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('mobile:usertransferlog:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  import AddOrUpdate from './usertransferlog-add-or-update'

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
          url: '/mobile/usertransferlog/list',
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
            url: '/mobile/usertransferlog/delete',
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
