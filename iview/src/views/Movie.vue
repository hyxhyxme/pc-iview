<template>
<div>
    <Table border :columns="columns12" :data="data6">
        <template slot="header">
            <Button @click="addPosition" type="success" style="margin-left:5px">添加职位</Button>
        </template>
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="error" size="small" @click="remove(index)">Delete</Button>
        </template>
        <template slot="footer">
            <Page @onPageInfo="handlePageInfo"></Page>
        </template>
    </Table>
    <template>
    <Modal v-model="showModal" title="添加职位" :width="800" @on-ok="handleOK" @on-cancel="cancel">
     
        <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="电影图片">
                <Upload  action="/api/movie/upload"
                         :before-upload="handleUpload"
                         :on-success="handleSucc"
                         name="movieLogo">
                    <Button icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload>
                <div v-if="file !== null">
                    <img :src="insideSrc" alt="" style="height:60px; width:60px">
                </div>
            </FormItem>
            <FormItem label="电影名称">
                <Input v-model="formLeft.movieName" />
            </FormItem>
            <FormItem label="评分">
                <Input v-model="formLeft.movieScore" />
            </FormItem>
            <FormItem label="演员">
                <Input v-model="formLeft.movieStar" />
            </FormItem>
            <FormItem label="类型">
                <Input v-model="formLeft.movieType" />
            </FormItem>
            <FormItem label="是否上映">
                <Input v-model="formLeft.movieLiving" />
            </FormItem>
            <FormItem label="想看">
                <Input v-model="formLeft.movieWant" />
            </FormItem>
            <FormItem label="信息">
                <Input v-model="formLeft.movieInfo" />
            </FormItem>
        </Form>
    </Modal>
</template>

</div>
</template>
<script> 
    import { Table, Button, Modal, Form, FormItem, Input, Upload} from 'view-design'
    import Page from './Page.vue'
    import axios from 'axios'
    import _ from 'lodash'
    export default {
        naem:'page',
        data () {
        return {
            columns12: [
                {
                    title: '图片',
                    key: 'movieLogo',
                    render : (h,{row,column,index})=>{
                        return h('img',{
                            attrs:{
                                src:'http://localhost:3000/uploads/'+row.movieLogo,
                                class:'img'
                            }
                        },null)
                    }
                },
                {
                    title: '电影名称',
                    key: 'movieName'
                },
                {
                    title: '评分',
                    key: 'movieScore'
                },
                {
                    title: '演员',
                    key: 'movieStar'
                },
                {
                    title: '类型',
                    key: 'movieType'
                },
                {
                    title: '是否上映',
                    key: 'movieLiving'
                },
                {
                    title: '想看',
                    key: 'movieWant'
                },
                {
                    title: '信息',
                    key: 'movieInfo'
                },
              
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data6: [],
            resource:[],
            pageNo:1,
            pageSize:3,
            showModal:false,
            file:null,
            insideSrc:'',
            loadingStatus:false,
            formLeft: {
                movieName: '',
                movieScore: '',
                movieStar: '',
                movieLogo:'',
                movieLiving:'',
                movieWant:'',
                movieInfo:'',
                movieType:'',
                movieLogo:'',
            },
        }
        },
        components:{
            Table,
            Button,
            Page,
            Modal, 
            Form, 
            FormItem, 
            Input,
            Upload
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            handlePageInfo({ pageNo, pageSize }){
                this.pageNo = pageNo,
                this.pageSize = pageSize
            },
            addPosition(){
                this.showModal = true
            },
           
            async handleOK() {
               
                if(this.formLeft.movieLogo){
                    let result = await this.post ('/api/movie',this.formLeft)
                    this.$router.replace('/movie?_t='+ new Date().getTime())//强制页面刷新
                }else{
                    this.$Message.error('error.')
                }
               
            },
            cancel () {
                /* this.$Message.info('Clicked cancel'); */
            },
            post(url,data){
                console.log(2);
                return axios({
                    url,
                    method:'POST',
                    data
                }).then(result=>{
                    return result.data.data
                })
            },
            handleUpload(file){
                this.file = file
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (event)=>{
                    this.insideSrc = event.srcElement.result
                }
               
            },
            upload(){
                this.loadingStatus = true;
                setTimeout(()=>{
                    this.file = null
                    this.loadingStatus = false
                    this.$Message.success('Success')
                },1500)
            },
            async handleSucc(response,file,fileList){
                let ret = response.ret
                if(ret){
                    let filename = response.ret
                    if(ret){
                        let filename = response.data.filename
                        this.formLeft.movieLogo = filename
                       
                    }else{
                        this.$Message.error('图片上传失败')
                    }
                }
            }
        },
        beforeRouterEnter(to,from ,next){
            next((vm)=>{
                vm.$emit('onRouteChange',to)
            })
        },
        async mounted(){
            axios({
                url:'/api/movie/',
                data:{
                    start:1,
                    count:10
                }
            }).then((result)=>{
                this.resource = result.data.data.list.list
                this.data6 = _.chunk(this.resource,this.pageSize)[this.pageNo-1]
            }).catch((error)=>{
                console.log(error);
            })
        },
        watch:{
            pageNo(){
                this.data6 = _.chunk(this.resource,this.pageSize)[this.pageNo-1]
            },
            pageSize(){
                this.data6 = _.chunk(this.resource,this.pageSize)[0]
            }
        }
    }
</script>
<style lang="less">
.img{
    height:60px
}
</style>