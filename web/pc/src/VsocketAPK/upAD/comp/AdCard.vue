<template>
  <div class="CardItemSty">
    <Card>
      <div class="box_row butEvent">
        <Button class="bj" @click="adBj(itMess)" type="warning" size="small">广告编辑</Button>
        <Button class="bjMusic" @click="adMusic(itMess)" type="info" size="small">名称/音乐</Button>
        <Button type="error" shape="circle" icon="md-close" size="small" style="position: absolute;top: 0;right: 0" @click="remove"></Button>
      </div>

      <div v-if="itMess.media_list.length==0" style="text-align: center;height: 140px">
        <Icon type="ios-image-outline" size="141"/>
      </div>
      <div v-else style="text-align: center;height: 140px">
        <img v-if="itMess.media_list[0].media_type == '0'" :src="itMess.media_list[0].link" alt="" style="height: 100%">
        <video v-if="itMess.media_list[0].media_type == '1'" :src="itMess.media_list[0].link"  style="height: 100%"></video>
      </div>
      <div class="box_row">
        <div class="box_row_100">
          名称 :
          <h3>{{itMess.group_name}}</h3>
        </div>
        <div class="box_row_100">
          数量 :
          <h3>{{itMess.media_list.length}}</h3>
        </div>
      </div>

      <div class="">
        <!--<div>-->
          <!--统一发布-->
        <!--</div>-->
        <div>
          <Button type="primary" @click="butGroup = !butGroup" size="small">
            <span v-if="!butGroup">屏幕统一发布</span>
            <span v-else>发布结束</span>
          </Button>
        </div>
        <div style="height: 30px;padding-top: 6px">
          <div class="box_row rowAuto" v-if="butGroup">
            <Button type="info" @click="fb(1)" size="small">一号屏</Button>
            <Button type="success" @click="fb(2)" size="small">二号屏</Button>
            <Button type="warning" @click="fb(3)" size="small">三号屏</Button>
          </div>
        </div>
      </div>
  </Card>
  </div>
</template>

<script>
  export default {
    name: "AdCard",
    props:{
      itMess:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        butGroup:false,
      }
    },
    methods:{
      remove(){
        var v = this
        this.swal({
          title:"确认删除？",
          type:"warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: '删除',
          cancelButtonText:'取消'
        }).then(function(val){
          if(val.value){
            v.$http.post('/admin/delete_group',{group_id:v.itMess.id}).then(res=>{
              if(res.success){
                v.$parent.getDataList()
              }
            }).catch(err=>{})
          }
        })
      },
      adBj(it){
        this.$emit('adBj',it)
      },
      adMusic(it){
        this.$emit('adMusic',it)
      },
      fb(postion){
        var v = this
        this.swal({
          title:"是否确认,"+postion+"号屏统一发布",
          type:"warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: '发部',
          cancelButtonText:'取消'
        }).then(function(val){
          if(val.value){
            v.$http.post('/admin/bind_all_device_group',{group_id:v.itMess.id,position_type:postion}).then(res=>{
              if(res.success){
                v.$Message.success('广告'+postion+'号屏幕，发布成功')
                v.butGroup = false
              }
            }).catch(err=>{})
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .CardItemSty {
    .ivu-card-body {
      position: relative;
      .butEvent{
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 100;
      }
    }
  }
</style>
