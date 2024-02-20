<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="分类查询" color="#fff"></u--text>
        </view>
      </navbar>
    </view>

    <view class="search">
      <u--input placeholder="请输入内容" border="surround" v-model="value" shape='circle' @change='handleSearch'></u--input>
      <!-- <input placeholder="请输入内容" border="surround" v-model="value" shape='circle' @change='handleSearch'></input> -->
      <view class="btn" @click="handleSearch">搜索</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        value: '',

      }
    },
    methods: {
      handleSearch() {
        console.log(this.value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    width: 85%;
    margin: 40rpx auto;
    display: flex;
    justify-content: left;

    .btn {
      width: 140rpx;
      border-radius: 40rpx;
      background-color: #59ce97;
      text-align: center;
      color: #fff;
      line-height: 76rpx;
      margin-left: 8rpx;
      font-size: 28rpx;
    }
  }
</style>