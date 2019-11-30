<template>
    <Page 
    class="page" 
    :total="9" 
    :page-size="pageSize" 
    :page-size-opts="[2, 3, 4, 5]" 
    show-sizer
    @on-change="handleChange"
    @on-page-size-change="handlePageSizeChange" />
</template>
<script>
    import { Page } from 'view-design'
    export default {
        data(){
            return {
                pageNo:1,
                pageSize:3
            }
        },
        created(){
            this.$watch(
                ()=>{
                  
                    this.$emit('onPageInfo',{
                        pageNo : this.pageNo,
                        pageSize : this.pageSize
                    })
                }
            )
        },
        components:{
            Page
        },
        methods:{
            handleChange(pageNo){
                this.pageNo = pageNo
            },
            handlePageSizeChange(pageSize){
                this.pageSize = pageSize
            }
        }
    }
</script>
<style lang="less" scoped>
    .page{
        float: right;
        margin-top:10px;
    }
</style>
