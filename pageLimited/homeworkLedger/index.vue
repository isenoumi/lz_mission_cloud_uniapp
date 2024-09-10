<template>
  <view class="mainBox">
    <view class="leftBox">
      <view class="leftItem" v-for="item,index in progressList" :key="index">

        <view @click="jumpTo(index+1)" :class="{number:true, 'numberTrue':item.url!=''||item.videoPath!='','numberFalse':!item.url&&!item.videoPath}">
          {{ index+1 }}
        </view>
      </view>
    </view>
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
        <view class="ruleTitle">作业要求:</view>
        <view class="rule">{{ progressList[progress-1].rule }}</view>
      </view>
      <view class="upload">
        <view class="title"> 上传凭证： </view>
        <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :multiple="true" :maxCount="9" width="160rpx" height="160rpx" :deletable="true" :previewFullImage="true" uploadText="选择图片">
          <!-- 这张图片就是自定义的图片，地址填写自己本地的就行 -->
          <!-- <image src="/static/function/uploadImg.png" mode="widthFix" style="width: 112rpx;height: 110rpx;"></image> -->
        </u-upload>
      </view>
      <view class="upload">
        <view class="title"> 上传视频： </view>
        <view class="delVideo videoBtn " v-if="progressList[progress-1].videoPath" @click="deleteVideo">删除视频</view>
        <view class="upVideo videoBtn" v-else @click="videoUpload">上传视频</view>
        <video style="width: 480rpx;height: 360rpx;" v-if="progressList[progress-1].videoPath" :src="progressList[progress-1].videoPath"></video>
      </view>
      <u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true" :border="false">
        <view class="btnList">
          <!-- <view class="btn" style="background-color: #fff;border: none;" v-if="progress==1">
          </view>
          <view class="btn" style="background: #fff;color: #000; border: solid 2rpx #000;" v-if="progress!=1" @click="back" :showCancelButton="true">
            上一步 </view>
          <view class="btn" v-if="progress!=7" @click="next" :showCancelButton="true">
            下一步 </view> -->
          <view class="btn" :loading="loading" @click="submit" :showCancelButton="true">
            提交</view>
        </view>
      </u-tabbar>
      <u-modal :show="showSubmit" showCancelButton @confirm="modelSubmit('提交')" @cancel="showSubmit = false" confirmText="提交" title="提交确认" content='您已完成所有作业步骤，点击提交后上传系统后无法修改，是否继续提交？'></u-modal>
      <u-modal :show="showStaging" showCancelButton @confirm="modelSubmit('暂存')" @cancel="showStaging = false" confirmText="暂存" title="暂存确认" content='您未完成所有作业步骤，点击暂存后将保存为草稿状态，可前往“作业台账记录”补充完成后再提交记录。'></u-modal>
    </view>
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
            rule: '实施有限空间作业前，应当对作业环境进行评估，分析存在的危险有害因素，提出消除、控制危害的措施，制定有限空间作业方案，明确参与作业人员的各自安全职责，并经企业安全生产管理人员审核，负责人批准。请上传作业方案（作业票）审批情况照片。',
            videoPath: '',
          },
          {
            title: '作业人员培训情况',
            url: '',
            rule: '企业要作业现场负责人、监护人员、作业人员、应急救援人员进行有限空间作业专项安全培训。培训内容主要包括：有限空间作业安全基础知识和安全管理，危险有害因素和安全防范措施，安全操作规程，安全防护设备、个体防护用品及应急救援装备的正确使用，紧急情况下的应急处置措施等。请上传监护人员、作业人员、应急救援人员等培训或技术交底照片。',
            videoPath: '',
          },
          {
            title: '作业过程通风情况',
            url: '',
            rule: '作业前必须使用清洁空气对有限空间进行强制通风直至空气检查合格。作业中要采取强制通风措施，保持空气流通。发现通风设备停止运转、有限空间内氧含量浓度低于或者有毒有害气体浓度高于相关标准规定的限值时，必须立即停止有限空间作业，清点作业人员，撤离作业现场。请上传作业过程通风的照片、视频。',
            videoPath: '',
          },
          {
            title: '有毒有害气体检测情况',
            url: '',
            rule: '作业前应在有限空间外上风侧，使用泵吸式气体检测报警仪对有限空间内气体进行检测，不得早于作业开始前30分钟。垂直方向的检测由上至下，至少进行上、中、下三点检测；水平方向的检测由近至远，至少进行进出口近端点和远端点两点检测。检测指标应包括氧浓度、易燃易爆物质浓度、有毒有害气体浓度。作业全程要采取泵吸式或者便携式气体检测报警仪对有限空间作业面进行实时监测。请上传检测记录和检测现场照片、视频。',
            videoPath: '',
          },
          {
            title: '防护用品配备情况',
            url: '',
            rule: '作业人员在进入有限空间前应根据作业环境选择并佩戴符合要求的个体防护用品与安全防护设备。主要有：安全帽、全身式安全带、安全绳、呼吸防护用品、便携式气体检测报警仪、照明灯和对讲机等。请上传作业人员穿戴防护用品的照片、视频。',
            videoPath: '',
          },
          {
            title: '作业监护到位情况',
            url: '',
            rule: '进行作业时，监护人员应在有限空间外全程持续监护，不得擅离职守。监护人员要全程跟踪作业人员作业过程，保持信息沟通，发现异常状况及时报警，并协助作业人员撤离。请上传现场监护人员的照片、视频。',
            videoPath: '',
          },
          {
            title: '应急救援准备情况',
            url: '',
            rule: '一旦发生有限空间作业事故，作业现场负责人应及时向企业主要负责人报告事故情况，尽可能采取非进入式救援。当无法采取非进入式救援时，救援人员必须佩戴正压式空气呼吸器、全身式安全带、安全帽等个体防护用品，方能进入救援，严禁无防护开展进入式救援。若现场不具备自主救援条件，应及时拨打119和120，借助专业救援力量开展救援工作，决不允许强行施救。请上传现场应急救援装备准备情况照片、视频。',
            videoPath: '',
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
            this.progressList[0].videoPath = res.data.approvalVideoPath
            this.progressList[1].videoPath = res.data.trainingVideoPath
            this.progressList[2].videoPath = res.data.ventilationVideoPath
            this.progressList[3].videoPath = res.data.toxicDetectionVideoPath
            this.progressList[4].videoPath = res.data.ppeVideoPath
            this.progressList[5].videoPath = res.data.supervisionVideoPath
            this.progressList[6].videoPath = res.data.emergencyVideoPath

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
      deleteVideo() {
        this.progressList[this.progress - 1].videoPath = ''
      },
      videoUpload() {
        uni.chooseVideo({
          sourceType: ['album', 'camera'],
          camera: 'back',
          maxDuration: 10,
          compressed: true,
          success: res => {
            console.log(res)
            // 成功选择照片后的回调
            const tempFilePaths = res.tempFilePath
            uni.showLoading({
              title: '上传中',
            })
            uni.uploadFile({
              url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/imgUpload', // 仅为示例，非真实的接口地址
              filePath: tempFilePaths,
              name: 'file',
              formData: {
                user: 'test',
              },
              success: res => {
                this.loading = false
                this.progressList[this.progress - 1].videoPath = JSON.parse(res.data).message
                uni.hideLoading()
              },
              fail: err => {
                console.log(err)
              },
              finally: () => {
                uni.hideLoading()
              },
            })
          },
          fail: err => {
            console.log('选择照片失败：', err)
          },
        })
      },
      jumpTo(index) {
        if (index == this.progress) return
        if (this.loading) return
        this.progressList[this.progress - 1].url = this.setUrl()
        // if (this.progressList[this.progress].url) {
        //   this.fileList1 = []
        //   let list = this.progressList[this.progress].url.split(',')
        //   list.forEach((item, index) => {
        //     this.fileList1.push({ type: 'image', url: item })
        //   })
        // } else {
        //   this.fileList1 = []
        // }
        console.log(this.progressList)
        this.progress = index
        if (this.progressList[this.progress - 1].url) {
          this.fileList1 = []
          let list = this.progressList[this.progress - 1].url.split(',')
          list.forEach((item, index) => {
            this.fileList1.push({ type: 'image', url: item })
          })
        } else {
          this.fileList1 = []
        }
        console.log(this.progressList)
      },
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
        ctx.setStrokeStyle('#1dd193')
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
        this.progressList[this.progress - 1].url = this.setUrl()
        console.log(this.progressList)
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
          if (!item.url && !item.videoPath) {
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
      width: 688rpx;
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
    /* padding: 30rpx;
                                                                                                                                padding-top: 0; */
    /* border: #1dd193 1px solid; */
    padding-right: 24rpx;
    width: 588rpx;
    margin-left: 58rpx;
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
  .mainBox {
    display: flex;
    justify-content: left;
    .leftBox {
      width: 96rpx;
      margin-top: 168rpx;
      padding: 24rpx;
      .numberTrue {
        border: #1dd193 1px solid;
        color: #fff;
        background: #1dd193;
      }
      .number {
        width: 96rpx;
        height: 96rpx;
        line-height: 96rpx;
        font-weight: 600;
        text-align: center;
        border-radius: 24rpx;
        margin-top: 64rpx;
        font-size: 42rpx;
      }
      .numberFalse {
        border: #1dd193 1px solid;
        color: #1dd193;
        background: #fff;
      }
    }
  }
  .delVideo {
    border: #000 1px solid;
    color: #000;
    background: #fff;
  }
  .upVideo {
    border: #1dd193 1px solid;
    color: #fff;
    background: #1dd193;
  }
  .videoBtn {
    width: 152rpx;
    height: 64rpx;
    line-height: 64rpx;
    text-align: center;
    border-radius: 12rpx;
    font-size: 28rpx;
    margin: 12rpx 0;
  }
</style>
