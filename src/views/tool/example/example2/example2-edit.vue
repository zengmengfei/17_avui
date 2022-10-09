<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改演示案例二':'添加演示案例二'"
    :body-style="{paddingBottom: '8px'}"
    @update:visible="updateVisible"
    @ok="save">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{md: {span: 4}, sm: {span: 24}}"
      :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
                            
      <a-form-item label="测试名称:" name="name">
        <a-input
          v-model:value="form.name"
          placeholder="请输入测试名称"
          allow-clear/>
      </a-form-item>
                                    
      <a-form-item
        label="性别"
        name="gender">
        <a-select
          v-model:value="form.gender"
          placeholder="请选择性别"
          allow-clear>
                <a-select-option :value="1">男</a-select-option>
            <a-select-option :value="2">女</a-select-option>
            <a-select-option :value="3">保密</a-select-option>
          </a-select>
      </a-form-item>
                                  
      <a-form-item label="状态" name="status">
        <a-radio-group
          v-model:value="form.status">
                <a-radio :value="1">正常</a-radio>
            <a-radio :value="2">停用</a-radio>
          </a-radio-group>
      </a-form-item>
                                    
      <a-form-item label="显示顺序:" name="sort">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入显示顺序"
          v-model:value="form.sort"/>
      </a-form-item>
                              
    </a-form>
  </a-modal>
</template>

<script>
                                
export default {
  name: 'Example2Edit',
  emits: [
    'done',
    'update:visible'
  ],
                                  
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object
  },
  data() {
    return {
      // 表单数据
      form: Object.assign({}, this.data),
      // 表单验证规则
      rules: {
                                
        name: [
          {required: true, message: '请输入测试名称', type: 'string', trigger: 'blur'}
        ],
                          
        gender: [
          {required: true, message: '请输入性别', type: 'number', trigger: 'blur'}
        ],
                          
        status: [
          {required: true, message: '请输入状态', type: 'number', trigger: 'blur'}
        ],
                          
        sort: [
          {required: true, message: '请输入显示顺序', type: 'number', trigger: 'blur'}
        ],
                                    
        note: [
          {required: true, message: '请输入备注', type: 'string', trigger: 'blur'}
        ],
                    },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false
    };
  },
  watch: {
    data() {
      if (this.data) {
        this.form = Object.assign({}, this.data);
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
      if (this.$refs.form) {
        this.$refs.form.clearValidate();
      }
    }
  },
  methods: {
    /* 保存编辑 */
    save() {
      this.$refs.form.validate().then(() => {
        this.loading = true;
        this.$http.post('/example2/edit', this.form).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.$message.success(res.data.msg);
            if (!this.isUpdate) {
              this.form = {};
            }
            this.updateVisible(false);
            this.$emit('done');
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          this.loading = false;
          this.$message.error(e.message);
        });
      }).catch(() => {
      });
    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value);
    }
  }
}
</script>

<style scoped>
</style>
