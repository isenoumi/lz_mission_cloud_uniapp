<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder>
        <view class="u-nav-slot" slot="left">
          <u--text text="酒城蓝芽分分队" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="conetent-body">
      <u-swiper
        :list="swiperList"
        keyName="url"
        previousMargin="30"
        nextMargin="30"
        :autoplay="false"
        circular
        radius="5"
        @click="swiperClick"
        bgColor="#ffffff"
        @change="swiperChange">
      </u-swiper>
      <view class="indicators u-flex">
        <view
          class="indicators__dot"
          v-for="(item, index) in swiperList"
          :key="index"
          :class="[index === current && 'indicators__dot--active']">
        </view>
      </view>
      <u-gap bgColor="transparent" height="15"></u-gap>
      <u-grid :border="false" col="3">
        <u-grid-item
          v-for="(listItem, listIndex) in menuList"
          :key="listIndex"
          @click.stop="gridClick(listItem, listIndex)">
          <u--image
            mode="aspectFit"
            :showLoading="true"
            :src="listItem.url"
            width="200px"
            height="80px">
          </u--image>

          <u--text align="center" bold :text="listItem.title"></u--text>
        </u-grid-item>
      </u-grid>
      <view style="height: 15rpx"></view>
      <u-grid :border="false" col="4">
        <u-grid-item
          v-for="(listItem, listIndex) in menuLists"
          :key="listIndex"
          @click.stop="gridClicks(listItem, listIndex)">
          <u--image
            mode="aspectFit"
            :showLoading="true"
            :src="listItem.url"
            width="200px"
            height="80px">
          </u--image>

          <u--text align="center" bold :text="listItem.title"></u--text>
        </u-grid-item>
      </u-grid>
      <!-- <view class="application-list"> -->
      <!-- <image mode="aspectFit"   src="@/static/assets/home/icon1.png" style="width: 200px;height: 80px;"
				</image> -->
      <!-- <view class="li" @click="questionnaire">
					<view><image src="@/static/assets/home/wj.png" style="width: 48px;height: 48px;" mode="aspectFill"></image></view>
					<view style="margin-top: 10rpx;">问卷管理</view>
				</view>
				
				
			</view> -->
      <view class="u-flex u-p kc">
        <view class="u-flex-1 kc-left">
          <!-- <image @click="goCourse" style="width: 100%; height: 100%;" mode="aspectFit"
            :src="`${staticUrl}static/door.png`">
          </image> -->
          <image
            @click="goCourse"
            style="width: 100%; height: 100%"
            mode="aspectFit"
            src="http://cdn.cestech.com.cn/BkpKnowledge/img/220ee7a4264f4f70b2b4ff249badca27.png">
          </image>
        </view>
        <view class="u-flex-1 u-m-l kc-right u-flex-col">
          <view
            class="u-flex-col u-flex-1 kc-right__item"
            v-for="(item, index) in list1"
            :key="item.id"
            @click="goknowledgedetail(item)">
            <view class="z-card">
              <view class="z-card__title">
                <u--text lines="2" bold :text="item.title"></u--text>
              </view>

              <view class="z-card__info z-card__info-ss">
                <view class="z-card__info--left">
                  <u--text
                    size="13"
                    prefixIcon="/static/assets/home/hot.png"
                    lines="1"
                    type="info"
                    :iconStyle="{
                      'margin-right': '5px',
                    }"
                    :text="item.type"></u--text>
                </view>
                <view class="z-card__jf">
                  <view class="z-card__jf-left">
                    <image
                      style="width: 40rpx; height: 40rpx; margin-right: 8rpx"
                      src="@/static/assets/center/ck.png"
                      mode="scaleToFill"></image>
                    9999+
                  </view>
                  <!-- <view class="z-card__jf-right"><image style="width: 28rpx;height: 28rpx;margin-right: 8rpx;" src="@/static/assets/center/5.png" mode="scaleToFill"></image> 20000</view> -->
                </view>
                <!-- <view class="z-card__info--right">
                                    <u--text size="13" lines="1" type="info" text="3天前"></u--text>
                                </view> -->
              </view>
            </view>
          </view>
        </view>
      </view>

      <view
        class="z-card2"
        v-for="(item, index) in list2"
        :key="item.id"
        @click="goknowledgedetail(item)">
        <view class="z-card__content">
          <view class="z-card__info">
            <view class="z-card__info--title">
              <u--text :lines="2" bold :text="item.title || ''"></u--text>
            </view>
            <view class="z-card__info--desc">
              <view class="z-card__info--desc--left">
                <u--text
                  size="13"
                  lines="1"
                  type="info"
                  :text="item.type"></u--text>
              </view>
              <view class="integral">
                <view class="integral-left">
                  <image
                    style="width: 40rpx; height: 40rpx; margin-right: 8rpx"
                    src="@/static/assets/center/ck.png"
                    mode="scaleToFill"></image>
                  9999+
                </view>
                <!-- <view class="integral-right" style="margin-left: 25rpx;"><image style="width: 28rpx;height: 28rpx;margin-right: 8rpx;" src="@/static/assets/center/5.png" mode="scaleToFill"></image> 20000</view> -->
              </view>
              <!-- <view class="z-card__info--desc--right">
                                <u--text size="13" lines="1" type="info" :text="item.create_time|dateFormat"></u--text>
                            </view> -->
            </view>
          </view>
          <view class="z-card__image">
            <u--image
              :showLoading="true"
              :src="item.url"
              mode="aspectFit"
              width="100%"
              height="80px"
              radius="8">
            </u--image>
          </view>
        </view>
      </view>
    </view>

    <view class="tankuang" v-if="showTankuang">
      <image
        src="http://cdn.cestech.com.cn/BkpKnowledge/img/88939b8e22e5456d8720d83e684be8c1.png"
        style="height: 940rpx">
      </image>
      <view class="text">
        1、在线学习得积分，参与分类基础、信息资讯模块学习生活垃圾分类相关知识，每日最高可获得10分。<br />
        2、学习答题得积分，进入课程体系、答题竞赛模块，完成相应学习内容和挑战答题，每答对一次获得相应积分。<br />
        3、参与分类活动得积分，每有效参与一次获得20分。<br />
        4、参与我要打卡得积分，进行垃圾分类投放拍照打卡，每日可获得蓝芽积分5分，坚持连续打卡21天，赢得蓝芽“大礼包”。<br />
        5、邀请好友得积分，向微信好友发送小程序邀请码，每邀请一名新用户登录酒城蓝芽分分队小程序，获得5分，每日最高可获得50分。<br />
      </view>

      <view class="toShop" @click="toShop"> </view>
    </view>
    <u-modal :show="showModal" @confirm="showModal = false">
      <view class="slot-content">
        <image
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/333351b3b5e040479f31da77d675ef68.png"
          style="height: 980rpx">
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
      showModal: true,
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
  },
  methods: {
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
  },
}
</script>

<style lang="scss" scoped>
.tankuang {
  position: absolute;
  top: 400rpx;
  width: 750rpx;
  left: 60rpx;
  height: 900rpx;

  .text {
    width: 500rpx;
    left: 80rpx;
    margin: 0 auto;
    position: absolute;
    top: 180rpx;
    font-size: 28rpx;
  }

  .toShop {
    position: absolute;
    width: 250rpx;
    height: 80rpx;
    top: 795rpx;
    left: 200rpx;
    // background-color: #fff;
  }
}

.application-list {
  width: 750rpx;
  height: 160rpx;
  background: #fff;
  margin-top: 30rpx;
  margin-bottom: 20rpx;

  .li {
    width: 25%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    word-wrap: normal;
    font-size: 30rpx;
    color: #303133;
  }
}

.z-card__info-ss {
  display: flex;
  align-items: center;
}

.kc {
  .kc-left,
  .kc-right {
    height: calc(60vw - var(--default-padding));

    .kc-right__item:nth-child(2) {
      margin-top: 10px;
    }
  }
}

/deep/.u-grid-item {
  overflow: hidden;
}

.z-card__info--desc {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .integral {
    display: flex;
    align-items: center;
    font-size: 24rpx;

    .integral-left,
    .integral-right {
      display: flex;
      align-items: center;
    }
  }
}

.z-card__jf {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24rpx;
  margin: 6rpx 0;

  .z-card__jf-left,
  .z-card__jf-right {
    display: flex;
    align-items: center;
  }

  .z-card__jf-right {
  }
}

/deep/ .u-modal__content {
  padding: 0 !important;
}
</style>
