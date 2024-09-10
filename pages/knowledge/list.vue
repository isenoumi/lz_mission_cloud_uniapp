<template>
  <view>
    <locationNavbar :title="title" maxWidth="250rpx" />
    <z-paging
      ref="paging"
      v-model="dataList"
      @query="queryList"
      use-page-scroll>
      <view class="content u-p">
        <knowledgeCard
          v-for="(item, index) in dataList"
          :key="index"
          :item="item.knowledge"
          @click.native="goknowledgedetail(item)">
          <view>44</view>
        </knowledgeCard>
      </view>
    </z-paging>
  </view>
</template>

<script>
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
import { mapState } from 'vuex'
import knowledgeCard from './components/knowledge-card.vue'
import locationNavbar from '@/pages/index/components/location-navbar.vue'
import { isLogin } from '@/util/common.js'
import { culturalistbycustomer, view_click } from '@/common/api.js'
export default {
  components: {
    knowledgeCard,
    locationNavbar,
  },
  mixins: [ZPMixin],
  data() {
    return {
      type: '',
      title: '',
      dataList: [],
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
  },
  watch: {
    customer(val) {
      console.log(val, '我是val')
      this.$refs.paging.reload()
    },
  },
  onShow() {
    // this.queryList();
  },
  onLoad(option) {
    // this.queryList()
    // console.log(1111111111111111)
    if (option.title) {
      this.title = option.title
      console.log(1111111111111111)
    } else {
      this.title = '文化知识列表'
      console.log(22222)
    }
    if (option.type) {
      this.type = option.type
    } else {
      uni.$u.route({
        type: 'navigateBack',
      })
      console.log(3333)
      return
    }
    console.log(444)

    // culturalistbycustomer({

    // 	type: this.type,
    // 	page: 1,
    // 	list_rows: 10
    // }).then(res=>{
    // 	console.log('我是res',res)
    // })
    console.log(555)
  },

  methods: {
    queryList(page, list_rows) {
      uni.request({
        url: 'https://lz.api.cestech.com.cn:8150/mission_b/mission/bkbCulturalKnowledge/xcxlist',
        data: {
          customer_id: 1,
          type: this.type,
          page: page,
          list_rows: list_rows,
        },
        method: 'GET',
        success: res => {
          res.data.result.records.forEach(v => {
            v.knowledge['points'] = v.points
          })
          this.$refs.paging.complete(res.data.result.records)
        },
        fail: () => {
          this.$refs.paging.complete(false)
        },
      })
      // culturalistbycustomer({
      // 	customer_id: 1,
      // 	type: this.type,
      // 	page: page,
      // 	list_rows: list_rows
      // }).then((res) => {
      // 	res.data.data.forEach(v => {
      // 		v.knowledge["points"] = v.points;
      // 	})
      // 	this.$refs.paging.complete(res.data.data);
      // 	console.log(res.data.data, 'res.data.data')
      // }).catch(res => {
      // 	console.log(res)
      // 	//如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
      // 	//注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 	//在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      // 	this.$refs.paging.complete(false);
      // })
    },
    goknowledgedetail(item) {
      if (isLogin()) return
      // this.view_click(item)
      console.log(item, '000')
      uni.$u.route({
        url: 'pages/knowledge/detail',
        params: {
          id: item.knowledge_id,
          points: item.points,
          title: item.knowledge_title,
          source_id: item.id,
          source_type: item.points_source_type,
          points_acquisition_rule: item.pointsAcquisition_rule,
        },
      })
    },
    // view_click(value){
    // 	view_click({
    // 		click_type:2,
    // 		knowledge_id:value.knowledge_id,
    // 		title:value.knowledge_title

    // 	}).then(res=>{
    // 		// console.log(res,'res')
    // 		// if(res.code===400){

    // 		// }
    // 	})
    // },
    goLocation() {
      uni.navigateTo({
        url: '/pages/index/city',
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
