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

          <!--<Button class="itMargin" type="primary" @click="adUp">新建广告</Button>-->
        </div>
      </div>
    </div>
    <div class="box_col_autoY">
      <div class="box_row_list">
        <div style="padding: 16px;width: 310px"  v-for="(it,index) in dataList" :key="index">
          <ad-card :itMess="it" @adBj="adBj"></ad-card>
        </div>
      </div>

      <!--<Row>-->
        <!--<Col span="6" v-for="(it,index) in dataList" :key="index">-->
          <!--<div style="padding: 16px">-->
            <!--<ad-card></ad-card>-->
          <!--</div>-->
        <!--</Col>-->
      <!--</Row>-->
    </div>
    <component :is="compName" :groupItem="groupItem"></component>
  </div>
</template>

<script>
  import adCard from './comp/AdCard'
  import adGroup from './comp/addAdGroup'

  import adGroupItem from './comp/addAdGroupItem'
  export default {
    name: "index",
    components: {adCard,adGroup,adGroupItem},
    data() {
      return {//adGroup
        compName:"",
        groupItem:"",
        dataList:[],
        PageTotal:0,
        params:{
          limit: 10 ,
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
      getDataList(){
        this.$http.get('/admin/media_group_list',{
          params: this.params
        }).then(res=>{
          if(res.success){
            this.dataList = res.data
          }
        }).catch(err=>{})
      },
      adUp(){
        this.compName = 'adGroup'
      },
      adBj(val){
        this.groupItem = val
        this.compName = 'adGroupItem'
      }
    }
  }
</script>
