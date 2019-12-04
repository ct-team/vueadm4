 <template>
    <div>
        <dart-table :data="tableData"
                    :loading="loading"
                    :options="options"
                    :columns="columns"
                    :pagination="pagination">
            <el-table-column label="操作"
                             slot="operation"
                             width="180px">
                <template slot-scope="scope">
                    <el-button icon="el-icon-document"
                               type='text'
                               v-if="$dart.permission.is('view')"
                               @click="handleGoView(scope.row)">查看</el-button>
                    <el-button icon="el-icon-edit"
                               type='text'
                               v-if="$dart.permission.is('edit')"
                               @click="handleGoEdit(scope.row)">编辑</el-button>
                    <dart-delete-button style="margin-left:10px"
                                        type='text'
                                        icon='el-icon-delete'
                                        v-if="$dart.permission.is('del')"
                                        @ok="handleDelete(scope.$index, scope.row)"></dart-delete-button>
                </template>
            </el-table-column>
        </dart-table>
    </div>

</template>

<script>
import api from '@/api/index';
import code from '@/config/index/code';
import con from '@/config/index/const.js';

export default {
    data() {
        return {
            tableData: this.data,
            columns: [
                { prop: 'id', title: 'ID' },
                { prop: 'date', title: '日期' },
                { prop: 'name', title: '姓名' },
                { prop: 'address', title: '地址' },
                { slot: 'operation' }
            ],
            options: {
                border: true
            }
        };
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: con.tableMessage
        },
        pagination: Object
    },
    watch: {
        data: {
            immediate: true,
            handler(v) {
                this.tableData = v;
            }
        }
    },
    methods: {
        /**
         * @function {分页点击处理事件}
         */
        handlePagination() {
            this.$bus.$emit('refreshTable');
        },
        handleGoEdit(row) {
            this.$router.push({
                path: 'edit',
                query: {
                    id: row.id
                }
            });
        },
        handleGoView(row) {
            this.$router.push({
                path: 'view',
                query: {
                    id: row.id
                }
            });
        },

        /**
         * @function {function 删除列表行数据}
         * @param  {type} index {列表数据下标,正式项目中请使用唯一id}
         */
        handleDelete(index) {
            const params = {
                data: {
                    id: index
                }
            };

            api.deleteRow(params)
                .then(res => {
                    if (res.Code === code.success) {
                        this.$bus.$emit('refreshTable');
                        this.$message.success(res.Message);
                    } else {
                        this.$message.error(res.Message);
                    }
                })
                .catch(() => {
                    this.$message.error(con.httpErrorMessage);
                });
        }
    }
};
</script>
