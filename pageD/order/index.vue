<template>
	<view>
		<view class="crad" @click="select_address" v-if="address.length!=0">
			<view class="img">
				<view>
					<image src="../../static/assets/center/address.png" mode="scaleToFill"
						style="width: 50rpx;height: 50rpx;"></image>
				</view>
				<view class="addres">
					<view class="name">{{address[0].province}}{{address[0].city}}{{address[0].area}}{{address[0].addr}}
					</view>
					<view>{{address[0].receiver}} {{address[0].mobile}}</view>
				</view>
			</view>
			<view>
				<u-icon name="arrow-right" color="silver" size="20" :bold="true"></u-icon>
			</view>
		</view>
		<view class="crad" @click="select_address" v-else>
			<view class="img">
				<view>
					<image src="../../static/assets/center/address.png" mode="scaleToFill"
						style="width: 50rpx;height: 50rpx;"></image>
				</view>
				<view class="addres">
					<view class="name">请选择您的地址
					</view>
					<!-- <view>{{address[0].receiver}} {{address[0].mobile}}</view> -->
				</view>
			</view>
			<view>
				<u-icon name="arrow-right" color="silver" size="20" :bold="true"></u-icon>
			</view>
		</view>
		<view class="box">
			<view class="box-img">
				<view>
					<image mode="scaleToFill" style="width: 180rpx;height: 180rpx;" :src="details.pic"></image>
				</view>
				<view class="parameter">
					<view class="name">{{details.name}}</view>
					<view style="margin-top: 7rpx;">数量：{{details.prodNum}}件</view>
					<view v-if="details.product_specifications" style="margin: 7rpx 0;">规格：{{details.product_specifications}}</view>
					<view><text class="jf">{{details.points}}</text>积分</view>
				</view>
			</view>
			<view class="lattice" style="margin: 25rpx 0;">
				<view class="title">配送服务</view>
				<view class="ps">
					<view style="margin-right: 10rpx;">快速配送</view>
					<!-- <u-icon name="arrow-right" color="silver" size="16" :bold="true"></u-icon> -->
				</view>
			</view>
			<view class="lattice" style="margin: 25rpx 0;">
				<view class="title">配送费用</view>
				<view class="ps">￥0.00</view>
			</view>
			<view class="lattice">
				<view class="title">订单备注</view>
				<view class="ps" style="width: 300rpx;">
					<input v-model="notes" border="none" placeholder="选填"></input>
					<u-icon name="arrow-right" color="silver" size="16" :bold="true"></u-icon>
				</view>
			</view>
		</view>
		<view class="btn">
			<view>共{{details.prodNum}}件</view>
			<view class="gentle">合计：<text class="num">{{details.points}}</text>积分</view>
			<view>
				<u-button text="提交兑换订单" @click="order_details" size="normal" type="success"></u-button>
			</view>
		</view>
		<u-popup :show="show" mode="center" @close="close" @open="open" :closeable="false" :round="10"
			:closeOnClickOverlay="false">
			<view class="msk">
				<view class="txt">恭喜您~已兑换成功!</view>
				<view class="txt" style="margin-top: 20rpx;">可前往<text class="jl" @click="record">"兑换记录"</text>查看详情
				</view>
				<view class="msk-btn">
					<u-button text="返回首页" @click="circle" size="normal" ></u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notes: '',
				show: false,
				details: {},
				address: []
			}
		},
		onLoad(options) {
			console.log(options, 'dai')

			this.details = options
			this.list()


		},
		methods: {
			reload() {
				// 页面重载
				const pages = getCurrentPages()
				// 声明一个pages使用getCurrentPages方法
				const curPage = pages[pages.length - 1]
				// 声明一个当前页面
				curPage.onLoad(curPage.options) // 传入参数
				curPage.onShow()
				curPage.onReady()
				this.list()
				// location.reload()
				// 执行刷新
			},

			init() {
				this.address = []
				this.list()


			},
			list() {
				let userId = uni.getStorageSync('users').id
				uni.request({
					url: `https://lz.api.cestech.com.cn:8150/mission_b/p/address/list?userId=${userId}`,
					method: "GET",
					success: (res) => {
						console.log(res.data.result, '地址列表')
						if (res.data.result.length == 0) {

						} else {
							res.data.result.map(v => {
								console.log(v.commonAddr)
								if (v.commonAddr === 1) {
									this.address.push(v)
								}

							})
							console.log(this.address[0], 'xxxxxxxxxxxxxxxxx')
						}

						// this.addresList=res.data.result
					}

				})
			},
			order_details() {
				if (this.address.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请先选择您的地址在提交'
					})
				} else {
					console.log(this.details.skuId, '规格id')
					uni.request({
						url: 'https://lz.api.cestech.com.cn:8150/mission_b/p/order/confirm',
						data: {
							addrId: this.address[0].addrId,
							prodId: this.details.prodId,
							skuId: this.details.skuId,
							prodCount: this.details.prodNum,
							userId: uni.getStorageSync('users').id,
							remarks: this.notes
						},
						method: "POST",
						success: (res) => {
							if (res.data.code === 200) {
								this.show = true
							}

						}

					})
				}


			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			circle() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			record() {
				uni.navigateTo({
					url: `/pageB/integral/index?switchs=${1}`
				})
			},
			select_address() {
				uni.navigateTo({
					url: `/pageD/address/index?flg=${2}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	.u-button {
		background: #1dd193 !important;
		color: #fff !important;
	}
	.msk {
		width: 560rpx;
		padding: 85rpx 30rpx 30rpx 30rpx;
		border-radius: 20rpx;

		.u-safe-bottom {
			padding-bottom: 0 !important;
		}

		.msk-btn {
			margin: 0 auto;
			width: 200rpx;
			margin-top: 60rpx;
			padding-bottom: 0 !important;

			/deep/.u-button {
				border-radius: 50rpx;
				padding-bottom: 0 !important;
			}
		}

		.txt {
			text-align: center;
			font-weight: 500;

			.jl {
				color: #39d48f;
			}
		}

	}

	.btn {
		width: 750rpx;
		height: 120rpx;
		background: #fff;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 30rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: silver;

		/deep/.u-button {
			border-radius: 100rpx !important;
		}

		.gentle {
			margin: 0 15rpx;

			.num {
				color: red;
				font-size: 34rpx;
				font-weight: 550;
				margin-right: 7rpx;
			}
		}
	}

	input {
		text-align: right;
		margin-right: 7rpx;
	}

	::-webkit-input-placeholder {
		/* WebKit browsers */
		direction: rtl;
	}

	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		direction: rtl;
	}

	::-moz-placeholder {
		/* Mozilla Firefox 19+ but I'm not sure about working */
		direction: rtl;
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		direction: rtl;
	}

	.box {
		background: #fff;
		border-radius: 20rpx;
		width: 700rpx;
		padding: 40rpx 35rpx;
		margin: 0 auto;
		margin-top: 30rpx;

		.box-img {
			display: flex;
			align-items: center;
			color: silver;
			font-weight: 500;
			font-size: 30rpx;

			.parameter {
				margin-left: 30rpx;

				.name {
					color: #333;
					font-size: 34rpx;
					font-weight: 550;

				}

				.jf {
					color: red;
					font-weight: 550;
					font-size: 34rpx;
					margin-right: 7rpx;
				}
			}
		}

		.lattice {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: 500;
			color: silver;

			.title {
				color: #333;

			}

			.ps {
				display: flex;
				align-items: center;
			}
		}
	}

	.crad {
		background: #fff;
		border-radius: 20rpx;
		width: 700rpx;
		padding: 30rpx 25rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.img {
			display: flex;
			align-items: center;

			.addres {
				font-size: 28rpx;
				color: silver;
				margin-left: 20rpx;

				.name {
					color: #333;
					font-size: 34rpx;
					font-weight: 550;
					margin-bottom: 8rpx;
				}
			}
		}
	}
</style>