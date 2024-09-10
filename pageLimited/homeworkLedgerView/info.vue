<template>
  <view style="position: relative">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" placeholder height="50" leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="作业记录" color="#fff"></u--text>
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
      <u-line margin='12rpx 0'></u-line>

    </view> -->
    <view class="content">
      <view class="title">
        {{ dataList[0].title }}
      </view>
      <view v-if="dataList[0].url" class="imageBox">
        <view class="image" v-for="url,index2 in dataList[0].url.split(',')" :key="  url">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>
      <u-line margin='12rpx 0'></u-line>
      <view v-if="dataList[0].videoPath">
        <video :src="dataList[0].videoPath" width="480rpx" height="360rpx" />
      </view>
      <view v-else>
        暂无视频
      </view>
    </view>
    <view class="content">
      <view class="title">
        {{ dataList[1].title }}
      </view>
      <view v-if="dataList[1].url" class="imageBox">
        <view class="image" v-for="url,index2 in dataList[1].url.split(',')" :key="  url">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>
      <u-line margin='12rpx 0'></u-line>
      <view v-if="dataList[1].videoPath">
        <video :src="dataList[1].videoPath" width="480rpx" height="360rpx" />
      </view>
      <view v-else>
        暂无视频
      </view>
    </view>
    <view class="content">
      <view class="title">
        {{ dataList[2].title }}
      </view>
      <view v-if="dataList[2].url" class="imageBox">
        <view class="image" v-for="url,index2 in dataList[2].url.split(',')" :key="  url">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>
      <u-line margin='12rpx 0'></u-line>
      <view v-if="dataList[2].videoPath">
        <video :src="dataList[2].videoPath" width="480rpx" height="360rpx" />
      </view>
      <view v-else>
        暂无视频
      </view>
    </view>
    <view class="content">
      <view class="title">
        {{ dataList[3].title }}
      </view>
      <view v-if="dataList[3].url" class="imageBox">
        <view class="image" v-for="url,index2 in dataList[3].url.split(',')" :key="  url">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>
      <u-line margin='12rpx 0'></u-line>
      <view v-if="dataList[3].videoPath">
        <video :src="dataList[3].videoPath" width="480rpx" height="360rpx" />
      </view>
      <view v-else>
        暂无视频
      </view>
    </view>
    <view class="content">
      <view class="title">
        {{ dataList[4].title }}
      </view>
      <view v-if="dataList[4].url" class="imageBox">
        <view class="image" v-for="url,index2 in dataList[4].url.split(',')" :key="  url">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>
      <u-line margin='12rpx 0'></u-line>
      <view v-if="dataList[4].videoPath">
        <video :src="dataList[4].videoPath" width="480rpx" height="360rpx" />
      </view>
      <view v-else>
        暂无视频
      </view>
    </view>
    <view class="content">
      <view class="title">
        {{ dataList[5].title }}
      </view>
      <view v-if="dataList[5].url" class="imageBox">
        <view class="image" v-for="url,index2 in dataList[5].url.split(',')" :key="  url">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>
      <u-line margin='12rpx 0'></u-line>
      <view v-if="dataList[5].videoPath">
        <video :src="dataList[5].videoPath" width="480rpx" height="360rpx" />
      </view>
      <view v-else>
        暂无视频
      </view>
    </view>
    <view class="content">
      <view class="title">
        {{ dataList[6].title }}
      </view>
      <view v-if="dataList[6].url" class="imageBox">
        <view class="image" v-for="url,index2 in dataList[6].url.split(',')" :key="  url">
          <image :src="url" mode="aspectFill" @click.stop="ClickImage(url)" />
        </view>
      </view>
      <view v-else> 暂无图片</view>
      <u-line margin='12rpx 0'></u-line>
      <view v-if="dataList[6].videoPath">
        <video :src="dataList[6].videoPath" width="480rpx" height="360rpx" />
      </view>
      <view v-else>
        暂无视频
      </view>
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
      }
    },
    computed: {},
    watch: {},
    onLoad(option) {
      jobInfo(option.id)
        .then(res => {
          this.dataList[0].url = res.data.approvalImage
          this.dataList[1].url = res.data.trainingImage
          this.dataList[2].url = res.data.ventilationImage
          this.dataList[3].url = res.data.toxicDetectionImage
          this.dataList[4].url = res.data.ppeImage
          this.dataList[5].url = res.data.supervisionImage
          this.dataList[6].url = res.data.emergencyImage

          this.dataList[0].videoPath = res.data.approvalVideoPath
          this.dataList[1].videoPath = res.data.trainingVideoPath
          this.dataList[2].videoPath = res.data.ventilationVideoPath
          this.dataList[3].videoPath = res.data.toxicDetectionVideoPath
          this.dataList[4].videoPath = res.data.ppeVideoPath
          this.dataList[5].videoPath = res.data.supervisionVideoPath
          this.dataList[6].videoPath = res.data.emergencyVideoPath
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
  .content {
    font-size: 28rpx;
    font-weight: 500;
  }
</style>
