<template>
  <div class="CardItemSty">
    <Card>
      <div class="box_row butEvent">
        <Button class="bj" @click="adBj(itMess)" type="warning" size="small">广告编辑</Button>
        <Button class="bjMusic" @click="adMusic(itMess)" type="info" size="small">名称/音乐</Button>
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
        <div>
          统一发布
        </div>
        <div class="box_row rowAuto">
          <Button type="info">一号屏</Button>
          <Button type="success">二号屏</Button>
          <Button type="warning">三号屏</Button>
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
      }
    },
    methods:{
      adBj(it){
        this.$emit('adBj',it)
      },
      adMusic(it){
        this.$emit('adMusic',it)
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
        /*.bj{*/
          /*position: absolute;*/
          /*top: 0;*/
          /*right: 0;*/
          /*z-index: 100;*/
        /*}*/
        /*.bjMusic{*/
          /*position: absolute;*/
          /*top: 0;*/
          /*right: 45px;*/
          /*z-index: 100;*/
        /*}*/
      }
    }
  }
</style>
