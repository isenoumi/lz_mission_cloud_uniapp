<template>
  <view class="content">
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <view v-if="!pageLoading" class="u-p">
      <view class="margin-top-lg">
        <bindinfoform @success="submit" :detail="detail" ref="bindinfoform">
        </bindinfoform>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    supervisoruserbindinfo,
    taskone,
    taskaccept
  } from '@/common/api.js';
  import {
    mapState
  } from 'vuex'
  import bindinfoform from './components/bindinfo.vue'

  export default {
    components: {
      bindinfoform
    },
    data() {
      return {
        globalData: getApp().globalData,
        id: null,
        pageLoading: true,
        detail: {
          id: null,
          title: '',
          status: '',
          region: null,
          floor: [],
          community: null

        }

      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),

    },

    onLoad(option) {

      if (option.id) {
        this.id = option.id
        this.getDetail();
      } else {
        uni.$u.route({
          type: 'navigateBack'

        })
      }
    },

    methods: {
      getDetail() {
        taskone({
          id: this.id
        }).then((res) => {

          this.detail = res.data
          if (this.detail.region) {
            this.pageLoading = false;
          } else {
            uni.showToast({
              title: '该任务未配置地区',
              icon: 'none',
            });
          }

        })
      },
      submit(params) {

        this.$refs.bindinfoform.btnLoading = true;
        supervisoruserbindinfo(params).then(({
          data,
          msg
        }) => {
          // this.$refs.bindinfoform.realodForm()
          this.$emit('taskSupervisorRegister')
          uni.showToast({
            title: msg,
            icon: 'success',
          });

          this.goNext(data.id);
          this.$refs.bindinfoform.realodForm()
        }).finally(() => {
          this.$refs.bindinfoform.btnLoading = false;
        })

      },
      goNext(eid) {

        uni.$u.route({
          url: '/pageB/education/detail',
          params: {
            id: this.detail.id,
            customer_id: 0,
            sup: 1

          }

        })

      },
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },


    }
  }
</script>

<style lang="scss" scoped>

</style>