<template>
  <div>
    <Modal
      v-model="modalShow"
      :mask-closable="false"
      title="广告续费延期"
      @on-visible-change="visible">

      <div>
        <Form :model="formData" label-position="top" inline>
          <FormItem label="播放时长/(秒)_最少3秒_最多60秒">
            <InputNumber :max="60" :min="3" v-model="formData.play_time" style="width: 100%"></InputNumber>
          </FormItem>
          <FormItem label="广告有效期/(天)">
            <RadioGroup v-model="formData.expire_days" type="button">
              <Radio label="4">4天</Radio>
              <Radio label="15">15天</Radio>
              <Radio label="30">30天</Radio>
              <Radio label="90">90天</Radio>
              <Radio label="180">180天</Radio>
              <Radio label="360">360天</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>

      <div slot="footer" class="box_row rowRight">
        <Button @click="cancel">取消</Button>
        <Button @click="upSave" type="info">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "xf",
    data() {
      return {
        modalShow: true,
        formData:{
          media_id:"",
          play_time:3,
          expire_days:""
        }
      }
    },
    created() {
      if(this.$parent.media_id){
        this.formData.media_id = this.$parent.media_id
      }else {
        // this.cancel()
      }
    },
    methods: {
      upSave(){

      },
      cancel() {
        this.$parent.compName = ""
      },
      visible(val) {
        console.log(val);
        setTimeout(() => {
          this.cance()
        }, 30)
      }
    }
  }
</script>

<style scoped>

</style>
