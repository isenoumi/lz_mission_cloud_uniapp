<template>
  <view>
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view></view>
    <view class="success">
      <view class="points" @click="toVolunteer">参与志愿者报名</view>
      <view class="image-box">
        <u--image
          :showLoading="true"
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/ccf9e86285fe4b52aba247ae4676234a.png"
          width="140px"
          height="140px">
        </u--image>
      </view>
      <u--text size="20" align="center" bold :text="title"></u--text>
      <!-- <u--text
      v-else
      size="15"
      align="center"
      bold
      text="恭喜!全部答对"></u--text> -->
      <!--  <u--text v-else size="15" align="center" bold text="恭喜!全部答对本次奖励积分+2"></u--text> -->
    </view>
    <!-- <view class="btnList">
      <view class="btnItem">
        <u-button
          text="参与志愿者报名"
          @click="toVolunteer"
          size="normal"
          type="primary"></u-button>
      </view>
    </view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
    }
  },
  onLoad(options) {
    this.title = options.title || '预约成功'
  },
  methods: {
    toVolunteer() {
      uni.redirectTo({ url: '/pageB/volunteer/index' })
    },
  },
}
</script>

<style lang="scss" scoped>
.success {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding-top: 100rpx; */
  .image-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background: #ffffff;
    border-radius: 50%;
    border: 20px solid #29ce8c;
    margin-bottom: 120rpx;
  }
}
.btnList {
  display: flex;
  justify-content: space-around;
  margin-top: 60rpx;
  .btnItem {
    width: 688rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #1dd193;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 40rpx;
  }
}
.points {
  font-size: 32rpx;
  color: #000;
  margin-bottom: 200rpx;
  /* text-shadow: 2rpx 2rpx 2rpx #000000; */
  font-weight: 600;
  width: 280rpx;
  margin-left: 450rpx;
  margin-top: 40rpx;
}
</style>
