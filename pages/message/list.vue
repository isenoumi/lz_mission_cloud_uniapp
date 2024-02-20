<template>

	<z-paging ref="paging" v-model="dataList" @query="queryList" use-page-scroll fixed>
		<view class="content">
			<u-cell-group>

				<u-cell v-for="(item, index) in dataList" :key="index" :value="item.create_time"
					@click="goDetail(item)">
					<u--text slot="title" :lines="1" :text="item.content">
					</u--text>
					<view style="position: relative;" slot="icon">
						<u-badge v-if="!item.is_read" :customStyle="{'z-index':1}" :isDot="true" type="error" absolute
							:offset="['2px', '2px']">
						</u-badge>
						<u-icon size="32" name="order"></u-icon>
					</view>
					<view slot="value">
						<u--text type="info" :text="item.create_time">
						</u--text>
					</view>
				</u-cell>

			</u-cell-group>

		</view>
	</z-paging>


</template>

<script>
	import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	import {
		mapState
	} from 'vuex'

	import {
		messagelist,
	} from '@/common/api.js'
	export default {
		components: {},
		mixins: [ZPMixin],
		data() {
			return {
				globalData: getApp().globalData,
				dataList: [],

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
			queryList(page, list_rows) {
				messagelist({
					page: page,
					list_rows: list_rows
				}).then((res) => {

					this.$refs.paging.complete(res.data.data);
				}).catch(res => {
					this.$refs.paging.complete(false);
				})
			},
			goDetail(item) {
				if (!item.is_read) {
					this.$store.commit('subtractMessage', 1)
				}
				uni.$u.route({
					url: 'pages/message/detail',
					params: {
						id: item.id,

					}
				})
				item.is_read = 1;

			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
