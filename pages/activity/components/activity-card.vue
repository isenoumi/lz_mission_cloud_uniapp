<template>
  <view class="z-card4">
    <view class="header" @click="goDetail(item)">
      <view class="img">
        <image
          mode="scaleToFill"
          style="width: 100%; height: 100%"
          :src="imagePath"></image>
        <view class="icon" v-if="item.status == 31">
          <image
            mode="scaleToFill"
            src="/static/assets/task/组 6942.png"></image>
        </view>
        <view class="icon" v-if="item.status == 40">
          <image
            mode="scaleToFill"
            src="/static/assets/task/组 6942(2).png"></image>
        </view>
        <view class="icon" v-if="item.status == 50">
          <image
            mode="scaleToFill"
            src="/static/assets/task/组 6942(1).png"></image>
        </view>
      </view>
      <view class="box-right">
        <view class="left">
          <view class="name">{{ item.name }}</view>
        </view>
        <view class="left">
          <view class="time">开始时间:{{ item.startDate || '' }}</view>
          <!-- <view>{{ item.type | activityTypeText | typeText }}</view> -->
        </view>
      </view>
    </view>
    <!-- <uni-card :title="item.name" :extra="item.status | statusText">
      <view class="u-flex u-row-between">
        <view class="u-flex-1">
          <u--text size="13" :text="`开始时间：${item.startDate}`"> </u--text>
        </view>
        <view>
          <u--text size="13" :text="item.type | activityTypeText | typeText">
          </u--text>
        </view>
      </view>

      <view slot="actions" class="card-actions">
        <view
          class="card-actions-item"
          @click="goDetail(item)"
          v-if="item.status != actStatus.success">
          <u--text size="14" text="查看详情"> </u--text>
        </view>
        <view
          class="card-actions-item"
          @click="subscribe(item)"
          v-if="!item.booked && item.status == actStatus.popular">
          <u--text size="14" text="预约"> </u--text>
        </view>
        <view
          class="card-actions-item"
          v-if="item.booked && item.status == actStatus.popular">
          <u--text size="14" type="info" text="已预约"> </u--text>
        </view>
        <view
          class="card-actions-item"
          @click="goEvaluate(item)"
          v-if="item.status == actStatus.underway">
          <u--text size="14" text="评价活动"> </u--text>
        </view>
        <view
          class="card-actions-item"
          @click="goSuccessDetail(item)"
          v-if="item.status == actStatus.success">
          <u--text size="14" text="查看评价"> </u--text>
        </view>
      </view>
    </uni-card>

    <u-modal
      :show="show"
      @confirm="subscribeSubmit"
      ref="uModal"
      :asyncClose="true"
      showCancelButton
      @cancel="this.show = false"
      title="提示"
      content="      是否预约此活动？">
    </u-modal> -->
  </view>
</template>

<script>
import { actStatus } from '@/common/enums/activity.js'
import authorize from '@/common/auth.js'
import templateIds from '../../../common/template-ids'
import { bookadd } from '@/common/api.js'
import { isLogin } from '@/util/common.js'

export default {
  props: {
    item: {
      default: null,
      type: Object,
    },
    index: {
      type: [String, Number],
      default: '',
    },
  },
  filters: {
    statusText(val) {
      if (val == actStatus.popular) {
        return '待开始'
      } else if (val == actStatus.underway) {
        return '进行中'
      } else if (val == actStatus.success) {
        return '已结束'
      }
      return ''
    },
    typeText(val) {
      return '活动类型：' + val
    },
  },
  data() {
    return {
      show: false,
      actStatus: actStatus,
      modal: {
        item: null,
        img: [],
      },
      imagePath: uni.getStorageSync('quanming'),
    }
  },
  computed: {},
  onLoad() {},
  methods: {
    subscribe() {
      if (uni.getStorageSync('avatarUrl')) {
        this.show = true
        console.log('222')
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

        // console.log('333');
      }
    },
    subscribeSubmit() {
      // if(uni.getStorageSync('avatarUrl')){
      this.$refs.uModal.loading = false
      bookadd({
        bookId: this.item.id,
        bookType: 'act',
      })
        .then(({ data, message, code }) => {
          this.$refs.uModal.loading = false
          this.$emit('changeBooked', {
            index: this.index,
            key: 'booked',
            value: true,
          })

          this.show = false
          uni.showToast({
            title: msg,
            icon: 'none',
          })

          authorize
            .requestSubscribeMessage(templateIds.activity)
            .then(res => {})
        })
        .catch(err => {
          uni.showToast({
            title: '您已预约过该活动',
            icon: 'none',
          })
          this.show = false
        })
        .finally(() => {
          this.$refs.uModal.loading = false
        })
      // }else{
      // 	// this.show=false

      // }
    },
    goDetail(item) {
      if (isLogin()) return
      uni.$u.route({
        url: 'pages/activity_manager/detail',
        params: {
          id: item.id,
          showBtn: 0,
        },
      })
    },
    goSuccessDetail(item) {
      uni.$u.route({
        url: 'pages/activity/evaluate_detail',
        params: {
          id: item.id,
        },
      })
    },
    goEvaluate(item) {
      if (uni.getStorageSync('avatarUrl')) {
        uni.$u.route({
          url: 'pages/activity/evaluate',
          params: {
            id: item.id,
          },
        })
        // console.log('222');
      } else {
        // this.show = false;
        uni.showToast({
          icon: 'none',
          title: '请先登录再评价',
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index',
          })
        }, 1000)

        // console.log('333');
      }
    },
  },
}
</script>

<style lang="scss">
page {
  background: #f5f5f5;
}

.card-actions-item {
  text-align: center;
  font-size: 26rpx !important;
  font-weight: 500;
}

.card-actions {
  width: 660rpx;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;

  .reservationbtn {
    text-align: center;
    line-height: 68rpx;
    width: 381rpx;
    height: 68rpx;
    background: #29ce8c;
    border-radius: 11rpx;
    font-weight: 500;
    color: #fff;
    font-size: 30rpx;
    margin-left: 20rpx;
  }

  .alreadybtn {
    text-align: center;
    line-height: 68rpx;
    width: 401rpx;
    height: 68rpx;
    background: #fafafa;
    border-radius: 11rpx;
    font-weight: 500;
    color: #cccccc;
    font-size: 30rpx;
    margin-left: 20rpx;
  }

  .details {
    text-align: center;
    line-height: 68rpx;
    width: 240rpx;
    height: 68rpx;
    background: #f3f3f3;
    border-radius: 11rpx;
    font-weight: 500;
    color: #333333;
    font-size: 30rpx;
  }

  .evaluatebtn {
    width: 660rpx;
    height: 68rpx;
    background: #fafafa;
    border-radius: 11rpx;
    margin: 0 auto;
    font-size: 30rpx;
    color: #cccccc;
    font-weight: 550;
    line-height: 68rpx;
    text-align: center;
  }
}

/* .box {
  width: 720rpx;
  background: #fff;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
  margin-top: 20rpx;


} */
.header {
  width: 340rpx;
  height: 288rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(57, 57, 57, 0.08);
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin-top: 20rpx;
  .img {
    width: 340rpx;
    height: 178rpx;
    position: relative;
  }
  .icon {
    position: absolute;
    z-index: 9999;
    top: 16rpx;
    left: 20rpx;
    image {
      width: 144rpx;
      height: 48rpx;
    }
  }
  .box-right {
    padding: 22rpx;
    .left {
      .name {
        font-weight: bold;
        font-size: 28rpx;
        color: #262c35;
        line-height: 36rpx;
        width: 296rpx;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; // 默认不换行；
      }
      .time {
        font-weight: 400;
        font-size: 22rpx;
        color: #999999;
        line-height: 40rpx;
      }
    }
  }
}
</style>
