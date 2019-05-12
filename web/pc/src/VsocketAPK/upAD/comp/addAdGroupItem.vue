<template>
  <div>
    <Modal
      v-model="modalShow"
      width="90%"
      :closable="false"
      :mask-closable="false"
      :scrollable="false">
      <div slot="header">
        <h3>广告组编辑</h3>
      </div>

      <div class="box_row" style="height: 300px">
        <div style="border-right: solid 2px #ededed">
          <div>
            <h4>媒体文件上传:</h4>
          </div>
          <load-file :FILE_SIZE="1024" @handleSuccess="handleSuccess">
            <div style="height: 140px;width: 140px;margin: 60px 0 80px;
            text-align: center;line-height: 140px;cursor: pointer;">
              <img v-if="formData.media_type == '0' && formData.file_name"
                   :src="httpLink+formData.file_name" style="width: 100%" alt="">
              <video v-else-if="formData.media_type == '1' && formData.file_name"
                     :src="httpLink+formData.file_name"  style="width: 100%"></video>

              <Icon v-else type="md-cloud-upload" size="80"/>
            </div>
          </load-file>
        </div>

        <div class="box_row_1auto">
          <div class="box_row_z" :style="{width:190*(adList.length+media_list.length)+'px'}">

            <div style="width: 160px;height: 160px;margin: 0 15px;position: relative" v-for="(it,index) in adList" :key="index">
              <div style="position: absolute;top: 0;right: 0;z-index: 100;cursor: pointer">
                <Icon type="md-close-circle" size="28" color="#ed4014"
                      @click.native="removeItem(it,index)"/>
              </div>
              <img v-if="it.media_type == '0'" :src="httpLink+it.file_name" alt="" style="height: 100%;width: 100%">
              <video v-if="it.media_type == '1'" :src="httpLink+it.file_name"  style="height: 100%;width: 100%"></video>
              <div>
                播放时长：{{it.play_time}}(秒)
              </div>
              <div>
                广告有效期：{{it.expire_days}}(天)
              </div>
            </div>

            <div v-if="media_list.length>0" style="width: 160px;height: 160px;margin: 0 15px;position: relative" v-for="(it,index) in media_list" :key="index">
              <div style="position: absolute;top: 0;right: 0;z-index: 100;cursor: pointer">
                <Icon type="md-close-circle" size="28" color="#ed4014"
                      @click.native="removeItem(it,index)"/>
              </div>
              <img v-if="it.media_type == '0'" :src="it.link" alt="" style="height: 100%;width: 100%">
              <video v-if="it.media_type == '1'" :src="it.link"  style="height: 100%;width: 100%"></video>
              <div>
                播放时长：{{it.play_time}}(秒)
              </div>
              <div>
                广告有效期：{{it.expire_days}}(天)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 16px">
        <Form :model="formData" label-position="top" inline>
          <!--<FormItem label="音频文件上传">-->
            <!--<load-file  @handleSuccess="(url)=>{formData.raUrl = url}">-->
              <!--<Button v-if="formData.raUrl" type="info" icon="md-cloud-upload">音频以上传,点击重新上传</Button>-->
              <!--<Button v-else type="text" icon="md-cloud-upload">点击上传</Button>-->
            <!--</load-file>-->
          <!--</FormItem>-->
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
          <FormItem label="操作">
            <Button type="success" @click="upMess">
              上传
            </Button>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button size="large" @click="save">完成</Button>
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
    props:{
      groupItem:{
        type:Object,
        default:{
          id:''
        }
      }
    },
    data() {
      return {
        demoImg,
        modalShow: true,
        GDText:"",
      // {"file_name":"file_name1", 0  tu  1shi 2 yinpin
        // "media_type":1,
        // "play_time":11,
        // "expire_days":30}
        httpLink:'',
        adList:[
          // {
          //   file_name:'https://i.loli.net/2017/08/21/599a521472424.jpg',
          //   media_type:'0',
          //   play_time:3,
          //   expire_days:180,
          // }
        ],
        media_list:[],
        formData: {
          file_name:'',
          media_type:'0',//....
          play_time: 3,
          expire_days: "15"
        }
      }
    },
    watch: {
      "formData.input2": function (n, o) {
        console.log(n);
      }
    },
    created(){
      console.log('xing');
      console.log(this.$parent.groupItem);
      this.media_list = this.$parent.groupItem.media_list
    },
    methods:{
      handleSuccess(file){
        this.httpLink = file.http_link
        this.formData.file_name = file.file_name
        if(this.formData.file_name.split('.')[this.formData.file_name.split('.').length-1]=='mp4'){
          this.formData.media_type = '1'
        }
      },
      upMess(){

        this.adList.splice(0,0,this.formData)
        this.formData = {
          file_name:'',
          media_type:'0',
          play_time: 3,
          expire_days: "15"
        }
      },
      removeItem(it,index){
        if(it.id){
          this.$http.post('/admin/delete_media',{media_id:it.id}).then(res=>{
            if(res.success){
              this.media_list.splice(index,1)
            }
          }).catch(err=>{

          })
        }else {
          this.adList.splice(index,1)
        }
      },
      save(){
        let parms = {}
        parms.group_id = this.$parent.groupItem.id
        console.log(this.adList.length);
        parms.media_lists = JSON.stringify(this.adList)
        this.$http.post("/admin/group_media",parms).then(res=>{
          if(res.success){
            this.cancel()
            this.$parent.getDataList()
          }
        }).catch(err=>{})
      },
      cancel(){
        this.$parent.compName = ''
      }
    }
  }
</script>

<style scoped>

</style>
