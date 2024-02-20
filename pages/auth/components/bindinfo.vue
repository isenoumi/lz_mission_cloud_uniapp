<template>

	<view class="content">
		<!-- <u-loading-page :loading="pageLoading"></u-loading-page> -->
		<u--form labelPosition="left" :model="form" ref="form" labelWidth="5em">
			<u-form-item label="姓名" prop="name" borderBottom ref="name" required>
				<u--input v-model="form.name" border="none" placeholder="姓名,只能为中文" clearable></u--input>
			</u-form-item>

			<u-form-item label="性别" prop="gender" borderBottom @click="showgender = true; hideKeyboard()" required>
				<u--input v-model="form.gender_text" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none">
				</u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item  u-form-item label="所在地区" prop="region" borderBottom ref="region" >
				<input placeholder="请选择省市区" disabled type="text" @click="openPicker" v-model="addressData.address" />
				<u-icon slot="right" name="arrow-right"></u-icon>
			
			</u-form-item>
			<!-- <u-form-item label="所在地区" prop="region" borderBottom ref="region">
				<picker mode="region"  :value="date" style="font-size: 30rpx; margin: 0 40rpx 0 0; color: #333;"
					@change="bindTimeChange">
					<view class="uni-input" v-if="info.siteAddress">
						{{ info.siteAddress.provinceName }}-
						{{ info.siteAddress.cityName }}-
						{{ info.siteAddress.areaName }}
					</view>
					<view class="uni-input" v-else>{{ diqu }}</view>
				</picker> -->

				<!-- <selfPicker level="3" :defaultIds="regionIdx" @change="regionChange" idKey="value" name="name"
					children="children" :columnData="cityDataTree"></selfPicker>
				<u-icon slot="right" name="arrow-right"></u-icon> -->
			<!-- </u-form-item> -->
			<!-- <u-form-item label="所在地区" prop="region" borderBottom ref="region">
				<selfPicker level="3" :defaultIds="regionIdx" @change="regionChange" idKey="value" name="name"
					children="children" :columnData="cityDataTree"></selfPicker>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item> -->
			<u-form-item label="所在小区" prop="floor" borderBottom>
				<u--input v-model="form.community" border="none" clearable></u--input>
			</u-form-item>
			<u-form-item label="所在楼栋" prop="community" borderBottom>
				<u--input v-model="form.building" border="none" clearable></u--input>
			</u-form-item>
			
			<u-form-item label="所在单元" prop="unit" borderBottom>
				<u--input v-model="form.unit" border="none" clearable></u--input>
			</u-form-item>
			<!-- 	<u-form-item label="所在小区" prop="community" borderBottom ref="community">
				<selfPicker level="1" :defaultIds="communityIdx" @change="communitychange" idKey="id" name="name"
					:columnData="communityData"></selfPicker>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="所在楼栋" prop="floor" borderBottom ref="floor">
				<selfPicker level="1" :defaultIds="floorIdx" @change="floorchange" idKey="id" name="floornumber"
					:columnData="floorData"></selfPicker>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="所在单元" prop="unit" borderBottom ref="unit">
				<selfPicker level="1" :defaultIds="unitIdx" @change="unitchange" idKey="id" name="unitnumber"
					:columnData="unitData"></selfPicker>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item> -->
			<u-form-item label="所在房号" prop="number" borderBottom>
				<u--input type="number" v-model="form.number" border="none" placeholder="请输入所在房号" clearable>
				</u--input>
			</u-form-item>
			<u-form-item @click="openarea" label="所属单位" prop="floor" borderBottom ref="floor">
				{{mainbody}}
				<u-picker confirmColor="rgb(59,207,153)" :show="areashow" v-model="mainbody" @confirm="confirm"
					@cancel="cancel" :columns="columns"></u-picker>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			
			
			<view class="margin-top-lg">
				<u-button type="primary" :loading="btnLoading" text="提交" @click="submit()">
				</u-button>
			</view>
		</u--form>

		<u-action-sheet :show="showgender" :actions="genderActions" title="请选择性别" @close="showgender = false"
			@select="genderSelect"> </u-action-sheet>
			<cc-selectDity :province="province" :city="city" :area="area" :show="xshow" @changeClick="xxClick" @sureSelectArea="onsetCity"
				@hideShow="onhideShow"></cc-selectDity>
		<!--       <u-picker immediateChange :show="showRegion" ref="uPicker" :columns="regionColumns" :defaultIndex="regionIndex"
            @confirm="regionConfirm" @change="regionChangeHandler" keyName="name" @cancel="showRegion=false">
        </u-picker> -->


		<!--        <view v-if="current==3" class="u-success-panel">
                <view class="u-success-panel__circle">
                    <u-icon name="checkbox-mark" color="#fff" size="30"></u-icon>
                </view>
                <text class="u-success-panel__normal">已完成认证</text>
            </view> -->

	</view>
</template>

<script>
	import selfPicker from '@/components/picker.vue'
	import {
		mapState
	} from 'vuex'
	import {
		community
	} from '@/common/api.js'
	const defaultForm = {
		name: '',
		gender: '',
		gender_text: '',
		region: '',
		region_json: null,
		community: '',
		floor: '',
		unit: '',
		number: '',
		building:''
	}
	export default {
		props: {
			house: { //接收父组件传过来的值
				type: Object,
				default: {}
			}
		},
		components: {
			selfPicker
		},
		filters: {

		},
		data() {
			return {
				colors: '#f23a3a',
				xshow: false,
				province:"广东省",
				city:"广州市",
				area: "天河区",
				addressData: {
					name: '',
					phone: '',
					address: '',
					moreAddres: '',
					isdefult: 0
				},
				isShow: true,
				
				
				date: [],
				diqu: '请选择省市区',
				info: {
					siteAddress: {
						areaId: "110101",
						areaName: "东城区",
						cityId: "110100",
						cityName: "北京市",
						provinceId: "110000",
						provinceName: "北京市",
					}
				},
				earelist: '',
				mainbody: '',
				columns: [

				],
				areashow: false,
				globalData: getApp().globalData,
				btnLoading: false,
				pageLoading: true,
				showgender: false,
				genderActions: [{
						name: '男',
						value: 1,
					},
					{
						name: '女',
						value: 2
					},

				],

				regionIdx: [],
				communityIdx: [],
				floorIdx: [],
				unitIdx: [],
				// house: {
				// 	community: '环球中心',
				// 	floor: 'w6',
				// 	unit: '1116'
				// },
				communityData: [],


				form: uni.$u.deepClone(defaultForm),
				rules: {
					name: [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					gender: {
						type: 'number',
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					phone: [{
							required: true,
							message: '请填写联系电话',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					// region: {
					// 	type: 'number',
					// 	required: true,
					// 	message: '请选择所在地区',
					// 	trigger: ['change']
					// },
					// community: {
					//     type: "integer",

					//     message: '请选择所在小区',
					//     trigger: ['change']
					// },
					// floor: {
					//     type: "integer",

					//     message: '请选择所在楼栋',
					//     trigger: ['change']
					// },
					// unit: {
					//     type: "integer",

					//     message: '请选择所在单元',
					//     trigger: ['change']
					// },
					number: [{
							required: true,
							message: '请填写房号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								if (value <= 0) {
									return false
								}
								return uni.$u.test.digits(value);
							},
							message: '请输入整数',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],

				},

			}
		},
		onLoad() {
			console.log(uni.getStorageSync('users'), 'xiao')
		},
		computed: {
			...mapState({
				user: state => state.user,
				cityDataTree: state => state.cityDataTree

			}),
			floorData() {
				if (this.form.community == '' || this.communityData.length <= 0) {
					return []
				}
				const communityIndex = this.communityData.findIndex(item => {
					if (item.id == this.form.community) {
						return true;
					}
					return false;
				})
				if (communityIndex >= 0) {
					return this.communityData[communityIndex].floor;
				} else {
					return []
				}
			},
			unitData() {
				if (this.form.floor == '' || this.floorData.length <= 0) {
					return []
				} else {
					//设置单元数据
					const floorIndex = this.floorData.findIndex(item => {
						if (item.id == this.form.floor) {
							return true;
						}
						return false;
					})
					if (floorIndex >= 0) {
						return this.floorData[floorIndex].unit;
					} else {
						return []
					}

				}
			}

		},
		watch: {
			house(val) {
				console.log(this.house, '我是传递的xxx')
				if (this.house.mainBody) {
					this.mainbody = this.house.mainBody

				}

			},
			pageLoading(val) {
				if (!val) {
					this.$nextTick(() => {
						this.$refs['form'] && this.$refs['form'].setRules(this.rules);
					})
				}
			}
		},
		mounted() {
			this.$refs['form'] && this.$refs['form'].setRules(this.rules);


		},
		created() {
			this.getuserfo();
			this.getArea();
			if (this.user.reg_status) {
				// this.form = uni.$u.deepClone(this.user)
				// //回显地区
				// if (this.user.region_json) {
				// 	this.regionIdx = this.user.region_json.map((item) => {
				// 		return item.value
				// 	})
				// }

				// this.form.gender_text = this.user.gender == 2 ? '女' : this.user.gender ==
				// 	1 ? '男' : ''
				// this.community(this.user.region, true)

				// this.communityIdx = [this.form.community]
				// this.floorIdx = [this.form.floor]
				// this.unitIdx = [this.form.unit]

			} else {
				this.pageLoading = false;
			}

		},

		methods: {
			openPicker() {
				console.log('执行打开地址选择器3333')
				this.xshow = true
				// this.xshow = false
			},
			
			xxClick(value, value2, value3){
				
				console.log('地址选择器 = ' + value + value2 + value3);
				// this.xshow = false
				this.province = value;
				this.city = value2;
				this.area = value3;
				console.log(this.province,this.city,this.area,'111xxx')
			},
			onhideShow() {
				this.xshow = false
				console.log('执行了关闭地址选择器')
			},
			//选中省市区
			onsetCity(e) {
				let data = e.detail.target.dataset;
				let address = data.province +'-'+ data.city +'-'+ data.area;
				this.xshow = false
				this.addressData.address = address
			},
			// 
			switchChange(e) {
			
			},
			// 获取省市区
			bindTimeChange(e) {
				console.log(e);
				let area = {
					provinceId: e.detail.code[0],
					provinceName: e.detail.value[0],
					cityId: e.detail.code[1],
					cityName: e.detail.value[1],
					areaId: e.detail.code[2],
					areaName: e.detail.value[2],
				};
				this.info.siteAddress = area;

				console.log('area1111111111', area);
			},
			getuserfo() {
				let openid = uni.getStorageSync('users').openid
				uni.request({
					url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbXcxAddress/byopeniduser?openid=${openid}`,
					
					method: "get",
					success: (res) => {
						if (res.data.result.name) {
							this.form.name = res.data.result.name
						}
						if (res.data.result.gender) {
							if (res.data.result.gender === 1) {
								res.data.result.gender = '男'
							} else {
								res.data.result.gender = '女'
							}
							this.form.gender_text = res.data.result.gender
						}
						if (res.data.result.regionJson) {
							
							this.info.siteAddress = JSON.parse(res.data.result.regionJson)

						}
						if(res.data.result.number){
							this.form.number=res.data.result.number
						}
						if(res.data.result.community){
							this.form.community=res.data.result.community
						}
						if(res.data.result.unit){
							this.form.unit=res.data.result.unit
						}
						if(res.data.result.floor){
							this.form.building=res.data.result.floor
						}
						if(res.data.result.mainBody){
							this.mainbody=res.data.result.mainBody
							// this.addressData.address=res.data.result.mainBody
						}
						if(res.data.result.userArea){
							
							this.addressData.address=res.data.result.userArea
						}
						
						console.log(this.regionIdx, 'this.regionIdx')
					}
				})
			},
			cancel() {
				this.areashow = false
			},
			confirm(e) {
				console.log(e, 'xxx')
				this.mainbody = e.value[0]
				this.areashow = false
			},
			openarea() {
				this.areashow = true
			},
			getArea() {
				uni.request({
					url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbAppUser/getArea',
					method: "GET",
					success: (res) => {
						this.columns = []
						let list = []
						console.log(res.data.result, '单位')
						res.data.result.map((v) => {
							list.push(v.value)
						})
						this.columns.push(list)

					},
					fail: () => {


					}

				})
			},
			community(val, status = false) {
				community({
					region: ''
				}).then((res) => {
					this.communityData = res.data
					this.pageLoading = false;
				})
			},
			genderSelect(e) {
				this.form.gender = e.value
				this.form.gender_text = e.name
				this.$refs.form.validateField('gender')

			},
			// 地区选择变化
			regionChange(e) {
				let list = []
				console.log(e, 'xxx')
				// e.detail.map((v)=>{
				// 	list.push(v.name)
				// })	
				// console.log(list.join('-'),'地区')
				// this.earelist=list.join('-')
				this.form.region = e.value[e.value.length - 1]
				this.regionIdx = e.detail.map(item => item.value)
				this.form.region_json = e.detail
				this.$refs.form.validateField('region')
				this.resetCommunity()
				this.community(this.form.region)
			},
			resetRegion() {
				this.form.region = '';
				this.regionIdx = [];
			},
			communitychange(e) {
				this.form.community = e.value[0]
				this.communityIdx = [e.value[0]]
				this.$refs.form.validateField('community')
				this.resetFloor()
			},
			resetCommunity() {
				this.form.community = '';
				this.communityIdx = [];
				this.resetFloor()
				this.$refs.form.validateField('community')
			},
			floorchange(e) {
				this.form.floor = e.value[0]
				this.floorIdx = [e.value[0]]
				this.$refs.form.validateField('floor')
				this.resetUnit()
			},
			resetFloor() {
				this.form.floor = '';
				this.floorIdx = [];
				this.resetUnit()

				this.$refs.form.validateField('floor')
			},
			unitchange(e) {
				this.form.unit = e.value[0]
				this.unitIdx = [e.value[0]]
				this.$refs.form.validateField('unit')
			},
			resetUnit() {
				this.form.unit = '';
				this.unitIdx = [];
				this.$refs.form.validateField('unit')
			},
			submit() {

				if (!this.house) {
					console.log(this.house, '我是传递的')
					let openid = uni.getStorageSync('users').openid
					uni.request({
						url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbXcxAddress/add?openid=${openid}&building=${this.house.building}
						&community=${this.house.community}&unit=${this.house.unit}`,
						data: {
							// openid: openid,
							// building: this.house.building,
							// community: this.house.community,
							// unit: this.house.unit
						},
						method: "POST",
						success: (res) => {


						}
					})
				} else {
					if (this.form.region_json) {
						var idsStr = this.form.region_json.map(function(obj, index) {
							return obj.name;
						}).join("-");
					}
					console.log(this.addressData.address,'地址')
					let openid = uni.getStorageSync('users').openid
					uni.request({
						url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbXcxAddress/edit?openid=${openid}`,
						data: {
							id: this.house.id,
							createTime: this.house.createTime,
							updateBy: null,
							updateTime: null,
							sysOrgCode: null,
							openid: openid,
							building: this.form.building,
							community: this.form.community,
							unit: this.form.unit,
							userArea:this.addressData.address,
							mainBody: this.mainbody,
							userArea: `${this.info.siteAddress.provinceName}-${this.info.siteAddress.cityName}-${this.info.siteAddress.areaName}`,
							// regionJson: this.form.region_json,
							name: this.form.name,
							gender: this.form.gender,
							// number: this.form.number,
						},
						method: "POST",
						success: (res) => {
							if(this.form.gender_text=='男'){
								this.form.gender_text=1
							}else{
								this.form.gender_text=2
							}
							let area=""
							if(this.info.siteAddress.provinceName||this.info.siteAddress.cityName ||this.info.siteAddress.areaName){
								area=`${this.info.siteAddress.provinceName}-${this.info.siteAddress.cityName}-${this.info.siteAddress.areaName}`
							}
							uni.request({
								url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbXcxAddress/edituser?openid=${openid}`,
								data: {
									// userArea: `${this.info.siteAddress.provinceName}-${this.info.siteAddress.cityName}-${this.info.siteAddress.areaName}`,
									floor: this.form.building,
									community: this.form.community,
									unit: this.form.unit,
									mainBody: this.mainbody,
									userArea:this.addressData.address,
									openid:openid,
									// regionJson: JSON.stringify(this.info.siteAddress),
									name: this.form.name,
									gender:this.form.gender_text,
									number:this.form.number,
								},
								method: "POST",
								success: (res) => {
									
								}
							})
							uni.showToast({
								icon: 'none',
								title: '保存成功'
							})
							uni.navigateBack()
						}
					})
					
					// if(this.form.gender_text=='男'){
					// 	this.form.gender_text=1
					// }else{
					// 	this.form.gender_text=2
					// }
					// uni.request({
					// 	url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/edit',
					// 	header: {
					// 		'x-Resource-Token': uni.getStorageSync('xtoken'),
					// 	},
					// 	data: {

					// 		name:this.form.name,
					// 		community:this.house.building,
					// 		unit:this.house.community,
					// 		floor:this.house.unit,
					// 		id: this.house.id,
					// 		gender:this.form.gender_text,
					// 		number:this.form.number,
					// 		userArea:this.earelist,
					// 		mainBody:this.mainbody,
					// 	},
					// 	method: "POST",
					// 	success: (res) => {}

					// })
				}
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				// this.$refs.form.validate().then(res => {
				// 	const params = {
				// 		name: this.form.name,
				// 		region: this.form.region,
				// 		region_json: this.form.region_json,
				// 		gender: this.form.gender,
				// 		community: this.form.community,
				// 		floor: this.form.floor,
				// 		unit: this.form.unit,
				// 		number: this.form.number,
				// 	}
				// 	this.$emit('success', params)

				// }).catch(errors => {


				// })
			},

		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-toolbar__wrapper__confirm {
		color: red !important;
		background: red !important;
	}

	/deep/ uni-picker .uni-picker-action.uni-picker-action-confirm {
		color: #57DBD0 !important;
	}

	/deep/.uni-picker-container .uni-picker-action.uni-picker-action-confirm {
		color: #57DBD0 !important;
	}
	
</style>