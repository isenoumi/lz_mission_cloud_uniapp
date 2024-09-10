<template>
  <view>
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#fff" :hasImage="false" bgColor="transparent" autoBack :allTitle="false">
          <view class="u-nav-slot" slot="center">
            <u--text text="泸州城管领域有限空间安全管理系统" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <image style="width: 100%; position: absolute; top: 0rpx; z-index: -99" :src="imageObj.quanmingTop" mode="scaleToFill" />
    <!-- <image :src="imagePath" mode="scaleToFill" style="
        display: block;
        width: 696rpx;
        height: 332rpx;
        margin: 10rpx auto;
      " /> -->
    <!-- <view class="resultBox">
      <view class="imageBox">
        <view class="imageItem">
          <view class="itemTitle">提交作业台账</view>
          <image @click="toHomeworkLedger" class="image" :src="imageObj.activity" mode="scaleToFill" />
        </view>

        <view class="imageItem">
          <view class="itemTitle">查看作业记录</view>
          <image class="image" @click="toHomeworkLedgerView" :src="imageObj.answer" mode="scaleToFill" />
        </view>
        <view class="imageItem">
          <view class="itemTitle">提交自查台账</view>
          <image class="image" @click="toInspectionLedger" :src="imageObj.questionnaire" mode="scaleToFill" />
        </view>
      </view>
    </view> -->
    <!-- <view style="height: 96rpx;"></view> -->

    <view class="resultBox2">
      <view class="enterpriseInfo">
        <view>
          单位（企业）名称：{{enterpriseInfo.name}}
        </view>
        <view>
          密闭设备：<span>{{ enterpriseInfo.mibi }} </span> 地下有限空间： <span>
            {{ enterpriseInfo.dixia }}
          </span> 地上有限空间：<span>{{ enterpriseInfo.dishang }}</span>
        </view>
      </view>
      <view style="height: 2rpx;width: 100%;background: #999;"></view>
      <view class="title">有限空间作业</view>
      <view class="imageBox">
        <view class="imageItem">

          <image @click="toHomeworkLedger" style="width: 76rpx; height: 76rpx;margin: 16rpx auto 20rpx;" class="image" :src="imageObj.activity" mode="scaleToFill" />
          <view class="itemTitle">新建作业</view>
        </view>
        <!-- <view class="imageItem">

          <image class="image" @click="toInspectionLedger" :src="imageObj.questionnaire" mode="scaleToFill" />
          <view class="itemTitle">自查台账</view>
        </view> -->
        <view class="imageItem">
          <!-- <u-badge type="error" count="7" :offset="[0,0]"> </u-badge> -->
          <view class="badge" v-if="incompleteNum>0">{{ incompleteNum<=99?incompleteNum: '99+'}}</view>
          <image class="image" @click="toHomeworkLedgerView('暂存')" src="/static/assets/Limited/未完成任务.png" mode="scaleToFill" />

          <view class="itemTitle">正在进行作业</view>
        </view>
        <view class="imageItem">
          <view class="badge" v-if="completeNum>0">{{ completeNum<=99?completeNum: '99+'}}</view>
          <image class="image" @click="toHomeworkLedgerView('完成')" src="/static/assets/Limited/完成任务.png" mode="scaleToFill" />
          <view class="itemTitle">已完成作业</view>
        </view>

      </view>
    </view>
    <view class="resultBox2">
      <view class="title">有限空间问题自查</view>
      <view class="imageBox">
        <view class="imageItem">
          <image class="image" @click="toInspectionLedger" :src="imageObj.questionnaire" mode="scaleToFill" />
          <view class="itemTitle">自查台账</view>
        </view>
        <view class="imageItem">
          <image class="image" @click="toSelfExamination" :src="imageObj.answer" mode="scaleToFill" />
          <view class="itemTitle">台账记录</view>
        </view>

      </view>
    </view>
    <view class="resultBox2">
      <view class="title">有限空间辨识</view>
      <view class="imageBox">
        <view class="imageItem">
          <image class="image" @click="toIdentificationLedger" src="/static/assets/Limited/业务配置 .png" mode="scaleToFill" />
          <view class="itemTitle">查看台账</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getRecord } from '../homeworkLedgerView/api'
  import { getEnterpriseInfo } from './api'
  export default {
    data() {
      return {
        pageLoading: true,
        globalData: getApp().globalData,
        btnLoading: false,
        id: '',
        detail: {
          content: '',
          createTime: '',
        },
        enterpriseInfo: {
          name: uni.getStorageSync('enterprise').companyId,
          mibi: '',
          dixia: '',
          dishang: '',
        },
        incompleteNum: 0,
        completeNum: 0,
        imagePath: uni.getStorageSync('quanmingNo'),
        imageObj: {
          quanmingTop: uni.getStorageSync('quanmingTop'),
          // activity: uni.getStorageSync('activity'),
          // check: uni.getStorageSync('check'),
          // answer: uni.getStorageSync('answer'),
          //  questionnaire: uni.getStorageSync('questionnaire'),
          activity: '/static/assets/Limited/作业台账.png',
          answer: '/static/assets/Limited/历史记录.png',
          questionnaire: '/static/assets/Limited/企业台账.png',
        },
      }
    },
    computed: {},
    filters: {},
    onLoad(option) {
      this.updateWeChat()
      console.log(option)
      this.detail.content = option.content
      this.detail.createTime = option.createTime
      this.id = option.id
      this.reads()
      getEnterpriseInfo({ name: uni.getStorageSync('enterprise').companyId }).then(res => {
        this.enterpriseInfo.mibi = res.data.confinedDevices
        this.enterpriseInfo.dixia = res.data.limitedSpaceUnderground
        this.enterpriseInfo.dishang = res.data.limitedSpaceAboveGround
      })
    },
    onShow() {
      this.getCompleteNum()
    },
    onReady() {},
    methods: {
      getCompleteNum() {
        getRecord({
          companyId: uni.getStorageSync('enterprise').companyId,
          status: '暂存',
        })
          .then(result => {
            this.incompleteNum = result.data.total
          })
          .catch(err => {})
        getRecord({
          companyId: uni.getStorageSync('enterprise').companyId,
          status: '完成',
        })
          .then(result => {
            this.completeNum = result.data.total
          })
          .catch(err => {})
      },
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
      toHomeworkLedger() {
        uni.navigateTo({ url: '/pageLimited/homeworkLedger/start' })
      },
      toHomeworkLedgerView(type) {
        uni.navigateTo({ url: '/pageLimited/homeworkLedgerView/index' + `?type=${type}` })
      },
      toInspectionLedger() {
        uni.navigateTo({ url: '/pageLimited/inspectionLedger/index' })
      },
      toIdentificationLedger() {
        uni.navigateTo({ url: '/pageLimited/identificationLedger/list' })
      },
      toSelfExamination() {
        uni.navigateTo({ url: '/pageLimited/inspectionLedger/list' })
      },
      toCheck() {
        uni.navigateTo({ url: '/pageB/signIn/signIn' })
      },
      reads() {
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/message/status`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            id: this.id,
          },
          method: 'GET',
          success: res => {},
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .infoBox {
    width: 688rpx;
    background: #ffffff;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 32rpx auto;
    .title {
      font-weight: bold;
      font-size: 32rpx;
      color: #333333;
      line-height: 48rpx;
      text-align: left;
      padding: 32rpx;
    }
    .imageBox {
      display: flex;
      justify-content: space-between;

      .imageBoxLeft {
        .image {
          width: 276rpx;
          height: 304rpx;
          display: block;
        }
      }

      .imageBoxRigth {
        display: flex;
        justify-content: space-between;
        flex-flow: column;
        .image {
          width: 404rpx;
          height: 144rpx;
          display: block;
        }
      }
    }
  }

  .resultBox {
    width: 688rpx;
    background: #ffffff;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 20rpx auto;
    margin-top: 160rpx;
    .title {
      font-weight: bold;
      font-size: 30rpx;
      color: #333333;
      line-height: 48rpx;
      text-align: left;
      padding: 32rpx;
    }
    .imageBox {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .image {
        width: 340rpx;
        height: 224rpx;
        display: block;
        margin-top: 16rpx;
      }
    }
    .imageItem {
      position: relative;
      .itemTitle {
        position: absolute;
        background: #fff;
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        font-weight: 500;
        top: 46rpx;
        left: 88rpx;
      }
    }
  }
  .resultBox2 {
    width: 688rpx;
    background: #ffffff;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 20rpx auto;
    margin-top: 36rpx;
    .title {
      font-weight: bold;
      font-size: 32rpx;
      color: #333333;
      line-height: 48rpx;
      text-align: left;
      padding: 16rpx;
    }
    .imageBox {
      display: flex;
      justify-content: left;
      .imageItem {
        width: 236rpx;
        text-align: center;
        position: relative;
        .itemTitle {
          font-size: 28rpx;
          font-weight: 600;
        }
        .image {
          display: inline-block;
          width: 84rpx;
          height: 84rpx;
          display: block;
          margin: 0 auto;
          margin-top: 12rpx;
          margin-bottom: 16rpx;
        }
      }
    }
  }
  .badge {
    font-size: 18rpx;
    line-height: 18rpx;
    color: #fff;
    background-color: #fa3534;
    border-radius: 50%;
    padding: 4rpx;
    width: auto;
    position: absolute;
    right: 72rpx;
    top: 0;
  }
  .enterpriseInfo {
    font-size: 26rpx;
    padding: 16rpx;
    line-height: 48rpx;
    span {
      color: #fa3534;
      display: inline-block;
      margin-right: 10rpx;
    }
  }
</style>
