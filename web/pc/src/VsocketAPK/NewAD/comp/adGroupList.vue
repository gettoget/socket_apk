<template>
  <div>
    <Modal
      v-model="modalVal"
      :mask-closable="false"
      title="请选择广告组进行发布"
      @on-visible-change="visible">
      <div>
        <Input v-model="params.keyword" clearable placeholder="请输入广告组名称" style="width: 300px" @on-enter="pagerCh(1)"/>
        <Button type="info" style="margin:0 12px 0 8px" @click="pagerCh(1)">查询</Button>
      </div>
      <div style="padding: 18px 0">
        <div class="box_row_list">
          <div v-for="(it,index) in dataList">
            <Tag :color="tagindex==index?'red':'cyan'" @click.native="tagEvent(it,index)">{{it.group_name}}</Tag>
          </div>
        </div>
      </div>
      <div style="padding: 22px 0 0 0">
        <Page :total="PageTotal" :page-size="params.limit" @on-change="pagerCh"/>
      </div>
      <div slot="footer" class="box_row rowRight">
        <Button @click="cance">取消</Button>
        <Button type="info" @click="save" :disabled="group_id==''">广告发布</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "adGroup",
    props:{
      ids:{
        type:String,
        default:()=>{
          return ""
        }
      },
      positionType:{
        type:String,
        default:()=>{
          return ''
        }
      }
    },
    data() {
      return {
        modalVal: true,
        tagindex: null,
        group_id: '',
        dataList: [],
        PageTotal: 0,
        params: {
          limit: 100,
          offset: 0,
          keyword:''
        },
        upIds:""
      }
    },
    watch:{
      ids:function (n,o) {

      }
    },
    created() {
      this.upIds = this.ids
      this.getDataList()
    },
    methods: {
      tagEvent(it, index) {
        this.group_id = it.id
        this.tagindex = index
      },
      pagerCh(val) {
        this.params.offset = (val - 1) * this.params.limit
        this.getDataList()
      },
      getDataList() {
        this.$http.get('/admin/media_group_list', {
          params: this.params
        }).then(res => {
          if (res.success) {
            this.dataList = res.data.media_groups
            this.PageTotal = res.data.total
          }
        }).catch(err => {
        })
      },
      save() {
        if (this.group_id != '') {
          const par ={
            device_ids:this.upIds,
            position_type:this.positionType,
            group_id:this.group_id
          }
          this.$http.post('/admin/bind_device_group',par).then(res => {
            if(res.success){
              this.cance()
            }
          }).catch(err => [])
        }
      },
      cance() {
        this.$emit('close')
      },
      visible(val) {
        setTimeout(() => {
          this.cance()
        }, 30)
      }
    }
  }
</script>

<style scoped>

</style>
