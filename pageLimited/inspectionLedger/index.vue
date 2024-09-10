<template>
  <view class="content">
    <!-- 上传图片 -->
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#fff" imageSrc="https://oms.cestech.com.cn/BkpKnowledge/img/286b4a1bb0f64d0286f488097a260707/蒙版组 8.png" autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="提交自查台账" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <view class="header">上传自查表</view>
    <view class="ruleBox">
      <view class="ruleTitle">具体步骤:</view>
      <view class="rule">打印自查表：请先将系统提供的自查表打印出来。<br />
        填写自查表：仔细阅读并完整填写自查表的所有项目。<br />
        拍照上传：请将填写好的自查表放置在一个明亮的环境中，确保光线充足。您可以使用系统相机功能直接拍摄并上传单张自查表照片。或者，您可以通过系统相册功能上传最多9张照片</view>
    </view>
    <view class="download" @click="downloadFun">没有模板? 点我下载</view>
    <view class="upload">
      <view class="title"> 上传凭证： </view>
      <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :multiple="true" :maxCount="9" width="200rpx" height="200rpx" :deletable="true" :previewFullImage="true" uploadText="选择图片">
        <!-- 这张图片就是自定义的图片，地址填写自己本地的就行 -->
        <!-- <image src="/static/function/uploadImg.png" mode="widthFix" style="width: 112rpx;height: 110rpx;"></image> -->
      </u-upload>
    </view>
    <u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true" :border="false">
      <view class="btnList">
        <view class="btn" @click="submit" :showCancelButton="true">
          提交</view>
      </view>
    </u-tabbar>
    <!-- <u-modal :show="showSubmit" showCancelButton @confirm="modelSubmit('提交')" @cancel="showSubmit = false" confirmText="提交" title="提交确认" content='您已完成所有作业步骤，点击提交后上传系统后无法修改，是否继续提交？'></u-modal> -->
  </view>
</template>

<script>
  import { selfExaminationInsert } from './api'
  export default {
    data() {
      return {
        showSubmit: false,
        showStaging: false,
        punchCardDescribe: '',
        // 上传图片
        fileList1: [],
      }
    },
    onLoad() {},
    watch: {},
    methods: {
      // 下载附件
      downloadFun() {
        const enclosure = 'https://oms.cestech.com.cn/file/255207a432584003832393225660b2bb.docx'
        const name = '自查表'
        let txt = ''
        console.log(enclosure, '下载文件')

        if (enclosure.indexOf('xlsx') != -1) {
          txt = 'xlsx'
        }
        if (enclosure.indexOf('doc') != -1) {
          txt = 'doc'
        }
        if (enclosure.indexOf('docx') != -1) {
          txt = 'docx'
        }
        if (enclosure.indexOf('pdf') != -1) {
          txt = 'pdf'
        }

        uni.showLoading({
          title: '下载中',
        })

        //下载文件
        uni.downloadFile({
          //只能是GET请求
          url: enclosure,
          // url: "http://cdn.cestech.com.cn/file/0efa7e2b5c7646ff8584dfc53154044a.mp4", //请求地址(后台返回的码流地址)
          success: res => {
            //下载成功
            if (res.statusCode === 200) {
              //保存文件
              let tempFile = res.tempFilePath
              //保存成功之后 打开文件
              uni.getFileSystemManager().saveFile({
                tempFilePath: tempFile,
                filePath: wx.env.USER_DATA_PATH + '/' + `${name}`, //自定义文件名
                success(res) {
                  console.log(txt, '文件预览')
                  uni.openDocument({
                    fileType: txt,
                    filePath: res.savedFilePath,
                    showMenu: true, //是否可以分享
                    success: res => {
                      uni.hideLoading()
                      console.log(res)
                    },
                    fail: e => {
                      uni.showToast({
                        title: '打开失败',
                        icon: 'error',
                      })
                    },
                  })
                },
              })
            }
          },
          fail: e => {
            console.log(e, '文件下载失败')
            uni.showToast({
              title: '文件下载失败',
              icon: 'error',
            })
          },
        })
      },
      punchCardRecord(imgurl) {
        selfExaminationInsert({
          selfExaminationImage: imgurl,
          companyName: uni.getStorageSync('enterprise').companyId,
          createByUsername: uni.getStorageSync('enterprise').username,
        })
          .then(result => {
            uni.showToast({ title: '提交成功', icon: 'none' })
            setTimeout(() => {
              uni.navigateBack({ delta: 1 })
            }, 1500)
          })
          .catch(err => {})
        // uni.request({
        //   url: `https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/bkbPunchCardRecord/add?punchCardPhone=${phone}`,
        //   data: {
        //     punchCardPhone: uni.getStorageSync('phone'),
        //     // punchCardDescribe: this.punchCardDescribe,
        //     punchCardArrayUrl: imgurl,
        //   },
        //   method: 'POST',
        //   success: res => {
        //     // uni.redirectTo({
        //     //   url: '/pageB/checkSuccess/checkSuccess',
        //     // })
        //   },
        // })
      },
      //删除图片
      deletePic(e) {
        console.log(e)
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
            //url: this.$common.domain+'/api/common/upload', // 仅为示例，非真实的接口地址
            url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/imgUpload', // 仅为示例，非真实的接口地址
            filePath: url,
            name: 'file',
            formData: {
              user: 'test',
            },
            success: res => {
              resolve(JSON.parse(res.data).message)
            },
          })
        })
      },
      setUrl() {
        let imgurl = ''
        this.fileList1.forEach((item, index) => {
          console.log(item)
          imgurl = imgurl + item.url + ','
        })
        return imgurl.slice(0, -1)
      },
      submit() {
        let imgurl = ''
        this.fileList1.forEach((item, index) => {
          console.log(item)
          imgurl = imgurl + item.url + ','
        })
        imgurl = imgurl.slice(0, -1)
        console.log('fileList1', imgurl)
        if (!imgurl) {
          uni.showToast({
            title: '请上传图片',
            icon: 'none',
            mask: true,
          })
          return
        }
        this.punchCardRecord(imgurl)
      },
      // submit() {
      //   let flag = true
      //   this.progressList[this.progress - 1].url = this.setUrl()
      //   this.progressList.forEach(item => {
      //     if (!item.url) {
      //       flag = false
      //       return
      //     }
      //   })
      //   flag ? (this.showSubmit = true) : (this.showStaging = true)
      // },
      // modelSubmit(type) {
      //   if (type == '提交') {
      //     this.showSubmit = false
      //   } else if (type == '暂存') {
      //     this.showStaging = false
      //   }
      //   uni.showToast({
      //     title: type + '成功',
      //     icon: 'none',
      //     duration: 1500,
      //     mask: false,
      //   })
      //   setTimeout(() => {
      //     uni.navigateBack()
      //   }, 1500)
      // },
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    font-size: 48rpx;
    font-weight: 700;
    text-align: center;
    margin: 8rpx auto 28rpx;
  }
  .btnList {
    /* display: flex; */
    /* justify-content: space-between; */
    width: 688rpx;
    margin: 0 auto;
    text-align: center;
    .btn {
      margin: 0 auto;
      width: 668rpx;
      height: 80rpx;
      background: #1dd193;
      border-radius: 12rpx 12rpx 12rpx 12rpx;
      border: solid 2rpx #1dd193;
      line-height: 80rpx;
      font-weight: 400;
      font-size: 32rpx;
      color: #ffffff;
      text-align: center;
    }
  }
  .download {
    margin-top: 24rpx;
    color: #7970ff;
    width: 100%;
    text-align: right;
  }
  .ruleBox {
    .ruleTitle {
      font-size: 32rpx;
      font-weight: 600;
    }
    .rule {
      margin-top: 8rpx;
      font-size: 30rpx;
    }
  }
  .title {
    margin-bottom: 20rpx;
    font-size: 28rpx;
  }

  .content {
    padding: 30rpx;
  }

  .upload {
    margin-top: 52rpx;
  }

  .top {
    margin: 36rpx auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .titleBox {
      width: 352rpx;
      margin-right: 36rpx;
      .title {
        font-size: 32rpx;
        font-weight: 600;
      }
      .nextTitle {
        font-size: 28rpx;
      }
    }
  }
</style>
