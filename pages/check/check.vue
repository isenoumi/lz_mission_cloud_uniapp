<template>
  <view class="content">
    <!-- 上传图片 -->

    <view class="text">
      <view class="title">
        分享心得：
      </view>
      <u--textarea v-model="punchCardDescribe" placeholder="请输入内容"></u--textarea>
    </view>

    <view class="upload">
      <view class="title">
        图片上传：
      </view>
      <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :multiple="true" :maxCount="2"
        width="200rpx" height="200rpx" :deletable="true" :previewFullImage="true" uploadText="选择图片">


        <!-- 这张图片就是自定义的图片，地址填写自己本地的就行 -->
        <!-- <image src="/static/function/uploadImg.png" mode="widthFix" style="width: 112rpx;height: 110rpx;"></image> -->
      </u-upload>
    </view>

    <view class="btn" @click="toCheckSuccess">
      确认
    </view>
  </view>
</template>

<script>
  import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup';
  export default {
    data() {
      return {
        punchCardDescribe: '',
        // 上传图片
        fileList1: [],
      }
    },
    onLoad() {

    },
    methods: {
      punchCardRecord(imgurl) {
        const phone = uni.getStorageSync("phone")
        uni.request({
          url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbPunchCardRecord/add?punchCardPhone=${phone}`,
          data: {
            punchCardPhone: uni.getStorageSync("phone"),
            // punchCardPhone: '梵蒂冈的是',
            punchCardDescribe: this.punchCardDescribe,
            punchCardArrayUrl: imgurl
          },
          method: "POST",
          success: (res) => {
            uni.navigateTo({
              url: '/pageB/checkSuccess/checkSuccess'
            })
          }
        })
      },
      //删除图片
      deletePic(e) {
        console.log(e);
        this[`fileList${e.name}`].splice(e.index, 1)
      },
      // 新增图片
      async afterRead(event) {
        console.log(event)
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.file)
        let fileListLen = this[`fileList${event.name}`].length
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: 'uploading',
            message: '上传中'
          })
        })
        for (let i = 0; i < lists.length; i++) {
          const result = await this.uploadFilePromise(lists[i].url)
          let item = this[`fileList${event.name}`][fileListLen]
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: result
          }))
          fileListLen++
        }
      },
      //上传图片
      uploadFilePromise(url) {
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            //url: this.$common.domain+'/api/common/upload', // 仅为示例，非真实的接口地址
            url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/imgUpload', // 仅为示例，非真实的接口地址
            filePath: url,
            name: 'file',
            formData: {
              user: 'test'
            },
            success: (res) => {
              console.log(res.data.data, '@@@@@@@@@@@@@@@@###########')
              // setTimeout(() => {
              resolve(res.data.data)
              // }, 1000)
            }
          });
        })
      },

      toCheckSuccess() {

        let imgurl = ''
        this.fileList1.forEach((item, index) => {


          imgurl = imgurl + item.thumb + ","

        })
        imgurl = imgurl.slice(0, -1);
        console.log('fileList1', imgurl);
        this.punchCardRecord(imgurl)

      }
    }
  }
</script>

<style lang="scss">
  .btn {
    width: 400rpx;
    height: 100rpx;
    background: #29CE8C;
    border-radius: 20rpx;
    line-height: 100rpx;
    color: #fff;
    text-align: center;
    margin: 100rpx auto;
  }

  .title {
    margin-bottom: 20rpx;
    font-size: 28rpx;
  }

  .content {
    padding: 30rpx;
  }

  .upload {
    margin-top: 40rpx;
  }
</style>