import isInteger from 'lodash/isInteger'

// 获取项目列表
export function list () {
  return {
    // isOpen: false,
    url: '/project/base/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': 2,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': [{
          'id': 3,
          'roleName': '系统管理员',
          'remark': '系统管理员',
          'createUserId': 1,
          'menuIdList': null,
          'createTime': '2018-03-11 17:03:29'
        }]
      }
    }
  }
}

// 获取项目列表, 根据当前用户
export function select () {
  return {
    isOpen: false,
    url: '/project/base/list',
    type: 'get',
    data: {}
  }
}

// 获取项目信息
export function info (id) {
  return {
    // isOpen: false,
    url: '/project/base/info' + (isInteger(id) ? `/${id}` : ''),
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'role': {
        'roleId': 3,
        'roleName': '系统管理员',
        'remark': '系统管理员',
        'createUserId': 1,
        'menuIdList': [1, 2, 15, 16, 17, 18, 3, 19, 20, 21, 22, 4, 23, 24, 25, 26, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 27, 29, 30, 31, -666666],
        'createTime': '2018-03-11 17:03:29'
      }
    }
  }
}

// 添加项目
export function add () {
  return {
    // isOpen: false,
    url: '/project/base/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改项目
export function update () {
  return {
    // isOpen: false,
    url: 'project/base/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除角色
export function del () {
  return {
    // isOpen: false,
    url: '/project/base/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
