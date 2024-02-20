<template>
	<view>

		<view class="u-p">
			<uni-segmented-control :current="subsectionCurrent" :values="subsectionList"
				:active-color="globalData.theme['$u-primary']" @clickItem="subsectionChange" />
		</view>
		<z-paging ref="paging" v-model="dataList" @query="queryList" use-page-scroll>
			<view class="content u-p-l u-p-r">
				<template>
					<activityCard v-for="(item, index) in dataList" :key="index" :item="item">
					</activityCard>
				</template>
			</view>

		</z-paging>

	</view>

</template>

<script>
	import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	import {
		mapState
	} from 'vuex'
	import activityCard from './components/activity-card.vue'

	import {
		speechoractivitymylist,
		speechoractivityendlist
	} from '@/common/api.js'
	export default {
		components: {

			activityCard,
		},
		mixins: [ZPMixin],
		data() {
			return {
				globalData: getApp().globalData,
				dataList: [],
				subsectionList: ['线下活动任务', '完成的活动'],
				subsectionCurrent: 0,

			}
		},
		computed: {


		},
		watch: {

		},
		onLoad(option) {
			uni.$on('refreshList', () => {
				this.$refs.paging.reload()
			})
		},
		onUnload() {
			uni.$off('refreshList')
		},
		methods: {
			subsectionChange(e) {
				if (this.subsectionCurrent != e.currentIndex) {
					this.subsectionCurrent = e.currentIndex;
					this.$refs.paging.reload()
				}

			},
			queryList(page, list_rows) {
				if (this.subsectionCurrent == 0) {
					speechoractivitymylist({
						page: page,
						list_rows: list_rows
					}).then((res) => {

						this.$refs.paging.complete(res.data.data);
					}).catch(res => {
						this.$refs.paging.complete(false);
					})
				} else {
					speechoractivityendlist({
						page: page,
						list_rows: list_rows
					}).then((res) => {

						this.$refs.paging.complete(res.data.data);
					}).catch(res => {
						this.$refs.paging.complete(false);
					})
				}



			},

		}
	}
</script>

<style lang="scss" scoped>

</style>
