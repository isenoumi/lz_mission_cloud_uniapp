<template>
  <view>
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#fff" imageSrc="https://oms.cestech.com.cn/BkpKnowledge/img/286b4a1bb0f64d0286f488097a260707/蒙版组 8.png" autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="开始作业" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <view class="form" @click="scanQRCode">
      点击扫码
    </view>
    <u--form label-position="top" :model="form" :rules="rules" ref="form" labelWidth="6rem">
      <view class="form">
        <!-- <u-form-item label="手机号" prop="phone" borderBottom label-position="left" ref="phone" required>
          <u--input v-model="form.phone" border="none" placeholder="请填写手机号" clearable></u--input>
        </u-form-item> -->
        <u-form-item label="有限空间类型" prop="type" borderBottom @click="showType = true" label-position="left">
          <u--input v-model="form.type_text" disabled disabledColor="#ffffff" placeholder="请选择有限空间类型" border="none">
          </u--input>
          <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
        </u-form-item>
        <u-form-item label="有限空间名称" prop="mainContent" borderBottom @click="showName = true" label-position="left" required>
          <picker @change="nameSelect" :value="index" range-key="name" :range="actions" title="请选择有限空间名称">
            <u--input v-model="form.mainContent" disabled disabledColor="#ffffff" placeholder="请选择有限空间名称" border="none">
            </u--input>
            <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
          </picker>
        </u-form-item>
      </view>
    </u--form>
    <view class="btn">
      <u-button type="primary" :loading="btnLoading" text="开始作业" @click="submit" :showCancelButton="true">
      </u-button>
    </view>
    <u-action-sheet :show="showType" :actions="typeActions" title="请选择有限空间类型" @close="showType = false" @select="userTypeSelect">
    </u-action-sheet>
    <!-- <u-action-sheet :show="showName" :actions="actions" title="请选择有限空间名称" @close="showName = false" @select="nameSelect">
    </u-action-sheet> -->
    <!-- <u-picker mode="selector" :show="showName" :range="actions" range-key="name" @close="showName = false" @change="nameSelect"></u-picker>
    <u-picker :show="showName" v-model="mainbody" @confirm="nameSelect" @cancel="showName = false" :columns="columns"></u-picker> -->

  </view>
</template>

<script>
  import { getLimitedList } from './api'
  export default {
    data() {
      return {
        showType: false,
        showName: false,
        index: 0,
        fileList1: [],
        companyId: uni.getStorageSync('enterprise').companyId,
        url_img: '',
        form: {
          type_text: '',
          type: '',
          limitedId: '',
          mainContent: '',
        },
        typeActions: [
          {
            value: '第一类：封闭、半封闭设备',
            name: '第一类：封闭、半封闭设备',
          },
          {
            value: '第二类：地下有限空间',
            name: '第二类：地下有限空间',
          },
          {
            value: '第三类：地上有限空间',
            name: '第三类：地上有限空间',
          },
        ],
        actions: [{}],
        rules: {
          problemStatement: {
            type: 'string',
            required: true,
            message: '请填写问题描述',
            trigger: ['blur', 'change'],
          },
          mainContent: {
            type: 'string',
            required: true,
            message: '请选择有限空间名称',
            trigger: ['blur', 'change'],
          },
          // type: [
          //   {
          //     type: 'string',
          //     required: true,
          //     message: '请选择有限空间类型',
          //     trigger: ['blur', 'change'],
          //   },
          // ],
        },
      }
    },
    computed: {},
    onReady() {
      //onReady 为uni-app支持的生命周期之一
      this.$refs.form.setRules(this.rules)
    },
    onLoad(option) {
      getLimitedList({ companyId: this.companyId }).then(res => {
        this.actions = res.data
      })
    },
    methods: {
      onChooseavatar(e) {
        this.uploadFilePromise(e.detail.avatarUrl) //上传图片
      },
      nameSelect(e) {
        console.log(e.detail.value, this.index)
        this.form.limitedId = this.actions[e.detail.value].value
        this.form.mainContent = this.actions[e.detail.value].name
        this.$refs.form.validate()
        // this.form.mainContent_text = e.name
      },
      userTypeSelect(e) {
        console.log(e)
        this.form.type_text = e.name
        getLimitedList({ companyId: this.companyId, type: e.name }).then(res => {
          this.actions = res.data
        })
        // this.$refs.form.validate()
      },
      scanQRCode() {
        uni.scanCode({
          onlyFromCamera: false,
          success(res) {
            if (res.result) {
              // 扫描成功，处理二维码内容
              console.log('扫描结果：', res.result)
              // 这里可以进行后续操作，如跳转页面、显示信息等
              uni.navigateTo({ url: '/pageLimited/homeworkLedger/index?limitedId=' + res.result.split('?id=')[1] })
            } else {
              // 扫描失败
              uni.showToast({
                title: '扫描失败',
                icon: 'none',
              })
            }
          },
        })
      },
      submit() {
        // this.form.problemFile = this.url_img
        this.$refs.form
          .validate()
          .then(res => {
            uni.navigateTo({ url: '/pageLimited/homeworkLedger/index?limitedId=' + this.form.limitedId })
            // manualCreditsAdd({
            //   ...this.form,
            //   addPhone: uni.getStorageSync('phone'),
            // }).then(res => {
            //   uni.showToast({
            //     title: res.message,
            //     icon: 'none',
            //   })
            //   if (res.code == 200) {
            //     setTimeout(() => {
            //       uni.navigateBack()
            //     }, 1500)
            //   }
            // })
          })
          .catch(errors => {})
      },
      //删除图片
      deletePic(e) {
        this[`fileList${e.name}`].splice(e.index, 1)
      },
      // 新增图片
      async afterRead(event) {
        console.log(event)
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.file)
        let fileListLen = this[`fileList${event.name}`].length
        lists.map(item => {
          this[`fileList${event.name}`].push({
            ...item,
            status: 'uploading',
            message: '上传中',
          })
        })
        for (let i = 0; i < lists.length; i++) {
          const result = await this.uploadFilePromise(lists[i].url)
          let item = this[`fileList${event.name}`][fileListLen]
          this[`fileList${event.name}`].splice(
            fileListLen,
            1,
            Object.assign(item, {
              status: 'success',
              message: '',
              url: result,
            }),
          )
          fileListLen++
        }
      },
      //上传图片
      uploadFilePromise(url) {
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/imgUpload', // 仅为示例，非真实的接口地址
            header: {
              'x-Resource-Token': uni.getStorageSync('xtoken'),
            },
            filePath: url,
            name: 'file',
            formData: {
              user: 'test',
            },
            success: res => {
              console.log(res)
              this.url_img = JSON.parse(res.data).result
              this.form.avatarUrl = JSON.parse(res.data).result
              resolve(this.url_img)
            },
          })
        })
      },
    },
  }
</script>
<style>
  page {
    background-color: #f5f5f5;
  }
</style>
<style lang="scss" scoped>
  .form {
    width: 688rpx;
    background: #ffffff;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 20rpx auto;
    padding: 32rpx;
    .upload {
      position: relative;
    }
    .imageTips {
      font-weight: 400;
      font-size: 24rpx;
      color: #8c929b;
      line-height: 52rpx;
      text-align: left;
      position: absolute;
      top: -54rpx;
      left: 128rpx;
      z-index: 999;
    }
  }
  .btn {
    width: 688rpx;
    height: 80rpx;
    background: #1dd193;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 32rpx auto;
    line-height: 80rpx;
    font-weight: 400;
    font-size: 32rpx;
    color: #ffffff;
  }
  .record {
    width: 168rpx;
    height: 40rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin: 32rpx auto;
  }
  .tips {
    width: 552rpx;
    height: 74rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #c5c5c5;
    line-height: 40rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin: 50rpx auto;
  }
</style>
