<template>
  <view>
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#fff"
          imageSrc="https://oms.cestech.com.cn/BkpKnowledge/img/286b4a1bb0f64d0286f488097a260707/蒙版组 8.png" autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="志愿者" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>

    <u--form label-position="top" :model="form" :rules="rules" ref="form" labelWidth="5rem">
      <view class="form">
        <u-form-item label="昵称" prop="nickname" borderBottom ref="nickname" label-position="left" required>
          <u--input v-model="form.nickname" type="nickname" border="none" placeholder="请填写昵称" clearable></u--input>
        </u-form-item>
        <!-- <u-form-item label="头像" borderBottom label-position="left" style="">
          <button
            type="balanced"
            open-type="chooseAvatar"
            @chooseavatar="onChooseavatar"
            :plain="true"
            style="
              border: none;
              display: flex;
              justify-content: left;
              padding: 0;
              margin: 0;
            ">
            <u-avatar v-if="!form.avatarUrl"></u-avatar>
            <u-avatar v-else :src="form.avatarUrl"></u-avatar>
          </button>
        </u-form-item> -->
        <u-form-item label="姓名" prop="name" borderBottom label-position="left" ref="name" required>
          <u--input v-model="form.name" border="none" placeholder="请填写姓名" clearable></u--input>
        </u-form-item>
        <u-form-item label="年龄" prop="age" borderBottom label-position="left" ref="age">
          <u--input v-model="form.age" border="none" placeholder="请填写年龄" clearable></u--input>
        </u-form-item>
        <u-form-item label="性别" prop="gender" borderBottom @click="showgender = true" label-position="left">
          <u--input v-model="form.gender" disabled disabledColor="#ffffff" placeholder="性别" border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="手机号码" prop="phone" borderBottom label-position="left" ref="phone" required>
          <u--input v-model="form.phone" border="none" placeholder="请填写手机号码" clearable></u--input>
        </u-form-item>
        <u-form-item label="职业" prop="occupation" borderBottom label-position="left" ref="occupation">
          <u--input v-model="form.occupation" border="none" placeholder="请填写职业" clearable></u--input>
        </u-form-item>
        <u-form-item label="志愿者类型" prop="type" borderBottom @click="showType = true" label-position="left" required>
          <u--input v-model="form.type_text" disabled disabledColor="#ffffff" placeholder="请选择志愿者类型" border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
      <!-- <view class="form">
        <u-form-item label="上传图片" prop="problemFile" required>
          <view class="upload">
            <view class="imageTips"> (支持单个图片，单个文件不超过10M) </view>
            <u-upload
              :fileList="fileList1"
              @afterRead="afterRead"
              @delete="deletePic"
              name="1"
              :multiple="true"
              :maxCount="1"
              width="200rpx"
              height="200rpx"
              :deletable="true"
              :previewFullImage="true"
              uploadText="选择图片">
            </u-upload>
          </view>
        </u-form-item>
        <u-form-item
          label="问题位置"
          prop="address"
          label-position="left"
          @click="toGetPosition"
          required>
          <u--input
            v-model="form.address"
            disabled
            disabledColor="#ffffff"
            border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view> -->
    </u--form>

    <!-- <view class="record" @click="toFeedbackCenter">查看我的记录</view> -->
    <view class="tips">
      分类达人:乐于低偿参加城市公益演出、公益视频拍摄剪辑或者其他特别技能志愿者。
    </view>
    <view class="tips">
      宣讲达人:乐于参加城市管理、垃圾分类、政策法规等方面的宣讲工作。
    </view>
    <view class="tips">
      行动达人:擅于参加城市管理“蓝芽”志愿行动、周末行动、黄昏行动、宣传行动、维修维护、环卫作业等方面的志愿服务活动。
    </view>

    <view class="btn">
      <u-button type="primary" :loading="btnLoading" text="提交" @click="submit" :showCancelButton="true">
      </u-button>
    </view>
    <u-action-sheet :show="showType" :actions="actions" title="请选择志愿者类型" @close="showType = false"
      @select="userTypeSelect">
    </u-action-sheet>
    <u-action-sheet :show="showgender" :actions="[
        { value: '男', name: '男' },
        { value: '女', name: '女' },
      ]" title="请选择性别" @close="showgender = false" @select="genderSelect">
    </u-action-sheet>
  </view>
</template>

<script>
  import {
    addConvenientlyType,
    subscribeById
  } from './api/index'
  export default {
    data() {
      return {
        showType: false,
        showgender: false,
        fileList1: [],
        url_img: '',
        actions: [{
            value: 'CLASSIFICATION_EXPERTS',
            name: '分类达人',
          },
          {
            value: 'EVANGELIST',
            name: '宣讲达人',
          },
          {
            value: 'ACTION_GOERS',
            name: '行动达人',
          },
        ],
        form: {
          nickname: uni.getStorageSync('nikename'),
          phone: uni.getStorageSync('phone'),
          type_text: '',
          type: '',
          gender: '',
          age: '',
          name: '',
          occupation: '',
        },
        rules: {
          // problemStatement: {
          //   type: 'string',
          //   required: true,
          //   message: '请填写问题描述',
          //   trigger: ['blur', 'change'],
          // },
          phone: {
            type: 'string',
            required: true,
            message: '请输入手机号码',
            trigger: ['blur', 'change'],
          },
          nickname: [{
            type: 'string',
            required: true,
            message: '请填写昵称',
            trigger: ['blur', 'change'],
          }, ],
          name: [{
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change'],
          }, ],
          // age: [{
          //   type: 'string',
          //   required: true,
          //   message: '请填写年龄',
          //   trigger: ['blur', 'change'],
          // }, ],
          // gender: [
          //   {
          //     type: 'string',
          //     required: true,
          //     message: '请选择性别',
          //     trigger: ['blur', 'change'],
          //   },
          // ],
          type: [{
            type: 'string',
            required: true,
            message: '请选择志愿者类型',
            trigger: ['blur', 'change'],
          }, ],
          // phone: [
          //   {
          //     required: true,
          //     message: '请填写联系电话',
          //     trigger: ['change', 'blur'],
          //   },
          //   {
          //     // 自定义验证函数，见上说明
          //     validator: (rule, value, callback) => {
          //       // 上面有说，返回true表示校验通过，返回false表示不通过
          //       // uni.$u.test.mobile()就是返回true或者false的
          //       return uni.$u.test.mobile(value)
          //     },
          //     message: '手机号码不正确',
          //     // 触发器可以同时用blur和change
          //     trigger: ['change', 'blur'],
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
      this.subscribeByIdApi()
    },
    methods: {
      subscribeByIdApi() {
        if (uni.getStorageSync('phone'))
          subscribeById({
            phone: uni.getStorageSync('phone'),
          }).then(res => {
            if (res.code == 200 && res.result != '未找到对应数据') {
              this.form = res.result
              this.form.type_text = this.actions.filter(
                item => item.value == this.form.type
              )[0].name
            }
          })
      },
      onChooseavatar(e) {
        this.uploadFilePromise(e.detail.avatarUrl) //上传图片
      },
      userTypeSelect(e) {
        console.log(e)
        this.form.type = e.value
        this.form.type_text = e.name
      },
      genderSelect(e) {
        this.form.gender = e.name
      },
      // toGetPosition() {
      //   uni.chooseLocation({
      //     success: res => {
      //       this.form.address = res.address
      //       this.form.problemLatitude = res.latitude
      //       this.form.problemLongitude = res.longitude
      //       console.log('位置名称：' + res.name)
      //       console.log('详细地址：' + res.address)
      //       console.log('纬度：' + res.latitude)
      //       console.log('经度：' + res.longitude)
      //     },
      //     fail: err => {
      //       console.log(err)
      //     },
      //   })
      // },
      submit() {
        // this.form.problemFile = this.url_img
        this.$refs.form
          .validate()
          .then(res => {
            addConvenientlyType({
              ...this.form,
            }).then(res => {
              if (res.code == 200) {
                uni.showToast({
                  title: '提交成功',
                  icon: 'none',
                })
                setTimeout(() => {
                  uni.navigateBack()
                }, 1500)
              }
            })
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
            })
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
    /* height: 74rpx; */
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 26rpx;
    color: #949494;
    line-height: 40rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin: 50rpx auto;
  }
</style>