<!-- 查看视频 -->
<template>
    <view class="container">
        <u-loading-page :loading="pageLoading"></u-loading-page>
        <view v-if="!pageLoading">
            <view class="z-form-text u-p">
                <view class="z-form-item">
                    <view class="z-form-item__body">
                        <view class="z-form-item__body__left">
                            <u--text text="活动标题:"></u--text>
                        </view>
                        <view class="z-form-item__body__right">
                            <u--text wordWrap="anywhere" :text="detail.name">
                            </u--text>

                        </view>
                    </view>
                    <u-line color="rgb(214, 215, 217)"></u-line>
                </view>


                <view class="z-form-item">
                    <view class="z-form-item__body">
                        <view class="z-form-item__body__left">
                            <u--text text="活动类型:"></u--text>
                        </view>
                        <view class="z-form-item__body__right">
                            <u--text wordWrap="anywhere" :text="detail.type|activityTypeText">
                            </u--text>

                        </view>
                    </view>
                    <u-line color="rgb(214, 215, 217)"></u-line>
                </view>

                <view class="z-form-item">
                    <view class="z-form-item__body">
                        <view class="z-form-item__body__left">
                            <u--text text="开始时间:"></u--text>
                        </view>
                        <view class="z-form-item__body__right">
                            <u--text wordWrap="anywhere" :text="detail.start_date">
                            </u--text>

                        </view>
                    </view>
                    <u-line color="rgb(214, 215, 217)"></u-line>
                </view>

                <view class="z-form-item">
                    <view class="z-form-item__body">
                        <view class="z-form-item__body__left">
                            <u--text text="活动时长:"></u--text>
                        </view>
                        <view class="z-form-item__body__right">
                            <u--text wordWrap="anywhere" :text="detail.activity_time">
                            </u--text>

                        </view>
                    </view>
                    <u-line color="rgb(214, 215, 217)"></u-line>
                </view>

                <view class="z-form-item">
                    <view class="z-form-item__body">
                        <view class="z-form-item__body__left">
                            <u--text text="活动负责人:"></u--text>
                        </view>
                        <view class="z-form-item__body__right">
                            <u--text wordWrap="anywhere" :text="detail.speaker? detail.speaker.name:''">
                            </u--text>

                        </view>
                    </view>
                    <u-line color="rgb(214, 215, 217)"></u-line>
                </view>

                <!-- <view class="z-form-item">
                    <view class="z-form-item__body">
                        <view class="z-form-item__body__left">
                            <u--text text="活动地址:"></u--text>
                        </view>
                        <view class="z-form-item__body__right">
                            <u--text wordWrap="anywhere" :text="detail.type">
                            </u--text>

                        </view>
                    </view>
                    <u-line color="rgb(214, 215, 217)"></u-line>
                </view> -->

                <view class="z-form-item">
                    <view class="z-form-item__body_col">
                        <view class="z-form-item__body__top">
                            <u--text text="备注:"></u--text>
                        </view>
                        <view class="z-form-item__body__right">
                            <u--text wordWrap="anywhere" :text="detail.remark">
                            </u--text>

                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>


    </view>
</template>

<script>
    import {
        activityone
    } from '@/common/api.js'


    export default {
        components: {

        },
        data() {
            return {
                pageLoading: true,
                globalData: getApp().globalData,
                id: null,
                detail: {
                    name_of_activity: '',
                    type: '',
                    create_time: '',
                    start_date: '',


                }
            }
        },
        onLoad(option) {
            if (option.id) {
                this.id = option.id
                this.getDetail();
            } else {
                uni.$u.route({
                    type: 'navigateBack'

                })
                return
            }

        },
        onUnload() {

        },
        computed: {},

        methods: {
            getDetail() {
                this.pageLoading = true;
                activityone({
                    id: this.id
                }).then((res) => {
                    this.detail = res.data
                    this.pageLoading = false;

                })

            },

        }
    }
</script>

</style>
<style lang="scss" scoped>
    page {
        background-color: #fff;
    }
</style>
