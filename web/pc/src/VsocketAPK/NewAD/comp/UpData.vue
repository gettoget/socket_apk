<template>
  <div>
    <Modal
      v-model="modalVal"
      :mask-closable="false"
      title="信息维护"
      @on-visible-change="visible">
      <Form ref="formValidate" :model="formData" :rules="ruleValidate" label-position="top">
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="店铺名称" prop="shop_name">
              <Input v-model="formData.shop_name" placeholder="请填写店铺名称"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="负责人" prop="manager_name">
              <Input v-model="formData.manager_name" placeholder="请填写负责人姓名"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="负责人电话">
              <Input v-model="formData.phone" placeholder="负责人电话"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别">
              <Select v-model="formData.gender">
                <Option value="F" >先生</Option>
                <Option value="M" >女士</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="所属分区">
              <Input v-model="formData.tag1" placeholder="所属分区"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="所属类型" >
              <Input v-model="formData.tag2" placeholder="所属类型"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="24">
            <FormItem label="备注信息">
              <Input v-model="formData.tag3" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" placeholder="备注信息" />
            </FormItem>
          </Col>
        </Row>
        <FormItem label="分屏模式" prop="split_type">
          <RadioGroup size="large" v-model="formData.split_type">
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
        </FormItem>
      </Form>
      <div slot="footer" class="box_row rowRight">
        <Button @click="cance">取消</Button>
        <Button type="info" @click="save('formValidate')">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import scrn1 from '@/components/splitModel/scrn1'
  import scrn2 from '@/components/splitModel/scrn2'
  import scrn3 from '@/components/splitModel/scrn3'

  export default {
    name: "UpData",
    components: {scrn1, scrn2, scrn3},
    props:{
      itemMess:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    data(){
      return {
        modalVal:true,
        formData:{
          device_id:'',//设备id
          split_type:'',//分频模式
          shop_name:'',//店铺名称
          manager_name:'',//负责人
          phone:'',
          gender:'',
          tag1:'',
          tag2:'',
          tag3:''
        },
        ruleValidate: {
          shop_name:[
            { required: true, message: '店铺名称不能为空', trigger: 'blur' }
          ],
          manager_name:[
            { required: true, message: '负责人不能为空', trigger: 'blur' }
          ],
          split_type:[
            { required: true, message: '请选择分屏模式', trigger: 'change' }
          ]
        }
      }
    },
    created(){
      let a = JSON.parse(JSON.stringify(this.itemMess))
      this.formData.device_id = a.id
      this.formData.split_type = a.split_type.toString()
      this.formData.shop_name = a.shop_name
      this.formData.manager_name = a.manager_name
      this.formData.phone = a.phone
      this.formData.gender = a.gender
    },
    methods:{
      save(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('/admin/update_device',this.formData).then(res=>{
              if(res.success){
                this.$Message.success('数据保存成功');
                this.cance()
              }
            }).catch(err=>{})
          }
        })
      },
      visible(val) {
        setTimeout(() => {
          this.cance()
        }, 30)
      },
      cance(){
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>
