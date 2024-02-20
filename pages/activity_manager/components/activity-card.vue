<template>
	<view class="z-card4">
		<uni-card :title="item.name" :extra="item.status|activityStatusText">
			<view class="u-flex u-row-between">
				<view class="u-flex-1">
					<u--text size="13" :text="`开始时间：${item.start_date}`">
					</u--text>
				</view>
				<view>
					<u--text size="13" :text="item.type|activityTypeText|typeText">
					</u--text>
				</view>
				<!--     <view class="u-flex-1">
                    <u--text size="13" :text="`人数：${item.create_time}`">
                    </u--text>
                </view>
 -->
			</view>

			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="accept(item)" v-if="item.status==actStatus.unaccept">
					<u--text size="14" text="接受活动">
					</u--text>
				</view>
				<view class="card-actions-item" @click="start(item)" v-if="item.status==actStatus.popular">
					<u--text size="14" text="开始活动">
					</u--text>
				</view>
				<view class="card-actions-item" @click="goUnderway(item)" v-if="item.status==actStatus.underway">
					<u--text size="14" text="进入活动">
					</u--text>
				</view>
				<view class="card-actions-item" @click="goQrcode(item)" v-if="item.status!=actStatus.success">
					<u--text size="14" text="获取评价码">
					</u--text>
				</view>
				<view class="card-actions-item" @click="goDetail(item)">
					<u--text size="14" text="查看详情">
					</u--text>
				</view>
				<view class="card-actions-item" @click="goEvaluate(item)" v-if="item.status==actStatus.success">
					<u--text size="14" text="查看评价">
					</u--text>
				</view>

			</view>
		</uni-card>
		<u-modal :show="acceptShow" @confirm="acceptSubmit" ref="acceptuModal" :asyncClose="true" showCancelButton
			@cancel="this.acceptShow=false" title="提示" content="是否接受此活动?">
		</u-modal>
		<u-modal :show="show" @confirm="startSubmit" ref="uModal" :asyncClose="true" showCancelButton
			@cancel="this.show=false" title="请拍照打卡">
			<view class="slot-content">
				<u-upload :fileList="modal.img" @afterRead="afterRead" @delete="deletePic" name="file" :multiple="false"
					:maxCount="1" capture="camera">
					<!--             <image src="https://cdn.uviewui.com/uview/demo/upload/positive.png" mode="widthFix"
                        style="width: 250px;height: 150px;"></image>
                        -->
					<u-icon name="camera" size="80"></u-icon>
				</u-upload>

			</view>
		</u-modal>


	</view>
</template>

<script>
	import {
		actStatus
	} from '@/common/enums/activity.js'
	import {
		speechoractivitysavePhoto,
		speechoractivitystart,
		speechoractivityaccept
	} from '@/common/api.js'
	import authorize from "@/common/auth.js"
	import templateIds from "../../../common/template-ids"
	export default {
		props: {
			item: {
				default: null,
				type: Object
			}
		},
		filters: {

			typeText(val) {
				return '活动类型：' + val
			}
		},
		data() {
			return {
				show: false,
				acceptShow: false,
				actStatus: actStatus,
				modal: {
					url: '',
					img: []
				}
			}
		},
		computed: {

		},
		methods: {
			start(item) {
				this.modal.url = ''
				this.show = true;
			},
			startSubmit() {
				speechoractivitystart({
					id: this.item.id,
					img_url: this.modal.url
				}).then(({
					data,
					msg
				}) => {
					this.$refs.uModal.loading = false
					uni.$emit('refreshList')
					this.show = false;
					uni.showToast({
						title: msg,
						icon: 'success',
					});
					console.log('打卡成功')
					
					 // setTimeout(() => {
					 uni.$u.route({
					 	url: '/pages/activity_manager/underway',
					 	params: {
					 		id: this.item.id,
					 
					 	}
					 })
					// }, 10);
					
				}).finally(() => {
					this.$refs.uModal.loading = false
				})
			},
			accept(item) {
				this.modal.img = []
				this.acceptShow = true;
			},
			acceptSubmit() {
				speechoractivityaccept({
					id: this.item.id,
				}).then(({
					data,
					msg
				}) => {
					this.$refs.acceptuModal.loading = false
					uni.$emit('refreshList')
					this.show = false;
					uni.showToast({
						title: msg,
						icon: 'success',
					});
					authorize.requestSubscribeMessage(templateIds.activity).then((res) => {

					})
				}).finally(() => {
					this.$refs.acceptuModal.loading = false
				})


			},
			async afterRead(event) {
				this.modal.img = [{
					...event.file,
					status: 'uploading',
					message: '上传中'
				}];
				try {
					const result = await this.uploadFilePromise(event.file);
					this.modal.url = result.url
					this.modal.img[0] = Object.assign(this.modal.img[0], {
						status: 'success',
						message: '上传成功',
					})
					console.log(this.modal)
				} catch (e) {
					this.modal.url = ''
					this.modal.img[0] = Object.assign(this.modal.img[0], {
						status: 'failed',
						message: '上传失败',
					})

				}

			},

			deletePic() {
				this.modal.img = []
			},
			uploadFilePromise(file) {
				return new Promise((resolve, reject) => {

					speechoractivitysavePhoto({
						formData: {
							id: this.item.id
						},
						filePath: file.url,
						name: 'file'
					}).then((res) => {
						resolve(res.data)
					}).catch(() => {
						reject();
					})
				})

				// //上传进度
				// this.uploadTask.onProgressUpdate((progressRes) => {
				//     this.imageList[this.imageList.length - 1].progress = progressRes.progress;
				// });

			},
			goQrcode(item) {
				uni.$u.route({
					url: 'pages/activity_manager/qrcode',
					params: {
						id: item.id,

					}
				})
			},
			goUnderway(item) {
				uni.$u.route({
					url: 'pages/activity_manager/underway',
					params: {
						id: item.id,

					}
				})
			},
			goDetail(item) {
				uni.$u.route({
					url: 'pages/activity_manager/detail',
					params: {
						id: item.id,

					}
				})

			},
			goEvaluate(item) {
				uni.$u.route({
					url: 'pages/activity_manager/evaluate',
					params: {
						id: item.id,

					}
				})
			}

		}

	}
</script>

<style scoped lang="scss">

</style>
