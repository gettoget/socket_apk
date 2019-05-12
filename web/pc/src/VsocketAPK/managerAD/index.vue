<template>
  <div class="box_col manageAdSty">
    <div class="pagerTit box_row colCenter">
      <pager-tit title="广告到期"></pager-tit>
    </div>
    <div>
      <Tabs type="card" v-model="params.is_expire">
        <TabPane label="未过期" name="0"></TabPane>
        <TabPane label="已过期" name="1"></TabPane>
      </Tabs>
    </div>
    <div id="tabBox" class="pagerTab box_col_100" style="margin-top: 12px">
      <Table v-if="tabHeader" :height="tabHeader"
             stripe :columns="tabTit" :data="tabData"
      ></Table>
    </div>
    <div class="RowPager">
      <Page :total="PageTotal" :page-size="params.limit" @on-change="pagerCh"/>
    </div>
    <component :is="compName"></component>
  </div>
</template>

<script>
  import xf from './comp/xf'
  export default {
    name: "index",
    components:{xf},
    data() {
      return {
        compName:"",
        media_id:"",
        tabHeader: null,
        tabTit: [
          {
            title: "文件",
            key: 'device_key',
            minWidth: 120,
            render:(h,p)=>{
              return h('Avatar',{
                props:{
                  src:p.row.link
                }
              })
            }
          },
          {
            title:"创建时间",
            key:"updatetime",
            render:(h,p)=>{
              let a = this.moment(parseInt(p.row.updatetime)*1000).format("YYYY-MM-DD")
              // const NowDate = new Date(parseInt(p.row.updatetime))
              // const Year = NowDate.getFullYear()
              // const Month = NowDate.getMonth() + 1
              // const Day = NowDate.getDate()
              //
              // function minNum(val) {
              //   if (val < 10) {
              //     return '0' + val
              //   } else {
              //     return val
              //   }
              // }
              // return h('div',Year + '-' + minNum(Month) + '-' + minNum(Day))
              return h('div',a)
            }
          },
          {
            title:"有效时长",
            key:"expire_days",
            render:(h,p)=>{
              return h('div',p.row.expire_days+'天')
            }
          },
          {
            title:"过期时间",
            key:"online_end_time",
            render:(h,p)=>{
              let a = this.moment(parseInt(p.row.online_end_time)*1000).format("YYYY-MM-DD")
              return h('div',a)
            }
          },
          {
            title:"操作",
            render:(h,p)=>{
              return h('div',[
                h("Button",{
                  props:{
                    type:"success",
                    size:"small"
                  },
                  on: {
                    click: () => {
                      this.event(p)
                    }
                  }
                },'续期')
              ])
            }
          }
        ],
        tabData: [
          {
            admin_id: "1",
            createtime: "1557663374",
            deleted: "0",
            expire_days: "4",
            id: "18",
            link: "http://180g1187v9.51mypc.cn:8090/storage//5cd80e867fe73.jpg",
            media_type: "0",
            online_end_time: "1558008974",
            online_start_time: "0",
            online_status: "1",
            play_time: "3",
            updatetime: "1557663374"
          }
        ],
        PageTotal: 0,
        params: {
          limit: 10,
          offset: 0,
          is_expire:0,//0 未过期  1 已过期
        },
      }
    },
    watch:{
      "params.is_expire":function (n,o) {
        console.log(n);
        this.getDatalist()
      }
    },
    created(){
      let a = new Date()
      console.log(a.getTime());
      this.getDatalist()
    },
    mounted() {
      this.$nextTick(() => {
        this.tabHeader = this.AF.getDom_H("tabBox")
      })
    },
    methods:{
      pagerCh(val) {
        console.log(val);
        this.params.offset = (val - 1) * this.params.limit
        this.getDatalist()
      },
      getDatalist() {
        this.$http.get('/admin/expire_media_list', {
          params: this.params
        }).then(res => {
          if (res.success) {
            console.log(res);
            this.tabData = res.data.media_list
            this.PageTotal = res.data.total
          }
        }).catch(err => {
        })
      },
      event(p){
        this.media_id = p.row.id
        this.compName = "xf"
      }
    }
  }
</script>

<style scoped>

</style>
