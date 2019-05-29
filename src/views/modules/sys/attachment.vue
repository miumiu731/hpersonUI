<template>
  <div class="mod-attachment">
    <el-form :inline="true" :model="searchForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="uploadHandle()">上传附件</el-button>
        <!--<el-button v-if="isAuth('sys:attachment:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
        <el-button v-if="isAuth('sys:attachment:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>



    <el-table
      :data="channelDataList"
      border
      row-key="chanNo"
      style="width: 10%;display:inline-block;"
      highlight-current-row
      @current-change="getDataList"
      >
      //<el-table-column @cell-click="test ()"
      //  prop="chanNo"
      //  header-align="center"
      //  align="left"
      //  width="111"
      //  label="频道编码">
      //</el-table-column>
      <table-tree-column
        type="index"
        prop="chanName"
        header-align="center"
        treeKey="chanNo"
        parentKey="parentNo"
        width="111"
        label="频道名称"
        >
      </table-tree-column>

    </el-table>


    <el-table
      :data="dataList"
      border
      @selection-change="selectionChangeHandle"
      style="width: 90%;float:right;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="附件名">
      </el-table-column>
      <el-table-column
        prop="path"
        header-align="center"
        align="center"
        label="路径">
      </el-table-column>
      <el-table-column
        prop="size"
        header-align="center"
        align="center"
        label="大小(KB)">
      </el-table-column>
      <el-table-column
        prop="version"
        header-align="center"
        align="center"
        label="版本">
      </el-table-column>
      <el-table-column
        prop="lastAccess"
        header-align="center"
        align="center"
        label="上次执行时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">



        <template slot-scope="scope">

          <el-button type="text" size="small" @click="showImg(scope.row.path)">预览</el-button>
          <el-button v-if="isAuth('sys:attachment:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button v-if="isAuth('sys:attachment:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--images="images" -->
    <viewer style="height: 300px;" v-show= "isshow">
      <img  v-for="item in imagesArray" :src="item.src" :key="item.index"  height="100">
    </viewer>

    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      style="float:right"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!-- 弹窗, 上传文件 -->
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"></upload>
  </div>
</template>

<script>
  import TableTreeColumn from '@/components/table-tree-column'
  import AddOrUpdate from './attachment-add-or-update'
  import Upload from './attachment-upload'
  import Vue from 'vue';
  import Viewer from 'v-viewer'
  import 'viewerjs/dist/viewer.css'
  Vue.use(Viewer);
  Viewer.setDefaults({
    "inline": true,//使用了false，可手动关闭
    "button": true, //右上角按钮
    "navbar": true, //底部缩略图
    "title": true, //当前图片标题
    "toolbar": true, //底部工具栏
    "tooltip": true, //显示缩放百分比
    "movable": true, //是否可以移动
    "zoomable": true, //是否可以缩放
    "rotatable": true, //是否可旋转
    "scalable": true, //是否可翻转
    "transition": true, //使用 CSS3 过度
    "fullscreen": true, //播放时是否全屏
    "keyboard": true, //是否支持键盘
	"zIndexInline": 9999,
    "url": "data-source",
    ready: function (e) {
      console.log(e.type,'组件以初始化');
    },
    show: function (e) {
      console.log(e.type,'图片显示开始');
    },
    shown: function (e) {
      console.log(e.type,'图片显示结束');
    },
    hide: function (e) {
      console.log(e.type,'图片隐藏完成');
    },
    hidden: function (e) {
      console.log(e.type,'图片隐藏结束');
    },
    view: function (e) {
      console.log(e.type,'视图开始');
    },
    viewed: function (e) {
      console.log(e.type,'视图结束');
    },
    zoom: function (e) {
      console.log(e.type,'图片缩放开始');
    },
    zoomed: function (e) {
      console.log(e.type,'图片缩放结束');
    }
  });

  export default {
    data () {
      return {
        searchForm: {
          name: ''
        },
        dataList: [],
        channelDataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        chanNo: '01',
        dataListSelections: [],
        addOrUpdateVisible: false,
        uploadVisible: false,
        imagesArray:[
          {src:'',index:1}
        ],
        isshow:false
      }
    },
    components: {
      AddOrUpdate,
      Upload,
      TableTreeColumn
    },
    activated () {
      this.getChannelDataList()
      this.getDataList()
    },
    methods: {
    // 获取数据列表//,
      getChannelDataList () {
        this.$http({
          url: '/sys/channel/queryAll',
          method: 'get',
          params: {

          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.channelDataList = this.treeDataTranslate(data.list, 'chanNo', 'parentNo', 'childrens')
          } else {
            this.channelDataList = []
          }
        })
      },
      handleCurrentChange (val) {
        this.currentRow = val
//        alert(this.currentRow['chanNo'])
      },
      // 获取数据列表alert((data.list[1])['chanNo'])
      getDataList (val) {
        this.currentRow = (val == null ? '01' : val)
        var chanNo = (this.currentRow['chanNo']) == null ? '01' : (this.currentRow['chanNo'])
        this.$cookie.set('to', chanNo)
        this.$http({
          url: '/sys/attachment/list',
          method: 'get',
          params: {
            'chanNo': chanNo,
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
      // 上传文件//style="width:30;height:30"
      uploadHandle () {
        this.uploadVisible = true
        this.$nextTick(() => {
          this.$refs.upload.init()
        })
      },
      showImg (url) {
          this.isshow=true;
          this.imagesArray=[{src:'http://106.12.16.45/'+url,index:1}];
        /*this.$alert(`<img src="http://106.12.16.45/${url}" width=400 height=300>`, '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '关闭',
          callback: action => {

          }
        })*/
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
            url: '/sys/attachment/delete',
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
