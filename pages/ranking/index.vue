<template>
	<view class="box">
	
	    <view class="u-nav">
			 <!-- <u-navbar
			            title="个人中心"
			            @rightClick="rightClick"
			            :autoBack="true"
			        >
			        </u-navbar> -->
	      <navbar :safeAreaInsetTop="true" :allTitle="false" height="55" placeholder imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/0f6c276c22314a86a039f846ceb4a9a9.png">
	        <view class="u-nav-slot" slot="left" style="display: flex;align-items: center;">
				<u-icon @click="go_to" name="arrow-left" color="#fff" size="20" bold></u-icon>
	          <view style="margin-left: 220rpx;font-size: 32rpx;"><u--text  text="积分排行" color="#fff" bold></u--text></view>
	        </view>
	      </navbar>
	    </view>
	    <view class="body">
			<view>
				
				<view style="height: 20rpx;"></view>
				<view class="list" v-for="(item,index) in lists" :key="index">
					<view class="list-left">
						<view class="pm">{{index+1}}</view>
						<view class="img"><image src="@/static/assets/me-active.png" style="width: 90rpx;height: 90rpx;border-radius: 50%;" mode="scaleToFill"></image></view>
						<view class="name">{{item.nick_name}}</view>
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
				lists:[]
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
			list(){
				ranking({}).then(res=>{
					console.log(res.data,'res')
					this.lists=res.data
				})
			}
			
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
			.pm{
				width: 50rpx;
				font-size: 46rpx;
				font-weight: 600;
			}
			.img{
				margin-left: 30rpx;
			}
			.name{
				width: 200rpx;
				overflow: hidden; //超出的文本隐藏
				text-overflow: ellipsis; //溢出用省略号显示
				white-space: nowrap;  // 默认不换行；

				font-size: 30rpx;
				font-weight: 500;
				margin-left: 25rpx;
			}
		}
		.list-right{
			color: red;
		}
	}
</style>
