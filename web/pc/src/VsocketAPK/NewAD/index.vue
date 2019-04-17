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
      <Button type="primary" class="itMargin" @click="compName='eventModel',modelType='scrn'">分屏模式设置</Button>
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
            title: "设备编号",
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
            title: "商家广告(1号屏幕)",
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
            title: "流动广告(2号屏幕)"
          },
          {
            title: "流动广告(3号屏幕)"
          },
          {
            title: "分屏模式"
          }
        ],
        tabData: [
          {
            name: "John Brown",
            age: 18,
            address: "New York No. 1 Lake Park",
            date: "2016-10-03"
          },
          {
            name: "Jim Green",
            age: 24,
            address: "London No. 1 Lake Park",
            date: "2016-10-01"
          },
          {
            name: "Joe Black",
            age: 30,
            address: "Sydney No. 1 Lake Park",
            date: "2016-10-02"
          },
          {
            name: "Jon Snow",
            age: 26,
            address: "Ottawa No. 2 Lake Park",
            date: "2016-10-04"
          }
        ],
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
      tabSelectAll(list){
        console.log(list);
      },
      tabSelect(list, row) {
        console.log(list);
        console.log(row);
      }
    }
  }
</script>
