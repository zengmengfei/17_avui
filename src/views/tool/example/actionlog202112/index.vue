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
                                <a-form-item label="日志标题:">
                                    <a-input
                                            v-model:value.trim="where.title"
                                            placeholder="请输入日志标题"
                                            allow-clear/>
                                </a-form-item>
                            </a-col>
                                                                                                
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item
                                            label="操作类型"
                                            name="type">
                                        <a-select
                                                v-model:value="where.type"
                                                placeholder="请选择操作类型"
                                                allow-clear>
                                                                                            <a-select-option :value="1">登录系统</a-select-option>
                                                                                            <a-select-option :value="2">注销系统</a-select-option>
                                                                                            <a-select-option :value="3">操作日志</a-select-option>
                                                                                    </a-select>
                                    </a-form-item>
                                </a-col>
                                                                                                                            
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item
                                            label="有效标识"
                                            name="mark">
                                        <a-select
                                                v-model:value="where.mark"
                                                placeholder="请选择有效标识"
                                                allow-clear>
                                                                                            <a-select-option :value="1">正常</a-select-option>
                                                                                            <a-select-option :value="0">删除</a-select-option>
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
                        <a-button type="primary" @click="openEdit()" v-if="permission.includes('sys:actionlog202112:add')">
                            <template #icon>
                                <plus-outlined/>
                            </template>
                            <span>新建</span>
                        </a-button>
                        <a-button type="danger" @click="removeBatch" v-if="permission.includes('sys:actionlog202112:dall')">
                            <template #icon>
                                <delete-outlined/>
                            </template>
                            <span>删除</span>
                        </a-button>
                    </a-space>
                </template>
                                                            
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                                                    
                                <template #type="{ record }">
                                    <a-tag :color="['green', 'blue', 'orange', 'red'][record.type-1]">
                                        {{['登录系统','注销系统','操作日志'][record.type-1] }}
                                    </a-tag>
                                </template>
                                                                                                                                    
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                            
                <template #action="{ record }">
                    <a-space>
                        <a @click="openEdit(record)" v-if="permission.includes('sys:actionlog202112:edit')">修改</a>
                        <a-divider type="vertical"/>
                        <a-popconfirm
                                title="确定要删除此系统行为日志吗？"
                                @confirm="remove(record)">
                            <a class="ele-text-danger" v-if="permission.includes('sys:actionlog202112:delete')">删除</a>
                        </a-popconfirm>
                    </a-space>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
    <!-- 编辑弹窗 -->
    <actionlog202112-edit
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
    import actionlog202112Edit from './actionlog202112-edit';

    export default {
        name: 'ExamActionLog202112',
        components: {
            PlusOutlined,
            DeleteOutlined,
            actionlog202112Edit
        },
        computed: {
            ...mapGetters(["permission"]),
        },
        data() {
            return {
                // 表格数据接口
                url: '/actionlog202112/index',
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
                        title: '操作人用户名',
                        dataIndex: 'username',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '请求类型',
                        dataIndex: 'method',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '模型',
                        dataIndex: 'module',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '操作页面',
                        dataIndex: 'url',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '请求参数(JSON格式)',
                        dataIndex: 'param',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '日志标题',
                        dataIndex: 'title',
                        align: 'center'
                    },
                                                                                                                        
                    {
                        title: '操作类型',
                        dataIndex: 'type',
                        sorter: true,
                        align: 'center',
                        slots: {customRender: 'type'}
                    },
                                                                                                                        
                    {
                        title: 'IP地址',
                        dataIndex: 'ip',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: 'IP所属城市',
                        dataIndex: 'ip_city',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '操作系统',
                        dataIndex: 'os',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '浏览器',
                        dataIndex: 'browser',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: 'User-Agent',
                        dataIndex: 'user_agent',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '内容',
                        dataIndex: 'content',
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
                this.$http.post('/actionlog202112/delete', {id : row.id}).then(res => {
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
                    content: '确定要删除选中的系统行为日志吗?',
                    icon: createVNode(ExclamationCircleOutlined),
                    maskClosable: true,
                    onOk: () => {
                        const hide = this.$message.loading('请求中..', 0);
                        this.$http.post('/actionlog202112/delete', {
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
                                                                                                                                                                    
    }
    }
</script>

<style scoped>
</style>