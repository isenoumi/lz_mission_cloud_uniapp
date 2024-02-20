<template>
  <view>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <view style="height: 20rpx;"></view>
      <view class="list" v-for="(item,index) in listData" :key="index">
        <view class="list-left">
          <view class="name">{{item.title}}</view>
          <view class="time">{{item.create_time}}</view>
        </view>
        <view class="list-right">+{{item.points}}</view>
      </view>
    </mescroll-body>

  </view>
</template>

<script>
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  import {
    points_log
  } from '@/common/api.js'
  export default {
    mixins: [MescrollMixin], // 使用mixin
    data() {
      return {
        listData: []
      }
    },


    created() {
      console.log('尽量')
      // ranking({}).then(res=>{
      // 	console.log(res,'res')
      // })
    },
    onLoad() {
      console.log('尽量')


    },
    mounted() {

    },
    methods: {
      getIntegral() {
        uni.request({
          url: 'http://192.168.100.61:8089/mission_b/xcx_api/bkbChoiceqst_answer/mallTotalPoints',
          data: {
            // phone: uni.getStorageSync("phone"),
            phone: '18780026435'
          },
          method: "GET",
          success: (res) => {
            console.log('jifen', res);

          }
        })
      },

      /*下拉刷新的回调 */
      downCallback() {
        this.mescroll.resetUpScroll()
      },
      /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
      upCallback(page) {
        console.log(page);
        //联网加载数据
        points_log({
          page: page.num,
          list_rows: page.size,
        }).then(res => {
          // console.log(res.data.data.records, 'res');

          //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endSuccess(res.data.data.length);

          //设置列表数据
          if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
          this.listData = this.listData.concat(res.data.data); //追加新数据
          // this.listData.forEach((item) => {
          // 	console.log('item', item);
          // 	// item.credits = item.credits.parseInt()
          // })

        }).catch(() => {
          //联网失败, 结束加载
          this.mescroll.endErr();
        })
      },
    }
  }
</script>

<style lang="scss">
  page {
    background: #f5f5f5;
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
        width: 300rpx;
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