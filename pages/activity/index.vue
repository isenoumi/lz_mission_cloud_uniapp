<template>
  <view>
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#000"
        :allTitle="false"
        imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/d482cda0265645be8183f5d6e6b24925.png"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="活动中心" color="#000"></u--text>
        </view>
      </navbar>
      <!--         :hasImage="false"
        bgColor="transparent" -->
    </view>
    <image
      style="
        width: 100%;
        height: 704rpx;
        position: absolute;
        top: 0rpx;
        z-index: -99;
      "
      src="https://oms.cestech.com.cn/BkpKnowledge/img/6a0ab629da6d47c58f1e51cd826e603e/组 6937.png"
      mode="scaleToFill" />
    <!-- <locationNavbar title="活动管理" maxWidth="250rpx" /> -->
    <!-- <view class="u-p">
      <uni-segmented-control
        :current="subsectionCurrent"
        :values="subsectionList"
        :active-color="globalData.theme['$u-primary']"
        @clickItem="subsectionChange" />
    </view> -->
    <view class="myTabbar">
      <!-- <u-tabs
        lineColor="#39d48f"
        :scrollable="false"
        :list="subsectionTabs"
        lineWidth="30"
        keyName="name"
        @click="subsectionChange"></u-tabs> -->
      <u-search
        placeholder="搜索活动名称"
        bgColor="#ffffff"
        v-model="keyword"
        :showAction="false"
        style="z-index: 999"
        @search="search"
        @change="change"></u-search>
    </view>
    <view class="main">
      <view class="title">
        <!-- <view class="item">
          <u-icon
            label="区域"
            labelPos="left"
            size="14"
            name="arrow-down"></u-icon>
        </view> -->
        <view class="item">
          <u-icon
            label="活动类型"
            labelPos="left"
            size="14"
            name="arrow-down"
            @click="showActivityType = true"></u-icon>
        </view>
        <view class="item" @click="showUserType = true">
          <u-icon
            label="活动状态"
            labelPos="left"
            size="14"
            name="arrow-down"></u-icon>
        </view>
      </view>
      <u-action-sheet
        :show="showUserType"
        :actions="[
          { value: 31, name: '未开始' },
          { value: 40, name: '进行中' },
          { value: 50, name: '已结束' },
          { value: '', name: '全部' },
        ]"
        title="请选择活动状态"
        @close="showUserType = false"
        @select="userTypeSelect">
      </u-action-sheet>
      <u-action-sheet
        :show="showActivityType"
        :actions="[
          { value: '20', name: '线下' },
          { value: '', name: '全部' },
        ]"
        title="请选择活动类型"
        @close="showActivityType = false"
        @select="activityTypeSelect">
      </u-action-sheet>
      <z-paging
        ref="paging"
        v-model="dataList"
        @query="queryList"
        use-page-scroll>
        <!--      v-if="refresh" -->
        <view class="content u-p-l u-p-r">
          <activityCard
            v-for="(item, index) in dataList"
            :key="index"
            :item.sync="item"
            :index="index"
            @changeBooked="changeBooked">
          </activityCard>
        </view>
      </z-paging>
    </view>
    <!-- <z-paging
      ref="paging"
      v-model="dataList"
      @query="queryList"
      use-page-scroll>
      <view class="content u-p-l u-p-r">
        <activityCard
          v-for="(item, index) in dataList"
          :key="index"
          :item.sync="item"
          :index="index"
          @changeBooked="changeBooked">
        </activityCard>
      </view>
    </z-paging> -->
  </view>
</template>

<script>
import { actStatus } from '@/common/enums/activity.js'
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
import { mapState } from 'vuex'
import activityCard from './components/activity-card.vue'
import locationNavbar from '@/pages/index/components/location-navbar.vue'

import { activitylist } from '@/common/api.js'
export default {
  components: {
    activityCard,
    locationNavbar,
  },
  mixins: [ZPMixin],
  data() {
    return {
      statusSelect: '',
      keyword: '',
      activityType: '',
      showUserType: false,
      showActivityType: false,
      globalData: getApp().globalData,
      dataList: [],
      subsectionList: ['待开始', '进行中', '已结束'],
      subsectionCurrent: 0,
    }
  },
  computed: {
    ...mapState({
      location: state => state.location,
      customer: state => state.customer,
    }),
    region() {
      if (this.location) {
        return this.location.region
      }
      return ''
    },
    status() {
      if (this.subsectionCurrent == 0) {
        return actStatus.popular
      } else if (this.subsectionCurrent == 1) {
        return actStatus.underway
      }
      return actStatus.success
    },
  },
  watch: {
    customer(val) {
      this.$refs.paging.reload()
    },
  },
  onLoad(option) {},

  methods: {
    change(e) {
      if (!e) this.queryList(1, 15)
    },
    search(e) {
      this.queryList(1, 15)
    },
    userTypeSelect(e) {
      this.statusSelect = e.value
      this.queryList(1, 15)
    },
    activityTypeSelect(e) {
      this.activityType = e.value
      this.queryList(1, 15)
    },
    subsectionChange(e) {
      if (this.current != e.currentIndex) {
        this.subsectionCurrent = e.currentIndex
        this.$refs.paging.reload()
      }
    },
    changeBooked({ index, key, value }) {
      this.$set(this.dataList[index], key, value)
    },
    queryList(page, list_rows) {
      // if (!this.customer) {
      // 	this.$refs.paging.complete([]);
      // 	return;
      // }
      activitylist({
        // customerId: 1,
        // status: this.status,
        page: page,
        list_rows: list_rows,
        status: this.statusSelect,
        name: this.keyword,
        type: this.activityType,
      })
        .then(res => {
          console.log(res)
          this.$refs.paging.complete(res.result.records)
        })
        .catch(res => {
          console.log(res)
          //如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
          //注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
          //在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
          this.$refs.paging.complete(false)
          // this.$refs.paging.complete(res.result.records)
        })
    },
    goActivitydetail(item) {
      uni.$u.route({
        url: 'pages/knowledge/detail',
        params: {
          id: item.knowledge_id,
        },
      })
    },
    goLocation() {
      uni.navigateTo({
        url: '/pages/index/city',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.myTabbar {
  /* background: #fff; */
  height: 100rpx;
  margin: 0 auto;
  z-index: 999;
  width: 660rpx;
}
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.main {
  width: 750rpx;
  background: #ffffff;
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  margin: 0 auto;
  height: 100%;
  .title {
    display: flex;
    justify-content: left;
    height: 40rpx;
    line-height: 40rpx;
    padding: 40rpx;
    .item {
      margin-right: 32rpx;
    }
  }
}
</style>
