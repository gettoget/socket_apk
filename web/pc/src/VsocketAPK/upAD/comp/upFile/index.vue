<template>
  <!--<div style="width: 160px;text-align: center" >-->
  <div class="box_row" style="text-align: center" >

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
    <div v-if="upbutton" style="line-height: 50px">
      <div>
        <Button type="primary" size="small" long @click="handleSuccessEmit">提交</Button>
      </div>
      <div>
        <load-file :VOICE="true"  @handleSuccess="(url)=>{handleSuccess(url,'VOICE')}">
          <Button v-if="!upVOICE" type="primary" size="small" long @click="">上传音频</Button>
          <Button v-else type="success" size="small" long @click="">上传完成</Button>
        </load-file>
      </div>
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
        upbutton: false,
        upVOICE:false
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
        if(model=='VOICE' && this.upImg['VOICE']){
          this.upVOICE = true
        }
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
        this.upVOICE = false
      },
      handleSuccessEmit() {
        this.$emit('handleSuccess', this.upImg)
        this.reset()
      }
    }
  }
</script>

<style lang="less">
  .upLineBox{
    border: solid 1px #ededed;
    box-shadow: 5px 5px 5px #ededed;
    margin: 8px 8px 8px 0;
  }
</style>
