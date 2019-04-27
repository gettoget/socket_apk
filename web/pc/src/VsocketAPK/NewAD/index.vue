<style lang="less">
  @import "./index.less";
</style>
<template>
  <div class="box_col newAdpagerSty">
    <div class="pagerTit box_row">
      <pager-tit title="广告位管理"></pager-tit>
      <div class="box_row_100">
        <div class="box_row rowRight colCenter">
          <Input class="itMargin" value="" placeholder="店铺名称" style="width: 220px"/>
          <Button class="itMargin" type="primary">查询</Button>
          <Button class="itMargin" type="primary">新建广告位</Button>
        </div>
      </div>
    </div>
    <div id="tabBox" class="pagerTab box_col_100">
      <Table v-if="tabHeader" :height="tabHeader"
             stripe :columns="tabTit" :data="tabData"
             @on-select="tabSelect" @on-select-all="tabSelectAll"
      ></Table>
    </div>

    <div class="eventButSty">
      <Button type="primary" class="itMargin" @click="selectFP">分屏模式设置</Button>
      <Button type="success" class="itMargin">1号屏幕设置</Button>
      <Button type="success" class="itMargin">2号屏幕设置</Button>
      <Button type="success" class="itMargin">3号屏幕设置</Button>
    </div>

    <component :is="compName" :modelType="modelType"></component>
  </div>
</template>

<script>
  import eventModel from './comp/eventModel'
  export default {
    name: "index",
    components:{eventModel},
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
            key: "name"
          },
          {
            title: "在线状态",
            key: ""
          },
          {
            title: "店铺名称",
            key: "address"
          },
          {
            title: "负责人",
            key: "address"
          },
          {
            title: "联系电话",
            key: "phone"
          },
          {
            title: "性别",
            key: "gender"
          },
          {
            title: "(1号屏幕)",
            key: "",
            render: (h, p) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '广告维护')
              ]);
            }
          },
          {
            title: "(2号屏幕)"
          },
          {
            title: "(3号屏幕)"
          },
          {
            title: "分屏模式"
          }
        ],
        tabData: [
          {
            // "id": 2,//广告位id
            // "admin_id": 1,//创建用户的id
            // "device_key": "key2",//电视id
            // "split_type": 0,
            // "shop_name": "上海杨浦",
            // "manager_name": "admin2",
            // "phone": "12333334",
            // "gender": "M",
            // "online_status": 1,
            // "online_status_change_time": 0,
            // "online_check_time": 0,
            // "deleted": 0,
            // "createtime": 0,
            // "updatetime": 0
          }
        ],
        tabSelectAllList:[],
        modelType:"scrn",
        compName:""
      }
    },
    created() {

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
      tabList(callback){
        let Bol = false
        if(this.tabSelectAllList.length>0){
          Bol = true
        }
        callback && callback(Bol)

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
      tabSelectAll(list){
        console.log(list);
        this.tabSelectAllList = list
      },
      tabSelect(list, row) {
        console.log(list);
        this.tabSelectAllList = list
      }
    }
  }
</script>
