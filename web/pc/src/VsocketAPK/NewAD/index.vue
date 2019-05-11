<style lang="less">
  @import "./index.less";
</style>
<template>
  <div class="box_col newAdpagerSty">
    <div class="pagerTit box_row  colCenter">
      <pager-tit title="广告位管理"></pager-tit>
      <div class="box_row_100">
        <Button type="success" class="itMargin">分屏统一设置</Button>
        <Button type="warning" class="itMargin">招商文字管理</Button>
      </div>
      <div class="box_row_100">
        <div class="box_row rowRight colCenter">
          <Input class="itMargin" value="" placeholder="店铺名称" style="width: 220px"/>
          <Button class="itMargin" type="primary">查询</Button>
        </div>
      </div>
    </div>

    <div id="tabBox" class="pagerTab box_col_100">
      <Table v-if="tabHeader" :height="tabHeader"
             stripe :columns="tabTit" :data="tabData"
             @on-select="tabSelect" @on-select-all="tabSelectAll"
      ></Table>
    </div>

    <div class="RowPager">
        <div class="eventButSty ">
          <!--<Button type="primary" class="itMargin" @click="selectFP">分屏批量设置</Button>-->

          <Button type="success" class="itMargin" @click="bindAD(1)">1号屏幕设置</Button>
          <Button type="success" class="itMargin" @click="bindAD(2)">2号屏幕设置</Button>
          <Button type="success" class="itMargin" @click="bindAD(3)">3号屏幕设置</Button>
        </div>
    </div>
    <div class="RowPager">
        <Page :total="PageTotal" :page-size="params.limit"  @on-change="pagerCh"/>
    </div>

    <component :is="compName" :modelType="modelType"></component>
  </div>
</template>

<script>
  import eventModel from './comp/eventModel'
  import upData from './comp/UpData'

  import adGroupList from './comp/adGroupList'

  export default {
    name: "index",
    components:{eventModel,upData,adGroupList},
    data() {
      return {
        tabHeader: null,
        tabTit: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "设备ID",
            key:'device_key',
            minWidth:120
          },
          {
            title: "在线状态",
            key: "",
            minWidth:120
          },
          {
            title: "店铺名称",
            key: "shop_name",
            minWidth:120
          },
          {
            title: "负责人",
            key: "manager_name",
            minWidth:120
          },
          {
            title: "联系电话",
            key: "phone",
            minWidth:120
          },
          {
            title: "性别",
            key: "gender",
            minWidth:120,
            render:(h,p)=>{
              let a = '先生'
              if(p.row.gender == "M"){
                a = '女士'
              }
              return h('div',a)
            }

          },
          {
            title: "(1号屏幕)",
            key: "",
            minWidth:120
          },
          {
            title: "(2号屏幕)",
            key: "",
            minWidth:120
          },
          {
            title: "(3号屏幕)",
            key: "",
            minWidth:120
          },
          {
            title: "分屏模式",
            key: "",
            minWidth:120
          },
          {
            title: "操作",
            fixed:"right",
            align:'center',
            minWidth:140,
            render: (h, p) => {
              return h('div', [
                h('Button', {
                  style:{
                    marginRight:'16px'
                  },
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.upBoxModal(p)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(p)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        tabData: [
          // {
          //   "id": 2,//广告位id
          //   "admin_id": 1,//创建用户的id
          //   "device_key": "key2",//电视id
          //   "split_type": 0,
          //   "shop_name": "上海杨浦",
          //   "manager_name": "admin2",
          //   "phone": "12333334",
          //   "gender": "M",
          //   "online_status": 1,
          //   "online_status_change_time": 0,
          //   "online_check_time": 0,
          //   "deleted": 0,
          //   "createtime": 0,
          //   "updatetime": 0
          // }
        ],
        PageTotal:0,
        params:{
          limit: 10 ,
          offset:0
        },
        tabSelectAllList:[],
        modelType:"scrn",
        compName:"",
        itemMess:'',
        ids:'',
        position_type:''
      }
    },
    created() {
      this.getDatalist()
    },
    mounted() {
      this.$nextTick(() => {
        this.tabHeader = this.AF.getDom_H("tabBox")

        this.AF.WindowListener(() => {
          this.tabHeader = this.AF.getDom_H("tabBox")
        })
      })
    },
    methods: {
      pagerCh(val){
        console.log(val);
        this.params.offset = (val-1)*this.params.limit
        this.getDatalist()
      },
      getDatalist(){
        this.$http.get('http://180g1187v9.51mypc.cn:8090/ajaxapi/admin/device_list',{
          params: this.params
        }).then(res=>{
          if(res.success){
            console.log(res);
            this.tabData = res.data.devices
            this.PageTotal = res.data.total
          }
        }).catch(err=>{})
      },
      tabList(callback){
        let Bol = false
        let ids = []
        if(this.tabSelectAllList.length>0){
          Bol = true
          this.tabSelectAllList.forEach((it,index)=>{
            ids.push(it.id)
          })
        }
        callback && callback(Bol,ids)

      },
      selectFP(){
        var v = this
        this.tabList((val)=>{
          if(val)
          {
            v.compName='eventModel';
            v.modelType='scrn';
          }
          else{
            v.swal({
              title:"请选择要编辑的广告位",
              type:"warning"
            })
          }
        })
      },
      bindAD(num){
        var v = this
        this.tabList((val,ids)=>{
          if(val)
          {
            console.log('123',ids);
            this.ids = ids
            this.position_type = num
            this.compName = 'adGroupList'
          }
          else{
            v.swal({
              title:"请选择要编辑的广告位",
              type:"warning"
            })
          }
        })
      },
      tabSelectAll(list){
        console.log(list);
        this.tabSelectAllList = list
      },
      tabSelect(list, row) {
        console.log(list);
        this.tabSelectAllList = list
      },
      upBoxModal(p){
        this.itemMess = p.row
        this.compName = 'upData'
      },
      remove(p){
        var v = this
        this.swal({
          title:'确定删除广告位？',
          type:'warning',
          showCancelButton: true,
          confirmButtonText: '删除！',
          cancelButtonText: '取消'
        }).then(()=>{
          v.$http.post('/admin/delete_device',{device_id:p.row.id}).then(res=>{
            if(res.success){
              v.params.offset = 0
              v.getDatalist()
            }
          }).catch(err=>{})
        })
      }
    }
  }
</script>
