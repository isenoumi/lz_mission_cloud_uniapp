<!-- 新闻 详情 -->
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
    <view v-if="!pageLoading" style="background-color: #FFFFFF;padding: 30rpx 30rpx 30rpx 30rpx;">
      <view class="titleBox text-xl text-black text-bold">{{detail.title||''}}</view>
      <view class="u-m-t u-m-b">
        <u--text type="info" size="13" :text="detail.create_time|dateFormat">
        </u--text>
      </view>
      <u-line></u-line>
      <!-- 中间文章区域 -->
      <view class="u-m-t">
        <mp-html :content="detail.content" />
      </view>
    </view>

  </view>
</template>

<script>
  import {
    courseknowledgeread,
    knowledge,
    add_points,
  } from '@/common/api.js'

  export default {

    data() {
      return {
        id: null,
        study: false,
        pageLoading: true,
        detail: {
          title: '',
          create_time: '',
          content: '',
          type: ''
        },
        relation: {
          course_id: null,
        },
        points_acquisition_rule: '',
        source_type: 1, //来源类型 1进入，2阅读，3答题',
        get_type: 1, //积分获取方式 1课程，2宣教，3文化',
        points_acquisition_rule: 0, //获取积分规则 1进入，2阅读，3答题',
        points: '', //可获得积分
        title: '', //答题名称
        ids: '',
        flag: 1, // 1到底部发请求 2不发请求

      }
    },
    onReachBottom() {
      // console.log(this.status,'到底了')
      if (this.flag == 1) {
        if (this.points_acquisition_rule == "2") {
          this.source_type = 2
          this.add_points();
        }
        // this.add_points()
        // console.log(this.flag,'this.flag')
      }
      this.flag = 2
      // console.log(this.flag,'this.flag')
    },
    onLoad(option) {
      console.log(option.points_acquisition_rule, 'option')
      this.points = option.points
      this.points_acquisition_rule = option.points_acquisition_rule
      if (option.id && option.course_id && option.study) {
        this.id = option.id
        this.relation.course_id = option.course_id
        this.study = option.study
        this.getDetail();
      } else {
        uni.$u.route({
          type: 'navigateBack'

        })
        return
      }

    },
    computed: {

    },
    methods: {
      onShareAppMessage(res) {
        return {
          title: '',
        }
      },
      getDetail() {
        knowledge({
          id: this.id
        }).then((res) => {
          console.log(res.data, 'jilu')
          this.pageLoading = false;
          this.detail = res.data
          this.title = res.data.title
          this.ids = res.data.id
          if (this.points_acquisition_rule == "1") {
            this.add_points()
          }
          // 课程阅读记录
          if (this.study == 0) {
            this.courseknowledgeread()
          }

        })

      },
      add_points() {
        add_points({
          source_type: this.source_type,
          source_id: this.ids,
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
      },
      courseknowledgeread() {
        courseknowledgeread({
          id: this.relation.course_id,
          knowledge_id: this.id
        }).then((res) => {
          uni.$emit("refreshCourseDetail", {
            id: this.relation.course_id,
            knowledge_id: this.id
          })
        })
      }


    }
  }
</script>

<style lang="scss" scoped>
  button::after {
    border: none;
    background: transparent;
  }

  uni-button {
    background: transparent;
  }

  .container {
    background-color: #f2f2f2;
    width: 750rpx;

  }

  .solid {
    border-radius: 50rpx;
    text-indent: 12rpx;
  }


  .other-content {
    padding: 30rpx;

    .titleName {
      text-align: center;
      font-size: 36rpx;
      color: #333;
      margin-bottom: 15rpx;
    }

    .titleOther {
      text-align: center;
      font-size: 26rpx;
      color: #8799a3;
      margin-bottom: 15rpx;
    }

    .image {

      margin: 20rpx auto;
      display: block;
    }

    .explainBox {
      color: #8799a3;
    }

    .explainItem {
      margin-bottom: 16rpx;
    }
  }
</style>