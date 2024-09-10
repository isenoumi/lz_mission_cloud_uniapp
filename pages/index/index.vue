<template>
  <view>
    <!-- <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder>
        <view class="u-nav-slot" slot="left">
          <u--text text="酒城蓝芽分分队" color="#fff"></u--text>
        </view>
      </navbar>
    </view> -->
    <view class="conetent-body" style="position: relative">
      <view class="bgGif">
        <!-- TODO 城管活动中心 -->
        <image class="gif" src="https://oms.cestech.com.cn/BkpKnowledge/img/67baff48cfe3408e84b2dae581d9120f/界面动图v11.gif" mode="scaleToFill" />
        <!--  垃圾分类宣传周 -->
        <!-- <image
          class="gif"
          src="https://oms.cestech.com.cn/BkpKnowledge/img/9ff94fe909e44791a0598ade002335bd/界面动图v10.gif"
          mode="scaleToFill" /> -->
      </view>
      <!-- <view class="shop box" @click="showTankuang = true"></view> -->
      <view class="shop box" @click="toShop"></view>
      <view class="shopClick box" @click="toShop"></view>
      <view class="zhifaju box" @click="
          toKnowledge({ id: '1559063685168816129', title: '行业资讯' })
        "></view>
      <view class="wodejifen box" @click="toPageCheck('/pageB/integral/index')"></view>
      <view class="photos box" @click="toWeChat"></view>
      <view class="toufangzhan box" @click="toPage('/pageB/activitySquare/index')"></view>
      <!-- toKnowledge({ id: '1559063181911056386', title: '分类基础' }) -->
      <view class="volunteer box" @click="toPageCheck('/pageB/volunteer/index')"></view>
      <view class="dajinalaji box" @click="toPage('/pages/reservation/reservation')"></view>
      <view class="kinnenn box" @click="toPage('/pageLimited/secretKey/index')"></view>
      <view class="activity box" @click="toPage('/pages/activity/index')"></view>
    </view>

    <view class="tankuang" v-if="showTankuang">
      <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/88939b8e22e5456d8720d83e684be8c1.png" style="height: 1100rpx; width: 680rpx">
      </image>
      <view class="text">
        <!--     1、在线学习得积分，参与分类基础、信息资讯模块学习生活垃圾分类相关知识，每日最高可获得10分。<br />
        2、学习答题得积分，进入课程体系、答题竞赛模块，完成相应学习内容和挑战答题，每答对一次获得相应积分。<br />
        3、参与分类活动得积分，每有效参与一次获得20分。<br />
        4、参与我要打卡得积分，进行垃圾分类投放拍照打卡，每日可获得蓝芽积分5分，坚持连续打卡21天，赢得蓝芽“大礼包”。<br />
        5、邀请好友得积分，向微信好友发送小程序邀请码，每邀请一名新用户登录酒城蓝芽分分队小程序，获得5分，每日最高可获得50分。<br />
      -->
        在线阅读得积分：参与分类基础、信息资讯学习生活垃圾分类相关知识学习，每次学习可获得10分，每日最高可获30分。<br />
        视频学习得积分：观看生活垃圾分类视频可获得10分，每日最高可获得20分。<br />
        答题竞赛得积分：进行生活垃圾分类知识答题，答对5题可获得10分，每日最高可获得20分。<br />
        分类打卡得积分：在生活垃圾分类进行分类投放拍照打卡，每次正确投放可获得30分，每日最高可获得30分。邀请好友得积分：向微信好友发送小程序邀请码，每邀请一名新用户，每邀请一名新用户注册“酒城蓝芽分分队”小程序即可获得10分，每日最高可获得30分。
        <br />
        参与活动得积分：通过参与专项活动获得积分，例如：参与生活垃圾分类宣传周活动，可获得相应积分，具体积分规则以活动方案为准。
      </view>

      <view class="toShop" @click="toShop"> </view>
    </view>
    <u-modal :show="showModal" @confirm="showModal = false">
      <view class="slot-content">
        <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/333351b3b5e040479f31da77d675ef68.png" style="height: 980rpx">
        </image>
      </view>
    </u-modal>
  </view>
</template>

<script>
  import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
  import { mapState } from 'vuex'
  import knowledgeCard from './components/knowledge-card.vue'
  import locationNavbar from './components/location-navbar.vue'
  import navbar from '@/components/navbar.vue'
  import { isLogin, preloadImage } from '@/util/common.js'
  import { culturalistbycustomer, homeknowledge, userInfo } from '@/common/api.js'
  export default {
    components: {
      navbar,
      knowledgeCard,
      locationNavbar,
    },
    mixins: [ZPMixin],
    data() {
      return {
        showModal: false,
        showTankuang: false,
        staticUrl: getApp().globalData.staticUrl,
        menuList: getApp().globalData.index.menuList,
        menuLists: getApp().globalData.index.menuLists,
        current: 0,
        swiperList: getApp().globalData.index.swiperList,
        list1: getApp().globalData.index.list1,
        list2: getApp().globalData.index.list2,
      }
    },
    computed: {
      ...mapState({
        location: state => state.location,
        customer: state => state.customer,
      }),

      region() {
        if (this.location) {
          return this.location.region
        }
        return ''
      },
    },
    watch: {},
    onLoad() {
      userInfo().then(res => {
        uni.setStorageSync('phone', res.data.phone)
      })
      const image = {
        quanming: 'https://oms.cestech.com.cn/BkpKnowledge/img/2d78ba0f982349219bf2ed067042708f/全民参与.png',
        quanmingNo: 'http://cdn.cestech.com.cn/BkpKnowledge/img/4ee970a85a5845638b70215de4bd906c.png',
        quanmingTop: 'https://oms.cestech.com.cn/BkpKnowledge/img/33485db1ccbc4a04919e32b26b43ae3e/组 6761.png',
        activity: 'https://oms.cestech.com.cn/BkpKnowledge/img/f1fab7b2bc5c4a50936334b138e9fe54/1.png',
        check: 'https://oms.cestech.com.cn/BkpKnowledge/img/99f21c1b23654ea8b38b8eb274aad38a/2.png',
        answer: 'https://oms.cestech.com.cn/BkpKnowledge/img/651259940d404035a8fee06b4f01ebb1/3.png',
        questionnaire: 'https://oms.cestech.com.cn/BkpKnowledge/img/ad8383280a11428c958dc8356b2f3eaf/4.png',
        missionary:
          'https://oms.cestech.com.cn/BkpKnowledge/img/23ff9215cefc4c5eadf311e5c64990e0/微信图片_20240801150641.png',
      }
      preloadImage(image)
      this.updateWeChat()
    },
    methods: {
      updateWeChat() {
        const updateManager = uni.getUpdateManager()

        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          console.log('res.hasUpdate', res.hasUpdate)
        })

        updateManager.onUpdateReady(function (res) {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            },
          })
        })

        updateManager.onUpdateFailed(function (res) {
          // 新的版本下载失败
        })
      },
      toKnowledge(item) {
        uni.$u.route({
          url: 'pages/knowledge/list',
          params: {
            type: item.id,
            title: item.title,
          },
        })
      },
      toPage(url) {
        uni.navigateTo({
          url,
        })
      },
      toWeChat() {
        uni.navigateTo({ url: '/pages/index/webView' })
        // uni.navigateToMiniProgram({
        //   appId: 'wxc5651f973d70f89b',
        //   path: 'pages/home/index',
        //   success: res => {
        //     console.log('跳转成功', res)
        //   },
        //   fail: err => {
        //     console.log('跳转失败', err)
        //   },
        // })
      },
      toPageCheck(url) {
        if (isLogin()) return
        uni.navigateTo({
          url,
        })
      },
      questionnaire() {
        uni.navigateTo({
          url: '/pages/questionnaire/index',
        })
      },
      swiperChange(index) {
        this.current = index.current
      },

      gridClick(item, index) {
        if (item?.route) {
          uni.$u.route({
            url: item.route,
          })
          return
        }
        if (item.children.length > 0) {
          uni.$u.route({
            url: 'pages/knowledge/index',
            params: {
              index: index,
            },
          })
        } else {
          uni.$u.route({
            url: 'pages/knowledge/list',
            params: {
              type: item.id,
              title: item.title,
            },
          })
        }
      },
      gridClicks(item, index) {
        if (item.title === '资料下载') {
          uni.$u.route({
            url: 'pages/knowledges/list',
            params: {
              type: item.id,
              title: item.title,
            },
          })
        }
        if (item?.route) {
          uni.$u.route({
            url: item.route,
          })
          return
        }
        if (item.children.length > 0) {
          uni.navigateTo({
            url: '/pages/competition/details',
          })
        } else {
          uni.$u.route({
            url: 'pages/knowledge/list',
            params: {
              type: item.id,
              title: item.title,
            },
          })
        }
      },
      toShop() {
        this.showTankuang = false
        uni.switchTab({
          url: '/pages/shop/shop',
        })
      },
      swiperClick(index) {
        if (this.swiperList[index].id) {
          uni.$u.route({
            url: 'pages/knowledge/detail',
            params: {
              id: this.swiperList[index].id,
            },
          })
        } else {
          if (index == 2) {
            this.showTankuang = true
            console.log(index)
          }
        }
      },
      goknowledgedetail(item) {
        uni.$u.route({
          url: 'pages/knowledge/detail',
          params: {
            id: item.id,
          },
        })
      },
      goCourse() {
        uni.$u.route({
          url: 'pages/course/list',
        })
      },
      preloadImage() {
        const keys = Object.keys(imageObj)

        // 遍历属性名数组
        keys.forEach(key => {
          console.log(key) // 输出属性名
          this.setImage(imageObj[key], key)
        })
      },
      setImage(src, storageName) {
        uni.getImageInfo({
          src,
          success: res => {
            console.log('object', res)
            uni.setStorageSync(storageName, res.path)
          },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tankuang {
    position: absolute;
    top: 300rpx;
    width: 750rpx;
    left: 40rpx;
    height: 900rpx;
    z-index: 999999;
    .text {
      width: 540rpx;
      left: 80rpx;
      margin: 0 auto;
      position: absolute;
      top: 180rpx;
      font-size: 28rpx;
      z-index: 999999;
    }

    .toShop {
      position: absolute;
      width: 300rpx;
      height: 120rpx;
      top: 914rpx;
      left: 200rpx;
      z-index: 999999;
      /* background-color: #fff; */
    }
  }

  .conetent-body {
    height: 100vh;
    overflow: visible;
    .bgGif {
      /* position: absolute; */

      .gif {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 768rpx;
        height: 100vh;
      }
    }
    .box {
      position: absolute;
      width: 150rpx;
      height: 150rpx;
      /* background-color: red; */
      z-index: 9999;
    }
    .shop {
      width: 120rpx;
      height: 120rpx;
      top: 114rpx;
      left: 140rpx;
    }
    .zhifaju {
      width: 120rpx;
      height: 120rpx;
      top: 185rpx;
      left: 460rpx;
    }
    .photos {
      width: 120rpx;
      height: 120rpx;
      top: 290rpx;
      left: 270rpx;
    }
    .shopClick {
      width: 60rpx;
      height: 180rpx;
      top: 146rpx;
      left: 62rpx;
    }
    .wodejifen {
      width: 120rpx;
      height: 120rpx;
      top: 160rpx;
      right: 4rpx;
    }
    .toufangzhan {
      width: 140rpx;
      height: 140rpx;
      top: 495rpx;
      left: 195rpx;
    }
    .volunteer {
      width: 140rpx;
      height: 140rpx;
      top: 635rpx;
      left: 45rpx;
    }
    .dajinalaji {
      top: 744rpx;
      left: 505rpx;
    }
    .kinnenn {
      top: 1080rpx;
      left: 145rpx;
    }
    .activity {
      top: 1160rpx;
      right: 40rpx;
      width: 300rpx;
      height: 240rpx;
    }
  }

  /deep/ .u-modal__content {
    padding: 0 !important;
  }
</style>
