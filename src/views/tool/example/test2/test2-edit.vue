<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改Test2':'添加Test2'"
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
        label="图片:"
        :label-col="{sm: {span: 4}, xs: {span: 6}}"
        :wrapper-col="{sm: {span: 21}, xs: {span: 18}}">
        <uploadImage :limit="1" v-model:value="form.images"/>
      </a-form-item>
                                
      <a-form-item label="姓名:" name="name">
        <a-input
          v-model:value="form.name"
          placeholder="请输入姓名"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="电话:" name="mobile">
        <a-input
          v-model:value="form.mobile"
          placeholder="请输入电话"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="民族:" name="nation_id">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入民族"
          v-model:value="form.nation_id"/>
      </a-form-item>
                    
    </a-form>
  </a-modal>
</template>

<script>
      
import uploadImage from '@/components/uploadImage'
                        
export default {
  name: 'Test2Edit',
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
                      
        images: [
          {required: true, message: '请输入图片', type: 'number', trigger: 'blur'}
        ],
                                    
        name: [
          {required: true, message: '请输入姓名', type: 'string', trigger: 'blur'}
        ],
                                    
        mobile: [
          {required: true, message: '请输入电话', type: 'string', trigger: 'blur'}
        ],
                          
        nation_id: [
          {required: true, message: '请输入民族', type: 'number', trigger: 'blur'}
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
        this.$http.post('/test2/edit', this.form).then(res => {
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
