<template>
  <el-dialog
    title="字段列表"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="75%">
    <el-form :inline="true" :model="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="searchForm.projectName" placeholder="项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.methodName" placeholder="方法名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="generator()">生成代码</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      @selection-change="selectionChangeHandle"
      height="460"
      style="width: 100%;">
      <el-table-column
       type="selection"
        prop="columnName"
        header-align="center"
        align="center"
        label="列名">
      </el-table-column>
      <el-table-column
        prop="dataType"
        header-align="center"
        align="center"
        label="列名类型">
      </el-table-column>
      <el-table-column
        prop="comments"
        header-align="center"
        align="center"
        label="列名备注">
      </el-table-column>
      <el-table-column
        prop="columnKey"
        header-align="center"
        align="center"
        label="索引列">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        searchForm: {
          projectName: 'h-person',
          packageName: 'com.hperson.provide',
          author: '徐琛'
        },
        dataList: [],
        dataListSelections: []
      }
    },
    methods: {
      init (tableName) {
        this.visible = true
        this.getTableList(tableName)
      },
      //生成代码
      generator: function () {
        if (!this.dataListSelections.length) {
          this.$message({
            message: '请选择要生成的字段',
            type: 'error',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
          return
        }
        let columns = this.dataListSelections.map(item => {
            console.log("item",item);
            return item.columnName
        })
        location.href = this.$http.BASE_URL + `/sys/generator/codeByProvide?tables=${tables}&columns=${columns}&projectName=${this.searchForm.projectName}&packageName=${this.searchForm.packageName}&author=${this.searchForm.author}&token=${this.$cookie.get('token')}`
      },
      //勾选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 通过表名查询列名
      getTableList (tableName) {
        this.$http({
          url: `/sys/generator/list/${tableName}`,
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
           this.dataList = data.columns;
          }
        })
      }
    }
  }
</script>
