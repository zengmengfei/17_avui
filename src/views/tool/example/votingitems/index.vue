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
                                <a-form-item label="标题:">
                                    <a-input
                                            v-model:value.trim="where.title"
                                            placeholder="请输入标题"
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
                    row-key="id"
                    :datasource="url"
                    :columns="columns"
                    :where="where"
                    v-model:selection="selection"
                    :scroll="{x: 'max-content'}">
                <template #toolbar>
                    <a-space>
                        <a-button type="primary" @click="openEdit()" v-if="permission.includes('sys:votingitems:add')">
                            <template #icon>
                                <plus-outlined/>
                            </template>
                            <span>新建</span>
                        </a-button>
                        <a-button type="danger" @click="removeBatch" v-if="permission.includes('sys:votingitems:dall')">
                            <template #icon>
                                <delete-outlined/>
                            </template>
                            <span>删除</span>
                        </a-button>
                    </a-space>
                </template>
                                                            
                            <template #images="{ record }">
                                <a-image :width="35" :src="record.images" />
                            </template>
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                                                                        
                                                            
                <template #action="{ record }">
                    <a-space>
                        <a @click="openEdit(record)" v-if="permission.includes('sys:votingitems:edit')">修改</a>
                        <a-divider type="vertical"/>
                        <a-popconfirm
                                title="确定要删除此投票选项吗？"
                                @confirm="remove(record)">
                            <a class="ele-text-danger" v-if="permission.includes('sys:votingitems:delete')">删除</a>
                        </a-popconfirm>
                    </a-space>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
    <!-- 编辑弹窗 -->
    <votingitems-edit
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
    import votingitemsEdit from './votingitems-edit';

    export default {
        name: 'ExamVotingitems',
        components: {
            PlusOutlined,
            DeleteOutlined,
            votingitemsEdit
        },
        computed: {
            ...mapGetters(["permission"]),
        },
        data() {
            return {
                // 表格数据接口
                url: '/votingitems/index',
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
                        title: '图片地址',
                        dataIndex: 'images',
                        align: 'center',
                        slots: {customRender: 'images'}
                    },
                                                                                                    
                    {
                        title: '投票配置id',
                        dataIndex: 'voteconfig_id',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '标题',
                        dataIndex: 'title',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '序号',
                        dataIndex: 'number',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '外链地址',
                        dataIndex: 'url',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '票数',
                        dataIndex: 'vote',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '备注',
                        dataIndex: 'remarks',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '其他',
                        dataIndex: 'other',
                        align: 'center'
                    },
                                                                                                    
                    {
                        title: '状态:1显示 2隐藏',
                        dataIndex: 'status',
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
                this.$http.post('/votingitems/delete', {id : row.id}).then(res => {
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
                    content: '确定要删除选中的投票选项吗?',
                    icon: createVNode(ExclamationCircleOutlined),
                    maskClosable: true,
                    onOk: () => {
                        const hide = this.$message.loading('请求中..', 0);
                        this.$http.post('/votingitems/delete', {
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