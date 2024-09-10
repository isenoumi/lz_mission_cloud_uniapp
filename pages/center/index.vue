<!-- 个人中心 -->
<template>
  <view class="components-theme">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" :allTitle="false" height="55" placeholder imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/525e270517c74fa79a13b97539b95af6.jpg">
        <view class="u-nav-slot" slot="left">
          <u--text text="酒城蓝芽分分队" bold></u--text>
        </view>
      </navbar>
    </view>
    <!-- 顶部 -->
    <view class="UCenter-bg">
      <!-- 	<view class='top-box header-images u-flex u-flex-row u-row-between'>
					<view @click="empower">授权</view>
					<view class="left" v-if="loginStatus>1">
						<view class="left-name">
							<u--text :text="nick_name" bold size="17"></u--text>
						</view>

						<view class="left-info">
							<u--text :text="phone" type="info"></u--text>
						</view>
					</view>
					<view class="left-button" v-else-if="loginStatus==0">
						<u-button type="primary" shape="circle" text="请登录" @click="getUserProfile">
						</u-button>
					</view>
					<view class="left-button" v-else-if="loginStatus==1">
						<u-button type="primary" shape="circle" text="授权手机号" @getphonenumber="getPhoneNumber"
							open-type="getPhoneNumber">
						</u-button>
					</view>
					<u-avatar :src="user.avatar_url" size="100"></u-avatar>
				</view> -->

      <view class="top-box u-flex u-flex-row u-row-between">
        <view class="left" v-if="showmy">
          <view class="left-name">
            <u--text :text="name" bold size="17"></u--text>
          </view>

          <view class="left-info">
            <u--text :text="iphone" type="info"></u--text>
          </view>
        </view>
        <view class="left-button" v-if="show_head">
          <u-button type="primary" shape="circle" text="登录/注册" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber">
          </u-button>
          <!-- <button type="primary" shape="circle" open-type="chooseAvatar" @chooseavatar="bindchooseavatar">
						请登录
					</button> -->
        </view>
        <!-- <view class="left-button name-input" v-if="show_name">
					<input type="nickname" placeholder="请输入昵称" v-model="name" @input="bindinput" @blur="onNickName"
						:disabled="showname" />
				</view>
				<view class="left-button" v-if="show_phone">
					<u-button type="primary" shape="circle" text="授权手机号" @getphonenumber="getPhoneNumber"
						open-type="getPhoneNumber">
					</u-button>
				</view> -->
        <view v-if="showmy">
          <u-avatar :src="avatarUrl" size="100"></u-avatar>
        </view>
      </view>
      <!-- <button @click="getUserProfile"> 获取用户信息 </button> -->
    </view>
    <view class="u-m-t">
      <u-cell-group :border="false">
        <u-cell title="个人信息" @click="goAuth" size="large" :isLink="true" :border="false" :rightIconStyle="{
            color: '#333333',
          }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/1.png" width="16px" height="16px">
          </u--image>

          <!-- <u-icon slot="icon" size="16" name="/static/assets/center/1.png"></u-icon> -->
        </u-cell>
        <!--        <u-cell title="我的积分" @click="integral" size="large" :isLink="true" :border="false" :rightIconStyle="{
				    color:'#333333'
				}">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/5.png" width="16px" height="16px">
          </u--image>
          <text slot="value" class="u-slot-value">{{points}}</text>
          <u-badge slot="value" type="error" value="20000">
					</u-badge>
        </u-cell> -->
        <!--       <u-cell title="积分排行" @click="ranking" size="large" :isLink="true" :border="false" :rightIconStyle="{
				    color:'#333333'
				}">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/6.png" width="16px" height="16px">
          </u--image>

          <u-badge slot="value" type="error" :value="message">
					</u-badge>
        </u-cell> -->
        <u-cell title="打卡记录" @click="checkRecoed" size="large" :isLink="true" :border="false" :rightIconStyle="{
            color: '#333333',
          }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/6.png" width="16px" height="16px">
          </u--image>
        </u-cell>
        <!-- <u-cell v-if="isToH5" title="泸州测评" @click="goToH5" size="large" :isLink="true" :border="false" :rightIconStyle="{
            color: '#333333',
          }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/7.png" width="16px" height="16px">
          </u--image>
        </u-cell> -->
        <!--   v-if="user.role === 1" -->
        <!-- <u-cell
          title="督导员工具"
          @click="goSupervisor"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/2.png"
            width="16px"
            height="16px">
          </u--image>
        </u-cell> -->
        <u-cell v-if="showAddPoints" title="增加积分" @click="goAddPoints" size="large" :isLink="true" :border="false" :rightIconStyle="{
            color: '#333333',
          }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/5.png" width="16px" height="16px">
          </u--image>
        </u-cell>
        <!--           v-if="user.role === 2" -->
        <u-cell v-if="txt.filter(e => e == '2').length != 0" title="活动任务" @click="goActivity" size="large" :isLink="true" :border="false" :rightIconStyle="{
            color: '#333333',
          }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/2.png" width="16px" height="16px">
          </u--image>
        </u-cell>
        <!-- <u-cell
          title="我的消息"
          @click="goMessage"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/4.png"
            width="18px"
            height="18px">
          </u--image>

          <u-badge slot="value" type="error" :value="message"> </u-badge>
        </u-cell> -->
        <!-- <u-cell title="问卷工具" @click="questionnaire" size="large" :isLink="true" :border="false" :rightIconStyle="{
				    color:'#333333'
				}">
					<u--image slot="icon" mode="heightFix" src="/static/assets/center/7.png" width="18px" height="18px">
					</u--image>



				</u-cell> -->
        <!--        <u-cell title="签到" @click="qd" size="large" :isLink="true" :border="false" :rightIconStyle="{
				    color:'#333333'
				}">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/7.png" width="18px" height="18px">
          </u--image>


        </u-cell> -->
        <u-cell title="联系我们" @click="goSpeak" size="large" :isLink="true" :border="false" :rightIconStyle="{
            color: '#333333',
          }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/4.png" width="16px" height="16px">
          </u--image>
        </u-cell>
        <u-cell title="邀请好友" @click="invitation" size="large" :isLink="true" :border="false" :rightIconStyle="{
            color: '#333333',
          }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/yq.png" width="18px" height="18px">
          </u--image>
        </u-cell>
        <u-cell title="收货地址" @click="address" size="large" :isLink="true" :border="false" :rightIconStyle="{
            color: '#333333',
          }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/address.png" width="18px" height="18px">
          </u--image>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
  import authorize from '@/common/auth.js'
  import { mapState } from 'vuex'
  import { message as getMessage } from '@/common/api.js'
  import { userInfo, usersave } from '@/common/api.js'
  import { isLogin } from '@/util/common.js'
  import { getBkbActivePhaseUser } from './api'
  export default {
    data() {
      return {
        txt: [],
        pic: getApp().globalData.user,
        topBackGroupImageIndex: 5,
        redirect: '',
        message: '0',
        points: 0, //积分
        avatarUrl: '',
        name: '',
        showmy: false,
        show_head: true,
        show_name: false,
        show_phone: false,
        showname: false,
        phone_s: false,
        iphone: '',
        showAddPoints: false,
        isToH5: true,
      }
    },
    onTabItemTap() {
      this.userinfo()
      authorize.login()
    },
    onLoad(option) {
      const scene = decodeURIComponent(option.scene)
      uni.setStorageSync('scene', scene)

      if (uni.getStorageSync('iphone')) {
        this.iphone = uni.getStorageSync('iphone')
      }
      if (uni.getStorageSync('avatarUrl')) {
        this.avatarUrl = uni.getStorageSync('avatarUrl')
        this.show_head = false
        this.show_name = false
        this.show_phone = false
        this.showmy = true
      } else {
        // this.show_head=true
        // this.phone_s=true
      }
      if (uni.getStorageSync('nikename')) {
        this.name = uni.getStorageSync('nikename')
        this.show_head = false
        this.show_name = false
        this.show_phone = false
        this.showmy = true
      } else {
        this.show_head = true
        this.phone_s = true
      }
      // if(uni.getStorageSync('iphone') || uni.getStorageSync('avatarUrl') ||uni.getStorageSync('nikename')){

      // }
      console.log(uni.getStorageSync('points'), '44')
      // this.points = uni.getStorageSync('points')
      this.userinfo()
      // console.log(user.role,'ww')
    },
    computed: {
      ...mapState({
        user: state => state.user,
      }),
      nick_name() {
        if (this.user.name) {
          return this.user.name
        }
        if (this.user.nick_name) {
          return this.user.nick_name
        }
        return '微信用户'
      },
      message() {
        if (this.user.message) {
          return this.user.message > 99 ? '99+' : this.user.message
        }
        return '0'
      },
      // phone() {
      // 	this.phone_s=true
      // 	if (this.user.phone) {

      // 		return this.user.phone
      // 	}

      // 	return ''
      // },
      loginStatus() {
        if (!this.$store.state.user.nick_name) {
          return 0
        } else if (!this.$store.state.user.phone) {
          return 1
        } else if (!this.$store.state.user.reg_status) {
          return 2
        } else {
          return 3
        }
        return 0
      },
    },
    // 分享小程序
    onShareAppMessage(res) {
      return {
        title: '赶紧分享给身边的亲友吧',
      }
    },
    watch: {
      topBackGroupImageIndex(val) {
        if (val == 4 || val == 5) {
          this.spaceShow = true
        } else {
          this.spaceShow = false
        }
      },
    },
    onShow() {
      getMessage().then(res => {
        this.message = res.data > 99 ? '99+' : res.data > 0 ? res.data : 0
      })
      if (uni.getStorageSync('phone')) {
        this.getBkbActivePhaseUserApi()
      }
    },
    mounted() {},
    methods: {
      goToH5() {
        uni.navigateTo({ url: '/pageB/webView/lzcp' })
      },
      getBkbActivePhaseUserApi() {
        getBkbActivePhaseUser({ phone: uni.getStorageSync('phone') }).then(res => {
          res.result == 'YES' ? (this.showAddPoints = true) : (this.showAddPoints = false)
        })
      },
      goAddPoints() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pageB/addPoints/index',
        })
      },
      address() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pageD/address/index',
        })
      },
      qd() {
        if (isLogin()) return
        // uni.navigateTo({
        // 	url:'/pageB/invite/index'
        // })
        uni.navigateTo({
          url: '/pageB/signIn/signIn',
        })
      },
      invitation() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pageB/Invitefriends/index',
        })
      },
      goSpeak() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pageB/speak/index',
        })
      },
      empower() {
        // uni.navigateTo({
        // 	url: '/pages/auth/login'
        // })
      },
      // getUserProfile() {
      // 	let that = this
      // 	uni.getUserProfile({
      // 		desc: "用于完善用户信息",
      // 		success: (res1) => {
      // 			// that.info = res1.userInfo;
      // 			console.log(res1,'res1')
      // 			uni.showToast({
      // 				icon:"none",
      // 				title:'获取成功'
      // 			})
      // 		},
      // 		fail: (err) => {
      // 			console.log(err)
      // 			uni.showToast({
      // 				icon:"none",
      // 				title:'用户拒绝获取'
      // 			})
      // 		}
      // 	})
      // },
      //获取用户头像
      bindchooseavatar(e) {
        console.log(e, '2222')
        if (e.detail.avatarUrl) {
          this.show_head = false
          this.show_name = true
          this.show_phone = false
          // this.uploadFilePromise(e.detail.avatarUrl)
          uni.setStorageSync('avatarUrl', e.detail.avatarUrl)
          this.avatarUrl = uni.getStorageSync('avatarUrl')
          console.log(uni.getStorageSync('avatarUrl'), 'avatarUrl')
          // authorize.login()
        }
      },
      uploadFilePromise(avatarUrl) {
        //调后台接口上传图片  这里的avatarUrl拿到的是微信地址
        uni.request({
          url: 'https://example.weixin.qq.com/upload',
          data: avatarUrl,
          success(res) {
            // console.log(res.data.avatarUrl);
            // const data = res.data
            //do something
            completeMemberInfo(res.data.avatarUrl)
          },
        })
      },
      completeMemberInfo(data) {
        console.log(data, '头像地址')
        //接收 avatarUrl / nickName 调接口完善头像或者昵称信息
      },

      bindinput(e) {
        console.log(e.detail.value, '昵称')
        uni.setStorageSync('nikename', e.detail.value)
        this.name = uni.getStorageSync('nikename')
        // authorize.login()
      },
      onNickName(e) {
        // console.log(e.detail.value, '昵称')
        if (e.detail.value) {
          this.show_head = false
          this.show_name = false
          this.show_phone = true
          uni.setStorageSync('nikename', e.detail.value)
          this.name = uni.getStorageSync('nikename')
        }
        // this.completeMemberInfo(e.detail.value)
      },
      //获取用户个人信息
      userinfo() {
        userInfo().then(res => {
          if (res.code == 200) {
            // console.log(res.data.points, '用户信息')
            // this.points = res.data.points
            // this.txt = res.data.result.records[0].role?.split(',')
            this.points = res.result.records[0].points
            this.users = res.result.records[0]
            uni.setStorageSync('users', res.result.records[0])
            this.txt = res.result.records[0].role?.split(',')
            console.log('this.txt', res.result.records[0])
          }
        })
      },
      // 个人信息
      goAuth() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pages/auth/register',
        })
      },
      //我的积分
      integral() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pageB/integral/index',
        })
      },
      //积分排名
      ranking() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pageB/ranking/index',
        })
      },
      goSupervisor() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pages/supervisor/task',
        })
        return
        uni.navigateTo({
          url: '/pages/supervisor/index',
        })
      },
      goActivity() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pages/activity_manager/index',
        })
      },
      questionnaire() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pages/questionnaire/index',
        })
      },
      goLogin() {
        // uni.navigateTo({
        //   url: '/pages/auth/login'
        // })
      },
      goMessage() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pages/message/list',
        })
      },
      checkRecoed() {
        if (isLogin()) return
        uni.navigateTo({
          url: '/pages/check/checkRecord/checkRecord',
        })
      },

      //拨打固定电话
      callPhoneNumber() {
        uni.makePhoneCall({
          phoneNumber: '18629591093',
        })
      },

      getUserProfile() {
        authorize.getUserProfile().then(res => {
          // uni.showToast({
          // 	title: res.msg,
          // 	icon: 'success',
          // });
        })
      },
      checkPhone(phone) {
        uni.request({
          url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/checkUsersOnMobilePhone?phone=${phone}`,
          method: 'GET',
          success: res => {
            console.log('######', res.result)
            if (!res.result) {
              uni.request({
                url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbInviterRecord/addAndPoints`,
                data: {
                  theInvitePhone: uni.getStorageSync('scene'),
                },
                method: 'POST',
                success: res => {},
              })
            }
          },
        })
      },
      getPhoneNumber(e) {
        if (e.detail.errMsg != 'getPhoneNumber:ok') {
          return
        }
        // this.showmy = true
        // this.show_phone = false
        console.log(this.phone, '手机号')
        console.log('qq', e.detail)
        let code = e.detail.code
        uni.login({
          provider: 'weixin',
          success: res => {
            let myPhone = ''
            if (uni.getStorageSync('scene') != 'undefined') {
              myPhone = uni.getStorageSync('scene')
            }
            uni.request({
              // url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/newMiniProgramLogin?code=${res.code}`,
              url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/miniProgramLogin?code=${res.code}`,
              method: 'GET',
              success: res => {
                console.log(res.data.result.token.session_key, '秘钥')
                uni.setStorageSync('session_key', res.data.result.token.session_key)
                uni.setStorageSync('openid', res.data.result.token.openid)
                console.log(res.data.result.token, '用户信息')
                uni.setStorageSync('users', res.data.result.user)
                this.users = res.data.result.user
                // this.txt = String(res.data.result.user.role).split(',')
                console.log(this.txt, '身份认证')
                console.log(res.data.result.user.nickName, 'ccccxxxx')

                uni.setStorageSync('nikename', res.data.result.user.nickName)
                this.name = uni.getStorageSync('nikename')
                uni.setStorageSync('avatarUrl', res.data.result.user.avatarUrl)
                this.avatarUrl = uni.getStorageSync('avatarUrl')
                uni.request({
                  // url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/getPhoneNumber?code=${code}&openid=${res.data.result.token.openid}`,
                  url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/newGetPhoneNumber?code=${code}&openid=${res.data.result.token.openid}`,

                  method: 'GET',
                  success: res => {
                    uni.setStorageSync('xtoken', res.data.result.access_tokenn)
                    console.log(res, '解析完成')

                    this.checkPhone(res.data.result.phone_info.phoneNumber)
                    this.iphone = res.data.result.phone_info.phoneNumber
                    let data = {}
                    data = this.users
                    // data.nickName = this.name
                    // data.avatarUrl = this.avatarUrl
                    data.phone = this.iphone
                    uni.request({
                      url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/edit',
                      header: {
                        'x-Resource-Token': uni.getStorageSync('xtoken'),
                      },
                      data: data,
                      method: 'POST',
                      success: res => {},
                    })
                    uni.setStorageSync('iphone', this.iphone)
                    uni.setStorageSync('phone', this.iphone)
                    this.userinfo()
                    // this.userinfo()
                    this.show_head = false
                    this.showmy = true
                    uni.showToast({
                      title: '登录成功',
                      icon: 'success',
                    })
                    this.getBkbActivePhaseUserApi()
                  },
                })
              },
            })

            //这里获取的是用户的code，用来换取 openid、unionid、session_key 等信息，再将信息丢给后台自己的登录业务就行了
          },
        })
      },
      // getPhoneNumber(e) {
      // 	if (e.detail.errMsg != "getPhoneNumber:ok") {
      // 		return;
      // 	}
      // 	// authorize.login()
      // 	this.showmy = true
      // 	this.show_phone = false
      // 	console.log(this.phone, '手机号')
      // 	usersave({
      // 		nick_name: this.name,
      // 		avatar_url: this.avatarUrl
      // 	}).then(res => {
      // 		console.log(res)
      // 	})
      // 	console.log('qq', e);

      // 	// debugger

      // 	authorize.bindPhone(e.detail).then((res) => {
      // 		this.checkPhone(res.data.phone)
      // 		// debugger
      // 		// this.iphone=res.data.phone
      // 		uni.setStorageSync('iphone', res.data.phone)
      // 		uni.setStorageSync('phone', res.data.phone)
      // 		this.iphone = res.data.phone
      // 		authorize.login()
      // 		// debugger
      // 		// this.show_phone=false
      // 		this.showmy = true

      // 		uni.showToast({
      // 			title: '登录成功',
      // 			icon: 'success',
      // 		});
      // 	})

      // }
    },
  }
</script>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>

<style lang="scss" scoped>
  .UCenter-bg {
    background: #fff !important;
    // background: url('/static/assets/head-bg2.jpg');
    background-size: 100% 100%;
    background-size: cover;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    align-items: center;
    font-weight: 300;
    height: 160px;

    .top-box {
      width: 100%;
      padding: 30rpx;
      height: 100%;

      .left {
        padding-left: 30rpx;
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .left-name {
          margin-bottom: 15rpx;
        }
      }

      .left-button {
        /deep/ .u-button__text {
          padding: 0 10px;
        }
      }

      .name-input {
        /deep/ .data-v-0f3320de {
          width: 260rpx;
          padding-left: 40rpx;
          height: 80rpx;
          background: #3bcf99;
          border-radius: 200rpx;
          color: #ffffff !important;

          .input::-webkit-input-placeholder {
            /* placeholder颜色 */

            /* placeholder字体大小 */
            font-size: 12px;
          }
        }
      }
    }
  }

  // /deep/ .input:placeholder-shown {
  // 	font-size: 20rpx;
  // 	color: #fff;
  // }
</style>
