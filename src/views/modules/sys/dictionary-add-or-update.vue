<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="字典ID" prop="dictionaryId">
        <el-input v-model="dataForm.dictionaryId" placeholder="字典ID"></el-input>
      </el-form-item>
      <el-form-item label="字典名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="字典名称"></el-input>
      </el-form-item>
      <el-form-item label="父级字典" prop="parentId">
        <el-select v-model="dataForm.parentId">
          <el-option v-for="item in parentDictlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="字典值" prop="value">
        <el-input v-model="dataForm.value" placeholder="字典值"></el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="sortId">
        <el-input v-model="dataForm.sortId" placeholder="排序号"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        parentDictlist: [],
        dataForm: {
          id: 0,
          dictionaryId: '',
          name: '',
          parentId: 1,
          remark: '',
          value: '',
          sortId: 1,
          type: 1
        },
        dataRule: {
          name: [
            { required: true, message: '字典名称不能为空', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '字典值不能为空', trigger: 'blur' }
          ],
          sortId: [
            { required: true, message: '排序号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/sys/dictionary/selectParent'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.parentDictlist = data && data.code === 0 ? data.list : []
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/dictionary/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.dictionary.name
                this.dataForm.dictionaryId = data.dictionary.dictionaryId
                this.dataForm.parentId = data.dictionary.parentId
                this.dataForm.remark = data.dictionary.remark
                this.dataForm.value = data.dictionary.value
                this.dataForm.sortId = data.dictionary.sortId
                this.dataForm.type = data.dictionary.type
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
              url: this.$http.adornUrl(`/sys/dictionary/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'dictionaryId': this.dataForm.dictionaryId,
                'parentId': this.dataForm.parentId.toString(),
                'remark': this.dataForm.remark,
                'value': this.dataForm.value,
                'sortId': this.dataForm.sortId,
                'type': this.dataForm.type
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
      }
    }
  }
</script>
