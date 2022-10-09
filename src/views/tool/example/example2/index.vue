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
            <a-form-item label="测试名称:">
              <a-input
                v-model:value.trim="where.name"
                placeholder="请输入测试名称"
                allow-clear/>
            </a-form-item>
          </a-col>
                                
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item
              label="性别"
              name="gender">
              <a-select
                v-model:value="where.gender"
                placeholder="请选择性别"
                allow-clear>
                <a-select-option :value="1">男</a-select-option>
                <a-select-option :value="2">女</a-select-option>
                <a-select-option :value="3">保密</a-select-option>
                </a-select>
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
        row-key="id"
        :datasource="url"
        :columns="columns"
        :where="where"
        v-model:selection="selection"
        :scroll="{x: 'max-content'}">
        <template #toolbar>
          <a-space>
            <a-button type="primary" @click="openEdit()" v-if="permission.includes('sys:example2:add')">
              <template #icon>
                <plus-outlined/>
              </template>
              <span>新建</span>
            </a-button>
            <a-button type="danger" @click="removeBatch" v-if="permission.includes('sys:example2:dall')">
              <template #icon>
                <delete-outlined/>
              </template>
              <span>删除</span>
            </a-button>
          </a-space>
        </template>
                          
                                        
          <template #gender="{ record }">
            <a-tag :color="['green', 'blue', 'orange', 'red'][record.gender-1]">
              {{['男','女','保密'][record.gender-1] }}
            </a-tag>
          </template>
                                                
          <template #status="{ text, record }">
            <a-switch
              :checked="text===1"
              @change="(checked) => status(checked, record)"/>
          </template>
                                                
                                        
                  
        <template #action="{ record }">
          <a-space>
            <a @click="openEdit(record)" v-if="permission.includes('sys:example2:edit')">修改</a>
            <a-divider type="vertical"/>
            <a-popconfirm
              title="确定要删除此演示案例二吗？"
              @confirm="remove(record)">
              <a class="ele-text-danger" v-if="permission.includes('sys:example2:delete')">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </ele-pro-table>
    </a-card>
  </div>
  <!-- 编辑弹窗 -->
  <example2-edit
    v-model:visible="showEdit"
    :data="current"
    @done="reload"/>
</template>

<script>
import { mapGetters } from "vuex";
import {createVNode} from 'vue'
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import Example2Edit from './example2-edit';

export default {
  name: 'ExamExample2',
  components: {
    PlusOutlined,
    DeleteOutlined,
    Example2Edit
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  data() {
    return {
      // 表格数据接口
      url: '/example2/index',
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
          title: '测试名称',
          dataIndex: 'name',
          align: 'center'
        },
                            
        {
          title: '性别',
          dataIndex: 'gender',
          sorter: true,
          align: 'center',
          slots: {customRender: 'gender'}
        },
                                  
        {
          title: '状态',
          dataIndex: 'status',
          sorter: true,
          width: 100,
          align: 'center',
          slots: {customRender: 'status'}
        },
                            
        {
          title: '显示顺序',
          dataIndex: 'sort',
          align: 'center'
        },
                      
        {
          title: '备注',
          dataIndex: 'note',
          align: 'center'
        },
            
        {
          title: '创建时间',
          dataIndex: 'create_time',
          sorter: true,
          align: 'center',
          customRender: ({text}) => this.$util.toDateString(text*1000)
        },
        {
          title: '更新时间',
          dataIndex: 'update_time',
          sorter: true,
          align: 'center',
          customRender: ({text}) => this.$util.toDateString(text*1000)
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          fixed: 'right',
          slots: {customRender: 'action'}
        }
      ],
      // 表格搜索条件
      where: {},
      // 表格选中数据
      selection: [],
      // 当前编辑数据
      current: null,
      // 是否显示编辑弹窗
      showEdit: false
    };
  },
  methods: {
    /* 搜索 */
    reload() {
      this.selection = [];
      this.$refs.table.reload({page: 1});
    },
    /*  重置搜索 */
    reset() {
      this.where = {};
      this.$nextTick(() => {
        this.reload();
      });
    },
    /* 删除单个 */
    remove(row) {
      const hide = this.$message.loading('请求中..', 0);
      this.$http.post('/example2/delete', {id : row.id}).then(res => {
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
        content: '确定要删除选中的演示案例二吗?',
        icon: createVNode(ExclamationCircleOutlined),
        maskClosable: true,
        onOk: () => {
          const hide = this.$message.loading('请求中..', 0);
          this.$http.post('/example2/delete', {
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
    /* 打开编辑弹窗 */
    openEdit(row) {
      this.current = row;
      this.showEdit = true;
    },
                  
    /* 修改状态 */
    status(checked, row) {
      let params = Object.assign({}, {
        id : row.id,
        status : checked ? 1 : 2,
      });
      this.$http.post('/example2/status', params).then(res => {
        if (res.data.code === 0) {
          row.status = checked ? 1 : 2;
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    },
                    
  }
}
</script>

<style scoped>
</style>
