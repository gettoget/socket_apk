<template>
  <div>
    <Modal
      v-model="modalShow"
      width="90%"
      :closable="false"
      :mask-closable="false"
      :scrollable="false">
      <div slot="header">
        <h3>新建广告组 {{$parent.groupItem.id}}</h3>
      </div>

      <!--<div class="box_row colBottom" style="margin-bottom: 16px">-->
        <!--<div style="margin-right: 16px">-->
          <!--<h4>滚动文字:</h4>-->
        <!--</div>-->
        <!--<div class="box_row_100">-->
          <!--<Input v-model="GDText" size="small" placeholder="滚动文字"/>-->
        <!--</div>-->
      <!--</div>-->

      <div class="box_row" style="height: 300px">
        <div style="border-right: solid 2px #ededed">
          <div>
            <h4>媒体文件上传:</h4>
          </div>
          <load-file @handleSuccess="(url)=>{formData.file_name = url}">
            <div style="height: 140px;width: 140px;margin: 60px 0 80px;
            text-align: center;line-height: 140px;cursor: pointer;">
              <img v-if="formData.file_name" :src="formData.file_name" style="width: 100%" alt="">
              <Icon v-else type="md-cloud-upload" size="80"/>
            </div>
          </load-file>
        </div>

        <div class="box_row_1auto">
          <div class="box_row_z" :style="{width:190*adList.length+'px'}">
            <div style="width: 160px;height: 160px;margin: 0 15px" v-for="(it,index) in adList" :key="index">
              <!--<div class="box_row">-->
                <!--<div>-->
                  <!--音频文件：-->
                <!--</div>-->
                <!--<div class="box_row_100 textshowLine">-->
                  <!--{{it.raUrl}}-->
                <!--</div>-->
              <!--</div>-->
              <img :src="it.file_name" alt="" style="height: 100%;width: 100%">
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

      // {"link":"http://link1",  0  tu  1shi 2 yinpin
        // "media_type":1,
        // "play_time":11,   0不在线
        // "expire_days":30}

      // {"file_name":"file_name1",
        // "media_type":1,
        // "play_time":11,
        // "expire_days":30}
        adList:[
          // {
          //   file_name:demoImg,
          //   media_type:'0',
          //   play_time:3,
          //   expire_days:180,
          // },
          // {
          //   file_name:demoImg,
          //   media_type:'0',
          //   play_time:3,
          //   expire_days:180,
          // },
          // {
          //   file_name:demoImg,
          //   media_type:'0',
          //   play_time:3,
          //   expire_days:180,
          // }
        ],
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
        console.log(o);
      }
    },
    created(){

    },
    methods:{
      upMess(){
        this.adList.splice(0,0,this.formData)
        this.formData = {
          file_name:'',
          media_type:'0',
          play_time: 3,
          expire_days: "15"
        }
      },
      save(){
        let parms = {}
        parms.group_id = this.$parent.groupItem.id
        parms.media_lists = JSON.stringify(this.adList)
        this.$http.post("/admin/group_media",parms).then(res=>{

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
