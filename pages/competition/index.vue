<template>
  <view>
    <view>
      <view class="img">
        <view class="header" :style="'padding-top:' + titleHeight + 'px'">
          <view @click="go_to">
            <u-icon name="arrow-left" color="#fff" size="22" bold></u-icon>
          </view>
          <view class="name">答题竞赛</view>
        </view>
        <image
          class="imgs"
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/a3c2bf883a834fecaafeef686e245890.jpg"
          mode="scaleToFill"></image>
      </view>
      <view class="box">
        <view class="title">
          <view class="txt"
            ><text>答题次数：</text
            ><text class="order">{{ numberExercises }}次</text></view
          >
          <view class="line"></view>
          <view class="txt"
            ><text>已做题：</text
            ><text class="order">{{ numberAnswers }}道</text></view
          >
        </view>
        <view class="mian">
          <view class="name">答题规则提示：</view>
          <view class="text">
            <view
              >1、每开始进行答题时，随机获取5道题进行答题，当全部答题完成时，系统则给与积分作为答题竞赛奖励。</view
            >
            <view class="gz"
              >2、中途答题出错时，可选择重新开始以及继续答题，如果选择继续答题时，当题答完题时则没有对应的积分奖励。</view
            >
            <view
              >3、重新答题时，可重新随机获取5道题给到用户进行答题，这时如果全部答对，可获得对应的积分奖励。</view
            >
          </view>
          <view class="btn" @click="start">开始答题</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { isLogin } from '@/util/common'
export default {
  data() {
    return {
      titleHeight: 0,
      numberExercises: 0,
      numberAnswers: 0,
    }
  },
  onShow() {
    // #ifdef MP-WEIXIN
    this.getHeight()
    this.getNumTimes()
    // this.answeredQuestionsAdded()
    // #endif
  },
  methods: {
    getNumTimes() {
      let phone = uni.getStorageSync('phone')
      uni.request({
        url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbChoiceqst_answer/getAnswerInformationAccordingToPhone?phone=${phone}`,
        // data: { //参数
        //   phone: uni.getStorageSync("phone")
        // },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/json' //自定义请求头信息
        },
        method: 'GET', //请求方式，必须为大写
        success: res => {
          console.log('接口返回-@@@@-', res.data)
          this.numberAnswers = res.data.result.numberAnswers
          this.numberExercises = res.data.result.numberExercises
          // if(res.data)
          // uni.showToast({
          //   icon: 'none',
          //   title: res.data.message
          // })
        },
      })
    },
    // 获取微信右上角胶囊高度
    getHeight() {
      let res = wx.getMenuButtonBoundingClientRect()
      this.titleHeight = res.top
    },
    go_to() {
      uni.navigateBack()
    },
    start() {
      if (isLogin()) return
      uni.navigateTo({
        url: '/pages/competition/details',
      })

      return
      if (uni.getStorageSync('iphone')) {
        uni.navigateTo({
          url: '/pages/competition/details',
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: '请先登录再答题',
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index',
          })
        }, 1000)
      }
    },
  },
}
</script>

<style lang="scss">
page {
  background: #4faa64;
}

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
