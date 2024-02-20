<template>
	<view class="content">
		<view class="u-p">
			<bindinfoform @success="submit" ref="bindinfoform" :house="house">
			</bindinfoform>
		</view>
	</view>
</template>

<script>
	import {
		bindinfo
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
				house:{
					
				},
				globalData: getApp().globalData,
				btnLoading: false,

				task_id: null

			}
		},
		computed: {
			...mapState({
				user: state => state.user,
				cityDataTree: state => state.cityDataTree
			}),
			current() {
				if (!this.$store.state.user.nick_name) {
					return 0;
				} else if (!this.$store.state.user.phone) {
					return 1;
				} else if (!this.$store.state.user.reg_status) {
					return 2;
				} else {
					return 3;
				}
				return 0;
			},

		},
		onLoad(option) {
			if(uni.getStorageSync('users').openid){
				this.houset()
			}
			if (option.current) {
				this.current = option.current
			}
			if (option.task_id) {
				this.task_id = option.task_id
			}
		},

		methods: {
			houset(){
				let openid=uni.getStorageSync('users').openid
				uni.request({
				  url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbXcxAddress/list?openid=${openid}&pageNo=1&pageSize=10`,
				  method: "GET",
				  success: (res) => {
				    console.log('aaa', res.data.result.records);
					if(res.data.result.records){
						this.house=res.data.result.records[0]
					}
					  
				  }
				})
			},
			submit(params) {
				if (this.task_id) {
					params.task_id = this.task_id
				}
				this.$refs.bindinfoform.btnLoading = true;
				bindinfo(params).then(({
					data,
					msg
				}) => {
					this.$store.commit('refreshUser',
						data)

					this.goBack()
					uni.showToast({
						title: msg,
						icon: 'success',
					});
				}).finally(() => {
					this.$refs.bindinfoform.btnLoading = false;
				})

			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getUserProfile(e) {
				authorize.getUserProfile().then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'success',
					});

				})
			},
			getPhoneNumber(e) {
				authorize.bindPhone(e.detail).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: 'success',
					});
				})
			}

		}
	}
</script>
<style>
	page {
		width: 100%;
	}
</style>
<style lang="scss" scoped>
	/deep/ .u-form-item__body__left {
		min-width: 5em;
	}
</style>
