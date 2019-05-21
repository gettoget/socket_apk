<template>
  <div>
    <Modal
      v-model="modalVal"
      :mask-closable="false"
      title="统一分屏管理"
      @on-visible-change="visible"
    >
      <div>
        <RadioGroup size="large" v-model="split_type">
          <Radio label="1">
            <scrn1></scrn1>
          </Radio>
          <Radio label="2">
            <scrn2></scrn2>
          </Radio>
          <Radio label="3">
            <scrn3></scrn3>
          </Radio>
        </RadioGroup>
      </div>
      <!--<div class="scrnModel box_row rowAuto">-->
        <!--<scrn1></scrn1>-->
        <!--<scrn2></scrn2>-->
        <!--<scrn3></scrn3>-->
      <!--</div>-->
      <div slot="footer" class="box_row rowRight">
        <Button type="info" @click="save">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import scrn1 from '@/components/splitModel/scrn1'
  import scrn2 from '@/components/splitModel/scrn2'
  import scrn3 from '@/components/splitModel/scrn3'

  export default {
    name: "eventModel",
    components: {scrn1, scrn2, scrn3},
    data() {
      return {
        modalVal: true,
        split_type:'1'
      }
    },
    methods: {
      save(){
        this.$http.post('/admin/update_device_split',{split_type:this.split_type}).then(res=>{
          if(res.success){
            this.cance()
          }
        }).catch(err=>{})
      },
      cance(){
        this.$emit('close')
      },
      visible(val) {
        setTimeout(() => {
          this.cance()
        }, 30)
      }
    }
  }
</script>

<style scoped>

</style>
