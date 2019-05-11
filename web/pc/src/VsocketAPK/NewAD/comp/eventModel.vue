<template>
  <div>
    <Modal
      v-model="modalVal"
      :mask-closable="false"
      title="请选择分屏模式"
      @on-visible-change="visible"
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
    components: {scrn1, scrn2, scrn3},
    props: {
      modelType: {
        type: String,
        default: 'scrn'
      }
    },
    data() {
      return {
        modalVal: true
      }
    },
    methods: {
      visible(val) {
        console.log(val);
        setTimeout(() => {
          this.$parent.compName = ""
        }, 30)
      }
    }
  }
</script>

<style scoped>

</style>
