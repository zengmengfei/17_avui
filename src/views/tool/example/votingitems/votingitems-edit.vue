<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改投票选项':'添加投票选项'"
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
        label="图片地址:"
        :label-col="{sm: {span: 4}, xs: {span: 6}}"
        :wrapper-col="{sm: {span: 21}, xs: {span: 18}}">
        <uploadImage :limit="1" v-model:value="form.images"/>
      </a-form-item>
                        
      <a-form-item label="投票配置id:" name="voteconfig_id">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入投票配置id"
          v-model:value="form.voteconfig_id"/>
      </a-form-item>
                                              
      <a-form-item label="标题:" name="title">
        <a-input
          v-model:value="form.title"
          placeholder="请输入标题"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="序号:" name="number">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入序号"
          v-model:value="form.number"/>
      </a-form-item>
                                              
      <a-form-item label="外链地址:" name="url">
        <a-input
          v-model:value="form.url"
          placeholder="请输入外链地址"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="票数:" name="vote">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入票数"
          v-model:value="form.vote"/>
      </a-form-item>
                                              
      <a-form-item label="备注:" name="remarks">
        <a-input
          v-model:value="form.remarks"
          placeholder="请输入备注"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="其他:" name="other">
        <a-input
          v-model:value="form.other"
          placeholder="请输入其他"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="状态:1显示 2隐藏:" name="status">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入状态:1显示 2隐藏"
          v-model:value="form.status"/>
      </a-form-item>
                              
    </a-form>
  </a-modal>
</template>

<script>
      
import uploadImage from '@/components/uploadImage'
                                                            
export default {
  name: 'VotingitemsEdit',
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
          {required: true, message: '请输入图片地址', type: 'string', trigger: 'blur'}
        ],
                          
        voteconfig_id: [
          {required: true, message: '请输入投票配置id', type: 'number', trigger: 'blur'}
        ],
                                    
        title: [
          {required: true, message: '请输入标题', type: 'string', trigger: 'blur'}
        ],
                          
        number: [
          {required: true, message: '请输入序号', type: 'number', trigger: 'blur'}
        ],
                                    
        url: [
          {required: true, message: '请输入外链地址', type: 'string', trigger: 'blur'}
        ],
                          
        vote: [
          {required: true, message: '请输入票数', type: 'number', trigger: 'blur'}
        ],
                                    
        remarks: [
          {required: true, message: '请输入备注', type: 'string', trigger: 'blur'}
        ],
                                    
        other: [
          {required: true, message: '请输入其他', type: 'string', trigger: 'blur'}
        ],
                          
        status: [
          {required: true, message: '请输入状态:1显示 2隐藏', type: 'number', trigger: 'blur'}
        ],
                          
        content: [
          {required: true, message: '请输入内容', type: 'number', trigger: 'blur'}
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
        this.$http.post('/votingitems/edit', this.form).then(res => {
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
