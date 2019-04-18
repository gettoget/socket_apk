<template>
  <div>
    <Modal
      v-model="modalShow"
      width="90%"
      :closable="false"
      :mask-closable="false"
      :scrollable="false"
    >
      <div slot="header">
        <h3>新建广告组</h3>
      </div>
      <div class="box_row" style="height: 140px">
        <div style="border-right: solid 2px #ededed">
          <load-file>
            <div style="height: 120px;width: 120px;
            text-align: center;line-height: 120px;cursor: pointer;">
              <Icon type="md-cloud-upload" size="80"/>
            </div>
          </load-file>
        </div>

        <div class="box_row_1auto">
          <div class="box_row_z">
            <div style="width: 100px;height: 100px;margin: 0 12px" v-for="it in 8">
              <img :src="demoImg" alt="" style="height: 100%;width: 100%">
            </div>

          </div>

        </div>
      </div>

      <div style="margin-top: 16px">
        <Form :model="formData" label-position="top" inline>
          <FormItem label="音频文件上传">
            <load-file>
              <Button type="dashed" icon="md-cloud-upload">点击上传</Button>
            </load-file>
          </FormItem>
          <FormItem label="播放时长/(秒)">
            <InputNumber :max="60" :min="3" v-model="formData.input1"></InputNumber>
          </FormItem>
          <FormItem label="广告有效期/(天)">
            <RadioGroup v-model="formData.input2" type="button">
              <Radio label="15">15天</Radio>
              <Radio label="30">30天</Radio>
              <Radio label="90">90天</Radio>
              <Radio label="180">180天</Radio>
              <Radio label="360">360天</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">

      </div>
    </Modal>
  </div>
</template>

<script>
  import loadFile from '@/components/upLoadComp'
  import demoImg from '@/assets/images/login-bg.jpg'

  export default {
    name: "addAdGroup",
    components: {loadFile},
    data() {
      return {
        demoImg,
        modalShow: true,
        formData: {
          input1: 3,
          input2: "15",
          input3: ''
        }
      }
    },
    watch: {
      "formData.input2": function (n, o) {
        console.log(n);
        console.log(o);
      }
    }
  }
</script>

<style scoped>

</style>
