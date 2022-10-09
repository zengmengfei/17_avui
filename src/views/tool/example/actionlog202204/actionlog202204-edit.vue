<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改系统行为日志':'添加系统行为日志'"
    :body-style="{paddingBottom: '8px'}"
    @update:visible="updateVisible"
    @ok="save">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{md: {span: 4}, sm: {span: 24}}"
      :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
                            
      <a-form-item label="操作人用户名:" name="username">
        <a-input
          v-model:value="form.username"
          placeholder="请输入操作人用户名"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="请求类型:" name="method">
        <a-input
          v-model:value="form.method"
          placeholder="请输入请求类型"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="模型:" name="module">
        <a-input
          v-model:value="form.module"
          placeholder="请输入模型"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="操作页面:" name="url">
        <a-input
          v-model:value="form.url"
          placeholder="请输入操作页面"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="请求参数(JSON格式):" name="param">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入请求参数(JSON格式)"
          v-model:value="form.param"/>
      </a-form-item>
                                              
      <a-form-item label="日志标题:" name="title">
        <a-input
          v-model:value="form.title"
          placeholder="请输入日志标题"
          allow-clear/>
      </a-form-item>
                                    
      <a-form-item
        label="操作类型"
        name="type">
        <a-select
          v-model:value="form.type"
          placeholder="请选择操作类型"
          allow-clear>
                <a-select-option :value="1">登录系统</a-select-option>
            <a-select-option :value="2">注销系统</a-select-option>
            <a-select-option :value="3">操作日志</a-select-option>
          </a-select>
      </a-form-item>
                                            
      <a-form-item label="IP地址:" name="ip">
        <a-input
          v-model:value="form.ip"
          placeholder="请输入IP地址"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="IP所属城市:" name="ip_city">
        <a-input
          v-model:value="form.ip_city"
          placeholder="请输入IP所属城市"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="操作系统:" name="os">
        <a-input
          v-model:value="form.os"
          placeholder="请输入操作系统"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="浏览器:" name="browser">
        <a-input
          v-model:value="form.browser"
          placeholder="请输入浏览器"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="User-Agent:" name="user_agent">
        <a-input
          v-model:value="form.user_agent"
          placeholder="请输入User-Agent"
          allow-clear/>
      </a-form-item>
                              
    </a-form>
  </a-modal>
</template>

<script>
                                                                                
export default {
  name: 'ActionLog202204Edit',
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
                                
        username: [
          {required: true, message: '请输入操作人用户名', type: 'string', trigger: 'blur'}
        ],
                                    
        method: [
          {required: true, message: '请输入请求类型', type: 'string', trigger: 'blur'}
        ],
                                    
        module: [
          {required: true, message: '请输入模型', type: 'string', trigger: 'blur'}
        ],
                                    
        url: [
          {required: true, message: '请输入操作页面', type: 'string', trigger: 'blur'}
        ],
                          
        param: [
          {required: true, message: '请输入请求参数(JSON格式)', type: 'number', trigger: 'blur'}
        ],
                                    
        title: [
          {required: true, message: '请输入日志标题', type: 'string', trigger: 'blur'}
        ],
                          
        type: [
          {required: true, message: '请输入操作类型', type: 'number', trigger: 'blur'}
        ],
                                    
        ip: [
          {required: true, message: '请输入IP地址', type: 'string', trigger: 'blur'}
        ],
                                    
        ip_city: [
          {required: true, message: '请输入IP所属城市', type: 'string', trigger: 'blur'}
        ],
                                    
        os: [
          {required: true, message: '请输入操作系统', type: 'string', trigger: 'blur'}
        ],
                                    
        browser: [
          {required: true, message: '请输入浏览器', type: 'string', trigger: 'blur'}
        ],
                                    
        user_agent: [
          {required: true, message: '请输入User-Agent', type: 'string', trigger: 'blur'}
        ],
                                    
        content: [
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
        this.$http.post('/actionlog202204/edit', this.form).then(res => {
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
