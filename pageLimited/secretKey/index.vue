<template>
  <view>
    <view class="title">请输入企业管理责任人电话号码</view>
    <view class="input">
      <u--input placeholder="请输入企业管理责任人电话号码" border="surround" v-model="password" clearable type="password"></u--input>
    </view>

    <view class="btn">
      <u-button type="primary" :loading="btnLoading" text="提交" @click="submit" :showCancelButton="true">
      </u-button>
    </view>
  </view>

</template>

<script>
  import { login } from './api'
  export default {
    props: {},
    computed: {},
    data() {
      return {
        image: uni.$u.props.noNetwork.image,
        password: '',
        btnLoading: false,
      }
    },
    onLoad(options) {
      if (options.id) {
        this.limitedId = options.id
      }
    },
    methods: {
      submit() {
        this.btnLoading = true
        login({ phone: this.password })
          .then(res => {
            uni.setStorageSync('enterprise', res.data)
            if (this.limitedId) {
              uni.navigateTo({ url: '/pageLimited/homeworkLedger/index?limitedId=' + this.limitedId })
            } else this.toIndex()
          })
          .catch(({ msg }) => {
            uni.showToast({
              title: '请输入正确的企业管理责任人电话号码',
              icon: 'none',
              mask: true,
            })
          })
          .finally(() => {
            this.btnLoading = false
          })
      },
      toIndex() {
        uni.navigateTo({ url: '/pageLimited/index/index' })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    text-align: center;
    font-size: 48rpx;
    font-weight: 600;
    margin: 120rpx auto 220rpx;
  }
  .input {
    padding: 48rpx;
  }
  .btn {
    width: 648rpx;
    height: 80rpx;
    background: #1dd193;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 520rpx auto 0;
    line-height: 80rpx;
    font-weight: 400;
    font-size: 32rpx;
    color: #ffffff;
  }
</style>
