<!-- 新闻 详情 -->
<template>
	<view class="container">
		<view class="u-nav">

			<navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#fff" autoBack>
				<view class="u-nav-slot" slot="center">
					<u--text text="文化知识详情" color="#fff"></u--text>
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
			<view class="u-m-t u-m-b" v-for="item in list">
				<u--text @click="downloadFun(item.value,item.name)" type="primary" size="18" :text="item.name">
				</u--text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		courseknowledgeread,
		knowledge,
		add_points,
		view_click
	} from '@/common/api.js'

	export default {

		data() {
			return {
				list:[],
				id: null, //来源id
				pageLoading: true,
				titles: '',
				points: 0,
				source_type: 2, //来源类型 1进入，2阅读，3答题',
				get_type: 3, //积分获取方式 1课程，2宣教，3文化',
				flag: 1, // 1到底部发请求 2不发请求
				points_acquisition_rule: 0, //获取积分规则 1进入，2阅读，3答题',
				source_id: '',
				detail: {
					title: '',
					create_time: '',
					content: '',
					type: ''
				},
				status: '',
				tip: ''

			}
		},
		onReachBottom() {
			// console.log(this.status,'到底了')
			if (this.flag == 1) {
				if (this.points_acquisition_rule == 2) {
					this.source_type = 2
					this.add_points();
				}
				// this.add_points()
				// console.log(this.flag,'this.flag')
			}
			this.flag = 2
			// console.log(this.flag,'this.flag')
		},
		onBackPress(options) {
			console.log('返回了')
			// if (options.from === 'navigateBack') {
			// 	return false;
			// }
			// // 这里使用重定向比较好，不信可以自己多试几种，其余跳转方法在文章底部哦
			// uni.redirectTo({ 
			// 	url: '/pages/index'
			// })
			// return true;
		},
		onLoad(option) {
			console.log(option, 'option')
			this.titles = option.title
			this.points = option.points
			this.points_acquisition_rule = Number(option.points_acquisition_rule)
			this.source_id = option.source_id
			if (option.id) {
				this.id = option.id
				this.getDetail();
			} else {
				uni.$u.route({
					type: 'navigateBack'
				})
				return
			}
			this.view_click()
			if (this.points_acquisition_rule == 1) {
				this.source_type = 1
				this.add_points();
			}

		},
		computed: {

		},
		methods: {
			// 下载附件
			downloadFun(enclosure, name) {
				let txt = ''
				console.log(enclosure, '下载文件')
			
				console.log(enclosure.indexOf("xlsx") != -1);
				if (enclosure.indexOf("xlsx") != -1) {
					txt = 'xlsx'
				}
				if (enclosure.indexOf("doc") != -1) {
					txt = 'doc'
				}
				if (enclosure.indexOf("docx") != -1) {
					txt = 'docx'
				}
				if (enclosure.indexOf("pdf") != -1) {
					txt = 'pdf'
				}
			
				console.log(encodeURIComponent(enclosure), '文件格式')
				uni.showLoading({
					title: '下载中'
				});
			
				//下载文件
				uni.downloadFile({ //只能是GET请求
					url: enclosure,
					// url: "http://cdn.cestech.com.cn/file/0efa7e2b5c7646ff8584dfc53154044a.mp4", //请求地址(后台返回的码流地址)
					success: (res) => {
						//下载成功
						if (res.statusCode === 200) {
							//保存文件
							let tempFile = res.tempFilePath;
							//保存成功之后 打开文件
							uni.getFileSystemManager().saveFile({
								tempFilePath: tempFile,
								filePath: wx.env.USER_DATA_PATH + '/' +
									`${name}`, //自定义文件名
								success(res) {
									console.log(txt, '文件预览')
									uni.openDocument({
										fileType: txt,
										filePath: res.savedFilePath,
										showMenu: true, //是否可以分享
										success: (res) => {
											uni.hideLoading()
											console.log(res);
										},
										fail: (e) => {
											uni.showToast({
												title: '打开失败',
												icon: "error"
											})
										}
									})
			
								}
							})
						}
					},
					fail: (e) => {
						console.log(e, '文件下载失败')
						uni.showToast({
							title: '文件下载失败',
							icon: "error",
						})
					}
				});
			
			},
			//点击文章
			view_click() {
				uni.request({
					url: 'https://lz.api.cestech.com.cn:8150/mission_b/mission/bkbCulturalKnowledge/xcxClick',
					data: {
						click_type: 2,
						knowledge_id: this.id,
						title: this.titles
					},
					method: "POST",
					success: (res) => {
						console.log(res.data.msg, 'tip')
						// this.tip = res.data.msg
					}
				
				})
				// view_click({
				// 	click_type: 2,
				// 	knowledge_id: this.id,
				// 	title: this.titles

				// }).then(res => {

				// 	console.log(res.data.msg, 'tip')
				// 	this.tip = res.data.msg
				// 	// console.log(res,'res')
				// 	// if(res.code===400){

				// 	// }
				// })
			},
			//获得积分
			add_points() {
				if (uni.getStorageSync('avatarUrl')) {
					add_points({
						source_type: this.source_type,
						source_id: this.source_id,
						get_type: this.get_type,
						points: Number(this.points),
						title: this.titles
					}).then(res => {
						if (res.error_code === 0) {
							uni.showToast({
								icon: 'none',
								title: '恭喜获得本文章积分'
							})
						}

					})
				}



			},
			onShareAppMessage(res) {
				return {
					title: '',
				}
			},
			getDetail() {
				uni.request({
					url: 'https://lz.api.cestech.com.cn:8150/mission_b/mission/bkbCulturalKnowledge/xcxById',
					data: {
						id: this.id
					},
					method: "GET",
					success: (res) => {
						this.pageLoading = false;
							this.detail = res.data.result
					}
				
				})
				uni.request({
					url: 'https://lz.api.cestech.com.cn:8150/mission_b/mission/bkbKnowledge/queryById',
					data: {
						id: this.id
					},
					method: "GET",
					success: (res) => {
						if (res.data.result.files) {
				
							console.log(res.data.result.files, 'res.data.result.files')
							let srt = res.data.result.files
							console.log(srt.search(','), '字符串')
							// let str='http://cdn.cestech.com.cn/file/2c26e7c5995e4ed7bb78f6a1747732ee.xlsx,http://cdn.cestech.com.cn/file/fe65ea5adcc042669528f3422907cf88.docx,http://cdn.cestech.com.cn/file/77ac403aedb844bb85fde41f99d0c471.pdf'
							let arr = srt.split(',')
							arr.map((v) => {
								let str = v
								let arr = str.split('/')
								var len = arr.length
								console.log(arr[len - 1], 'xxxxxx');
								let data = {
									name: arr[len - 1],
									value: v
								}
								this.list.push(data)
							})
				
						}
				
					}
				
				})
				// knowledge({
				// 	id: this.id
				// }).then((res) => {
				// 	this.pageLoading = false;
				// 	this.detail = res.data


				// })

			},


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
