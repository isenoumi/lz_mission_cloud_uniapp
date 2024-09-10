<template>
  <view>
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        height="55"
        placeholder
        :allTitle="false"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="我的积分" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="u-demo-block">
      <view class="u-demo-block__content">
        <u-sticky bgColor="#fff">
          <u-tabs
            lineColor="#39d48f"
            lineWidth="80rpx"
            @click="click"
            :list="list6"
            :current="current"
            :scrollable="false"
            :activeStyle="{
              color: '#39d48f',
              fontWeight: 'bold',
              transform: 'scale(1.05)',
            }"
            :inactiveStyle="{
              color: '#333',
              transform: 'scale(1)',
            }">
          </u-tabs>
        </u-sticky>
      </view>
    </view>
    <!-- 积分明细 -->
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
      v-if="switchs === 0">
      <view style="height: 20rpx"></view>
      <view class="list" v-for="(item, index) in listData" :key="index">
        <view class="list-left">
          <!-- <view class="name">{{ item.type }}</view> -->
          <view class="name">{{ item.title || item.type }}</view>
          <view class="time">{{ item.createTime }}</view>
        </view>
        <view class="list-right">{{ item.integral }}</view>
      </view>
    </mescroll-body>
    <!-- 积分收支 -->
    <view v-if="switchs === 1">
      <view style="height: 15rpx"></view>
      <view
        class="income"
        v-for="item in shoplist"
        @click="shop_details(item.orderItem.orderNumber)">
        <view class="income-left">
          <view>
            <image
              :src="item.orderItem.pic"
              mode="scaleToFill"
              style="width: 140rpx; height: 140rpx">
            </image>
          </view>
          <view class="shop-name">
            <view
              class="prodname"
              style="color: #333; font-size: 30rpx; font-weight: 550">
              {{ item.orderItem.prodName }}
            </view>
            <view style="margin: 7rpx 0"
              >{{ item.orderItem.skuName }}*{{ item.order.productNums }}</view
            >
            <view>{{ item.orderItem.recTime }}</view>
          </view>
        </view>
        <view class="income-right">
          <view v-if="item.order.status === 0" class="status" style="color: red"
            >待发货</view
          >
          <view
            v-if="item.order.status === 1"
            class="status"
            style="color: #39d48f"
            >已发货</view
          >
          <view
            v-if="item.order.status === 2"
            class="status"
            style="color: silver"
            >已完成</view
          >
          <view class="jf">{{ item.bkbOperatingRecords.points }}</view>
        </view>
      </view>
    </view>
    <!-- <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" v-if="switchs===1">
			<view style="height: 20rpx;"></view>
			<view class="list" v-for="(item,index) in listData" :key="index">
				<view class="list-left">
					<view class="name">{{item.title}}222</view>
					<view class="time">{{item.createTime}}</view>
				</view>
				<view class="list-right">+{{item.points}}</view>
			</view>
		</mescroll-body> -->
    <!-- 积分规则 -->
    <view v-if="switchs === 1">
      <view class="txt">
        <!-- 1、在线学习得积分，参与分类基础、信息资讯模块学习生活垃圾分类相关知识，每日最高可获得10分。<br />
        2、学习答题得积分，进入课程体系、答题竞赛模块，完成相应学习内容和挑战答题，每答对一次获得相应积分。<br />
        3、参与分类活动得积分，每有效参与一次获得20分。<br />
        4、参与我要打卡得积分，进行垃圾分类投放拍照打卡，每日可获得蓝芽积分5分，坚持连续打卡21天，赢得蓝芽“大礼包”。<br />
        5、邀请好友得积分，向微信好友发送小程序邀请码，每邀请一名新用户登录酒城蓝芽分分队小程序，获得5分，每日最高可获得50分。<br /> -->
        在线阅读得积分：参与分类基础、信息资讯学习生活垃圾分类相关知识学习，每次学习可获得10分，每日最高可获30分。<br />
        视频学习得积分：观看生活垃圾分类视频可获得10分，每日最高可获得20分。<br />
        答题竞赛得积分：进行生活垃圾分类知识答题，答对5题可获得10分，每日最高可获得20分。<br />
        分类打卡得积分：在生活垃圾分类进行分类投放拍照打卡，每次正确投放可获得30分，每日最高可获得30分。<br />
        邀请好友得积分：向微信好友发送小程序邀请码，每邀请一名新用户，每邀请一名新用户注册“酒城蓝芽分分队”小程序即可获得10分，每日最高可获得30分。
        <br />
        参与活动得积分：通过参与专项活动获得积分，例如：参与生活垃圾分类宣传周活动，可获得相应积分，具体积分规则以活动方案为准。
      </view>
    </view>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
import { points_log } from '@/common/api.js'
export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      current: 0,
      listData: [],
      switchs: 0,
      shoplist: [
        // {
        // 	url: '../../static/assets/head-bg3.jpg',
        // 	name: '商品名称',
        // 	gg: '白色*3',
        // 	time: '2023/6/29 18:00:00',
        // 	jf: '-1000',
        // 	status: 1
        // },
      ],
      list6: [
        {
          name: '积分收支',
        },
        // {
        //   name: '兑换记录',
        // },
        {
          name: '积分规则',
        },
      ],
    }
  },

  created() {
    // console.log(this.switchs, this.current, '尽量')
    // if (this.current === 0) {
    // 	this.switchs == 0
    // } else if (this.current === 1) {
    // 	this.switchs == 1
    // } else if (this.current === 2) {
    // 	this.switchs == 2
    // }
    // ranking({}).then(res=>{
    // 	console.log(res,'res')
    // })
  },
  onLoad(options) {
    if (options.switchs) {
      this.current = 1
      console.log(options.switchs, this.switchs, this.current, '尽量')
      this.pointRecord()
    }
    if (this.current === 0) {
      this.switchs = 0
      console.log(this.switchs, '111')
    } else if (this.current === 1) {
      this.switchs = 1
      console.log(this.switchs, '111')
    } else if (this.current === 2) {
      this.switchs = 2
      console.log(this.switchs, '111')
    }
  },
  mounted() {},
  methods: {
    shop_details(value) {
      console.log(value)
      uni.navigateTo({
        url: `/pageB/integral/details?orderNumber=${value}`,
      })
    },
    click(item) {
      console.log('item', item)
      this.switchs = item.index
      // if (item.index === 1) {
      //   this.pointRecord()
      // }
    },
    pointRecord() {
      uni.request({
        url: `https://lz.api.cestech.com.cn:8150/mission_b/p/order/pointRecord`,
        data: {
          userId: uni.getStorageSync('users').id,
        },
        // header: {
        // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM'
        // },
        method: 'GET',
        success: res => {
          console.log(res.data.result, '列表')
          this.shoplist = res.data.result
        },
      })
    },
    /*下拉刷新的回调 */
    downCallback() {
      this.mescroll.resetUpScroll()
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      console.log(page)
      const phone = uni.getStorageSync('iphone')
      uni.request({
        url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbAppUser/pointsHistory?phone=${phone}&pageNo=${page.num}&pageSize=${page.size}`,
        method: 'GET',
        success: res => {
          console.log(res.data.result.records)

          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endSuccess(res.data.result.records.length)

          //设置列表数据
          if (page.num == 1) this.listData = [] //如果是第一页需手动制空列表
          this.listData = this.listData.concat(res.data.result.records) //
        },
        complete: () => {
          this.mescroll.endErr()
        },
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background: #f5f5f5;
}

.txt {
  border-radius: 20rpx;
  height: 1000rpx;
  width: 94%;
  background: #fff;
  margin: 20rpx auto;
  font-size: 28rpx;
  line-height: 60rpx;
  padding: 20rpx 40rpx 0 40rpx;
  font-weight: 550;
}

.income {
  width: 750rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 35rpx;
  margin-bottom: 15rpx;

  .income-left {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: silver;

    .shop-name {
      margin-left: 20rpx;

      .prodname {
        width: 280rpx;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; // 默认不换行；
      }
    }
  }

  .income-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: silver;
    font-size: 32rpx;

    .status {
      font-size: 34rpx;
      font-weight: 550;
    }

    .jf {
      margin-top: 10rpx;
    }
  }
}

.u-demo-block__content {
  background: #fff;
  padding-bottom: 20rpx;
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30rpx 45rpx;
  background: #fff;
  margin-bottom: 15rpx;

  .list-left {
    .name {
      font-size: 36rpx;
      font-weight: 600;
      width: 450rpx;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; // 默认不换行；
    }

    .time {
      font-size: 26rpx;
      color: #666;
      margin-top: 15rpx;
    }
  }

  .list-right {
    color: blue;
  }
}
</style>
