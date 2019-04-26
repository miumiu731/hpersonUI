<template>
  <div class="mod-scoredetail">
    <el-form :inline="true" :model="searchForm" ref="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item label="名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button @click="handleFormReset">重置</el-button>
        <el-button v-if="isAuth('mobile:scoredetail:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('mobile:scoredetail:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        label="用户编码">
      </el-table-column>
      <el-table-column
        prop="telephoneNumber"
        header-align="center"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="oldAmount"
        header-align="center"
        align="center"
        label="原积分">
      </el-table-column>
      <el-table-column
        prop="newAmount"
        header-align="center"
        align="center"
        label="新积分">
      </el-table-column>
      <el-table-column
        prop="changeAmount"
        header-align="center"
        align="center"
        label="积分变更">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="变更类型 0-获取 1-消耗">
      </el-table-column>
      <el-table-column
        prop="channel"
        header-align="center"
        align="center"
        label="变更途径 0-登录 10-签到 1-评论 2-推荐  3-分享 4-邀请 401-全名邀请 6-文章阅读 601-文章打赏 7-礼品兑换 8-支付抵用 9-积分商城抽奖  99-过期 98-管理员赠送">
      </el-table-column>
      <el-table-column
        prop="validTime"
        header-align="center"
        align="center"
        label="有效期(备用):获取积分的有效期 ,有效期至少为1年，即从获得开始至次年年底">
      </el-table-column>
      <el-table-column
        prop="restChangeAmount"
        header-align="center"
        align="center"
        label="剩余获取积分">
      </el-table-column>
      <el-table-column
        prop="objectType"
        header-align="center"
        align="center"
        label="对象类型 0-其他 1-文章 2-订单 3-行情 4-汇总 5-短信 6-广告 8-支付 9-分享App（邀请）10-推荐经销商 11-抽奖活动">
      </el-table-column>
      <el-table-column
        prop="objectId"
        header-align="center"
        align="center"
        label="评论/分享 的文章id，被推荐人的手机号，阅读兑换的文章id， 礼品兑换的订单号, 赠送积分的管理员id">
      </el-table-column>
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="lastAccess"
        header-align="center"
        align="center"
        label="最后操作时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('mobile:scoredetail:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('mobile:scoredetail:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  import AddOrUpdate from './scoredetail-add-or-update'

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
          url: '/mobile/scoredetail/list',
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
            url: '/mobile/scoredetail/delete',
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
