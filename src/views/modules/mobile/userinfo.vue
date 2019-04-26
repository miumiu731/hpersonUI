<template>
  <div class="mod-userinfo">
    <el-form :inline="true" :model="searchForm" ref="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item label="名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="handleFormReset">重置</el-button>
        <el-button v-if="isAuth('mobile:userinfo:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('mobile:userinfo:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        prop="telephoneNumber"
        header-align="center"
        align="center"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="phoneClientType"
        header-align="center"
        align="center"
        label="手机设备类型：0-未知   1-android  2-iphone   ">
      </el-table-column>
      <el-table-column
        prop="phonePushToken"
        header-align="center"
        align="center"
        label="推送token-手机">
      </el-table-column>
      <el-table-column
        prop="phonePushCid"
        header-align="center"
        align="center"
        label="个推用户ID-手机">
      </el-table-column>
      <el-table-column
        prop="phoneMachineInfo"
        header-align="center"
        align="center"
        label="手机品牌,手机型号,手机系统版本">
      </el-table-column>
      <el-table-column
        prop="phoneSoftVersion"
        header-align="center"
        align="center"
        label="终端软件版本-手机">
      </el-table-column>
      <el-table-column
        prop="phoneFirstLoginTime"
        header-align="center"
        align="center"
        label="第一次登陆时间-手机">
      </el-table-column>
      <el-table-column
        prop="phoneLastLoginTime"
        header-align="center"
        align="center"
        label="最后登录时间-手机">
      </el-table-column>
      <el-table-column
        prop="phoneLoginTimes"
        header-align="center"
        align="center"
        label="登录次数-手机">
      </el-table-column>
      <el-table-column
        prop="phoneVersionCode"
        header-align="center"
        align="center"
        label="开发版本">
      </el-table-column>
      <el-table-column
        prop="padClientType"
        header-align="center"
        align="center"
        label="pad设备类型-pad：0-未知   1-androidPad  2-iPad">
      </el-table-column>
      <el-table-column
        prop="padPushToken"
        header-align="center"
        align="center"
        label="推送token-pad">
      </el-table-column>
      <el-table-column
        prop="padMachineInfo"
        header-align="center"
        align="center"
        label="pad品牌,型号,系统版本-pad">
      </el-table-column>
      <el-table-column
        prop="padSoftVersion"
        header-align="center"
        align="center"
        label="终端软件版本-pad">
      </el-table-column>
      <el-table-column
        prop="padFirstLoginTime"
        header-align="center"
        align="center"
        label="第一次登陆时间-pad">
      </el-table-column>
      <el-table-column
        prop="padLastLoginTime"
        header-align="center"
        align="center"
        label="最后登录时间-pad">
      </el-table-column>
      <el-table-column
        prop="padLoginTimes"
        header-align="center"
        align="center"
        label="登录次数-pad">
      </el-table-column>
      <el-table-column
        prop="padPushCid"
        header-align="center"
        align="center"
        label="个推用户ID-pad">
      </el-table-column>
      <el-table-column
        prop="padVersionCode"
        header-align="center"
        align="center"
        label="pad开发版本">
      </el-table-column>
      <el-table-column
        prop="ip"
        header-align="center"
        align="center"
        label="设备IP">
      </el-table-column>
      <el-table-column
        prop="operator"
        header-align="center"
        align="center"
        label="运营商">
      </el-table-column>
      <el-table-column
        prop="network"
        header-align="center"
        align="center"
        label="网络类型">
      </el-table-column>
      <el-table-column
        prop="screenSize"
        header-align="center"
        align="center"
        label="屏幕尺寸">
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
          <el-button v-if="isAuth('mobile:userinfo:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('mobile:userinfo:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  import AddOrUpdate from './userinfo-add-or-update'

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
          url: '/mobile/userinfo/list',
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
            url: '/mobile/userinfo/delete',
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
