<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="邀请新用户" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="mainBox bg-white" style="padding-top: 25rpx;">
      <view class="box">
        <view class="mian">
          <view class=" text-center ">
            <view class="padding-xl radius  bg-white ">

              <view class="image u-flex u-row-center">
                <u--image :showLoading="true" radius="5" :src="src" height="275" width="275">
                  <!-- <image :src="src" mode="widthFix" style="width: 551rpx;"></image> -->
                  <u-loading-icon></u-loading-icon>
                  <view slot="error" style="font-size: 24rpx;">
                    加载失败
                  </view>
                </u--image>
              </view>
              </u-button>
              <view class="info u-p">
                <view>用户邀请码,扫一扫可邀请新用户登录小程序</view>
                <view style="margin-top: 20rpx;">邀请一位新用户登录获得积分</view>
                <!-- <u--text align="center" type="info" text="扫一扫上面的二维码图案，可对此问卷进行反馈"></u--text> -->
              </view>
            </view>
          </view>
        </view>

      </view>




    </view>

    <view class="footerImg">
      <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/b3f4a120b0f44ccabcdec4a5f750ee23.png" mode="widthFix">
      </image>
    </view>
  </view>

</template>

<script>
  // import {
  //   supervisortaskqrcode
  // } from '@/common/api.js'
  export default {
    data() {
      return {
        src: '',
        id: '2',

      }
    },
    computed: {


    },
    created() {
      this.supervisortaskqrcode();
    },
    onLoad(option) {
      this.supervisortaskqrcode();
      // if (option.id) {
      //     this.id = option.id
      //     this.supervisortaskqrcode();
      // } else {
      //     uni.showToast({
      //         title: '无法生成',
      //         icon: 'none'

      //     })
      // }

    },
    methods: {

      supervisortaskqrcode() {
        const phone = uni.getStorageSync('phone')
        uni.request({
          url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/getInvitationCode?phone=${phone}`,
          // data: {
          //   phone: uni.getStorageSync('phone'),
          //   // punchCardPhone: '梵蒂冈的是',
          // },
          method: "POST",
          success: (res) => {
            console.log('aaa', res.data.result);
            this.src = res.data.result
          },
        })

      }
    },
  }
</script>

<style lang="scss" scoped>
  page {
    height: 100%;
    overflow: hidden;
  }

  .footerImg {
    width: 750rpx;
    position: absolute;
    bottom: 0;

    image {
      width: 750rpx;
    }
  }

  .mainBox {
    height: 100%;

    .info {
      font-size: 27rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #29CE8C;
      text-align: center;
      margin-top: 40rpx;
    }

    .box {
      margin: 0 auto;
      width: 697rpx;
      height: 1341rpx;
      background: #BEE3D3;
      padding-top: 26rpx;
      // background: red;
    }

    .mian {
      margin: 0 auto;
      width: 649rpx;
      height: 1289rpx;
      background: #E5EDE9;

      // margin-top: 50rpx;
      .image {
        margin-top: 120rpx;
      }
    }


  }

  /deep/.u-text__value--info {
    font-size: 26rpx !important;
  }
</style>