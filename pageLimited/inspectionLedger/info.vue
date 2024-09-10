<template>
  <view style="position: relative">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" placeholder height="50" leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="自查台账信息" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <!-- <view class="content" v-for="(item, index) in dataList " :key="index">
      <view class="title">
        {{ item.title }}
      </view>
      <view v-if="item.url" class="imageBox">
        <view class="image" v-for="url,index2 in item.url.split(',')" :key="  url">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>

    </view> -->
    <view class="content">
      <!-- <view class="title">
        {{ dataList[0].title }}
      </view> -->
      <view v-if="selfExaminationImage" class="imageBox">
        <view class="image" v-for="url,index in selfExaminationImage.split(',')" :key="index">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>
    </view>

    <view style="height: 80rpx;"></view>
  </view>
</template>

<script>
  import { jobInfo } from './api'
  export default {
    components: {},
    data() {
      return {
        globalData: getApp().globalData,
        dataList: [
          {
            title: '作业方案审批情况',
            url: '',
          },
          {
            title: '作业人员培训情况',
            url: '',
          },

          {
            title: '作业过程通风情况',
            url: '',
          },
          {
            title: '有毒有害气体检测情况',
            url: '',
          },
          {
            title: '防护用品配备情况',
            url: '',
          },
          {
            title: '作业监护到位情况',
            url: '',
          },
          {
            title: '应急救援准备情况',
            url: '',
          },
        ],
        type: 0,
        selfExaminationImage: '',
      }
    },
    computed: {},
    watch: {},
    onLoad(option) {
      jobInfo(option.id)
        .then(res => {
          this.selfExaminationImage = res.data.selfExaminationImage
        })
        .catch(err => {})
    },
    onUnload() {
      uni.$off('refreshList')
    },
    methods: {
      ClickImage(PhotoAddress) {
        uni.previewImage({
          urls: [PhotoAddress], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
          current: '', // 当前显示图片的http链接，默认是第一个
          success: function (res) {},
          fail: function (res) {},
          complete: function (res) {},
        })
      },
    },
  }
</script>
<style>
  page {
    background: #f5f5f5;
  }
</style>

<style lang="scss" scoped>
  .content {
    width: 688rpx;
    background: #ffffff;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 20rpx auto;
    padding: 36rpx 18rpx;
    .title {
      font-weight: 600;
      font-size: 28rpx;
      margin-bottom: 16rpx;
    }
    .imageBox {
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
    }
    .image {
      image {
        width: 200rpx;
        height: 200rpx;
        margin: 8rpx;
      }
    }
  }
</style>
