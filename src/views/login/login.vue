<template>
<div class="box" :style="{backgroundImage: 'url(' + sysconfig.login_img + ')'}">
 <div :class="['login-wrapper', ['', 'login-form-right', 'login-form-left'][direction]] ">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      layout="vertical"
      @keyup.enter="doSubmit"
      class="login-form ele-bg-white">
      <h4>{{sysconfig.site_name}}</h4>
      <a-form-item name="username">
        <a-input
          allow-clear
          size="large"
          v-model:value="form.username"
          :placeholder="$t('login.username')">
          <template #prefix>
            <user-outlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          size="large"
          v-model:value="form.password"
          :placeholder="$t('login.password')">
          <template #prefix>
            <lock-outlined/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="captcha">
        <div class="login-input-group">
          <a-input
            allow-clear
            size="large"
            v-model:value="form.captcha"
            :placeholder="$t('login.captcha')">
            <template #prefix>
              <safety-certificate-outlined/>
            </template>
          </a-input>
          <a-button class="login-captcha" @click="changeCaptcha">
            <img v-if="captcha" :src="captcha" alt=""/>
          </a-button>
        </div>
      </a-form-item>
      
      <a-form-item>
        <a-button
          block
          size="large"
          type="primary"
          :loading="loading"
          @click="doSubmit"
          @keyup.enter="doSubmit">
          {{ loading ? $t('login.loading') : $t('login.login') }}
        </a-button>
      </a-form-item>
      <div class="ele-text-center" style="padding-bottom: 20px;">
        
      </div>
    </a-form>
    <div class="login-copyright">      
      <div >技术支持 - {{sysconfig.site_support}}</div>
      <div >备案号：<a href="https://beian.miit.gov.cn/" target="_blank">{{sysconfig.site_record}}</a></div>
      <div >{{sysconfig.site_copyright}}</div>
    </div>
    
   
    <!-- 多语言切换 -->
    <!-- <div style="position: absolute;right: 30px;top: 20px;z-index: 999;">
      <a-dropdown placement="bottomLeft" :overlay-style="{minWidth: '120px'}">
        <global-outlined style="font-size: 18px;color: #fff;"/>
        <template #overlay>
          <a-menu :selected-keys="languages" @click="changeLanguage">
            <a-menu-item key="en">English</a-menu-item>
            <a-menu-item key="zh_CN">简体中文</a-menu-item>
            <a-menu-item key="zh_TW">繁體中文</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div> -->
    <!-- 实际项目去掉这段 -->
<!--    <div style="position: absolute;left: 30px;top: 20px;z-index: 999;">-->
<!--      <a-radio-group v-model:value="direction" size="small">-->
<!--        <a-radio-button :value="2">居左</a-radio-button>-->
<!--        <a-radio-button :value="0">居中</a-radio-button>-->
<!--        <a-radio-button :value="1">居右</a-radio-button>-->
<!--      </a-radio-group>-->
<!--    </div>-->
  </div>
</div>
 
</template>

<script>

import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons-vue';
import setting from '@/config/setting';



export default {
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
  },
  data() {
    return {
      // 登录框方向, 0居中, 1居右, 2居左
      direction: 0,
      // 加载状态
      loading: false,
      // 表单数据
      form: {
        username: '',
        password: '',
        captcha: '',
        key: '',
        remember: true
      },
      // 验证码base64数据
      captcha: '',
      sysconfig:{
        site_name:'武汉腾青科技有限公司',//站点名称
        site_nickname:"腾青科技",//简称
        site_logo:process.env.VUE_APP_IMG_URL+'/images/config/20220721/a3cc29a1d1ed86b9172.jpg',//站点logo
        login_img:process.env.VUE_APP_IMG_URL+'/images/config/20220721/a3cc29a1d1ed86b9172.jpg',//背景图片
        site_keywords:'武汉腾青科技有限公司',//站点关键字
        site_support:'武汉腾青科技有限公司',//技术支持名称
        site_record:"鄂ICP备17026664号-1",
        site_copyright:'Copyright ©2021 腾青科技',//版权信息
        site_seo_desc:'武汉腾青科技有限公司',//站点名称
        site_seo_title:'武汉腾青科技有限公司'//
      },
      
      // // 验证码内容, 实际项目去掉
      // text: ''
    };
  },
  computed: {
    // 表单验证规则
    rules() {
      return {
        username: [
          {required: true, message: this.$t('login.username'), type: 'string', trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('login.password'), type: 'string', trigger: 'blur'}
        ],
        captcha: [
          {required: true, message: this.$t('login.captcha'), type: 'string', trigger: 'blur'}
        ]
      };
    },
    // 当前语言
    languages() {
      return [this.$i18n.locale];
    }
  },
  mounted() {
    if (setting.takeToken()) {
      return this.goHome();
    }
    this.changeCaptcha();
    this.getsysconfig();
  },
  methods: {
    /* 提交 */
    doSubmit() {
      this.$refs.form.validate().then(() => {
        // if (this.form.captcha.toLowerCase() !== this.text) {
        //   return this.$message.error('验证码错误');
        // }
        this.loading = true;
        let formData = new FormData();
        for (let key in this.form) {
          formData.append(key, this.form[key]);
        }
        this.$http.post('/login/login', formData).then((res) => {
          this.loading = false;
          if (res.data.code === 0) {
            this.$message.success('登录成功');
            this.$store.dispatch('user/setToken', {
              token: 'Bearer ' + res.data.data.access_token,
              remember: this.form.remember
            }).then(() => {
              this.goHome();
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }).catch(() => {
      });
    },
    /* 跳转到首页 */
    goHome() {
      const query = this.$route.query;
      const path = query && query.from ? query.from : '/';
      this.$router.push(path).catch(() => {
      });
    },
    /* 更换图形验证码 */
    changeCaptcha() {
      // 这里演示的验证码是后端返回base64格式的形式, 如果后端地址直接是图片请参考忘记密码页面
      this.$http.get('/login/captcha').then(res => {
        if (res.data.code === 0) {
          this.captcha = res.data.data.captcha;
          this.form.key = res.data.data.key;
        
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    },
    getsysconfig(){
      this.$http.post('/login/get_config_data',{config_id:1}).then(res => {
        if (res.data.code === 0) {
           let arr=res.data.data
         for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          for(let e in element){
            this.sysconfig[e]=element[e]
          }
         }
         window.localStorage.setItem('sysconfig',JSON.stringify(this.sysconfig))           
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    },
    /* 切换语言 */
    changeLanguage({key}) {
      this.$i18n.locale = key;
      localStorage.setItem('i18n-lang', key);
      this.$refs.form.clearValidate();
    }
  }
}
</script>

<style scoped>
.box{
 background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
/* 背景 */
.login-wrapper {
  padding: 48px 16px 0 16px;
  position: relative;
  box-sizing: border-box;
 
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.login-wrapper:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .2);
}

/* 卡片 */
.login-form {
  width: 380px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 28px;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  position: relative;
  z-index: 2;
}

.login-form-right .login-form {
  margin: 0 15% 0 auto;
}

.login-form-left .login-form {
  margin: 0 auto 0 15%;
}

.login-form h4 {
  padding: 22px 0;
  text-align: center;
}

/* 验证码 */
.login-input-group {
  display: flex;
  align-items: center;
}

.login-input-group :deep(.ant-input-affix-wrapper) {
  flex: 1;
}

.login-input-group .login-captcha {
  width: 102px;
  height: 40px;
  margin-left: 10px;
  padding: 0;
}

.login-input-group .login-captcha > img {
  width: 100%;
  height: 100%;
}

/* 第三方登录图标 */
.login-oauth-icon {
  color: #fff;
  padding: 5px;
  margin: 0 12px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
}

/* 底部版权 */
.login-copyright {
  color: #eee;
  text-align: center;
  padding: 48px 0 22px 0;
  position: relative;
  z-index: 1;
}

/* 响应式 */
@media screen and (min-height: 640px) {
  .login-wrapper {
    padding-top: 0;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -230px;
  }

  .login-form-right .login-form,
  .login-form-left .login-form {
    left: auto;
    right: 15%;
    transform: translateX(0);
    margin: -230px auto auto auto;
  }

  .login-form-left .login-form {
    right: auto;
    left: 15%;
  }

  .login-copyright {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

@media screen and (max-width: 768px) {
  .login-form-right .login-form,
  .login-form-left .login-form {
    left: 50%;
    right: auto;
    margin-left: 0;
    margin-right: auto;
    transform: translateX(-50%);
  }
}
</style>
