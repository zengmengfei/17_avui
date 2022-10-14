<!-- 编辑弹窗 -->
<template>
  <a-modal :width="550" :visible="visible" :confirm-loading="loading" :title="isUpdate?'修改广告位':'添加广告位'"
           :body-style="{paddingBottom: '8px'}" @update:visible="updateVisible" @ok="save">
    <a-form ref="form" :model="form" :rules="rules" :label-col="{md: {span: 4}, sm: {span: 24}}"
            :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
      <a-form-item label="广告位类型" name="type">
        <a-select v-model:value="form.type" placeholder="请选择广告位类型" allow-clear>
          <a-select-option :value="1">图片</a-select-option>
          <a-select-option :value="2">文字</a-select-option>
          <a-select-option :value="3">视频</a-select-option>
          <a-select-option :value="4">推荐</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="广告位名称:" name="name">
        <a-input v-model:value="form.name" placeholder="请输入广告位名称" allow-clear/>
      </a-form-item>

      <a-form-item label="广告位标识(唯一):" name="index_key">
        <a-input v-model:value="form.index_key" placeholder="请输入广告位名称" allow-clear/>
      </a-form-item>

      <a-form-item label="是否原图上传:" name="level">
        <a-radio-group
          v-model:value="form.is_complete">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="广告宽度:" name="width" v-if="!(form.is_complete && form.is_complete == 1)">
        <a-input-number :min="0" class="ele-fluid" placeholder="请输入广告宽度" v-model:value="form.width"/>
      </a-form-item>

      <a-form-item label="广告高度:" name="height" v-if="!(form.is_complete && form.is_complete == 1)">
        <a-input-number :min="0" class="ele-fluid" placeholder="请输入广告高度" v-model:value="form.height"/>
      </a-form-item>


    </a-form>
  </a-modal>
</template>

<script>

export default {
  name: 'AdvertPositionEdit',
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

        name: [{
          required: true,
          message: '请输入广告位名称',
          type: 'string',
          trigger: 'blur'
        }],

        index_key: [{
          required: true,
          message: '请输入广告位标识',
          type: 'string',
          trigger: 'blur'
        }],

        type: [{
          required: true,
          message: '请选择广告位类型',
          type: 'number',
          trigger: 'blur'
        }],

        width: [{
          required: (!(this.form && this.form.is_complete && this.form.is_complete == 1)),
          message: '请输入广告宽度',
          type: 'number',
          trigger: 'blur'
        }],

        height: [{
          required: (!(this.form && this.form.is_complete && this.form.is_complete == 1)),
          message: '请输入广告高度',
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
        this.$http.post('/advertposition/edit', this.form).then(res => {
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
