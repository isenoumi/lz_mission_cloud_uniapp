<template>
  <view :style="{marginTop:hig+'px'}">
    <web-view :src="src"></web-view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        hig: '60',
        src: 'https://ic.cestech.com.cn:9063/#/noticeBoardTable',
        // src: 'http://192.168.100.60:3000/#/noticeBoardTable',
        id: '',
      }
    },
    onLoad(option) {
      // TODO qrcode
      console.log(option, 'option')
      //获取Location对象的search属性值,location对象中search属性返回的是URL问号之后的那部分（包括问号）
      if (option.q) {
        this.id = decodeURIComponent(option.q)?.split('id=')[1]
        this.src += `?id=${this.id}`
      } else if (option.id) {
        this.src += `?id=${option.id}`
      }
      console.log(this.src)
    },
    methods: {},
  }
</script>

<style>
</style>