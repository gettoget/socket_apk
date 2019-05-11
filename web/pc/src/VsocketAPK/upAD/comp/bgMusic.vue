<template>
  <div>
    <Modal
      v-model="modalShow"
      :closable="false"
      :mask-closable="false"
      :scrollable="false">
      <div slot="header" class="box_row colBottom">
        <h2>{{$parent.groupItem.group_name}}</h2>_<h3> 背景音乐设置</h3>
      </div>
      <div>
        <Form>
          <FormItem label="广告组名称">
            <div style="position: relative">
              <Input type="text" :disabled="groupName" v-model="params.group_name" placeholder="广告组名称" />
              <Button  style="position: absolute;right: 0;bottom: 0" :type="groupName?'info':'success'" @click="groupName = !groupName">
                <span v-if="groupName">编辑</span>
                <span v-else>完成</span>
              </Button>
            </div>
          </FormItem>
          <FormItem label="背景音乐">
            <div style="position: relative">
              <Input class="box_row_100" disabled="disabled" type="text" v-model="params.audio_name" placeholder="背景音乐" />
              <div style="position: absolute;right: 0;bottom: 0">
                <load-file  :FILE_SIZE="2048" :FILE_TYPE="['mp3']" @handleSuccess="handleSuccess">
                  <Button type="info">点击上传音频文件</Button>
                </load-file>
              </div>
            </div>
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
  import loadFile from '@/components/upLoadComp'

  export default {
    name: "bgMusic",
    components: {loadFile},
    data() {
      return {
        modalShow: true,
        // audio_link
        groupName:true,
        params:{
          group_id:'',
          group_name:'',
          audio_name:''
        }
      }
    },
    created(){
      let a = JSON.parse(JSON.stringify(this.$parent.groupItem))
      this.params.group_id = a.id
      this.params.group_name = a.group_name
      this.params.audio_name = a.audio_link
    },
    methods: {
      handleSuccess(url){
        this.params.audio_name = url
      },
      upSave() {

        this.$http.post('/admin/update_group',this.params).then(res => {
          if(res.success){
            this.cancel()
            this.$parent.getDataList()
          }
        }).catch(err => {

        })
      },
      cancel(){
        this.$parent.compName = ''
      }
    }
  }
</script>

<style scoped>

</style>
