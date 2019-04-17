<template>
  <div>
    <Modal
      v-model="modalVal"
      :mask-closable="false"
      :closable="false"
      title="Common Modal dialog box title"
    >
      <div class="scrnModel box_row rowAuto">
        <scrn1></scrn1>
        <scrn2></scrn2>
        <scrn3></scrn3>
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
    components:{scrn1,scrn2,scrn3},
    props:{
      modelType:{
        type:String,
        default:'scrn'
      }
    },
    data() {
      return {
        modalVal: true
      }
    }
  }
</script>

<style scoped>

</style>
