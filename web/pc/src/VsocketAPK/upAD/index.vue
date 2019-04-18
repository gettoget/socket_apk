<style lang="less">
  @import "./index.less";
</style>
<template>
  <div class="updateAd box_col">
    <div class="pagerTit box_row">
      <pager-tit title="广告管理"></pager-tit>
      <div class="box_row_100">
        <div class="box_row rowRight colCenter">
          <Button class="itMargin" type="primary">新建广告</Button>
        </div>
      </div>
    </div>
    <div class="box_col_autoY">
      <Row :gutter="16">
        <Col span="6" v-for="(it) in 5">
          <ad-card></ad-card>
        </Col>
      </Row>
    </div>
    <component :is="compName"></component>
  </div>
</template>

<script>
  import adCard from './comp/AdCard'

  import adGroup from './comp/addAdGroup'
  export default {
    name: "index",
    components: {adCard,adGroup},
    data() {
      return {//adGroup
        compName:"adGroup"
      }
    },
    watch: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
