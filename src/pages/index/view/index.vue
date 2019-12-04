<template>
    <dart-slide :loading="slideLoading"
                :visible="slideVisible"
                :title="slideTitle"
                width="60%"
                :afterClose="handleClose">
        <el-form :model="formData"
                 label-width="auto"
                 class="dt-form">
            <el-form-item label="姓名">
                {{formData.name}}
            </el-form-item>
            <el-form-item label="地址">
                {{formData.address}}
            </el-form-item>
            <el-form-item label="日期">
                {{formData.date}}
            </el-form-item>
        </el-form>
    </dart-slide>
</template>
<script>
import api from '@/api/index';
import code from '@/config/index/code';
import con from '@/config/index/const';
export default {
    data() {
        return {
            slideLoading: false,
            slideVisible: true, //侧边栏显示状态
            slideTitle: '查看', //侧边栏标题
            formData: {
                name: '',
                address: '',
                date: ''
            }
        };
    },
    created() {
        this.getFormData();
    },
    methods: {
        handleClose() {
            this.$router.push({ path: '/' });
        },
        getFormData() {
            this.setSlideLoading(true);
            const params = {
                data: {
                    id: this.$route.query.id
                },
                complete: () => {
                    this.setSlideLoading(false);
                }
            };

            api.getDetailData(params)
                .then(res => {
                    if (res.Code === code.success) {
                        Object.assign(this.formData, res.Data);
                    } else {
                        this.$message.error(res.Message);
                    }
                })
                .catch(() => {
                    this.$message.error(con.httpErrorMessage);
                });
        },
        setSlideLoading(type) {
            this.slideLoading = type;
        }
    }
};
</script>
<style lang="scss">
@import '../../../assets/scss/form.scss';
</style>
