<!-- 查看视频 -->
<template>
  <view class="container">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#fff" @leftClick="leftClick">
        <view class="u-nav-slot" slot="center">
          <u--text text="辨识台账" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <u-loading-page :loading="pageLoading"></u-loading-page>

    <view v-if="!pageLoading">
      <!-- <image
        :src="imagePath"
        mode="scaleToFill"
        style="
          display: block;
          width: 696rpx;
          height: 332rpx;
          margin: 10rpx auto;
        " /> -->
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
              <u--text wordWrap="anywhere" :text="detail.type | activityTypeText">
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
              <u--text wordWrap="anywhere" :text="detail.activityPersistentTime">
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
</template>

<script>
  import { getInfo } from './api'
  export default {
    components: {},
    data() {
      return {
        users: {},
        phone: uni.getStorageSync('phone'),
        title: '',
        speaker: '',
        pageLoading: true,
        globalData: getApp().globalData,
        id: null,
        address: '',
        detail: {
          name_of_activity: '',
          type: '',
          create_time: '',
          start_date: '',
        },
        imagePath: uni.getStorageSync('quanming'),
      }
    },
    onLoad(option) {
      getInfo({ id: uni.getStorageSync('enterprise').id })
        .then(res => {
          this.detail = res.data.record[0]
        })
        .finally(() => {
          this.pageLoading = false
        })
    },
    onUnload() {},
    computed: {},
    methods: {},
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
