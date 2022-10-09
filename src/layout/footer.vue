<!-- 页脚 -->
<template>
  <div class="ele-text-center" style="padding: 16px 0;">
    
    <div class="ele-text-secondary" style="margin-top: 8px;">
     {{sysconfig.site_copyright}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EleFooter',
  data() {
    return {
    sysconfig:{}
    }
  },
  created(){
    
    this.sysconfig =JSON.parse(window.localStorage.getItem('sysconfig'))

  }
}

</script>
