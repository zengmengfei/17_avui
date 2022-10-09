<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改微信配置':'添加微信配置'"
    :body-style="{paddingBottom: '8px'}"
    @update:visible="updateVisible"
    @ok="save">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{md: {span: 4}, sm: {span: 24}}"
      :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
                            
      <a-form-item label="名称:" name="name">
        <a-input
          v-model:value="form.name"
          placeholder="请输入名称"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="内容:" name="value">
        <a-input
          class="ele-fluid"
          placeholder="请输入内容"
          v-model:value="form.value"/>
      </a-form-item>
                                      
      
                                    
      <a-form-item
        label="有效标识"
        name="make">
        <a-select
          v-model:value="form.make"
          placeholder="请选择有效标识"
          allow-clear>
                <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="0">删除</a-select-option>
          </a-select>
      </a-form-item>
                  
    </a-form>
  </a-modal>
</template>

<script>
                          
export default {
  name: 'WechatConfigEdit',
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
          {required: true, message: '请输入名称', type: 'string', trigger: 'blur'}
        ],
                          
        value: [
          {required: true, message: '请输入内容', type: 'string', trigger: 'blur'}
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
        this.$http.post('/wechatconfig/edit', this.form).then(res => {
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
