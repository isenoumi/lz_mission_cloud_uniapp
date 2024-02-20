<template>
  <view class="content">
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="专题报告" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="u-p-l u-p-r u-p-b">
      <typeCard v-for="(item, index) in dataList" :key="index" :item="item" @click.native="goknowledgelist(item)">
      </typeCard>
    </view>
  </view>


</template>

<script>
  import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'

  import {
    mapState
  } from 'vuex'
  import typeCard from './components/type-card.vue'

  import {
    courselistbycustomer
  } from '@/common/api.js'
  export default {
    components: {
      typeCard,
    },
    mixins: [ZPMixin, ],
    data() {
      return {
        index: '',
        dataList: [],

      }
    },
    computed: {


    },
    watch: {

    },
    onLoad(option) {
      if (option.index) {
        this.index = option.index
        this.dataList = getApp().globalData.index.menuList[option.index].children
      } else {
        uni.$u.route({
          type: 'navigateBack'

        })
        return
      }

    },
    onShow() {

    },
    methods: {
      goknowledgelist(item) {
        uni.$u.route({
          url: 'pages/knowledge/list',
          params: {
            type: item.id,
            title: item.title
          }
        })

      },

    }
  }
</script>

<style lang="scss" scoped>

</style>