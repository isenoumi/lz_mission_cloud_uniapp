<!-- 查看视频 -->
<template>
  <view class="container">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" :allTitle="false" placeholder height="55"
        imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/87365097fa96463c8790dc4074fe93d1.png" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="课程详情"></u--text>
        </view>


      </navbar>
    </view>
    <u-loading-page :loading="pageLoading"></u-loading-page>

    <view v-if="!pageLoading" class="MainBox ">
      <!-- 此处为“腾讯视频插件” -->
      <!-- 小程序没有影视音证书就无法上线视频播放相关功能，必须要使用腾讯视频插件，您如果是做demo不考虑上线，可以使用<video>标签 -->
      <!--         <txv-video :vid="videoUrl" playerid="txv1"></txv-video>
 -->

      <view class="">
        <view class="u-p" style="position: relative;">
          <view class="leftBox">
            <u--text :text="detail.name" bold></u--text>
          </view>
        </view>

        <view class="u-p">
          <view class="margin-bottom-sm">
            <u--text text="课程简介" bold></u--text>
          </view>
          <!-- <text class="text-df">{{detail.info}}</text> -->
          {{ detail.info }}
          <mp-html :content="detail.info" />
        </view>
      </view>

      <view class="cssBox">

        <!--         <u-subsection class="u-m-b" :list="subsectionList" :current="subsectionCurrent"
                    @change="subsectionChange" mode="subsection" :activeColor="globalData.theme['$u-primary']">
                </u-subsection> -->

        <uni-segmented-control :current="subsectionCurrent" :values="subsectionList" styleType="text"
          :active-color="globalData.theme['$u-primary']" @clickItem="subsectionChange" />
      </view>


      <view class="cssBox bg-color-transparent" v-if="subsectionCurrent===0">
        <knowledgeCard v-for="(item, index) in detail.knowledge" :key="index" :item="item"
          @click.native="goknowledgedetail(item)"></knowledgeCard>
      </view>
      <view class="cssBox bg-color-transparent" v-if="subsectionCurrent===1">
        <u-button type="primary" v-if="detail.choiceqst_count>0" :disabled="choiceqstBtn.disabled"
          :text="choiceqstBtn.text" @click="gochoiceqstdetail()">
        </u-button>
        <u-empty v-else text="暂无答题" />

        <!-- <u-button type="primary" disabled shape="circle" text="已经答题"></u-button> -->

      </view>
    </view>
  </view>


  </view>
</template>

<script>
  import {
    courseone,
    add_points
  } from '@/common/api.js'
  import knowledgeCard from './components/knowledge-card.vue'
  import navbar from '@/components/navbar.vue'
  export default {
    components: {
      knowledgeCard,
      navbar
    },
    data() {
      return {
        pageLoading: true,

        globalData: getApp().globalData,
        subsectionList: ['课程目录', '课程答题'],
        subsectionCurrent: 0,
        videoUrl: 'x3032spkh1m',
        id: null,
        detail: {
          name: '',
          info: '',
          status: '',
          title: '',
          answer: '',
          is_answer: true,
          create_time: '',
          region: '',
          time: '',
          choiceqst_count: 0,
          choiceqst: [],
          knowledge: [],
        },
        source_type: 1, //来源类型 1进入，2阅读，3答题',
        get_type: 1, //积分获取方式 1课程，2宣教，3文化',
        points_acquisition_rule: 0, //获取积分规则 1进入，2阅读，3答题',
        points: '', //可获得积分
        title: '', //答题名称
      }
    },
    onLoad(option) {
      console.log(option, 'option')
      if (option.id) {
        this.id = option.id
        this.points = Number(option.points)
        this.title = option.title
        this.points_acquisition_rule = option.points_acquisition_rule
        this.getDetail();

        // setTimeout({
        // 	console.log(this.detail.is_answer)
        // },200,)
        // setTimeout(() => {
        //     console.log(this.detail.is_answer)
        // },1000);
        // setTimeout(()=>{

        // },1000)
        // setTimeout(
        //    console.log(this.detail.is_answer),
        //     2000
        // )

        if (option.points_acquisition_rule == "1") {
          if (uni.getStorageSync('avatarUrl')) {
            add_points({
              source_type: 1,
              source_id: this.id,
              get_type: this.get_type,
              points: this.points,
              title: this.title
            }).then(res => {
              if (res.error_code === 0) {
                uni.showToast({
                  icon: 'none',
                  title: '恭喜获得本文章积分'
                })
              }

            })
          }

        }




        //接受事件消息
        uni.$on("refreshCourseDetail", (param) => {
          if (this.detail.knowledge.length > 0 && this.id == param.id) {
            const findIndex = this.detail.knowledge.findIndex((item) => {
              if (item.id == param.knowledge_id) {
                return true;
              }
              return false;
            })
            if (findIndex >= 0) {
              this.$set(this.detail.knowledge[findIndex], 'study', true)
            }
          }
          // this.getDetail()
        })
      } else {
        uni.$u.route({
          type: 'navigateBack'

        })
        return
      }

    },
    onUnload() {
      //接受事件消息
      uni.$off("refreshCourseDetail")
    },
    computed: {
      choiceqstBtn() {
        const returnData = {
          disabled: false,
          text: '前往答题',

        }

        if (!this.detail.answer) {
          returnData.disabled = true;
          returnData.text = '无需答题'
        } else if (this.detail.is_answer) {
          returnData.disabled = true;
          returnData.text = '已完成答题'

        }
        console.log('完成阅读',this.detail)
        // const studyStatus = this.detail.knowledge.some(item => {
        //   return item.study == false
        // })
        // if (studyStatus) {
        //   returnData.disabled = true;
        //   returnData.text = '请完成课程学习'
        // }
        if (returnData.text === '前往答题' || returnData.text === '已完成答题') {
          console.log('我读完了')

          if (this.points_acquisition_rule == "2") {
            if (uni.getStorageSync('avatarUrl')) {
              add_points({
                source_type: 2,
                source_id: this.id,
                get_type: this.get_type,
                points: this.points,
                title: this.title
              }).then(res => {
                if (res.error_code === 0) {
                  uni.showToast({
                    icon: 'none',
                    title: '恭喜获得本文章积分'
                  })
                }
              })
            }

          }



        }
        return returnData
      }
    },
    // 分享小程序
    onShareAppMessage(res) {

    },
    methods: {
      subsectionChange(e) {
        if (this.current != e.currentIndex) {
          // console.log(e.currentIndex,'完成')
          this.subsectionCurrent = e.currentIndex;
        }

      },
      videoErrorCallback: function(e) {
        uni.showModal({
          content: e.target.errMsg,
          showCancel: false
        })
      },
      getDetail() {
        courseone({
          id: this.id
        }).then((res) => {
          console.log(res.result,'我是item')
          this.detail = res.result
          this.pageLoading = false;
          if (res.result.is_answer) {

            if (this.points_acquisition_rule == 2) {
              if (uni.getStorageSync('avatarUrl')) {
                add_points({
                  source_type: 1,
                  source_id: this.id,
                  get_type: this.get_type,
                  points: this.points,
                  title: this.title
                }).then(res => {
                  if (res.error_code === 0) {
                    uni.showToast({
                      icon: 'none',
                      title: '恭喜获得本文章积分'
                    })
                  }
                })
              }

            }



          }

        })

      },
      gochoiceqstdetail() {
        // console.log(this.detail, '00000000000000000000')
        uni.navigateTo({
          url: `/pageB/choiceqst/detail?id=${this.detail.id}&title=${this.detail.name}&points=${this.detail.points}&points_acquisition_rule=${this.detail.points_acquisition_rule}`
        })
      },
      goknowledgedetail(item) {
        console.log(this.detail.points_acquisition_rule, '3333')
        const params = {
          id: item.id,
          study: item.study ? 1 : 0,
          course_id: this.id,
          points_acquisition_rule: this.detail.points_acquisition_rule,
          points: this.detail.points,

        }
        uni.$u.route({
          url: 'pages/course/knowledge',
          params: params
        })
      },
    }
  }
</script>

</style>
<style lang="scss" scoped>
  page {
    background-color: #fff;
  }

  .MainBox {
    width: 100%;

    video {
      width: 750rpx;
    }
  }

  .cssBox {
    padding: 20rpx 30rpx;
    background-color: #FFFFFF;
    margin-bottom: 15rpx;

    /deep/.uni-card {
      margin: 0 !important;
    }
  }

  .rightBox {
    width: 150rpx;
    height: 100%;
    position: absolute;
    right: 20rpx;
    top: 0;
    text-align: center;
    line-height: 120rpx;
    padding: 0;
    background: none;
  }

  .list_title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 30rpx;
    font-weight: 600;
    color: #333333;
  }

  .list_content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
    font-size: 28rpx;
    color: #888;
  }
</style>