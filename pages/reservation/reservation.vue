<template>
  <view>
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        :allTitle="false"
        leftIconColor="#fff"
        imageSrc="https://oms.cestech.com.cn/BkpKnowledge/img/286b4a1bb0f64d0286f488097a260707/蒙版组 8.png"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="在线预约" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="imageBox">
      <image
        class="image"
        src="https://oms.cestech.com.cn/BkpKnowledge/img/189ae98d00984447888471d00dd16e6f/1.png"
        mode="widthFix" />
      <image
        class="image"
        src="https://oms.cestech.com.cn/BkpKnowledge/img/975cb7723537476b9b5d3fa29697cc43/2.png"
        mode="widthFix" />
      <image
        class="image"
        src="https://oms.cestech.com.cn/BkpKnowledge/img/3e997a00c05d4149b97efdae38ba9b70/3.jpg"
        mode="widthFix" />
      <image
        class="image"
        src="https://oms.cestech.com.cn/BkpKnowledge/img/fd6c20e235aa466db2b5f957da813f18/4.png"
        mode="widthFix" />
    </view>
    <!-- <view>
      <view class="img">
        <view class="header" :style="'padding-top:' + titleHeight + 'px'">
          <view @click="go_to">
            <u-icon name="arrow-left" color="#fff" size="22" bold></u-icon>
          </view>
          <view class="name">在线预约</view>
        </view>
        <image class="imgs" src="http://cdn.cestech.com.cn/BkpKnowledge/img/db99ef4bd8ef4b29bb1ca7ab075e2fd1.jpg"
          mode="scaleToFill"></image>
      </view>
      <view class="box">

        <view class="mian">
          <view class="name">大件垃圾预约上门回收联系方式：</view>
          <view class="text">
            <view>1、江阳区 平台仅提供从业人员联系方式，具体价格根据楼层、物品大小自行商议 8585000(江阳区综合服务平台)</view>
            <view>2、纳溪区 鼎峰清道夫有限公司 600元一车(约5吨，费用包括搬运人员、驾驶员)数量不多三轮车拉为50元一车 18780383351(王贝雷)。</view>

          </view>

        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      titleHeight: 0,
    }
  },
  onLoad() {
    // #ifdef MP-WEIXIN
    this.getHeight()
    // this.answeredQuestionsAdded()
    // #endif
  },
  methods: {
    // 获取微信右上角胶囊高度
    getHeight() {
      let res = wx.getMenuButtonBoundingClientRect()
      this.titleHeight = res.top
      console.log(res.top)
    },
    go_to() {
      uni.navigateBack()
    },
  },
}
</script>

<style lang="scss">
.imageBox {
  width: 768rpx;
  .image {
    width: 768rpx;
  }
}
/* page {
  background: #4faa64;
} */

.img {
  width: 750rpx;
  height: 830rpx;
  position: relative;

  .header {
    position: fixed;
    display: flex;
    align-items: center;
    padding-left: 26rpx;
    font-size: 34rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    margin-top: 10rpx;

    .name {
      margin-left: 202rpx;
    }
  }

  .imgs {
    width: 100%;
    height: 830rpx;
  }
}

.box {
  width: 696rpx;
  height: 845rpx;
  background: #fafafa;
  border-radius: 20rpx;
  margin: 0 auto;
  position: absolute;
  top: 740rpx;
  left: 50%;
  margin-left: -348rpx;

  .title {
    width: 697rpx;
    height: 82rpx;
    background: #ffffff;
    border-radius: 13rpx 13rpx 0rpx 0rpx;
    padding: 30rpx 46rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 30rpx;
    font-weight: 500;
    color: #333333;

    .txt {
      width: 244rpx;
      display: block;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .order {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #29ce8c;
      }
    }

    .line {
      width: 1rpx;
      height: 40rpx;
      background: #cccccc;
      opacity: 0.4;
      border-radius: 1rpx;
    }
  }

  .mian {
    padding: 36rpx 39rpx 51rpx 39rpx;

    .name {
      font-size: 40rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #282828;
    }

    .text {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #282828;
      margin-top: 44rpx;
      line-height: 50rpx;

      .gz {
        margin-top: 20rpx;
        margin-bottom: 20rpx;
      }
    }

    .btn {
      width: 625rpx;
      height: 100rpx;
      background: #29ce8c;
      border-radius: 20rpx;
      text-align: center;
      line-height: 100rpx;
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 800;
      color: #ffffff;
      margin-top: 160rpx;
    }
  }
}
</style>
