<template>
	<view class="box">

		<view class="u-nav">
			<!-- <u-navbar
			            title="个人中心"
			            @rightClick="rightClick"
			            :autoBack="true"
			        >
			        </u-navbar> -->
			<navbar :safeAreaInsetTop="true" :allTitle="false" height="55" placeholder
				imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/87365097fa96463c8790dc4074fe93d1.png">
				<view class="u-nav-slot" slot="left" style="display: flex;align-items: center;">
					<u-icon @click="go_to" name="arrow-left" color="#fff" size="20" bold></u-icon>
					<view style="margin-left: 220rpx;font-size: 32rpx;"><u--text text="积分排行" color="#fff"
							bold></u--text></view>
				</view>
			</navbar>
		</view>
		<view class="body">
			<view>

				<view style="height: 20rpx;"></view>
				<view class="list" v-for="(item,index) in lists" :key="index">
					<view class="list-left">
						<view class="pm">{{index+1}}</view>
						<view class="img">
							<image src="@/static/assets/me-active.png"
								style="width: 90rpx;height: 90rpx;border-radius: 50%;" mode="scaleToFill"></image>
						</view>
						<view class="name">{{item.nickName}}</view>
					</view>
					<view class="list-right">{{item.points}} 积分</view>
				</view>
			</view>
		</view>


	</view>

	<!-- <view>
		
		<view style="height: 20rpx;"></view>
		<view class="list" v-for="(item,index) in lists" :key="index">
			<view class="list-left">
				<view class="pm">{{index+1}}</view>
				<view class="img"><image src="@/static/assets/me-active.png" style="width: 90rpx;height: 90rpx;border-radius: 50%;" mode="scaleToFill"></image></view>
				<view class="name">{{item.nick_name}}</view>
			</view>
			<view class="list-right">{{item.points}} 积分</view>
		</view>
	</view> -->
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		ranking
	} from '@/common/api.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				lists: []
			}
		},
		onLoad() {
			this.list()
		},
		mounted() {

		},
		methods: {
			go_to() {
				uni.navigateBack()
			},
			list() {
				//显示加载框
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbAppUser/pointsRanking',
					method: "GET",
					success: (res) => {
						console.log(res.data, '排名')
						this.lists = res.data
						uni.hideLoading()
					}

				})
				// ranking({}).then(res => {
				//   console.log(res.data, 'res')
				//   this.lists = res.data
				//   // this.bkbIntegralStatisticsList()
				// })
			},

			// bkbIntegralStatisticsList() {
			//   uni.request({
			//     url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbIntegralStatistics/list`,
			//     // data: { //参数
			//     //   phone: uni.getStorageSync("phone"),
			//     // },
			//     header: {
			//       'Content-Type': 'application/x-www-form-urlencoded'
			//       // 'Content-Type': 'application/json' //自定义请求头信息
			//     },
			//     method: 'GET', //请求方式，必须为大写
			//     success: (res) => {
			//       console.log('接口返回22------', res.data.result.records, this.lists);
			//       res.data.result.records.forEach(itemNew => {
			//         this.lists.forEach(itemOld => {
			//           // if (itemNew.)
			//         })
			//       })
			//       // if(res.data)
			//       // uni.showToast({
			//       //   icon: 'none',
			//       //   title: res.data.message
			//       // })
			//     }
			//   })
			// }

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #39d48f;
		padding: 30rpx;
	}



	.body {
		width: 657rpx;
		margin: 10rpx auto;
		background-color: #fff;
		height: 100%;
		border-radius: 20rpx;
		padding: 20rpx;
	}






	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20rpx 35rpx;
		background: #fff;
		margin-bottom: 15rpx;

		.list-left {
			display: flex;
			align-items: center;

			.pm {
				width: 50rpx;
				font-size: 46rpx;
				font-weight: 600;
			}

			.img {
				margin-left: 30rpx;
			}

			.name {
				width: 160rpx;
				overflow: hidden; //超出的文本隐藏
				text-overflow: ellipsis; //溢出用省略号显示
				white-space: nowrap; // 默认不换行；

				font-size: 30rpx;
				font-weight: 500;
				margin-left: 25rpx;
			}
		}

		.list-right {
			color: red;
		}
	}
</style>