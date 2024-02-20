<template>
	<view class="content">
		<navbar :safeAreaInsetTop="true" :allTitle="false" height="55" placeholder autoBack
			imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/525e270517c74fa79a13b97539b95af6.jpg">
			<view class="u-nav-slot" slot="center">
				<u--text text="答题"></u--text>
			</view>
		</navbar>
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<!-- 答题主页面 -->
		<question v-if="!pageLoading" :question="question" @success="handleSuccess" :btnLoading="btnLoading"
			:is_answer="is_answer" />
	</view>
</template>

<script>
	import question from '@/components/choiceqst.vue'
	import {
		saveanswer,
		coursechoiceqst,
		add_points
	} from '@/common/api.js'

	export default {
		components: {
			question
		},
		data() {
			return {
				pageLoading: true,
				btnLoading: false,
				id: null,
				is_answer: '',
				question: [],
				source_type: 3, //来源类型 1进入，2阅读，3答题',
				get_type: 2, //积分获取方式 1课程，2宣教，3文化',
				points_acquisition_rule: 0, //获取积分规则 1进入，2阅读，3答题',
				points: '', //可获得积分
				title: '', //答题名称
			};
		},
		onLoad(option) {
			console.log(option, '传过来了')
			if (option.id) {
				this.id = option.id
				this.title = option.title
				this.points_acquisition_rule = option.points_acquisition_rule
				this.points = Number(option.points)
				this.getDetail();
			} else {
				uni.$u.route({
					type: 'navigateBack'

				})
				return
			}

		},
		computed: {

		},
		methods: {
			getDetail() {
				coursechoiceqst({
					id: this.id
				}).then((res) => {
					this.question = res.data.question
					this.is_answer = res.data.is_answer
					this.pageLoading = false;
				}).catch(res => {


				})

			},
			handleSuccess({
				answer
			}) {
				this.btnLoading = true;
				// console.log('答题')
				saveanswer({
					id: this.id,
				}).then((res) => {
					this.is_answer = true;
					uni.$emit("refreshCourseDetail")
					uni.showToast({
						title: res.msg,
						icon: 'success',
					});
					// console.log(this.points_acquisition_rule,'222')
					if (this.points_acquisition_rule === "3") {
						if (uni.getStorageSync('avatarUrl')) {
							add_points({
								source_type: this.source_type,
								source_id: this.id,
								get_type: this.get_type,
								points: this.points,
								title: this.title
							}).then(res => {
								if (res.error_code === 0) {
									uni.showToast({
										icon: 'none',
										title: '恭喜获得本文章积分'
									})
								}
							}).catch(res => {
							
							})
						}
					
					}

				}).catch(res => {
					console.log(res)

				}).finally(() => {
					this.btnLoading = false;
				})
			},

		}
	}
</script>

<style lang="scss" scoped>

</style>
