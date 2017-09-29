/**
* Created by CHENRC2 on 2017-8-29.
*/
<template>
  <section class="container">
    <iframe class="faq" id="faq" :src="faqSrc"></iframe>
  </section>
</template>
<style lang="less" scoped>
  .container{
    .faq{
      width:100%;
      height:99%;
    }
  }
</style>
<script>
  import { SYSTEM_FAQ }from '../common/dict.js';
  export default{
    data() {
      return {
        faqSrc:SYSTEM_FAQ[this.$route.params.system.toLowerCase()]
      }
    }
  }
</script>
