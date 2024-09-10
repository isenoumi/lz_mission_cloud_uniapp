<template>
  <view class="conetent">
    <view style="height: 20rpx"></view>
    <view class="order-number">
      <view v-if="details.order.status != 0"
        >订单编号：<text style="color: silver">{{
          details.order.orderNumber
        }}</text>
      </view>
      <view
        v-if="details.order.status == 0"
        style="
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-left: auto;
          color: red;
        "
        class="status">
        待发货</view
      >
      <view
        v-if="details.order.status == 1"
        style="color: #39d48f"
        class="status"
        >已发货</view
      >
      <view
        v-if="details.order.status == 2"
        style="color: silver"
        class="status"
        >已完成</view
      >
    </view>
    <view class="shop-details">
      <view>
        <image
          :src="details.orderItem.pic"
          style="width: 140rpx; height: 140rpx"
          mode="scaleToFill">
        </image>
      </view>
      <view style="margin-left: 20rpx">
        <view class="name">{{ details.orderItem.prodName }}</view>
        <view class="specifications"
          >{{ details.orderItem.skuName }}*{{ details.order.productNums }}</view
        >
      </view>
    </view>
    <view class="item">兑换积分：{{ details.orderItem.allPoints }}</view>
    <view class="item">运费：包邮</view>
    <view class="item">兑换时间：{{ details.orderItem.recTime }}</view>
    <view class="item" v-if="details.order.status != 0"
      >物流公司：{{ details.name || '' }}</view
    >
    <view class="item" v-if="details.order.status != 0"
      >物流单号：{{ details.order.dvyFlowId }}</view
    >
    <view class="amount"
      >合计兑换积分：{{ details.orderItem.allPoints }}积分</view
    >
    <view>
      <u-button text="联系客服" type="success"></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderNumber: '',
      details: {},
    }
  },
  onLoad(options) {
    console.log(options, 'xxxx')
    if (options.orderNumber) {
      this.orderNumber = options.orderNumber
      this.shopDetails()
    }
  },
  methods: {
    shopDetails() {
      uni.request({
        url: `https://lz.api.cestech.com.cn:8150/mission_b/p/order/pointRecordX`,
        data: {
          orderNumber: this.orderNumber,
        },
        // header: {
        // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM'
        // },
        method: 'GET',
        success: res => {
          this.details = res.data.result
        },
      })
    },
  },
}
</script>

<style lang="scss">
.u-button {
  background: #1dd193 !important;
  color: #fff !important;
}
.conetent {
  padding: 20rpx 40rpx;

  .order-number {
    font-size: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .status {
      font-size: 34rpx;
    }
  }

  .shop-details {
    margin: 25rpx 0;
    display: flex;
    align-items: center;
    color: silver;
    font-size: 32rpx;

    .name {
      color: #333;
      font-weight: 550;
    }

    .specifications {
      margin-top: 15rpx;
    }
  }

  .item {
    margin: 12rpx 0;
    color: silver;
    font-size: 30rpx;
  }

  .amount {
    display: flex;
    justify-content: flex-end;
    margin: 45rpx 0 60rpx 0;
    color: silver;
    font-size: 34rpx;
  }
}
</style>
