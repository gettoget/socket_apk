<template>
  <div style="width: 100px;text-align: center">
    <div class="upLineBox" v-if="Admodel>0">
      <div class="Tit">
        屏幕一文件上传
      </div>
      <load-file :FlieUrl="upImg[0]" @handleSuccess="(url)=>{handleSuccess(url,0)}"></load-file>
    </div>
    <div class="upLineBox" v-if="Admodel>1">
      <div class="Tit">
        屏幕二文件上传
      </div>
      <load-file :FlieUrl="upImg[1]" @handleSuccess="(url)=>{handleSuccess(url,1)}"></load-file>
    </div>
    <div class="upLineBox" v-if="Admodel>2">
      <div class="Tit">
        屏幕二文件上传
      </div>
      <load-file :FlieUrl="upImg[2]" @handleSuccess="(url)=>{handleSuccess(url,2)}"></load-file>
    </div>
    <div v-if="upbutton">
      <Button type="primary" long @click="handleSuccessEmit">SUBMIT</Button>
    </div>
  </div>
</template>

<script>
  import loadFile from '@/components/upLoadComp'

  export default {
    name: "index",
    components: {loadFile},
    computed: {
      Admodel: function () {
        return this.$parent.Admodel
      }
    },
    data() {
      return {
        file: [],
        upImg: {
          // 0: '',
          // 1: '',
          // 2: ''
        },
        upbutton: false
      }
    },
    watch: {
      Admodel: function (n, o) {
        this.$parent.file = []
        this.reset()
      }
    },
    created() {
    },
    methods: {
      handleSuccess(url, model) {
        this.file[model] = url
        this.upImg[model] = url
        console.log(this.upImg);
        if (this.file.length == this.Admodel && this.file.length > 0) {
          this.upbutton = true
        } else {
          this.upbutton = false
        }
      },
      reset() {
        /**
         * 根据上传组建的数量定义新的接收
         *    例：如果上传文件的组件数量为 2
         *    那么通过方法 重新 初始化 新的接收对象为
         *    {
         *      0:'',
         *      1:''
         *    }
         * */
        let newUpImg = {}
        for(let i=0;i<this.Admodel;i++){
          newUpImg[i] = ''
        }
        this.upImg = newUpImg
        this.file=[]
        this.upbutton = false
      },
      handleSuccessEmit() {
        this.$emit('handleSuccess', this.upImg)
        this.reset()
      }
    }
  }
</script>

<style scoped>

</style>
