<!-- 查看视频 -->
<template>
  <view class="container">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        @leftClick="leftClick">
        <view class="u-nav-slot" slot="center">
          <u--text text="活动详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <u-loading-page :loading="pageLoading"></u-loading-page>

    <view v-if="!pageLoading">
      <image
        :src="imagePath"
        mode="scaleToFill"
        style="
          display: block;
          width: 696rpx;
          height: 332rpx;
          margin: 10rpx auto;
        " />
      <view class="z-form-text u-p contentBox">
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动标题:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.name"> </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动类型:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text
                wordWrap="anywhere"
                :text="detail.type | activityTypeText">
              </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动时间:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <!-- <u--text wordWrap="anywhere" :text="detail.startDate"> </u--text> -->
              <u--text
                wordWrap="anywhere"
                :text="detail.activityPersistentTime">
              </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <!-- <view class="z-form-item">
            <view class="z-form-item__body">
              <view class="z-form-item__body__left">
                <u--text text="活动时长:"></u--text>
              </view>
              <view class="z-form-item__body__right">
                <u--text wordWrap="anywhere" :text="detail.activityTime">
                </u--text>
              </view>
            </view>
            <u-line color="rgb(214, 215, 217)"></u-line>
          </view> -->
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动地址:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="address"> </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动内容:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.remark"> </u--text>
            </view>
          </view>
          <!-- <u-line color="rgb(214, 215, 217)"></u-line> -->
        </view>
        <!-- <view class="z-form-item">
            <view class="z-form-item__body">
              <view class="z-form-item__body__left">
                <u--text text="活动负责人:"></u--text>
              </view>
              <view class="z-form-item__body__right">
                <u--text wordWrap="anywhere" :text="speaker ? speaker.name : ''">
                </u--text>
              </view>
            </view>
            <u-line color="rgb(214, 215, 217)"></u-line>
          </view> -->

        <!-- <view class="z-form-item">
            <view class="z-form-item__body_col">
              <view class="z-form-item__body__top">
                <u--text text="备注:"></u--text>
              </view>
              <view class="z-form-item__body__right">
                <u--text wordWrap="anywhere" :text="detail.remark">
                </u--text>
  
              </view>
            </view>
          </view> -->
      </view>
    </view>
    <view class="btnList" v-if="!phone && isScene">
      <view class="btnItem">
        <u-button
          text="登录"
          size="normal"
          type="primary"
          @getphonenumber="getPhoneNumber"
          open-type="getPhoneNumber"></u-button>
      </view>
    </view>
    <view class="btnList" v-if="showBtn && detail.status == 31 && phone && id">
      <view class="btnItem">
        <u-button
          v-if="!isSubscribe"
          text="立即预约"
          @click="subscribe"
          size="normal"
          type="primary"></u-button>
        <u-button v-else text="已预约" size="normal" type="primary"></u-button>
      </view>
    </view>
    <!-- <view class="btnList" v-if="phone">
      <view class="btnItem">
        <u-button
          text="注册志愿者"
          @click="toVolunteer"
          size="normal"
          type="primary"></u-button>
      </view>
    </view> -->
    <u-modal
      :show="show"
      @confirm="subscribeSubmit"
      ref="uModal"
      :asyncClose="true"
      showCancelButton
      @cancel="this.show = false"
      title="提示"
      :content="`是否预约此活动？`">
    </u-modal>
  </view>
</template>

<script>
import { activityone } from '@/common/api.js'
import { getACheckInActivity, qrCodeAddPoints } from './api'
// import {
//   speechoractivityqrcode
// } from '@/common/api.js'
import authorize from '@/common/auth.js'
import templateIds from '@/common/template-ids'
export default {
  components: {},
  data() {
    return {
      users: {},
      phone: uni.getStorageSync('phone'),
      src: '',
      title: '',
      speaker: '',
      pageLoading: true,
      globalData: getApp().globalData,
      id: null,
      qrCodeId: '',
      show: false,
      isScene: false,
      isSubscribe: false,
      showBtn: true,
      address: '',
      isCheck: false,
      detail: {
        name_of_activity: '',
        type: '',
        create_time: '',
        start_date: '',
      },
      imagePath: uni.getStorageSync('quanming'),
    }
  },
  onShow() {
    // this.continuousClockingRecord()
    this.getSubscribe()
  },
  onLoad(option) {
    if (option.showBtn == 1) this.showBtn = false
    const scene = decodeURIComponent(option.scene)
    if (scene && scene != 'undefined' && scene != 'null') {
      this.qrCodeId = scene
      console.log(scene, 'scene', this.qrCodeId)
      this.isScene = true
      //   this.speechoractivityqrcode()
      this.getACheckInActivityApi()
      // this.getSubscribe()
      return
    }
    if (option.id) {
      this.title = option.title
      this.id = option.id
      //   this.speechoractivityqrcode()
      this.getDetail()
      this.getSubscribe()
    } else {
      uni.$u.route({
        type: 'navigateBack',
      })
      return
    }
  },
  onUnload() {},
  computed: {},
  methods: {
    leftClick() {
      if (this.isScene) uni.switchTab({ url: '/pages/index/index' })
      else uni.navigateBack({ delta: 1 })
    },
    toVolunteer() {
      uni.navigateTo({ url: '/pageB/volunteer/index' })
    },
    qrCodeAddPointsApi() {
      qrCodeAddPoints({
        phone: uni.getStorageSync('phone'),
        qrCodeId: this.qrCodeId,
      }).then(res => {
        // uni.showToast({
        //   title: res.message,
        //   icon: 'none',
        //   mask: true,
        // })
        if (res.code == 200)
          uni.navigateTo({
            url: '/pages/activity_manager/subscribe?title=添加积分成功',
          })
        else
          uni.showToast({
            title: res.message,
            icon: 'none',
            mask: true,
            duration: 2000,
          })
      })
    },
    getACheckInActivityApi() {
      getACheckInActivity({ qrCodeId: this.qrCodeId }).then(res => {
        this.pageLoading = false
        this.detail = res.result

        //   this.detail.activityDetailsSite.map(item => {
        //     this.address += item
        //   })
        this.address += this.detail.activitySite || ''
        if (!uni.getStorageSync('phone')) {
          uni.showToast({ title: '请登录!', icon: 'none' })
        } else {
          this.qrCodeAddPointsApi()
        }
      })
    },
    toCheck() {
      if (this.id == '1788501831615840258') {
        uni.navigateTo({
          url: `/pageB/21check/index?id=${this.id}&title=${this.title}`,
        })
      }
    },
    getSubscribe() {
      uni.request({
        url: `https://lz.api.cestech.com.cn:8150/mission_b/v1/2/book/subscribe?bookId=${this.id}`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        method: 'POST',
        success: res => {
          this.isSubscribe = res.data
        },
      })
    },
    subscribe() {
      if (uni.getStorageSync('avatarUrl')) {
        this.show = true
      } else {
        this.show = false
        uni.showToast({
          icon: 'none',
          title: '请先登录再预约',
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index',
          })
        }, 1000)
      }
    },
    continuousClockingRecord() {
      uni.request({
        url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbContinuousClockingRecord/list',
        data: {
          pageNo: 1,
          pageSize: 100,
          phone: uni.getStorageSync('phone'),
          // phone: "17608296903"
        },
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        method: 'GET',
        success: res => {
          let date = new Date()
          let month = date.getMonth() + 1
          let day = date.getDate()
          month = month > 9 ? month : '0' + month
          day = day < 10 ? '0' + day : day
          let today = date.getFullYear() + '-' + month + '-' + day
          console.log(today, month, day, 1)
          let checkDateList = []
          this.checkDays = res.data.result.records.length
          res.data.result.records.forEach(item => {
            // console.log(item.printingDate);
            checkDateList.push(item.printingDate.slice(0, 10))
          })
          checkDateList.forEach(item => {
            if (item == today) {
              this.isCheck = true
            }
          })
        },
      })
    },
    subscribeSubmit() {
      const userId = uni.getStorageSync('users').id
      // if(uni.getStorageSync('avatarUrl')){
      this.$refs.uModal.loading = false

      uni.request({
        url: `https://lz.api.cestech.com.cn:8150/mission_b/v1/2/book/add`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        data: {
          bookId: this.id,
          bookType: 'act',
        },
        method: 'POST',
        success: res => {
          this.$refs.uModal.loading = false

          if (res.data.code == 500) {
            uni.showToast({
              title: `您已预约过活动`,
              icon: 'error',
            })
          } else {
            uni.showToast({
              title: `预约成功`,
              icon: 'success',
            })
            uni.navigateTo({ url: '/pages/activity_manager/subscribe' })
            // this.item.booked = true
            // authorize
            //   .requestSubscribeMessage(templateIds.activity)
            //   .then(res => {})
          }
          //   uni.navigateBack()
          this.isSubscribe = true
          this.show = false
        },
      })

      //   authorize.requestSubscribeMessage(templateIds.activity).then(res => {})
    },

    evaluateActivities() {
      if (uni.getStorageSync('avatarUrl')) {
        uni.$u.route({
          url: 'pageB/activity/evaluate',
          params: {
            id: this.id,
          },
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: '请先登录再评价',
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index',
          })
        }, 1000)
      }
    },
    speechoractivityqrcode() {
      // speechoractivityqrcode({
      //   id: this.id
      // }).then((res) => {
      //   this.src = res.data

      // })

      uni.request({
        url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/activityManager?id=${this.id}`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        method: 'POST',
        success: res => {
          console.log(res.data.result, 'xxxx')
          this.src = res.data.result
        },
      })
    },
    getDetail() {
      this.pageLoading = true

      uni.request({
        url: `https://lz.api.cestech.com.cn:8150/mission_b/v1/2/activity/one?id=${this.id}`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        // data: {
        //   pageNo: page,
        //   pageSize: list_rows,
        //   customer_id: 1,
        // },
        method: 'GET',
        success: res => {
          this.pageLoading = false
          this.detail = res.data.result.activity

          this.speaker = res.data.result.Speaker
          //   this.detail.activityDetailsSite.map(item => {
          //     this.address += item
          //   })
          this.address += this.detail.activitySite || ''
        },
      })
    },
    getPhoneNumber(e) {
      if (e.detail.errMsg != 'getPhoneNumber:ok') {
        return
      }
      let myPhone = ''
      console.log(this.phone, '手机号')
      let code = e.detail.code
      uni.login({
        provider: 'weixin',
        success: res => {
          if (uni.getStorageSync('scene') != 'undefined') {
            myPhone = uni.getStorageSync('scene')
          }
          uni.request({
            // url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/newMiniProgramLogin?code=${res.code}`,
            url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/miniProgramLogin?code=${res.code}`,
            method: 'GET',
            success: res => {
              console.log(res.data.result.token.session_key, '秘钥')
              uni.setStorageSync(
                'session_key',
                res.data.result.token.session_key
              )
              uni.setStorageSync('openid', res.data.result.token.openid)
              console.log(res.data.result.token, '用户信息')
              uni.setStorageSync('users', res.data.result.user)
              this.users = res.data.result.user
              console.log(res.data.result.user.nickName, 'ccccxxxx')

              uni.setStorageSync('nikename', res.data.result.user.nickName)
              uni.setStorageSync('avatarUrl', res.data.result.user.avatarUrl)
              uni.request({
                // url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/getPhoneNumber?code=${code}&openid=${res.data.result.token.openid}`,
                url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/newGetPhoneNumber?code=${code}&openid=${res.data.result.token.openid}`,

                method: 'GET',
                success: res => {
                  uni.setStorageSync('xtoken', res.data.result.access_tokenn)

                  this.phone = res.data.result.phone_info.phoneNumber
                  let data = {}
                  data = this.users
                  data.phone = this.phone
                  uni.request({
                    url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/edit',
                    header: {
                      'x-Resource-Token': uni.getStorageSync('xtoken'),
                    },
                    data: data,
                    method: 'POST',
                    success: res => {},
                  })
                  uni.setStorageSync('iphone', this.phone)
                  uni.setStorageSync('phone', this.phone)
                  // this.userinfo()
                  this.show_head = false
                  this.showmy = true
                  // uni.showToast({
                  //   title: '登录成功',
                  //   icon: 'success',
                  // })
                  this.qrCodeAddPointsApi()
                  this.getSubscribe()
                },
              })
            },
          })

          //这里获取的是用户的code，用来换取 openid、unionid、session_key 等信息，再将信息丢给后台自己的登录业务就行了
        },
      })
    },
  },
}
</script>
<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
/* .z-form-item__body{
    display: flex;
    
  } */
.btnList {
  display: flex;
  justify-content: space-around;

  .btnItem {
    width: 688rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #1dd193;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 40rpx;
  }
}
.contentBox {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 36rpx auto;
}
</style>
