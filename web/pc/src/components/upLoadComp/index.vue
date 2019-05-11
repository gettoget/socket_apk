<template>
  <div>
    <Upload
    ref="upload"
    :action="action"
    :show-upload-list="false"
    :default-file-list="defaultList"
    :on-success="handleSuccess"
    :on-error="handleError"
    :format="FILE_TYPE"
    :max-size="FILE_SIZE"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    multiple
    type="select">
      <!--@click="handleError"-->
    <div >
      <slot>
          <div style="display: inline-block;text-align: center;
          width: 58px;height:58px;line-height: 58px;">
            <img v-if="FlieUrl" :src="FlieUrl" width="100%" height="100%" alt="">
            <Icon v-else type="ios-cloud-upload" size="40" style="color: #3399ff"></Icon>
          </div>
      </slot>
    </div>
    </Upload>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      FlieUrl: {
        type: String,
        default: ''
      },
      VOICE: {
        type: Boolean,
        default: false
      },
      FILE_SIZE:{
        type:Number,
        default:1024*50
      },
      FILE_TYPE:{
        type:Array,
        default:()=>{
          return ['jpg','jpeg','png','mp4']
        }
      }
    },
    data() {
      return {
        // action:'http://mt.xxpt123.com:81/upload',
        action: 'http://180g1187v9.51mypc.cn:8090/ajaxapi/upload_file',
        headers:{
          withCredentials: false
        },
        defaultList: [
          // {
          //   'name': 'a42bdcc1178e62b4694c830f028db5c0',
          //   'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          // }
        ],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    created() {

    },
    methods: {
      handleSuccess(res, file) {
        alert("上传成功")
        this.$emit("handleSuccess",res.data.link)
        // this.$emit('handleSuccess', 'http://mt.xxpt123.com:81/img/temp/ce3c0ca016a44795bdce23141f994cce.jpg')

        console.log(res);
        console.log(file);
      },
      handleError(file) {
        alert("上传失败")
        // console.log(res);
        console.log(file);
        // this.$emit('handleSuccess', 'http://mt.xxpt123.com:81/img/temp/ce3c0ca016a44795bdce23141f994cce.jpg')
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件类型有误！！！',
          desc: '请上传文件格式为'+this.FILE_TYPE.join('、')
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '上传文件太大！',
          duration:8,
          desc: '文件:' + file.name + '不能超过'+this.FILE_SIZE+'KB'
        });
      },
    }
  }
</script>

<style scoped>

</style>
