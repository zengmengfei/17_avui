<!-- 编辑弹窗 -->
<template>
  <a-modal
    :width="550"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改腾青用户':'添加腾青用户'"
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
        label="用户头像:"
        :label-col="{sm: {span: 4}, xs: {span: 6}}"
        :wrapper-col="{sm: {span: 21}, xs: {span: 18}}">
        <uploadImage :limit="1" v-model:value="form.avatar"/>
      </a-form-item>
                                

                                              
      <a-form-item label="用户名:" name="username">
        <a-input
          v-model:value="form.username"
          placeholder="请输入用户名"
          allow-clear/>
      </a-form-item>
                                      
      <a-form-item label="密码:" name="password">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入密码"
          v-model:value="form.password"/>
      </a-form-item>
                                              
      <a-form-item label="真实姓名:" name="name">
        <a-input
          v-model:value="form.name"
          placeholder="请输入真实姓名"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="用户昵称:" name="nickname">
        <a-input
          v-model:value="form.nickname"
          placeholder="请输入用户昵称"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="加密盐:" name="salt">
        <a-input
          v-model:value="form.salt"
          placeholder="请输入加密盐"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="手机号:" name="mobile">
        <a-input
          v-model:value="form.mobile"
          placeholder="请输入手机号"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="身份证号码:" name="idcard">
        <a-input
          v-model:value="form.idcard"
          placeholder="请输入身份证号码"
          allow-clear/>
      </a-form-item>
                                    
      <a-form-item
        label="实名认证"
        name="idcard_auth">
        <a-select
          v-model:value="form.idcard_auth"
          placeholder="请选择实名认证"
          allow-clear>
                <a-select-option :value="0">未认证</a-select-option>
            <a-select-option :value="1">已认证</a-select-option>
          </a-select>
      </a-form-item>
                                            
      <a-form-item label="详细地址:" name="address">
        <a-input
          v-model:value="form.address"
          placeholder="请输入详细地址"
          allow-clear/>
      </a-form-item>
                                    
      <a-form-item
        label="来源"
        name="source">
        <a-select
          v-model:value="form.source"
          placeholder="请选择来源"
          allow-clear>
                <a-select-option :value="1">前端注册</a-select-option>
            <a-select-option :value="2">后台添加</a-select-option>
            <a-select-option :value="3">其他</a-select-option>
          </a-select>
      </a-form-item>
                                  
      <a-form-item label="状态" name="status">
        <a-radio-group
          v-model:value="form.status">
                <a-radio :value="1">正常</a-radio>
            <a-radio :value="2">停用</a-radio>
          </a-radio-group>
      </a-form-item>
                                    
      <a-form-item label="民族表:" name="nation_id">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入民族表"
          v-model:value="form.nation_id"/>
      </a-form-item>
                                      
      <a-form-item label="政治面貌:" name="political_id">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入政治面貌"
          v-model:value="form.political_id"/>
      </a-form-item>
                                      
      <a-form-item label="党员类型:" name="political_type_id">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入党员类型"
          v-model:value="form.political_type_id"/>
      </a-form-item>
                                      
      <a-form-item label="婚姻状态表:" name="marital_status_id">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入婚姻状态表"
          v-model:value="form.marital_status_id"/>
      </a-form-item>
                                      
      <a-form-item label="学历表:" name="education_id">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入学历表"
          v-model:value="form.education_id"/>
      </a-form-item>
                                      
      <a-form-item label="重点人群:" name="focus">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入重点人群"
          v-model:value="form.focus"/>
      </a-form-item>
                                      
      <a-form-item label="残疾:" name="disability_id">
        <a-input-number
          :min="0"
          class="ele-fluid"
          placeholder="请输入残疾"
          v-model:value="form.disability_id"/>
      </a-form-item>
                                              
      <a-form-item label="公众号openid:" name="gzh_openid">
        <a-input
          v-model:value="form.gzh_openid"
          placeholder="请输入公众号openid"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="小程序openid:" name="xcx_openid">
        <a-input
          v-model:value="form.xcx_openid"
          placeholder="请输入小程序openid"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="微信开放平台id:" name="union_id">
        <a-input
          v-model:value="form.union_id"
          placeholder="请输入微信开放平台id"
          allow-clear/>
      </a-form-item>
                                              
      <a-form-item label="企业微信用户id:" name="qywx_user_id">
        <a-input
          v-model:value="form.qywx_user_id"
          placeholder="请输入企业微信用户id"
          allow-clear/>
      </a-form-item>
                                              
    
                    
    </a-form>
  </a-modal>
</template>

<script>
      
import uploadImage from '@/components/uploadImage'
                                                                                                                                                                        
export default {
  name: 'TqUserEdit',
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
          {required: true, message: '请输入用户头像', type: 'string', trigger: 'blur'}
        ],                                  
   
                                    
        username: [
          {required: true, message: '请输入用户名', type: 'string', trigger: 'blur'}
        ],
                          
        password: [
          {required: true, message: '请输入密码', type: 'number', trigger: 'blur'}
        ],
                                    
        name: [
          {required: true, message: '请输入真实姓名', type: 'string', trigger: 'blur'}
        ],
                                    
        nickname: [
          {required: true, message: '请输入用户昵称', type: 'string', trigger: 'blur'}
        ],
                                                          
        mobile: [
          {required: true, message: '请输入手机号', type: 'string', trigger: 'blur'}
        ],
                                    
        idcard: [
          {required: true, message: '请输入身份证号码', type: 'string', trigger: 'blur'}
        ],
                          
        idcard_auth: [
          {required: true, message: '请输入实名认证', type: 'number', trigger: 'blur'}
        ],
                                    
        address: [
          {required: true, message: '请输入详细地址', type: 'string', trigger: 'blur'}
        ],
                          
        source: [
          {required: true, message: '请输入来源', type: 'number', trigger: 'blur'}
        ],
                          
        status: [
          {required: true, message: '请输入状态', type: 'number', trigger: 'blur'}
        ],
                          
        nation_id: [
          {required: true, message: '请输入民族表', type: 'number', trigger: 'blur'}
        ],
                          
        political_id: [
          {required: true, message: '请输入政治面貌', type: 'number', trigger: 'blur'}
        ],
                          
        political_type_id: [
          {required: true, message: '请输入党员类型', type: 'number', trigger: 'blur'}
        ],
                          
        marital_status_id: [
          {required: true, message: '请输入婚姻状态表', type: 'number', trigger: 'blur'}
        ],
                          
        education_id: [
          {required: true, message: '请输入学历表', type: 'number', trigger: 'blur'}
        ],
                          
        focus: [
          {required: true, message: '请输入重点人群', type: 'number', trigger: 'blur'}
        ],
                          
        disability_id: [
          {required: true, message: '请输入残疾', type: 'number', trigger: 'blur'}
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
        this.$http.post('/tquser/edit', this.form).then(res => {
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
