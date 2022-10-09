<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改演示案例一':'添加演示案例一'"
    :body-style="{paddingBottom: '8px'}"
    @update:visible="updateVisible"
    @ok="save">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{md: {span: 4}, sm: {span: 24}}"
      :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
      
      <a-form-item 
        label="头像:"
        :label-col="{sm: {span: 4}, xs: {span: 6}}"
        :wrapper-col="{sm: {span: 21}, xs: {span: 18}}">
        <uploadImage :limit="1" v-model:value="form.avatar"/>
      </a-form-item>
                                
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
                                  
      <a-form-item
        label="类型"
        name="type">
        <a-select
          v-model:value="form.type"
          placeholder="请选择类型"
          allow-clear>
                <a-select-option :value="1">阿里云</a-select-option>
            <a-select-option :value="2">腾讯云</a-select-option>
            <a-select-option :value="3">华为云</a-select-option>
            <a-select-option :value="4">百度云</a-select-option>
            <a-select-option :value="5">亚马逊</a-select-option>
          </a-select>
      </a-form-item>
                                  
      <a-form-item label="状态" name="status">
        <a-radio-group
          v-model:value="form.status">
                <a-radio :value="1">正常</a-radio>
            <a-radio :value="2">停用</a-radio>
          </a-radio-group>
      </a-form-item>
                                  
      <a-form-item label="是否VIP" name="is_vip">
        <a-radio-group
          v-model:value="form.is_vip">
                <a-radio :value="1">是</a-radio>
            <a-radio :value="2">否</a-radio>
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
      
import uploadImage from '@/components/uploadImage'
                                                
export default {
  name: 'ExampleEdit',
  emits: [
    'done',
    'update:visible'
  ],
        
  components: {uploadImage},
                                                
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
                                
        avatar: [
          {required: true, message: '请输入头像', type: 'string', trigger: 'blur'}
        ],
                                    
        name: [
          {required: true, message: '请输入测试名称', type: 'string', trigger: 'blur'}
        ],
                          
        gender: [
          {required: true, message: '请输入性别', type: 'number', trigger: 'blur'}
        ],
                          
        type: [
          {required: true, message: '请输入类型', type: 'number', trigger: 'blur'}
        ],
                          
        status: [
          {required: true, message: '请输入状态', type: 'number', trigger: 'blur'}
        ],
                          
        is_vip: [
          {required: true, message: '请输入是否VIP', type: 'number', trigger: 'blur'}
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
        this.$http.post('/example/edit', this.form).then(res => {
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
