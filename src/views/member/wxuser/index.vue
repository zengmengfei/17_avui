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
        :scroll="{x: 'max-content'}">
        <template #avatar="{ record }">
          <a-image :width="35" :src="record.avatar"/>
        </template>
      </ele-pro-table>
    </a-card>
  </div>
  <!-- 编辑弹窗 -->
  <wxuser-edit
    v-model:visible="showEdit"
    :data="current"
    @done="reload"/>
</template>

<script>
import {mapGetters} from "vuex";
import wxuserEdit from './wxuser-edit';

export default {
  name: 'ExamWxUser',
  components: {
    wxuserEdit
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  data() {
    return {
      // 表格数据接口
      url: '/wxuser/index',
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
          title: '用户guid',
          dataIndex: 'guid',
          align: 'center'
        },

        {
          title: '昵称',
          dataIndex: 'nickname',
          align: 'center'
        },

        {
          title: '头像地址',
          dataIndex: 'avatar',
          align: 'center',
          slots: {customRender: 'avatar'}
        },

        {
          title: '性别 ',
          dataIndex: 'gender',
          align: 'center'
        },

        {
          title: '姓名',
          dataIndex: 'name',
          align: 'center'
        },

        {
          title: '手机号',
          dataIndex: 'mobile',
          align: 'center'
        },

        {
          title: '是否实名认证',
          dataIndex: 'certification_str',
          align: 'center'
        },

        {
          title: '会员等级',
          dataIndex: 'member_level_str',
          align: 'center'
        },

        {
          title: '玩家等级',
          dataIndex: 'player_level_str',
          align: 'center'
        },

        {
          title: '组织者等级',
          dataIndex: 'org_level_str',
          align: 'center'
        },

        {
          title: '最后一次授权时间',
          dataIndex: 'last_auth_time',
          align: 'center'
        },

        {
          title: '注册时间',
          dataIndex: 'create_time',
          sorter: true,
          align: 'center',
          //customRender: ({text}) => this.$util.toDateString(text*1000)
        },
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
