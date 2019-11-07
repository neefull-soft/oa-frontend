import isInteger from 'lodash/isInteger'

// 获取列表
export function list (params) {
  return request({
    url: requestUrl('/collect/wharea/list'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

export function formatJson(filterVal, jsonData) {
  return jsonData.map(v =>filterVal.map(j => v[j]))
}

  export function exportExcel(tHeader,filterVal,dataList) {
    require.ensure([], () => {
      const { export_json_to_excel } = require('@/excel/Export2Excel');
      //const tHeader = ['库位编号','所属仓库','所属库区', '库位状态', '库位类型','备注'];
      // 上面设置Excel的表格第一行的标题
      // 上面的index、nickName、name是tableData里对象的属性
      const data = formatJson(filterVal, dataList);
      export_json_to_excel(tHeader,data, 'exportData');
    })
  }


