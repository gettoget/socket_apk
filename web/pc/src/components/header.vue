<template>
  <div class="pagerTitSty">
    <div class="tit">
      {{title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "pagerheader",
    props: {
      title: {
        type: String,
        default: '页面名称'
      },
      iconname: {
        type: String,
        default: 'ios-football'
      }
    }
  }
</script>

<style lang="less">
  .pagerTitSty {
    border-left:solid 4px #19be6b;
    padding:3px 0.2rem;
    border-radius: 2px;
    .tit{
      font-size: 22px;
      font-weight: 600;
    }

  }
</style>
