<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改开放平台授权':'添加开放平台授权'"
    :body-style="{paddingBottom: '8px'}"
    @update:visible="updateVisible"
    @ok="save">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{md: {span: 4}, sm: {span: 24}}"
      :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
                            
      <a-form-item label="账号:" name="client_id">
        <a-input
          v-model:value="form.client_id"
          placeholder="请输入账号"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="秘钥:" name="client_secret">
        <a-input
          v-model:value="form.client_secret"
          placeholder="请输入秘钥"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="用户名称:" name="user_name">
        <a-input
          v-model:value="form.user_name"
          placeholder="请输入用户名称"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="ip白名单:" name="ip">
        <a-input
          v-model:value="form.ip"
          placeholder="请输入ip白名单"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="过期时间:" name="expire_time">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入过期时间"
          v-model:value="form.expire_time"/>
      </a-form-item>
                    
    </a-form>
  </a-modal>
</template>

<script>
                                
export default {
  name: 'OauthClientEdit',
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
                                
        client_id: [
          {required: true, message: '请输入账号', type: 'string', trigger: 'blur'}
        ],
                                    
        client_secret: [
          {required: true, message: '请输入秘钥', type: 'string', trigger: 'blur'}
        ],
                                    
        user_name: [
          {required: true, message: '请输入用户名称', type: 'string', trigger: 'blur'}
        ],
                                    
        ip: [
          {required: true, message: '请输入ip白名单', type: 'string', trigger: 'blur'}
        ],
                          
        expire_time: [
          {required: true, message: '请输入过期时间', type: 'number', trigger: 'blur'}
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
        this.$http.post('/oauthclient/edit', this.form).then(res => {
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
