<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 20px !important;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
        <Header>
          <div>111</div>
        </Header>
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu :active-name="currentName" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem  to="/home" name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>首页</span>
                    </MenuItem>
                    <MenuItem  to="/movie" name="1-2">
                        <Icon type="ios-settings"></Icon>
                        <span>电影管理</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{ padding: 0 }" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <Breadcrumb separator="">
                      <BreadcrumbItem v-if="currentName==='1-1'" to="/home">Home</BreadcrumbItem>
                      <BreadcrumbItem v-if="currentName==='1-2'" to="/movie">Movies</BreadcrumbItem>
                    </Breadcrumb>
                </Header>
                <Content :style="{ margin: '20px', background: '#fff', minHeight: '260px' }">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import { Layout, Header, Content, Sider, Menu, MenuItem, Icon, BreadcrumbItem, Breadcrumb } from 'view-design'
    export default {
        data () {
            return {
                isCollapsed: false,
                currentName:'1-1'
            }
        },
        components:{
            Layout, 
            Header, 
            Content, 
            Sider, 
            Menu, 
            MenuItem, 
            Icon, 
            BreadcrumbItem,
            Breadcrumb
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        },
        watch : {
          $route(to){
            if(to.name==='home'){
              this.currentName = '1-1'
            }else if(to.name === 'position'){
              this.currentName = '1-2'
            }
          }
        }
    }
</script>
