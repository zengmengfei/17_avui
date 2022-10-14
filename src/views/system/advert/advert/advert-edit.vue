<!-- 编辑弹窗 -->
<template>
  <a-modal :width="550" :visible="visible" :confirm-loading="loading" :title="isUpdate?'修改广告':'添加广告'"
           :body-style="{paddingBottom: '8px'}" @update:visible="updateVisible" @ok="save">
    <a-form ref="form" :model="form" :rules="rules" :label-col="{md: {span: 4}, sm: {span: 24}}"
            :wrapper-col="{md: {span: 19}, sm: {span: 24}}">

      <a-form-item label="广告图片:" :label-col="{sm: {span: 4}, xs: {span: 6}}"
                   :wrapper-col="{sm: {span: 21}, xs: {span: 18}}">
        <uploadImage :limit="1" v-model:value="form.image_url"/>
      </a-form-item>

      <a-form-item label="广告标题:" name="title">
        <a-input v-model:value="form.title" placeholder="请输入广告标题" allow-clear/>
      </a-form-item>

      <a-form-item label="广告位ID:" name="pid">
        <a-input-number :min="0" class="ele-fluid" placeholder="请输入广告位ID" v-model:value="form.pid"/>
      </a-form-item>

      <a-form-item label="广告格式" name="type">
        <a-select v-model:value="form.type" placeholder="请选择广告格式" allow-clear>
          <a-select-option :value="1">图片</a-select-option>
          <a-select-option :value="2">文字</a-select-option>
          <a-select-option :value="3">视频</a-select-option>
          <a-select-option :value="4">推荐</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="广告链接:" name="link_url">
        <a-input-number :min="0" class="ele-fluid" placeholder="请输入广告链接" v-model:value="form.link_url"/>
      </a-form-item>


      <a-form-item label="开始时间:" name="start_time">
        <a-input-number :min="0" class="ele-fluid" placeholder="请输入开始时间" v-model:value="form.start_time"/>
      </a-form-item>

      <a-form-item label="结束时间:" name="end_time">
        <a-input-number :min="0" class="ele-fluid" placeholder="请输入结束时间" v-model:value="form.end_time"/>
      </a-form-item>

      <a-form-item label="广告点击次数:" name="view_num">
        <a-input-number :min="0" class="ele-fluid" placeholder="请输入广告点击次数" v-model:value="form.view_num"/>
      </a-form-item>

      <a-form-item label="状态" name="status">
        <a-radio-group v-model:value="form.status">
          <a-radio :value="1">在用</a-radio>
          <a-radio :value="2">停用</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="排序:" name="sort">
        <a-input-number :min="0" class="ele-fluid" placeholder="请输入排序" v-model:value="form.sort"/>
      </a-form-item>
      <a-form-item label="广告描述:" :label-col="{ sm: { span: 3 }, xs: { span: 6 } }"
                   :wrapper-col="{ sm: { span: 21 }, xs: { span: 18 } }">
        <!-- 编辑器 -->
        <tinymce-editor v-model:value="form.description" :init="initEditor"/>
      </a-form-item>
      <a-form-item label="广告内容:" :label-col="{ sm: { span: 3 }, xs: { span: 6 } }"
                   :wrapper-col="{ sm: { span: 21 }, xs: { span: 18 } }">
        <!-- 编辑器 -->
        <tinymce-editor v-model:value="form.content" :init="initEditor"/>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>

import uploadImage from '@/components/uploadImage'

import TinymceEditor from "@/components/TinymceEditor";


export default {
  name: 'AdvertEdit',
  emits: [
    'done',
    'update:visible'
  ],
  components: {
    uploadImage,
    TinymceEditor,
  },

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

        image_url: [{
          required: true,
          message: '请输入广告图片',
          type: 'string',
          trigger: 'blur'
        }],

        title: [{
          required: true,
          message: '请输入广告标题',
          type: 'string',
          trigger: 'blur'
        }],

        pid: [{
          required: true,
          message: '请输入广告位ID',
          type: 'number',
          trigger: 'blur'
        }],

        type: [{
          required: true,
          message: '请输入广告格式',
          type: 'number',
          trigger: 'blur'
        }],

        link_url: [{
          required: true,
          message: '请输入广告链接',
          type: 'number',
          trigger: 'blur'
        }],

        start_time: [{
          required: true,
          message: '请输入开始时间',
          type: 'number',
          trigger: 'blur'
        }],

        end_time: [{
          required: true,
          message: '请输入结束时间',
          type: 'number',
          trigger: 'blur'
        }],

        view_num: [{
          required: true,
          message: '请输入广告点击次数',
          type: 'number',
          trigger: 'blur'
        }],

        status: [{
          required: true,
          message: '请输入状态',
          type: 'number',
          trigger: 'blur'
        }],

        sort: [{
          required: true,
          message: '请输入排序',
          type: 'number',
          trigger: 'blur'
        }],

        description: [{
          required: true,
          message: '请输入广告描述',
          type: 'string',
          trigger: 'blur'
        }],

        content: [{
          required: true,
          message: '请输入广告内容',
          type: 'number',
          trigger: 'blur'
        }],
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
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
  created() {
  },
  methods: {
    /* 保存编辑 */
    save() {
      this.$refs.form.validate().then(() => {
        this.loading = true;
        this.$http.post('/advert/edit', this.form).then(res => {
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
    },


  }
}
</script>

<style scoped>
</style>
