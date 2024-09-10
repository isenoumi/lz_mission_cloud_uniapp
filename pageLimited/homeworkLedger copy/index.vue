<template>
  <view class="content">
    <!-- 上传图片 -->
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#fff" imageSrc="https://oms.cestech.com.cn/BkpKnowledge/img/286b4a1bb0f64d0286f488097a260707/蒙版组 8.png" autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="提交作业台账" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>

    <view class="top">
      <view class="circle">
        <canvas style="width: 84px; height: 84px;" canvas-id="circlefCanvas" id="circlefCanvas"></canvas>

      </view>
      <view class="titleBox">
        <view class="title">{{ progressList[progress-1].title }}</view>
        <view class="nextTitle" v-if="progress!=7">下一流程: {{ progressList[progress].title }}</view>
        <view class="nextTitle" v-else>下一流程: 无</view>
      </view>
    </view>
    <view class="ruleBox">
      <view class="ruleTitle">流程要求:</view>
      <view class="rule">{{ progressList[progress].rule }}</view>
    </view>
    <view class="upload">
      <view class="title"> 上传凭证： </view>
      <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :multiple="true" :maxCount="9" width="200rpx" height="200rpx" :deletable="true" :previewFullImage="true" uploadText="选择图片">
        <!-- 这张图片就是自定义的图片，地址填写自己本地的就行 -->
        <!-- <image src="/static/function/uploadImg.png" mode="widthFix" style="width: 112rpx;height: 110rpx;"></image> -->
      </u-upload>
    </view>
    <u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true" :border="false">
      <view class="btnList">
        <view class="btn" style="background-color: #fff;border: none;" v-if="progress==1">
        </view>
        <view class="btn" style="background: #fff;color: #000; border: solid 2rpx #000;" v-if="progress!=1" @click="back" :showCancelButton="true">
          上一步 </view>
        <view class="btn" v-if="progress!=7" @click="next" :showCancelButton="true">
          下一步 </view>
        <view class="btn" v-if="progress==7" :loading="loading" @click="submit" :showCancelButton="true">
          提交</view>
      </view>
    </u-tabbar>
    <u-modal :show="showSubmit" showCancelButton @confirm="modelSubmit('提交')" @cancel="showSubmit = false" confirmText="提交" title="提交确认" content='您已完成所有作业步骤，点击提交后上传系统后无法修改，是否继续提交？'></u-modal>
    <u-modal :show="showStaging" showCancelButton @confirm="modelSubmit('暂存')" @cancel="showStaging = false" confirmText="暂存" title="暂存确认" content='您未完成所有作业步骤，点击暂存后将保存为草稿状态，可前往“作业台账记录”补充完成后再提交记录。'></u-modal>
  </view>
</template>

<script>
  import { jobInsert, jobEdit, jobInfo } from './api'
  export default {
    data() {
      return {
        loading: false,
        showSubmit: false,
        showStaging: false,
        punchCardDescribe: '',
        limitedId: '',
        id: '',
        // 上传图片
        fileList1: [],
        progress: 1,
        progressList: [
          {
            title: '作业方案审批情况',
            url: '',
            rule: '管理人员上传经过审批的《有限空间作业审批单》照片。',
          },
          {
            title: '作业人员培训情况',
            url: '',
            rule: '管理人员上传开展有限空间作业安全培训记录和人员签到等照片。',
          },
          {
            title: '作业过程通风情况',
            url: '',
            rule: '管理人员上传作业前通风过程照片或者视频。',
          },
          {
            title: '有毒有害气体检测情况',
            url: '',
            rule: '管理人员上传《有限空间作业气体检测记录表》和现场检测照片或者视频。',
          },
          {
            title: '防护用品配备情况',
            url: '',
            rule: '管理人员上传现场作业人员配备防护用品的照片。',
          },
          {
            title: '作业监护到位情况',
            url: '',
            rule: '管理人员上传现场监护人员照片。',
          },
          {
            title: '应急救援准备情况',
            url: '',
            rule: '管理人员上传现场救援装备准备照片或者视频。',
          },
        ],
      }
    },
    onLoad(option) {
      this.circleProgressbar()
      // TODO qrcode
      console.log(option, 'option')
      //获取Location对象的search属性值,location对象中search属性返回的是URL问号之后的那部分（包括问号）
      if (option.q) {
        this.limitedId = decodeURIComponent(option.q)?.split('id=')[1]
      } else if (option.limitedId) {
        this.limitedId = option.limitedId
      }
      if (option.id) {
        this.id = option.id
        jobInfo(this.id)
          .then(res => {
            this.progressList[0].url = res.data.approvalImage
            this.progressList[1].url = res.data.trainingImage
            this.progressList[2].url = res.data.ventilationImage
            this.progressList[3].url = res.data.toxicDetectionImage
            this.progressList[4].url = res.data.ppeImage
            this.progressList[5].url = res.data.supervisionImage
            this.progressList[6].url = res.data.emergencyImage
            this.fileList1 = []
            let list = this.progressList[0].url.split(',')
            list.forEach((item, index) => {
              this.fileList1.push({ type: 'image', url: item })
            })
          })
          .catch(err => {})
      } else this.id = ''
    },
    watch: {
      progress: {
        handler(nv, ov) {
          console.log(nv, ov)
          this.circleProgressbar()
        },
      },
    },
    methods: {
      back() {
        if (this.loading) return
        this.progressList[this.progress - 1].url = this.setUrl()
        console.log(this.progressList)
        this.progress -= 1
        if (this.progressList[this.progress - 1].url) {
          this.fileList1 = []
          let list = this.progressList[this.progress - 1].url.split(',')
          list.forEach((item, index) => {
            this.fileList1.push({ type: 'image', url: item })
          })
        } else this.fileList1 = []
      },
      next() {
        if (this.loading) return
        this.progressList[this.progress - 1].url = this.setUrl()
        if (this.progressList[this.progress].url) {
          this.fileList1 = []
          let list = this.progressList[this.progress].url.split(',')
          list.forEach((item, index) => {
            this.fileList1.push({ type: 'image', url: item })
          })
        } else this.fileList1 = []
        console.log(this.progressList)
        this.progress += 1
      },
      circleProgressbar() {
        // 画整个圆环
        const ctx = uni.createCanvasContext('circlefCanvas')
        ctx.beginPath()
        ctx.arc(42, 42, 30, 0, 2 * Math.PI) // 42为canvas宽度一班代表居中
        ctx.setStrokeStyle('#FAF7F7')
        ctx.setLineWidth(5)
        ctx.stroke()
        // 进度
        ctx.beginPath()
        ctx.arc(42, 42, 30, 0, ((2 * this.progress) / 7) * Math.PI)
        ctx.setStrokeStyle('#E8736F')
        ctx.setLineWidth(5)
        ctx.stroke()

        // 中心字体
        ctx.setFillStyle('#000')
        ctx.setFontSize(17)
        ctx.setTextAlign('center')
        ctx.fillText(`${this.progress}/7`, 42, 50)
        ctx.stroke()
        ctx.draw()
      },

      //删除图片
      deletePic(e) {
        console.log(e)
        this[`fileList${e.name}`].splice(e.index, 1)
      },
      // 新增图片
      async afterRead(event) {
        this.loading = true
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
              this.loading = false
              // setTimeout(() => {
              resolve(JSON.parse(res.data).message)
              // }, 1000)
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
        if (this.loading) return
        let flag = true
        this.progressList[this.progress - 1].url = this.setUrl()
        this.progressList.forEach(item => {
          if (!item.url) {
            flag = false
            return
          }
        })
        flag ? (this.showSubmit = true) : (this.showStaging = true)
      },
      modelSubmit(type) {
        if (!this.id)
          jobInsert({
            jobProgressDtos: this.progressList,
            limitedId: this.limitedId,
            type: type == '提交' ? '完成' : '暂存',
            phone: uni.getStorageSync('enterprise').username,
          })
            .then(res => {
              uni.showToast({
                title: type + '成功',
                icon: 'none',
                duration: 1500,
                mask: false,
              })
              setTimeout(() => {
                // TODO navigateBack
                // uni.navigateBack()
                uni.redirectTo({ url: '/pageLimited/index/index' })
              }, 1500)
            })
            .catch(err => {
              uni.showToast({
                title: type + '失败',
                icon: 'none',
                duration: 1500,
                mask: false,
              })
            })
            .finally(() => {
              this.showSubmit = false
              this.showStaging = false
            })
        else
          jobEdit({
            jobProgressDtos: this.progressList,
            limitedId: this.limitedId,
            type: type == '提交' ? '完成' : '暂存',
            id: this.id,
          })
            .then(res => {
              uni.showToast({
                title: type + '成功',
                icon: 'none',
                duration: 1500,
                mask: false,
              })
              setTimeout(() => {
                // TODO navigateBack
                uni.navigateBack()
                // uni.redirectTo({ url: '/pageLimited/index/index' })
              }, 1500)
            })
            .catch(err => {
              uni.showToast({
                title: type + '失败',
                icon: 'none',
                duration: 1500,
                mask: false,
              })
            })
            .finally(() => {
              this.showSubmit = false
              this.showStaging = false
            })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .btnList {
    display: flex;
    justify-content: space-between;
    width: 688rpx;
    margin: 0 auto;
    .btn {
      width: 338rpx;
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
  .ruleBox {
    .ruleTitle {
      font-size: 32rpx;
      font-weight: 600;
    }
    .rule {
      margin-top: 8rpx;
      font-size: 28rpx;
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
