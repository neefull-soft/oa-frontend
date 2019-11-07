<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="jobNum">
        <el-input v-model="dataForm.jobNum" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item label="部门选择" prop="deptId">
        <el-select v-model="dataForm.deptId"   multiple placeholder="请选择部门">
          <el-option v-for="item in dataForm.deptlist" :key="item.id" :value="item.id" :label="item.deptName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="登陆账号" prop="userName">
        <el-input v-model="dataForm.userName" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="登陆密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
  <!--    <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>-->

    <!--  <el-form-item label="工作方式 " prop="mgrType">
        <el-select v-model="dataForm.mgrType" placeholder="工作方式" >
          <el-option v-for="item in dataForm.dictlist" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="对应仓库" prop="houseCode">
        <el-select v-model="dataForm.houseCode"   multiple placeholder="请选择仓库">
          <el-option v-for="item in dataForm.DictList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>-->

      <el-form-item label="对应角色" size="mini" prop="roleIdList">
        <el-select v-model="dataForm.roleIdList" multiple>
          <el-option v-for="role in roleList" :key="role.roleId" :label="role.roleName" :value="role.roleId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isMobile } from '@/utils/validate'
  export default {
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
/*      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }*/

      var validateMobile = (rule, value, callback) => {
        if( value != '' && value != null)
        {
          if ( !isMobile(value) ) {
          callback(new Error('手机号格式错误'))
          } else {
          callback()
          }
        }else {callback()}
      }
      return {
        visible: false,
        roleList: [],
        dataForm: {
          id: 0,
          userName: '',
          password: '',
          /*comfirmPassword: '',*/
          salt: '',
          email: '',
          mobile: '',
          roleIdList: [],
          status: 1,
          houseCode:'',
          DictList:'',
          optionList:'',
          wareCode:'默认值',
          codeList: [],
          deptlist: [],
          dictlist: [],
          deptId: '',
          mgrType: '',
          jobNum:'',
          name:''
        },
        dataRule: {
          jobNum: [
            { required: true, message: '工号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          mobile: [
            { validator: validateMobile, trigger: 'blur' }
          ],
          houseCode: [
            { required: true, message: '仓库不能为空', trigger: 'blur' }
          ],
          roleIdList: [
            { required: true, message: '角色', trigger: 'blur' }
          ]
        }
      }
    },
    mounted:function(){
      this.getDataList();
    },
    methods: {
      init (id) {
        this.dataForm.codeList =[]
        this.getDataList()
        this.getDictMap()
        this.dataForm.id = id || 0
        this.dataForm.deptId = []
        this.$http({
          url: this.$http.adornUrl('/sys/role/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.roleList = data && data.code === 0 ? data.list : []
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userName = data.user.username
                this.dataForm.salt = data.user.salt
                this.dataForm.email = data.user.email
                this.dataForm.mobile = data.user.mobile
                this.dataForm.roleIdList = data.user.roleIdList
                this.dataForm.deptId = data.user.deptId.split(',')
                this.dataForm.name = data.user.name
                this.dataForm.jobNum = data.user.jobNum
                this.dataForm.deptId = this.dataForm.deptId.map(function(data){
                  return +data;
                });
                this.dataForm.mgrType = 1
                //this.dataForm.deptId = [7,8]
                //根据UserId 拿到状态代码(3,4)然后回显到前台
                for(var i =0;i < this.dataForm.optionList.length;i++ )
                {
                  //取出管理员表对应的仓库代号
                  if (this.dataForm.optionList[i].userId == data.user.userId)
                  {
                    for (var j = 0;j < this.dataForm.DictList.length;j++)
                    {
                      //寻找仓库代号所对应的仓库名称
                      if(this.dataForm.optionList[i].warehouseId == this.dataForm.DictList[j].id)
                      {
                        this.dataForm.codeList.push(this.dataForm.DictList[j].id)
                      }
                    }
                    console.log("data Id in if :"+this.dataForm.optionList[i].userId + "code is "+this.dataForm.optionList[i].warehouseId)

                  }
                }
                this.dataForm.houseCode = this.dataForm.codeList
                this.dataForm.status = data.user.status
                console.log("--houseCode--"+this.dataForm.houseCode+' UserID='+ data.user.userId+"end code list"+this.dataForm.codeList)
                this.dataForm.codeList=[]
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'salt': this.dataForm.salt,
                'email': this.dataForm.email,
                'mobile': this.dataForm.mobile,
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList,
                'houseCode': this.dataForm.houseCode.toString(),
                'deptId': this.dataForm.deptId.toString(),
                'mgrType': this.dataForm.mgrType,
                'jobNum' : this.dataForm.jobNum,
                'name' : this.dataForm.name
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      // 获取管理员和仓库数据列表
      getDataList() {
        //this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/user/option'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.optionList = data.MangerWare
            this.dataForm.deptlist = data.deptlist
            this.dataForm.dictlist = data.dictlist
          } else {
            this.dataForm.optionList = []
            this.dataForm.deptlist = []
            this.dataForm.dictlist = []
          }
        }).then(() => {
        })
      },
      getDictMap(){
        this.$http({
          url: this.$http.adornUrl('/sys/user/DictMap'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.DictList = data.DictMap
          } else {
            this.dataForm.optionList = []
          }
        }).then(() => {
        })
      },
    }
  }
</script>
