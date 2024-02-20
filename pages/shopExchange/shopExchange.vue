<template>
  <view>
    <view class="img">
      <image class="shoppingImg" src="http://cdn.cestech.com.cn/BkpKnowledge/img/09c3d396003641d9b1faaf1ed34881ee.jpg"
        mode="aspectFill"></image>
    </view>

    <view class="middle">
      <view class="title">
        345积分 <span>每日限200</span>
      </view>

      <view class="name">
        垃圾袋
      </view>
      <view class="exchangeNum">
        月兑换120
      </view>
    </view>


    <view class="bottom">
      <view class="btn">
        暂未开放
      </view>
      <!--      <view class="bottomTitle">
        兑换条件
      </view>
      <view class="text">
        兑换次数 同一用户每月限兑换一次 <br>
        兑换须知 虚拟权益兑换后不可退换
      </view> -->
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .img {
    .shoppingImg {
      width: 750rpx;
      height: 700rpx;
    }

    width: 750rpx;
    height: 700rpx;
  }

  .middle {
    padding: 30rpx;

    .title {
      color: red;
      font-size: 40rpx;

      span {
        margin-left: 30rpx;
        font-size: 24rpx;
        display: inline-block;
        width: 140rpx;
        height: 36rpx;
        line-height: 36rpx;
        text-align: center;
        border-radius: 10rpx;
        background-color: #bfa;
      }
    }

    .name {
      margin: 40rpx 0 10rpx;
      font-size: 40rpx;
      font-weight: 700;
    }

    .exchangeNum {
      margin-top: -5rpx;
      font-size: 26rpx;
      color: #333333;
    }
  }

  .bottom {
    .bottomTitle {
      font-size: 40rpx;
      margin: 30rpx 0;
    }

    .text {
      font-size: 32rpx;
      color: #333333;
    }
  }

  .btn {
    margin: 100rpx auto;
    width: 400rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    text-align: center;
    background: #A0DEC5;
    border-radius: 20rpx;
  }
</style>