<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索表单 -->
      <a-form
        :model="where"
        :label-col="{md: {span: 6}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 18}, sm: {span: 24}}">
        <a-row>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="表名称:">
              <a-input
                v-model:value.trim="where.name"
                placeholder="请输入表名称"
                allow-clear/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="表描述:">
              <a-input
                v-model:value.trim="where.comment"
                placeholder="请输入表描述"
                allow-clear/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item style="padding-left:10px;" :wrapper-col="{span: 24}">
              <a-space>
                <a-button type="primary" @click="reload">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 表格 -->
      <ele-pro-table
        ref="table"
        row-key="name"
        :datasource="url"
        :columns="columns"
        :where="where"
        v-model:selection="selection"
        :scroll="{x: 'max-content'}">
        <template #toolbar>
          <a-space>
            <a-button type="primary" @click="batchGenerate()">
              <template #icon>
                <download-outlined/>
              </template>
              <span>批量生成</span>
            </a-button>
          </a-space>
        </template>
        <!-- 操作栏 -->
        <template #action="{ record }">
          <a-space>
            <a-popconfirm
              title="确定要生成当前模块吗？生成后将覆盖已存在的模块文件!"
              @confirm="generate(record)">
              <a class="ele-text-orange">一键生成</a>
            </a-popconfirm>
          </a-space>
        </template>
      </ele-pro-table>
    </a-card>
  </div>
</template>

<script>
import {createVNode} from 'vue'

import {
  DownloadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import { mapGetters } from "vuex";

export default ({
  name: 'Generate',
  components: {
    DownloadOutlined,
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  data() {
    return {
      // 表格数据接口
      url: '/generate/index',
      // 表格列配置
      columns: [
        {
          key: 'index',
          title: '编号',
          width: 48,
          align: 'center',
          fixed: 'left',
          customRender: ({index}) => this.$refs.table.tableIndex + index
        },
        {
          title: '业务表名称',
          dataIndex: 'name',
          fixed: 'left',
          align: 'center'
        },
        {
          title: '表描述',
          dataIndex: 'comment',
          align: 'center'
        },
        {
          title: '表引擎',
          dataIndex: 'engine',
          align: 'center'
        },
        {
          title: '版本号',
          dataIndex: 'version',
          align: 'center'
        },
        {
          title: '编码',
          dataIndex: 'collation',
          align: 'center'
        },
        {
          title: '记录总数',
          dataIndex: 'rows',
          align: 'center'
        },
        {
          title: '数据大小',
          dataIndex: 'data_length',
          align: 'center'
        },
        {
          title: '自增索引',
          dataIndex: 'auto_increment',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          align: 'center',
        },
        {
          title: '更新时间',
          dataIndex: 'update_time',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          fixed: 'right',
          slots: {customRender: 'action'}
        }
      ],
      // 表格搜索条件
      where: {},
      // 表格选中数据
      selection: [],
    };
  },
  methods: {
    /* 搜索 */
    reload() {
      this.selection = [];
      this.$refs.table.reload({});
    },
    /*  重置搜索 */
    reset() {
      this.where = {};
      this.$nextTick(() => {
        this.reload();
      });
    },
    /**
     * 生成模块代码
     */
    generate(record){
      const hide = this.$message.loading('请求中..', 0);
      this.$http.post('/generate/generate', {name:record.name,comment:record.comment}).then(res => {
        hide();
        if (res.data.code === 0) {
          this.$message.success(res.data.msg);
          this.reload();
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        hide();
        this.$message.error(e.message);
      });
    },
    /* 批量生成 */
    batchGenerate() {
      if (!this.selection.length) {
        this.$message.error('请至少选择一条数据');
        return;
      }
      this.$confirm({
        title: '提示',
        content: '确定要批量生成当前选择的模块吗?生成将覆盖已有的文件',
        icon: createVNode(ExclamationCircleOutlined),
        maskClosable: true,
        onOk: () => {
          const hide = this.$message.loading('请求中..', 0);
          this.$http.post('/generate/batchGenerate', {tables: this.selection.map(d => d.name + "," + d.comment)}).then(res => {
            hide();
            if (res.data.code === 0) {
              this.$message.success(res.data.msg);
              this.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch(e => {
            hide();
            this.$message.error(e.message);
          });
        }
      });
    },
  }
});
</script>

<style scoped>
</style>
