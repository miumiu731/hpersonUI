<template>
  <div class="mod-userredpacket">
    <el-form :inline="true" :model="searchForm" ref="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item label="名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="handleFormReset">重置</el-button>
        <el-button v-if="isAuth('mobile:userredpacket:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('mobile:userredpacket:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        prop="activityId"
        header-align="center"
        align="center"
        label="活动ID">
      </el-table-column>
      <el-table-column
        prop="activityName"
        header-align="center"
        align="center"
        label="活动名称">
      </el-table-column>
      <el-table-column
        prop="number"
        header-align="center"
        align="center"
        label="用户号码">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="用户类型1-预售中新用户送15天试用 2-预售有权限不送 3-预售权限到期送到活动开始">
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="center"
        label="红包数额">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="是否已使用0-未使用 1-已使用">
      </el-table-column>
      <el-table-column
        prop="remind"
        header-align="center"
        align="center"
        label="是否提醒 0-否 1-是">
      </el-table-column>
      <el-table-column
        prop="payId"
        header-align="center"
        align="center"
        label="支付记录id，红包使用于哪条支付记录">
      </el-table-column>
      <el-table-column
        prop="source"
        header-align="center"
        align="center"
        label="来源">
      </el-table-column>
      <el-table-column
        prop="adminId"
        header-align="center"
        align="center"
        label="管理员id">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="expireTime"
        header-align="center"
        align="center"
        label="过期时间">
      </el-table-column>
      <el-table-column
        prop="lastAccess"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('mobile:userredpacket:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('mobile:userredpacket:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  import AddOrUpdate from './userredpacket-add-or-update'

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
          url: '/mobile/userredpacket/list',
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
            url: '/mobile/userredpacket/delete',
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
