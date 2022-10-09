<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改Test1':'添加Test1'"
    :body-style="{paddingBottom: '8px'}"
    @update:visible="updateVisible"
    @ok="save">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{md: {span: 4}, sm: {span: 24}}"
      :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
                            
      <a-form-item label="系统唯一值:" name="guid">
        <a-input
          v-model:value="form.guid"
          placeholder="请输入系统唯一值"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="用户唯一id:" name="uu_guid">
        <a-input
          v-model:value="form.uu_guid"
          placeholder="请输入用户唯一id"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="地区编码:" name="code">
        <a-input
          v-model:value="form.code"
          placeholder="请输入地区编码"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="民族:" name="nation_id">
        <a-input
          v-model:value="form.nation_id"
          placeholder="请输入民族"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="政治面貌:" name="political_id">
        <a-input
          v-model:value="form.political_id"
          placeholder="请输入政治面貌"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="党员类型:" name="political_type_id">
        <a-input
          v-model:value="form.political_type_id"
          placeholder="请输入党员类型"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="婚姻状态表:" name="marital_status_id">
        <a-input
          v-model:value="form.marital_status_id"
          placeholder="请输入婚姻状态表"
          allow-clear/>
      </a-form-item>
                    
    </a-form>
  </a-modal>
</template>

<script>
                                            
export default {
  name: 'Test1Edit',
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
                                
        guid: [
          {required: true, message: '请输入系统唯一值', type: 'string', trigger: 'blur'}
        ],
                                    
        uu_guid: [
          {required: true, message: '请输入用户唯一id', type: 'string', trigger: 'blur'}
        ],
                                    
        code: [
          {required: true, message: '请输入地区编码', type: 'string', trigger: 'blur'}
        ],
                                    
        nation_id: [
          {required: true, message: '请输入民族', type: 'string', trigger: 'blur'}
        ],
                                    
        political_id: [
          {required: true, message: '请输入政治面貌', type: 'string', trigger: 'blur'}
        ],
                                    
        political_type_id: [
          {required: true, message: '请输入党员类型', type: 'string', trigger: 'blur'}
        ],
                                    
        marital_status_id: [
          {required: true, message: '请输入婚姻状态表', type: 'string', trigger: 'blur'}
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
        this.$http.post('/test1/edit', this.form).then(res => {
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
