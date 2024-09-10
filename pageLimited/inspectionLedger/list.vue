<template>
  <view style="position: relative">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" placeholder height="50" leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="自查台账记录" color="#fff"></u--text>
        </view>
      </navbar>
    </view>

    <z-paging ref="paging" v-model="dataList" @query="queryList" use-page-scroll fixed>
      <view class="content">
        <view class="rankingTitle">
          <view>企业名称</view>
          <view style="margin-left: 124rpx">所在区域</view>
          <view style="width: 84rpx">操作</view>
        </view>
        <u-cell-group>
          <view class="" v-for="(item, index) in dataList" :key="index">
            <view class="item">
              <view class="itemLeft">
                <view class="title">{{ item.companyName }}</view>
                <view class="time">{{ item.createTime }}</view>
              </view>
              <view class="itemRight">
                <view class="title">{{ item.area }}</view>
                <view class="title actionBox">
                  <!-- <view class="action" style="margin-right: 24rpx;" v-if="item.status== '暂存' " @click="edit(item)">修改
                  </view> -->

                  <view class="action" @click="view(item)">查看</view>
                </view>
              </view>
            </view>
            <view class="line"> </view>
          </view>
        </u-cell-group>
      </view>
    </z-paging>
  </view>
</template>

<script>
  import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
  import { mapState } from 'vuex'

  import { getRecord } from './api'
  export default {
    components: {},
    mixins: [ZPMixin],
    data() {
      return {
        globalData: getApp().globalData,
        dataList: [],
        type: '完成',
        carbon: 0,
        points: 0,
        ranking: 0,
        allPoints: 0,
      }
    },
    computed: {},
    watch: {},
    onLoad(option) {
      this.type = option.type
      uni.$on('refreshList', () => {
        this.$refs.paging.reload()
      })
    },
    onShow() {
      this.queryList(1, 15)
    },
    onUnload() {
      uni.$off('refreshList')
    },
    methods: {
      queryList(page, list_rows) {
        this.$refs.paging.complete(this.dataList)
        // return
        getRecord({
          pageNo: page,
          pageSize: list_rows,
          companyId: uni.getStorageSync('enterprise').companyId,
        })
          .then(result => {
            this.$refs.paging.complete(result.data.records)
          })
          .catch(err => {
            this.$refs.paging.complete([])
          })
        // uni.request({
        //   url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/points_log?type=${this.type}`,
        //   header: {
        //     'x-Resource-Token': uni.getStorageSync('xtoken'),
        //   },
        //   data: {
        //     pageNo: page,
        //     pageSize: list_rows,
        //     // UserId:uni.getStorageSync('users').id
        //   },
        //   method: 'GET',
        //   success: res => {
        //     console.log('asda', res)
        //     // this.$refs.paging.complete(res.data.result.records)
        //     this.$refs.paging.complete(this.dataList)
        //   },
        // })
      },
      view(item) {
        uni.navigateTo({
          url: '/pageLimited/inspectionLedger/info?id=' + item.id,
        })
      },
      edit(item) {
        uni.navigateTo({
          url: `/pageLimited/homeworkLedger/index?id=${item.id}&limitedId=${item.limitedId}`,
        })
      },
      toRanking() {
        uni.navigateTo({
          url: '/pageA/ranking/index',
        })
      },
      goDetail(item) {
        console.log(item, '消息')
        if (!item.is_read) {
          this.$store.commit('subtractMessage', 1)
        }
        uni.$u.route({
          url: 'pageC/message/detail',
          params: {
            id: item.id,
            content: item.content,
            createTime: item.createTime,
          },
        })
        item.is_read = 1
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
    margin: 20rpx auto;
    border-radius: 12rpx;
  }

  .rankingTitle {
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 28rpx;
    color: #999999;
    padding: 0 20rpx;
    padding-left: 40rpx;
    height: 64rpx;
    line-height: 64rpx;
  }

  .item {
    position: relative;
    width: 688rpx;
    background: #ffffff;
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .itemLeft {
      width: 50%;

      .title {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; // 默认不换行；
      }

      .time {
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        margin-top: 20rpx;
      }
    }

    .itemRight {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 48%;

      .title {
        font-weight: 400;
        font-size: 28rpx;
        color: #000;
      }

      .actionBox {
        width: 180rpx;
        display: flex;
        justify-content: flex-end;
        /* justify-content: space-around; */
        .action {
          color: #999;
          width: 80rpx;
          /* background: #3bcf99;
                                                            height: 64rpx;
                                                            line-height: 64rpx;
                                                            text-align: center;
                                                            width: 120rpx;
                                                            border-radius: 24rpx; */
        }
      }
    }
  }

  .line {
    width: 624rpx;
    height: 1rpx;
    background: #ebebeb;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 10rpx auto;
  }

  .pointsBox {
    color: #ffffff;
    width: 688rpx;
    margin: 0 auto 0;

    .points {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 20rpx;
      font-size: 28rpx;
    }
  }

  .ranking {
    margin: 10rpx auto;
    width: 688rpx;
    background: #ffffff;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    z-index: 999999;
    padding: 40rpx 20rpx 20rpx;

    .rankingItemBox {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .rankingItem {
        width: 200rpx;
        text-align: center;
      }

      .title {
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
      }

      .num {
        font-weight: bold;
        font-size: 52rpx;
        color: #333333;
      }
    }

    .itemBottom {
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      font-size: 28rpx;
      color: #333333;
      line-height: 40rpx;
      padding: 0 20rpx;
    }

    .line {
      width: 624rpx;
      height: 1rpx;
      background: #ebebeb;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 20rpx auto;
    }
  }
</style>