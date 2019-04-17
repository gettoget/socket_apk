<template>
  <div class="CardItemSty" style="margin-bottom: 16px">
    <Card>
      <div slot="title">
        <img :src="demoImg" alt="">
      </div>
      <div>
        <div>
          广告组名称
        </div>
        <div>
          广告数量
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import demoImg from '@/assets/images/login-bg.jpg'
  export default {
    name: "AdCard",
    data(){
      return {
        demoImg
      }
    }
  }
</script>

<style lang="less">
  .CardItemSty {
    .ivu-card-head{
      padding: 0;
      img{
        width: 100%;
      }
    }
    /*.ivu-card-body {*/
      /*padding: 0;*/
    /*}*/
  }
</style>
