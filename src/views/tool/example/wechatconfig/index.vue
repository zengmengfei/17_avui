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
                                <a-form-item label="名称:">
                                    <a-input
                                            v-model:value.trim="where.name"
                                            placeholder="请输入名称"
                                            allow-clear/>
                                </a-form-item>
                            </a-col>
                                                                                                
                                <a-col :lg="6" :md="12" :sm="24" :xs="24">
                                    <a-form-item
                                            label="有效标识"
                                            name="make">
                                        <a-select
                                                v-model:value="where.make"
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
                        <a-button type="primary" @click="openEdit()" v-if="permission.includes('sys:wechatconfig:add')">
                            <template #icon>
                                <plus-outlined/>
                            </template>
                            <span>新建</span>
                        </a-button>
                        <a-button type="danger" @click="removeBatch" v-if="permission.includes('sys:wechatconfig:dall')">
                            <template #icon>
                                <delete-outlined/>
                            </template>
                            <span>删除</span>
                        </a-button>
                    </a-space>
                </template>                                                         
                                                                                                
                <template #make="{ record }">
                    <a-tag :color="['green', 'blue', 'orange', 'red'][record.make-1]">
                        {{['正常','删除'][record.make-1] }}
                    </a-tag>
                </template>
                                                                                        
                <template #action="{ record }">
                    <a-space>
                        <a @click="openEdit(record)" v-if="permission.includes('sys:wechatconfig:edit')">修改</a>
                        <a-divider type="vertical"/>
                        <a-popconfirm
                                title="确定要删除此微信配置吗？"
                                @confirm="remove(record)">
                            <a class="ele-text-danger" v-if="permission.includes('sys:wechatconfig:delete')">删除</a>
                        </a-popconfirm>
                    </a-space>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
    <!-- 编辑弹窗 -->
    <wechatconfig-edit
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
    import wechatconfigEdit from './wechatconfig-edit';

    export default {
        name: 'ExamWechatConfig',
        components: {
            PlusOutlined,
            DeleteOutlined,
            wechatconfigEdit
        },
        computed: {
            ...mapGetters(["permission"]),
        },
        data() {
            return {
                // 表格数据接口
                url: '/wechatconfig/index',
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
                        title: '名称',
                        dataIndex: 'name',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '内容',
                        dataIndex: 'value',
                        align: 'center'
                    },
                                                                                                    
                   
                                                                                                                        
                    {
                        title: '有效标识',
                        dataIndex: 'make',
                        sorter: true,
                        align: 'center',
                        slots: {customRender: 'make'}
                    },
                                                                                
                    {
                        title: '创建时间',
                        dataIndex: 'create_time',
                        sorter: true,
                        align: 'center',
                        //customRender: ({text}) => this.$util.toDateString(text*1000)
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'update_time',
                        sorter: true,
                        align: 'center',
                       // customRender: ({text}) => this.$util.toDateString(text*1000)
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
                this.$http.post('/wechatconfig/delete', {id : row.id}).then(res => {
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
                    content: '确定要删除选中的微信配置吗?',
                    icon: createVNode(ExclamationCircleOutlined),
                    maskClosable: true,
                    onOk: () => {
                        const hide = this.$message.loading('请求中..', 0);
                        this.$http.post('/wechatconfig/delete', {
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