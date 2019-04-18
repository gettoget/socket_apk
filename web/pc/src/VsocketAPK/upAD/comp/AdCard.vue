<template>
  <div class="CardItemSty" style="margin-bottom: 16px">
    <Card>
      <div slot="title">
        <img :src="demoImg" alt="">
      </div>
      <div class="box_row">
        <div class="box_row_100">
          广告组名称
        </div>
        <div class="box_row_100">
          广告数量
        </div>
      </div>
      <div class="">
        <div>
          广告统一发布
        </div>
        <div class="box_row rowAuto">
          <Button type="info">一号屏发布</Button>
          <Button type="success">二号屏发布</Button>
          <Button type="warning">三号屏发布</Button>
        </div>
      </div>
  </Card>
  </div>
</template>

<script>
  import demoImg from '@/assets/images/login-bg.jpg'

  export default {
    name: "AdCard",
    data() {
      return {
        demoImg
      }
    }
  }
</script>

<style lang="less">
  .CardItemSty {
    .ivu-card-head {
      padding: 0;
      img {
        width: 100%;
      }
    }
    /*.ivu-card-body {*/
    /*padding: 0;*/
    /*}*/
  }
</style>
