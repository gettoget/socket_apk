<style lang="less">
  @import "./index.less";
</style>
<template>
  <div class="box_col newAdpagerSty">
    <div class="pagerTit box_row  colCenter">
      <pager-tit title="广告位管理"></pager-tit>
      <div class="box_row_100"></div>
      <CheckboxGroup v-model="search_type" size="large">
        <Checkbox label="shop_name">
          <span style="font-size: 16px">店名</span>
        </Checkbox>
        <Checkbox label="manager_name">
          <span style="font-size: 16px">负责人</span>
        </Checkbox>
        <Checkbox label="phone">
          <span style="font-size: 16px">电话</span>
        </Checkbox>
        <Checkbox label="tag1">
          <span style="font-size: 16px">分区</span>
        </Checkbox>
        <Checkbox label="tag2">
          <span style="font-size: 16px">类别</span>
        </Checkbox>
        <Checkbox label="tag3">
          <span style="font-size: 16px">备注</span>
        </Checkbox>
      </CheckboxGroup>
      <Input class="itMargin" v-model="params.keyword" placeholder="店铺名称" style="width: 220px"/>
      <Button class="itMargin" type="primary" @click="pagerCh(1)">查询</Button>
      <div>
        <Button type="success" class="itMargin" @click="selectFP">分屏统一设置</Button>
      </div>
    </div>
    <div class="box_row colCenter" style="margin-bottom: 8px">
      <div class="box_row_100">
        <Input v-model="device_scroll" :disabled="scrollEvent">
        <span slot="prepend">招商文字</span>
        </Input>
      </div>
      <div style="margin-left: 15px">
        <Input value="" :disabled="scrollEvent" placeholder="文字大小">
        <span slot="prepend">文字大小</span>
        </Input>
      </div>
      <div style="margin-left: 15px">
        文字颜色
        <ColorPicker value="#fff" :disabled="scrollEvent"/>
      </div>
      <div style="margin-left: 15px">
        背景颜色
        <ColorPicker value="#000" :disabled="scrollEvent"/>
      </div>
      <div style="margin-left: 15px">
        <Button type="warning" class="itMargin" v-if="scrollEvent" @click="scrollEvent=!scrollEvent">编辑</Button>
        <Button type="success" class="itMargin" v-else @click="saveScroll">保存</Button>
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
      <Page :total="PageTotal" :page-size="params.limit" @on-change="pagerCh"/>
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
    components: {eventModel, upData, adGroupList},
    data() {
      return {
        tabHeader: null,
        device_scroll: '',
        scrollEvent: true,
        tabTit: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "设备ID",
            key: 'device_key',
            minWidth: 120
          },
          {
            title: "在线状态",
            key: "online_status",
            minWidth: 120,
            render: (h, p) => {
              let a = p.row.online_status == "" ? '离线' : '在线'
              return h('div', a)
            }
          },
          {
            title: "店铺名称",
            key: "shop_name",
            minWidth: 120
          },
          {
            title: "负责人",
            key: "manager_name",
            minWidth: 120
          },
          {
            title: "联系电话",
            key: "phone",
            minWidth: 120
          },
          {
            title: "性别",
            key: "gender",
            minWidth: 120,
            render: (h, p) => {
              let a = '先生'
              if (p.row.gender == "M") {
                a = '女士'
              }
              return h('div', a)
            }
          },
          {
            title: "所属分区",
            key: "tag1",
            minWidth: 120
          },
          {
            title: "所属类别",
            key: "tag2",
            minWidth: 120
          },
          {
            title: "备注信息",
            key: "tag3",
            minWidth: 120
          },
          {
            title: "(1号屏幕)",
            key: "",
            minWidth: 120,
            render: (h, p) => {
              let a = ''
              p.row.media.forEach((it, index) => {
                if (it.position_type == "1") {
                  a = it.group_name
                }
              })
              return h('div', a)
            }
          },
          {
            title: "(2号屏幕)",
            key: "",
            minWidth: 120,
            render: (h, p) => {
              let a = ''
              p.row.media.forEach((it, index) => {
                if (it.position_type == "2") {
                  a = it.group_name
                }
              })
              return h('div', a)
            }
          },
          {
            title: "(3号屏幕)",
            key: "",
            minWidth: 120,
            render: (h, p) => {
              let a = ''
              p.row.media.forEach((it, index) => {
                if (it.position_type == "3") {
                  a = it.group_name
                }
              })
              return h('div', a)
            }
          },
          {
            title: "分屏模式",
            key: "split_type",
            minWidth: 120,
            render: (h, p) => {
              return h('div', '分' + p.row.split_type + '块')
            }
          },
          {
            title: "操作",
            fixed: "right",
            align: 'center',
            minWidth: 140,
            render: (h, p) => {
              return h('div', [
                h('Button', {
                  style: {
                    marginRight: '16px'
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
        PageTotal: 0,
        search_type: [],
        params: {
          limit: 10,
          offset: 0,
          search_type: "",//搜索字段
          keyword: "",
        },
        tabSelectAllList: [],
        modelType: "scrn",
        compName: "",
        itemMess: '',
        ids: '',
        position_type: ''
      }
    },
    watch: {
      search_type: function (n, o) {
        console.log(n);
        this.params.search_type = JSON.stringify(n)
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
      pagerCh(val) {
        console.log(val);
        this.params.offset = (val - 1) * this.params.limit
        this.getDatalist()
      },
      getDatalist() {
        this.$http.get('/admin/device_list', {
          params: this.params
        }).then(res => {
          if (res.success) {
            console.log(res);
            this.tabData = res.data.devices
            this.PageTotal = res.data.total
          }
        }).catch(err => {
        })
        this.getScroll()
      },
      getScroll() {
        this.$http.get('/admin/device_scroll').then(res => {
          if (res.success) {
            this.device_scroll = res.data
          }
        }).catch(err => {
        })
      },
      saveScroll() {
        this.$http.post('/admin/update_device_scroll', {scroll_text: this.device_scroll}).then(res => {
          if (res.success) {
            this.scrollEvent = true
          }
        }).catch(err => {
        })

      },
      tabList(callback) {
        let Bol = false
        let ids = []
        if (this.tabSelectAllList.length > 0) {
          Bol = true
          this.tabSelectAllList.forEach((it, index) => {
            ids.push(it.id)
          })
        }
        callback && callback(Bol, ids)

      },
      selectFP() {
        var v = this
        v.compName = 'eventModel';
      },
      bindAD(num) {
        var v = this
        this.tabList((val, ids) => {
          if (val) {
            console.log('123', ids);
            this.ids = ids
            this.position_type = num
            this.compName = 'adGroupList'
          }
          else {
            v.swal({
              title: "请选择要编辑的广告位",
              type: "warning"
            })
          }
        })
      },
      tabSelectAll(list) {
        console.log(list);
        this.tabSelectAllList = list
      },
      tabSelect(list, row) {
        console.log(list);
        this.tabSelectAllList = list
      },
      upBoxModal(p) {
        this.itemMess = p.row
        this.compName = 'upData'
      },
      remove(p) {
        var v = this
        this.swal({
          title: '确定删除广告位？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '删除！',
          cancelButtonText: '取消'
        }).then(() => {
          v.$http.post('/admin/delete_device', {device_id: p.row.id}).then(res => {
            if (res.success) {
              v.params.offset = 0
              v.getDatalist()
            }
          }).catch(err => {
          })
        })
      }
    }
  }
</script>
