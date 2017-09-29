/**
* Created by CHENRC2 on 2017-8-31.
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
  export default{
    data() {
      return {
        faqSrc:"http://mconsole.midea.net/oss/index.html"
      }
    }
  }
</script>
