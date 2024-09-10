<!-- 查看视频 -->
<template>
  <view class="container">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#fff" autoBack>
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

        <view class="z-form-item" v-for="(item, index) in enterprices" :key="index">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text :text="item.label+':'"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail[item.props]"> </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

      </view>
    </view>
  </view>
</template>

<script>
  import {
    getInfo
  } from './api/index.js'
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
        enterprices: [{
            label: '有限空间名称',
            props: 'name',
            width: 220,
          },
          {
            label: '所在区域',
            props: 'area',
            width: 220,
          },
          {
            label: '编号',
            props: 'number',
            width: 120,
          },
          {
            label: '有限空间类型',
            props: 'spaceType',
            width: 220,
          },
          {
            label: '有限空间形状/体积',
            props: 'shapeVolume',
            width: 120,
          },
          {
            label: '主要介质名称',
            props: 'mainMedium',
            width: 120,
          },
          {
            label: '主要危险有害因素',
            props: 'mainHazards',
          },
          {
            label: '作业分级',
            props: 'jobGrading',
            width: 220,
          },
          {
            label: '管理责任人',
            props: 'managementResponsiblePerson',
            width: 120,
          },
          {
            label: '作业责任人',
            props: 'workResponsiblePerson',
            width: 120,
          },
        ],
      }
    },
    onLoad(option) {
      getInfo({
          id: option.id
        })
        .then(res => {
          this.detail = res.data
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