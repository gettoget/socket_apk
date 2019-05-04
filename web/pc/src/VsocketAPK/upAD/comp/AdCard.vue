<template>
  <div class="CardItemSty">
    <Card>
      <Button class="bj" @click="adBj(itMess)" type="warning" size="small">编辑</Button>
      <div v-if="itMess.media_list.length==0" style="text-align: center">
        <Icon type="ios-image-outline" size="141"/>
      </div>
      <div v-else>
        <img :src="demoImg" alt="" style="width: 100%">
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
  import demoImg from '@/assets/images/login-bg.jpg'

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
        demoImg
      }
    },
    methods:{
      adBj(it){
        this.$emit('adBj',it)
      }
    }
  }
</script>

<style lang="less">
  .CardItemSty {
    .ivu-card-body {
      position: relative;
      .bj{
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
</style>
