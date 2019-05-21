<template>
  <div class="box_col manageAdSty">
    <div class="pagerTit box_row colCenter">
      <pager-tit title="广告维护"></pager-tit>
      <div class="box_row_100">
        <div class="box_row rowRight">
          <Input v-model="params.keyword" placeholder="广告名称" style="width: 260px" @on-enter="pagerCh(1)"/>
          <Button type="info" @click="pagerCh(1)">查询</Button>
        </div>
      </div>
    </div>
    <div>
      <Tabs type="card" v-model="params.status">
        <TabPane label="未过期" name="1"></TabPane>
        <TabPane label="即将过期(7天)" name="2"></TabPane>
        <TabPane label="已过期" name="3"></TabPane>
        <TabPane label="全部广告" name="0"></TabPane>
      </Tabs>
    </div>
    <div id="tabBox" class="pagerTab box_col_100" style="margin-top: 12px">
      <Table v-if="tabHeader" :height="tabHeader"
             stripe :columns="tabTit" :data="tabData"
             @on-select="tabSelect" @on-select-all="tabSelectAll"
      ></Table>
    </div>
    <div class="RowPager box_row " style="padding:18px 0">
      <div style="margin-right: 20px">
        <Button type="warning" @click="batchEvent">批量维护</Button>
      </div>
      <div style="margin-right: 20px">
        <Button type="success" @click="compName='allwh'">播放时长统一维护</Button>
      </div>
      <Page :total="PageTotal" :page-size="params.limit" @on-change="pagerCh"/>
    </div>
    <component :is="compName"
               :media_ids="media_ids"
               @close="compName = '',getDatalist()"
    ></component>
  </div>
</template>

<script>
  import xf from './comp/xf'
  import wh from './comp/wh'
  import allwh from './comp/allWh'

  export default {
    name: "index",
    components: {xf, wh, allwh},
    data() {
      return {
        compName: "",
        media_ids: [],
        tabHeader: null,
        tabTit: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "文件",
            key: 'device_key',
            minWidth: 120,
            render: (h, p) => {
              return h('Avatar', {
                props: {
                  src: p.row.link
                }
              })
            }
          },
          {
            title: "广告组名称",
            minWidth: 100,
            key: "group_name"
          },
          {
            title: "广告名称",
            minWidth: 100,
            key: "media_name"
          },
          {
            title: "创建时间",
            minWidth: 100,
            key: "updatetime",
            render: (h, p) => {
              let a = this.moment(parseInt(p.row.updatetime) * 1000).format("YYYY-MM-DD")
              return h('div', a)
            }
          },
          {
            title: "播放时长",
            minWidth: 100,
            key: "play_time",
            render: (h, p) => {
              return h('div', p.row.play_time + '秒')
            }
          },
          {
            title: "有效时长",
            minWidth: 100,
            key: "expire_days",
            render: (h, p) => {
              return h('div', p.row.expire_days + '天')
            }
          },
          {
            title: "过期时间",
            minWidth: 100,
            key: "online_end_time",
            render: (h, p) => {
              let a = this.moment(parseInt(p.row.online_end_time) * 1000).format("YYYY-MM-DD")
              return h('div', a)
            }
          },
          {
            title: "操作",
            fixed: "right",
            width: 220,
            render: (h, p) => {
              return h('div', [
                h("Button", {
                  style: {
                    display: this.params.status < 3 ? "inline" : "none"
                  },
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.event(p, 'wh')
                    }
                  }
                }, '维护'),
                h("Button", {
                  style: {
                    marginLeft: "8px"
                  },
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.event(p, 'xf')
                    }
                  }
                }, '续期'),
                h("Button", {
                  style: {
                    marginLeft: "8px"
                  },
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(p)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        tabData: [
          // {
          //   admin_id: "1",
          //   createtime: "1557663374",
          //   deleted: "0",
          //   expire_days: "4",
          //   id: "18",
          //   link: "http://180g1187v9.51mypc.cn:8090/storage//5cd80e867fe73.jpg",
          //   media_type: "0",
          //   online_end_time: "1558008974",
          //   online_start_time: "0",
          //   online_status: "1",
          //   play_time: "3",
          //   updatetime: "1557663374"
          // }
        ],
        PageTotal: 0,
        params: {
          limit: 10,
          offset: 0,
          status: "1",//0:所有广告,1:未过期,2:即将过期(7天),3:已过期
          keyword: '',
        },
      }
    },
    watch: {
      "params.status": function (n, o) {
        this.getDatalist()
      }
    },
    created() {
      let a = new Date()
      this.getDatalist()
    },
    mounted() {
      this.$nextTick(() => {
        this.tabHeader = this.AF.getDom_H("tabBox")
      })
    },
    methods: {
      batchEvent() {
        if (this.media_ids.length == 0) {
          v.swal({
            title: "请选择要维护的广告",
            type: "warning"
          })
        } else {
          this.compName = 'wh'
        }
      },
      tabSelectAll(list) {
        let arrList = []
        list.forEach((it, index) => {
          arrList.push(it.id)
          if (index == list.length - 1) {
            this.media_ids = arrList
          }
        })
      },
      tabSelect(list, row) {
        let arrList = []
        list.forEach((it, index) => {
          arrList.push(it.id)
          if (index == list.length - 1) {
            this.media_ids = arrList
          }
        })
      },
      pagerCh(val) {
        this.params.offset = (val - 1) * this.params.limit
        this.getDatalist()
      },
      getDatalist() {
        this.$http.get('/admin/media_list', {
          params: this.params
        }).then(res => {
          if (res.success) {
            this.tabData = res.data.media_list
            this.PageTotal = res.data.total
          }
        }).catch(err => {
        })
      },
      event(p, name) {
        this.media_ids[0] = p.row.id
        this.compName = name
      },
      remove(p) {
        this.$http.post('/admin/delete_media', {media_id: p.row.id}).then(res => {
          if (res.success) {
            this.$Message.success('文件删除成功');
            this.getDatalist()
          }
        }).catch(err => {

        })
      }
    }
  }
</script>

<style scoped>

</style>
