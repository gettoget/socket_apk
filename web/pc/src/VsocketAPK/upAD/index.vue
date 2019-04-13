<style lang="less">
  @import "./index.less";
</style>
<template>
  <div class="updateAd box_col">
    <div class="pagerTit" @click="getClick()">
      广告上传
    </div>
    <div class="adTemp box_row">
      <div class="model1 modelMargin spet1" @click="getModel(1)">
        1
      </div>
      <div class="model2 modelMargin box_row" @click="getModel(2)">
        <div class="box_row_100 spet1">
          1
        </div>
        <div class="box_row_100 spet2">
          2
        </div>
      </div>
      <div class="model3 modelMargin box_col" @click="getModel(3)">
        <div class="box_col_100 spet1">
          1
        </div>
        <div class="box_col_100">
          <div class="box_row" style="height: 100%">
            <div class="box_row_100 spet2">
              2
            </div>
            <div class="box_row_100 spet3">
              3
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box_col_100" style="">
      <div>
        <Row :gutter="16">
          <Col span="4" v-for="(it,index) in file" :key="index">
              <div>
                第{{(index+1)}}展示屏
              </div>
              <div v-for="(ls,val) in it" :key="val">
                <div>
                  第{{ parseInt(val) +1}}板块
                </div>
                <div>
                  <img :src="ls" height="58px" alt="">
                </div>
              </div>
          </Col>
        </Row>
      </div>
      <up-file @handleSuccess="handleSuccess"></up-file>
      <!--<div class="settingAd">-->
        <!--<div class="title">-->
          <!--基础设置-->
        <!--</div>-->
        <!--<div class="box_row">-->
          <!--<div class="setItem">-->
            <!--<div class="itemTit">-->
              <!--切换时间-->
            <!--</div>-->
            <!--<div>-->
              <!--<Input value="" placeholder="Enter something..."/>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div>-->
            <!--<div class="itemTit">-->
              <!--发布时间-->
            <!--</div>-->
            <!--<div>-->
              <!--<DatePicker type="datetime" :options="DatePickerOptions" placeholder="Select date"-->
                          <!--style="width: 200px"></DatePicker>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="setItem">-->
            <!--<div class="itemTit">-->
              <!--有效时间-->
            <!--</div>-->
            <!--<div>-->
              <!--<InputNumber v-model="form.yxTime" :min="1"></InputNumber>-->
              <!--<Select v-model="form.dateTypSel" style="width: 70px">-->
                <!--<Option value="mm">分钟</Option>-->
                <!--<Option value="HH">小时</Option>-->
                <!--<Option value="DD">天</Option>-->
              <!--</Select>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import upFile from './comp/upFile'

  export default {
    name: "index",
    components: {upFile},
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
      }
    }
  }
</script>
