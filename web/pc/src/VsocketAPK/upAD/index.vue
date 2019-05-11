<style lang="less">
  @import "./index.less";
</style>
<template>
  <div class="updateAd box_col">
    <div class="pagerTit box_row">
      <pager-tit title="广告组管理"></pager-tit>
      <div class="box_row_100">
        <div class="box_row rowRight colCenter">
          <Button class="itMargin" type="primary" @click="adUp">新建广告组</Button>
        </div>
      </div>
    </div>
    <div class="box_col_autoY">
      <div class="box_row_list">
        <div style="padding: 16px;width: 310px"  v-for="(it,index) in dataList" :key="index">
          <ad-card :itMess="it" @adBj="adBj" @adMusic="adMusic"></ad-card>
        </div>
      </div>
    </div>
    <div style="padding: 12px 0">
      <Page :total="PageTotal" :page-size="params.limit"  @on-change="pagerCh"/>
    </div>
    <component :is="compName" :groupItem="groupItem"></component>
  </div>
</template>

<script>
  import adCard from './comp/AdCard'//广告组 卡片
  import adGroup from './comp/addAdGroup' //添加 广告组

  import adGroupItem from './comp/addAdGroupItem'
  import bgMusic from './comp/bgMusic'
  export default {
    name: "index",
    components: {adCard,adGroup,adGroupItem,bgMusic},
    data() {
      return {//adGroup
        compName:"",
        groupItem:"",//广告组的信息
        dataList:[],
        PageTotal:0,
        params:{
          limit: 2 ,
          offset:0
        },
      }
    },
    watch: {
    },
    created() {
      this.getDataList()
    },
    mounted() {
    },
    methods: {
      pagerCh(val){
        console.log(val);
        this.params.offset = (val-1)*this.params.limit
        this.getDataList()
      },
      getDataList(){
        this.$http.get('/admin/media_group_list',{
          params: this.params
        }).then(res=>{
          if(res.success){
            this.dataList = res.data.media_groups
            this.PageTotal = res.data.total
          }
        }).catch(err=>{})
      },
      adUp(){
        this.compName = 'adGroup'
      },
      adBj(val){
        this.groupItem = val
        this.compName = 'adGroupItem'
      },
      adMusic(val){
        this.groupItem = val
        this.compName = 'bgMusic'
      }
    }
  }
</script>
