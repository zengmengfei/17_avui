<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改网格用户':'添加网格用户'"
    :body-style="{paddingBottom: '8px'}"
    @update:visible="updateVisible"
    @ok="save">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{md: {span: 4}, sm: {span: 24}}"
      :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
                            
      <a-form-item label="唯一id:" name="guid">
        <a-input
          v-model:value="form.guid"
          placeholder="请输入唯一id"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="用户id:" name="uu_guid">
        <a-input
          v-model:value="form.uu_guid"
          placeholder="请输入用户id"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="市编码:" name="sbm">
        <a-input
          v-model:value="form.sbm"
          placeholder="请输入市编码"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="区编码:" name="qbm">
        <a-input
          v-model:value="form.qbm"
          placeholder="请输入区编码"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="街编码:" name="jbm">
        <a-input
          v-model:value="form.jbm"
          placeholder="请输入街编码"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="社区编码:" name="sqbm">
        <a-input
          v-model:value="form.sqbm"
          placeholder="请输入社区编码"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="网格编码:" name="wgbm">
        <a-input
          v-model:value="form.wgbm"
          placeholder="请输入网格编码"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="是否网格员: 1否 2是:" name="is_wgy">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入是否网格员: 1否 2是"
          v-model:value="form.is_wgy"/>
      </a-form-item>
                                      
      <a-form-item label="是否社区书记: 1否 2是:" name="is_sqsj">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入是否社区书记: 1否 2是"
          v-model:value="form.is_sqsj"/>
      </a-form-item>
                                      
      <a-form-item label="是否置顶: 1否 2是:" name="is_top">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入是否置顶: 1否 2是"
          v-model:value="form.is_top"/>
      </a-form-item>
                                      
      <a-form-item label="管理员备注:" name="beizhu">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入管理员备注"
          v-model:value="form.beizhu"/>
      </a-form-item>
                                      
      <a-form-item label="是否审核: 1否 2是:" name="examine">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入是否审核: 1否 2是"
          v-model:value="form.examine"/>
      </a-form-item>
                                      
      <a-form-item label="审核时间:" name="examine_time">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入审核时间"
          v-model:value="form.examine_time"/>
      </a-form-item>
                                              
      <a-form-item label="审核人:" name="examine_user">
        <a-input
          v-model:value="form.examine_user"
          placeholder="请输入审核人"
          allow-clear/>
      </a-form-item>
                    
    </a-form>
  </a-modal>
</template>

<script>
                                                                                      
export default {
  name: 'SysUserWgEdit',
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
          {required: true, message: '请输入唯一id', type: 'string', trigger: 'blur'}
        ],
                                    
        uu_guid: [
          {required: true, message: '请输入用户id', type: 'string', trigger: 'blur'}
        ],
                                    
        sbm: [
          {required: true, message: '请输入市编码', type: 'string', trigger: 'blur'}
        ],
                                    
        qbm: [
          {required: true, message: '请输入区编码', type: 'string', trigger: 'blur'}
        ],
                                    
        jbm: [
          {required: true, message: '请输入街编码', type: 'string', trigger: 'blur'}
        ],
                                    
        sqbm: [
          {required: true, message: '请输入社区编码', type: 'string', trigger: 'blur'}
        ],
                                    
        wgbm: [
          {required: true, message: '请输入网格编码', type: 'string', trigger: 'blur'}
        ],
                          
        is_wgy: [
          {required: true, message: '请输入是否网格员: 1否 2是', type: 'number', trigger: 'blur'}
        ],
                          
        is_sqsj: [
          {required: true, message: '请输入是否社区书记: 1否 2是', type: 'number', trigger: 'blur'}
        ],
                          
        is_top: [
          {required: true, message: '请输入是否置顶: 1否 2是', type: 'number', trigger: 'blur'}
        ],
                          
        beizhu: [
          {required: true, message: '请输入管理员备注', type: 'number', trigger: 'blur'}
        ],
                          
        examine: [
          {required: true, message: '请输入是否审核: 1否 2是', type: 'number', trigger: 'blur'}
        ],
                          
        examine_time: [
          {required: true, message: '请输入审核时间', type: 'number', trigger: 'blur'}
        ],
                                    
        examine_user: [
          {required: true, message: '请输入审核人', type: 'string', trigger: 'blur'}
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
        this.$http.post('/sysuserwg/edit', this.form).then(res => {
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
