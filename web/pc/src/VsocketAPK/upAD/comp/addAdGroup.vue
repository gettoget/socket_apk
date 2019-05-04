<template>
  <div>
    <Modal
      v-model="modalShow"
      :closable="false"
      :mask-closable="false"
      :scrollable="false">
      <div slot="header">
        <h3>新建广告组</h3>
      </div>
      <div>
        <Input v-model="group_name" size="large" placeholder="请输入新建广告组名称" />
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button @click="addGroup" type="success" :disabled="group_name==''">创建</Button>
      </div>
    </Modal>
  </div>
</template>

<script>

  export default {
    name: "addAdGroup",
    components: {},
    data() {
      return {
        modalShow:true,
        group_name:''
      }
    },
    created(){

    },
    methods:{
      addGroup(){
        var v = this
        this.$http.post('/admin/group',{group_name:this.group_name}).then(res=>{
          if (res.success){
            debugger
            v.$parent.getDataList()
            v.cancel()
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
