<template>
  <div>
    <Modal
      v-model="modalShow"
      :mask-closable="false"
      title="广告播放时长维护"
      @on-visible-change="visible">

      <div>
        <Form :model="formData" label-position="top">
          <FormItem label="播放时长/(秒)_最少3秒_最多60秒">
            <InputNumber :min="1" v-model="formData.play_time" style="width: 100%"></InputNumber>
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
    props:{
      media_ids:{
        type:Array,
        default:()=>{
          return []
        }
      }
    },
    data() {
      return {
        modalShow: true,
        formData:{
          media_ids:[],
          play_time:10,
          expire_days:0
        }
      }
    },
    created() {
      if(this.media_ids){
        this.formData.media_ids = JSON.stringify(this.media_ids)
      }else {
        this.cancel()
      }
    },
    methods: {
      upSave(){
        this.$http.post('/admin/update_expire_media',this.formData).then(res=>{
          if(res.success){
            this.$Message.success('续期成功');
            this.cancel()
          }
        }).catch(err=>{})
      },
      cancel() {
        this.$emit('close')
      },
      visible(val) {
          this.cancel()
        // setTimeout(() => {
        // },30)
      }
    }
  }
</script>

<style scoped>

</style>
