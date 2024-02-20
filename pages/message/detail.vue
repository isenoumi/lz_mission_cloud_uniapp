<template>

    <view class="mainBox bg-white">
        <u-loading-page :loading="pageLoading"></u-loading-page>
        <view class="content u-flex-col" v-if="!pageLoading">
            <view class="title u-flex-1 u-p u-flex-col">
                <view class="title-box">
                    <view class="u-m-b">
                        <u--text align="center" type="info" size="14" :text="detail.create_time">
                        </u--text>
                    </view>
                    <u--text align="center" size="15" :text="detail.content">
                    </u--text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        messageone
    } from '@/common/api.js'
    import dayjs from 'dayjs'

    export default {
        data() {
            return {
                pageLoading: true,
                globalData: getApp().globalData,
                btnLoading: false,
                id: '',
                detail: {
                    content: '',


                }
            }
        },
        computed: {


        },
        filters: {

        },
        onLoad(option) {

            if (option.id) {
                this.id = option.id
                this.getDetail();
            } else {
                uni.$u.route({
                    type: 'navigateBack',
                    delta: 1

                })
                return
            }
        },
        onReady() {


        },
        methods: {
            getDetail() {
                messageone({
                    id: this.id
                }).then((res) => {
                    this.detail = res.data
                    this.pageLoading = false;



                })
            },
            goBack() {
                uni.$u.route({
                    type: 'navigateBack',
                    delta: 1

                })
            }


        }
    }
</script>

<style lang="scss" scoped>
    .mainBox {
        height: 100vh;
        width: 100%;


        .content {
            width: 100%;
            height: 100%;

            .title-box {
                border: 1px solid $u-info;
                width: 100%;
                padding: 40rpx;
                border-radius: 5px;
            }

        }


    }
</style>
