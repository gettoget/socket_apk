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
      <!--<up-file @handleSuccess="handleSuccess"></up-file>-->
  </div>
</template>

<script>
  import upFile from './comp/upFile'
  import adCard from './comp/AdCard'

  export default {
    name: "index",
    components: {upFile,adCard},
    data() {
      return {
        Admodel: 0,
        DatePickerOptions: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now();
          }
        },
        file: [],
        form: {
          yxTime: 1,
          dateTypSel: 'HH',
        }
      }
    },
    watch: {
      "form.yxTime": function (n, o) {
        console.log(n);
        console.log(o);
        console.log(this.form.yxTime);
        if (n < 1) {
          this.$Message.warning('有效时间不能小于1！！！')
          this.form.yxTime = ''
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      getClick() {
      },
      getModel(val) {
        this.Admodel = val
      },
      handleSuccess(flieList) {
        this.file.push(flieList)
      },
      itenRemove(index) {
        this.file.splice(index, 1)
      }
    }
  }
</script>
