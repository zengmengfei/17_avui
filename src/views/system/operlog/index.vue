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
            <a-form-item label="用户账号:">
              <a-input
                v-model:value.trim="where.username"
                placeholder="请输入用户账号"
                allow-clear/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item style="padding-left:10px;" class="ele-text-left" :wrapper-col="{span: 24}">
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
        row-key="id"
        :datasource="url"
        :columns="columns"
        :where="where"
        :scroll="{x: 'max-content'}">
        <template #toolbar>
          <a-space>
            <a-button type="primary" @click="exportData" v-if="permission.includes('sys:operlog:export')">
              <template #icon>
                <download-outlined/>
              </template>
              <span>导出</span>
            </a-button>
            <a-button type="primary" danger @click="removeBatch" v-if="permission.includes('sys:operlog:dall')">
              <template #icon>
                <delete-outlined/>
              </template>
              <span>删除</span>
            </a-button>
          </a-space>
        </template>
        <!-- 日志详情 -->
        <template #type="{ record }">
          <a-tag :color="['green', 'blue', 'orange'][record.type-1]">
            {{ ['登录系统','注销系统', '操作日志'][record.type-1] }}
          </a-tag>
        </template>
        <!-- 操作栏 -->
        <template #action="{ record }">
          <a-space>
            <a @click="openDetail(record)" v-if="permission.includes('sys:operlog:detail')">详情</a>
            <a-divider type="vertical"/>
            <a-popconfirm
              title="确定要删除此登录日志吗？"
              @confirm="remove(record)">
              <a class="ele-text-danger" v-if="permission.includes('sys:operlog:delete')">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </ele-pro-table>
    </a-card>
  </div>

  <!-- 详情弹窗 -->
  <operlog-detail
    v-model:visible="showDetail"
    :data="current||{}"/>
</template>

<script>
import {createVNode} from 'vue'
import XLSX from 'xlsx';
import {
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import OperlogDetail from './operlog-detail';
import { mapGetters } from "vuex";

export default {
  name: 'SystemOperLog',
  components: {
    DeleteOutlined,
    DownloadOutlined,
    OperlogDetail
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  data() {
    return {
      // 表格数据接口
      url: '/actionlog/index',
      // 表格列配置
      columns: [
        {
          dataIndex: 'id',
          title: '编号',
          width: 48,
          align: 'center',
        },
        {
          title: '日志标题',
          dataIndex: 'title',
          align: 'center'
        },
        {
          title: '用户账号',
          dataIndex: 'username',
          align: 'center'
        },
         {
          title: '请求方式',
          dataIndex: 'method',
          align: 'center'
        },
        {
          title: '操作模块',
          dataIndex: 'module',
          align: 'center'
        },
        {
          title: '操作方法',
          dataIndex: 'action',
          align: 'center'
        },
        {
          title: '操作URL',
          dataIndex: 'url',
          align: 'center'
        },
        {
          title: 'IP地址',
          dataIndex: 'ip',
          align: 'center'
        },
        {
          title: '操作类型',
          dataIndex: 'type',
          align: 'center',
          slots: {customRender: 'type'}
        },
        {
          title: '登录时间',
          dataIndex: 'create_time',
          sorter: true,
          width: 150,
          customRender: ({text}) => this.$util.toDateString(text)
        },
        {
          title: '操作',
          key: 'action',
          width: 90,
          align: 'center',
          fixed: 'right',
          slots: {customRender: 'action'}
        }
      ],
      // 表格搜索条件
      where: {},
      // 当前选中数据
      current: null,
      // 是否显示查看弹窗
      showDetail: false,
    };
  },
  methods: {
    /* 刷新表格 */
    reload() {
      this.$refs.table.reload({where: this.where});
    },
    /* 重置搜索 */
    reset() {
      this.where = {};
      this.reload();
    },
    /* 详情 */
    openDetail(row) {
      this.current = row;
      this.showDetail = true;
    },
    /* 导出数据 */
    exportData() {
      let array = [['登录账号', '请求方式', '操作模块', '操作方法', '操作URL', '请求参数', '操作IP', '操作类型', '登录时间']];
      // 请求查询全部(不分页)的接口
      const hide = this.$message.loading('请求中..', 0);
      this.$http.get('/actionlog/index?page=1&limit=2000').then(res => {
        hide();
        if (res.data.code === 0) {
          res.data.data.forEach(d => {
            array.push([
              d.username,
              d.method,
              d.module,
              d.action,
              d.url,
              d.param,
              d.ip,
              ['登录成功', '登录失败', '退出登录', '刷新TOKEN'][d.type],
              this.$util.toDateString(d.create_time)
            ]);
          });
          this.$util.exportSheet(XLSX, array, '操作日志');
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        hide();
        this.$message.error(e.message);
      });
    },
    /* 删除单个 */
    remove(row) {
      const hide = this.$message.loading('请求中..', 0);
      this.$http.post('/actionlog/delete', {id : row.id}).then(res => {
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
    /* 批量删除 */
    removeBatch() {
      if (!this.selection.length) {
        this.$message.error('请至少选择一条数据');
        return;
      }
      this.$confirm({
        title: '提示',
        content: '确定要删除选中的日志吗?',
        icon: createVNode(ExclamationCircleOutlined),
        maskClosable: true,
        onOk: () => {
          const hide = this.$message.loading('请求中..', 0);
          this.$http.post('/actionlog/delete', {
            id: this.selection.map(d => d.id)
          }).then(res => {
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
  },
  watch: {
    
  }
}
</script>

<style scoped>
</style>
