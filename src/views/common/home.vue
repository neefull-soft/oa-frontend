<template>
  <div class="mod-role">
    <el-form :inline="true"    >
      <!--<el-form-item>-->
        <!--<el-col class="line" :span="3">协议日期</el-col>-->
        <!--<el-col :span="8">-->
          <!--<el-date-picker type="date" placeholder="开始日期" v-model="dataForm.startDate" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy-MM-dd"   :picker-options="pickerValidateStart"></el-date-picker>-->
        <!--</el-col>-->
        <!--<el-col class="line" :span="1">至</el-col>-->
        <!--<el-col :span="8">-->
          <!--<el-date-picker type="date" placeholder="结束日期" v-model="dataForm.endDate" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy-MM-dd"   :picker-options="pickerValidateEnd"></el-date-picker>-->
        <!--</el-col>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="项目名称">-->
        <!--<el-input v-model="dataForm.projectName" placeholder="项目名称" clearable></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item>-->
        <!--<el-button type="warning" @click="searchDataList()">查询</el-button>-->
      <!--</el-form-item>-->
      <div class="el-row" style="margin-left: -6px; margin-right: -6px;">
        <div class="el-col el-col-6 " style="padding-left: 6px; padding-right: 6px;">
          <div class="demo-color-box bg-blue"><font class="div-font">测试</font><div class="value">未出库</div>
          </div>
        </div>

        <div class="el-col el-col-6" style="padding-left: 6px; padding-right: 6px;">
          <div class="demo-color-box bg-green "><font class="div-font">测试</font>
            <div class="value">未入库</div>
          </div>
        </div>
        <div class="el-col el-col-6"style="padding-left: 6px; padding-right: 6px;">
          <div class="demo-color-box bg-yellow"><font class="div-font">测试</font><div class="value">已经出库</div>
          </div>
        </div>
        <div class="el-col el-col-6"style="padding-left: 6px; padding-right: 6px;">
          <div class="demo-color-box bg-green-gray"><font class="div-font">测试</font><div class="value">已经入库</div>
          </div>
        </div>
      </div>
    </el-form>
    <el-table

      border
      style="width: 100%;">


    </el-table>

  </div>
</template>

<style>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    /** background: #99a9bf; */
  }
  .bg-purple {
    /** background: #d3dce6; */
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-input__inner {
    width: 100%;
  }
</style>

<script>

  export default {
    data () {
      return {
        dataForm: {
          totalBalanceAmount: '',
          totalDonateAmount: '',
          totalProjectAmount: '',
          totalReceiveAmount: '',
          projecName: '',
          startDate: '',
          endDate: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        firstSearch: true
      }
    },
    activated () {


    },
    methods: {



      searchDataList () {
        if (this.firstSearch) {
          this.pageSize = 10
          this.pageIndex = 1
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/project/statistics/contractamount'),
          method: 'get',
          params: this.$http.adornParams({

          })
        }).then(({data}) => {
          if (data && data.code === 0) {


            if (data.page && data.page.page != null) {
              this.dataList = data.page.page.list;
              this.totalPage = data.page.page.totalCount;
            }

          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },

      // 获取数据列表
      getDataList (search) {

        if (search) {
          this.pageSize = 10
          this.pageIndex = 1
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/project/statistics/contractamount'),
          method: 'get',
          params: this.$http.adornParams({

          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            var arrayObject = data.page.listData ;

          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
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
      finaceAmountFormat(row, column, cellValue, index) {

      }
    }
  }
</script>
