<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改投票设置':'添加投票设置'"
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
        label="封面图片:"
        :label-col="{sm: {span: 4}, xs: {span: 6}}"
        :wrapper-col="{sm: {span: 21}, xs: {span: 18}}">
        <uploadImage :limit="1" v-model:value="form.images"/>
      </a-form-item>
                                
      <a-form-item label="投票标题:" name="title">
        <a-input
          v-model:value="form.title"
          placeholder="请输入投票标题"
          allow-clear/>
      </a-form-item>
                                    
      <a-form-item label="投票状态" name="status">
        <a-radio-group
          v-model:value="form.status">
                <a-radio :value="1">正常</a-radio>
            <a-radio :value="2">关闭</a-radio>
          </a-radio-group>
      </a-form-item>

       <a-form-item
            label="开始时间:"
            name="start_time">
            <a-date-picker
              v-model:value="form.start_time"
              value-format="YYYY-MM-DD"
              placeholder="开始时间"
              class="ele-fluid"/>
          </a-form-item>  

          <a-form-item
            label="结束时间:"
            name="end_time">
            <a-date-picker
              v-model:value="form.end_time"
              value-format="YYYY-MM-DD"
              placeholder="结束时间"
              class="ele-fluid"/>
          </a-form-item>   

     
                              
    </a-form>
  </a-modal>
</template>

<script>
      
import uploadImage from '@/components/uploadImage'
                                    
export default {
  name: 'VoteconfigEdit',
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
          {required: true, message: '请输入封面图片', type: 'string', trigger: 'blur'}
        ],
                                    
        title: [
          {required: true, message: '请输入投票标题', type: 'string', trigger: 'blur'}
        ],
                          
        status: [
          {required: true, message: '请输入投票状态', type: 'number', trigger: 'blur'}
        ],
                          
        start_time: [
          {required: true, message: '请输入开始时间', type: 'string', trigger: 'blur'}
        ],
                          
        end_time: [
          {required: true, message: '请输入结束时间', type: 'string', trigger: 'blur'}
        ],
                          
        content: [
          {required: true, message: '请输入投票描述', type: 'number', trigger: 'blur'}
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
        this.form = {status: 1};
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
        this.$http.post('/voteconfig/edit', this.form).then(res => {
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
