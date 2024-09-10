<template>
  <view style="position: relative;">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" placeholder height="55" :allTitle="false" leftIconColor="#fff" imageSrc="https://oms.cestech.com.cn/BkpKnowledge/img/286b4a1bb0f64d0286f488097a260707/蒙版组 8.png" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="宣教基地" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="imageBox">
      <image class="image" :src="imagePath" mode="widthFix" />
      <view class="item luxian" @click="itemClick('luxian')"></view>
      <view class="item longmatanqu" @click="itemClick('longmatanqu')"></view>
      <view class="item jaingyangqu" @click="itemClick('jaingyangqu')"></view>
      <view class="item hejiangxian" @click="itemClick('hejiangxian')"></view>
      <view class="item naxiqu" @click="itemClick('naxiqu')"></view>
      <view class="item xuyongxian" @click="itemClick('xuyongxian')"></view>
      <view class="item gulinxian" @click="itemClick('gulinxian')"></view>
    </view>

    <view v-if="show" class="showBox">
      <view v-if="info.children">
        <view class="mainBox">

          <view class="title">
            {{ info.children[infoIndex].title }}
          </view>
          <view style="padding: 0 36rpx;">
            <u-swiper style="width:360rpx" img-mode="scaleToFill" height="400rpx" :current="infoIndex" imgMode="scaleToFill" :list="info.children" keyName="img" :autoplay="false" @change="change"></u-swiper>

          </view>

          <view class="img">
            <!-- <u-image class="imgs" width="666rpx" :src="info.children[infoIndex].img" mode="scaleToFill"></u-image> -->

          </view>
          <view class="main">
            <view class="text">
              <view>{{ info.children[infoIndex].text }}</view>
            </view>
            <view class="buttomBox">
              <view class="buttom">
                地址:{{ info.children[infoIndex].address }}
              </view>
              <view class="buttom">
                联系电话:{{ info.children[infoIndex].phone }}
              </view>
            </view>
          </view>
        </view>
        <view class="next " @click="itemNext">
          <image src="/static/assets/Limited/next.png" mode="scaleToFill" />
        </view>
        <view class="prev" @click="itemPrev">
          <image src="/static/assets/Limited/prev.png" mode="scaleToFill" />
        </view>
        <view class="close" @click="()=>{show = false
        infoIndex=0}">
          <image src="https://oms.cestech.com.cn/BkpKnowledge/img/477d0d3a5a394e279fd7da9ec37b8bd5/关闭.png" mode="scaleToFill" />
        </view>
      </view>
      <view v-else>
        <view class="mainBox">
          <view class="title">
            {{ info.title }}
          </view>
          <view class="img">
            <u-image class="imgs" width="666rpx" height="480rpx" :src="info.img" mode="scaleToFill"></u-image>
          </view>
          <view class="main">
            <view class="text">
              <view>{{ info.text }}</view>
            </view>
            <view class="buttomBox">
              <view class="buttom">
                地址:{{ info.address }}
              </view>
              <view class="buttom">
                联系电话:{{ info.phone }}
              </view>
            </view>
          </view>
        </view>
        <view class="close" @click="show = false">
          <image src="https://oms.cestech.com.cn/BkpKnowledge/img/477d0d3a5a394e279fd7da9ec37b8bd5/关闭.png" mode="scaleToFill" />
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import { luzhou } from './common'
  export default {
    data() {
      return {
        titleHeight: 0,
        imagePath: uni.getStorageSync('missionary'),
        show: false,
        info: luzhou.luxian,
        infoItem: {},
        infoIndex: 0,
      }
    },
    onLoad() {
      // #ifdef MP-WEIXIN
      this.getHeight()
      // this.answeredQuestionsAdded()
      // #endif
    },
    methods: {
      change(e) {
        this.infoIndex = e.current
      },
      itemClick(name) {
        this.info = luzhou[name]
        this.show = true
      },
      itemNext(index) {
        console.log(this.infoIndex)
        // if (this.infoIndex == this.info.children.length - 1) this.infoIndex = 0
        if (this.infoIndex == this.info.children.length - 1) return
        else this.infoIndex++
      },
      itemPrev(index) {
        // if (this.infoIndex == 0) this.infoIndex = this.info.children.length - 1
        if (this.infoIndex == 0) return
        else this.infoIndex--
      },
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
  page {
    background: #e0ecd8;
  }
</style>

<style lang="scss" scoped>
  .imageBox {
    width: 768rpx;
    position: relative;
    .image {
      width: 768rpx;
    }
    .item {
      position: absolute;
      width: 72rpx;
      height: 72rpx;
      /* background: #3bcf99; */
      top: 0;
      left: 0;
    }
    .luxian {
      top: 240rpx;
      left: 240rpx;
    }
    .longmatanqu {
      top: 335rpx;
      left: 204rpx;
    }
    .jaingyangqu {
      top: 410rpx;
      left: 214rpx;
    }
    .hejiangxian {
      top: 410rpx;
      left: 490rpx;
    }
    .naxiqu {
      top: 510rpx;
      left: 220rpx;
    }
    .xuyongxian {
      top: 750rpx;
      left: 226rpx;
    }
    .gulinxian {
      top: 890rpx;
      left: 460rpx;
    }
  }
  .showBox {
    width: 708rpx;
    margin: 36rpx auto;

    position: absolute;
    top: 240rpx;
    left: 18rpx;
    .next,
    .prev {
      position: absolute;
      top: 80rpx;
      /* background: #000;
        opacity: 0.3; */
      height: 48rpx;
      width: 48rpx;
      padding: 180rpx 0;
      image {
        height: 48rpx;
        width: 48rpx;
      }
    }
    .next {
      right: 8rpx;
    }
    .prev {
      left: 8rpx;
    }
    .mainBox {
      background-color: #fff;
      border: 2rpx #000 solid;
      border-radius: 24rpx;

      padding: 16rpx;
      .title {
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 16rpx;
        text-align: center;
      }
      .img {
        margin: 12rpx auto;
        text-align: center;
        display: flex;
        justify-content: center;
      }
      .imgs {
        width: 680rpx;
        border-radius: 12rpx;
      }
      .main {
        .text {
          text-indent: 2em;
        }
        .buttomBox {
          margin-top: 12rpx;
        }
      }
    }
    .close {
      text-align: center;
      margin-top: 24rpx;
      margin-bottom: 24rpx;
      opacity: 0.5;
      image {
        width: 56rpx;
        height: 56rpx;
      }
    }
  }
</style>