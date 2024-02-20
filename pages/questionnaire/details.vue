<template>
  <view>
    <view class="mian">
      <view class="img">
        <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/87365097fa96463c8790dc4074fe93d1.png" mode="aspectFill"
          style="width: 100%;height: 100%;"></image>
      </view>
      <view class="li">
        <view class="title">成都市垃圾回收调研成都市垃圾回收调研成都市垃圾回收调研</view>
        <view class="rule">
          这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则这是规则
        </view>
        <view class="city">
          <view><text class="icon">*</text>地区：</view>
          <view class="input" type="text" placeholder="请选择地区">
            <picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" :value="multiIndex"
              @change="pickerChange" @columnchange="pickerColumnchange">
              <view class="select">{{select}}</view>
            </picker>
          </view>
        </view>
        <view class="textarea">
          <view style="margin-bottom: 30rpx;"><text class="icon">*</text>1 .您的地址:</view>
          <u--textarea v-model="value2" placeholder="请输入内容" maxlength="-1"></u--textarea>
        </view>
        <!-- 单选 -->
        <view v-for="(item,indexs) in radiolist1" style="margin-bottom: 40rpx;">
          <view class="name"><text class="icon">*</text><text class="u-block__title">{{indexs+2}} .{{item.title}}</text>
          </view>
          <u-radio-group placement="column" @change="groupChange(item)" shape="square" v-model="radiovalue1">
            <u-radio :customStyle="{marginBottom: '20rpx'}" v-for="(item, index) in item.tip" :key="index"
              :label="item.name" :name="item.name" @change="radioChange(item)">
            </u-radio>
          </u-radio-group>
        </view>
        <!-- 多选 -->
        <!-- <view v-for="(item,indexs) in radiolist1" style="margin-bottom: 40rpx;">
					<view class="name"><text class="u-block__title">{{indexs+1}}: {{item.title}}</text></view>
					<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange(e)">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(item, index) in item.tip" :key="index"
							:label="item.name" :name="item.name">
						</u-checkbox>
					</u-checkbox-group>
				</view> -->
        <view class="submit">提交</view>
      </view>
    </view>
  </view>
</template>

<script>
  import provinceData from "./provinceAndCity.js"
  export default {
    data() {
      return {
        value2: '统计字数',
        oldpProvinceDataList: provinceData.data,
        newProvinceDataList: [
          [],
          [],
          []
        ],
        multiIndex: [0, 0, 0],
        select: '选择省市区',
        addressData: {
          name: '',
          phone: '',
          address: ''
        },
        binhao: '1',
        radiolist1: [{
            title: '什么不能吃？',
            id: '1',
            tip: [{

                name: '苹果',
                disabled: false
              },
              {
                name: '香蕉',
                disabled: false
              },
              {
                name: '橙子',
                disabled: false
              }, {
                name: '榴莲',
                disabled: true
              }

            ]
          },
          {
            title: '王者荣耀以下谁是演员？',
            id: '2',
            tip: [{
                name: '马可波罗',
                disabled: false
              },
              {
                name: '庄周',
                disabled: false
              },
              {
                name: '百里守约',
                disabled: false
              }, {
                name: '韩信',
                disabled: false
              }

            ]
          },
          {
            title: '陈鹏是男是女？',
            id: '3',
            tip: [{
                name: '男',
                disabled: false
              },
              {
                name: '女',
                disabled: false
              },
              {
                name: '未知',
                disabled: false
              },
            ]
          }


        ],
        // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
        radiovalue1: "",
        checkboxValue1: {}
      }
    },
    onLoad() {
      // 开始省市区默认数据
      var _this = this
      // 省
      for (let i = 0; i < _this.oldpProvinceDataList.length; i++) {
        _this.newProvinceDataList[0].push(_this.oldpProvinceDataList[i].name)
      }
      // 市
      for (let i = 0; i < _this.oldpProvinceDataList[0].city.length; i++) {
        _this.newProvinceDataList[1].push(_this.oldpProvinceDataList[0].city[i].name)
      }
      // 区县
      for (let i = 0; i < _this.oldpProvinceDataList[0].city[0].area.length; i++) {
        _this.newProvinceDataList[2].push(_this.oldpProvinceDataList[0].city[0].area[i])
      }

    },
    methods: {
      checkboxChange(e) {
        console.log('change', e);
      },
      groupChange(n) {
        console.log('sssss', n);
        // console.log(this.radiovalue1,'000')
        // this.sjlist.push(n)
        // console.log(this.sjlist, '000')
      },
      radioChange(e) {
        console.log('radioChange', e);
      },
      // 省市区确认事件
      pickerChange: function(e) {
        var _this = this
        _this.multiIndex = e.detail.value
        // 数组内的下标
        console.log(JSON.stringify(_this.multiIndex))
        // 获取省市区总数据
        console.log(_this.newProvinceDataList[0][_this.multiIndex[0]], '111')
        console.log(_this.newProvinceDataList[1][_this.multiIndex[1]], '222')
        console.log(_this.newProvinceDataList[2][_this.multiIndex[2]], '333')
        _this.select =
          _this.newProvinceDataList[0][_this.multiIndex[0]] + "---" +
          _this.newProvinceDataList[1][_this.multiIndex[1]] + "---" +
          _this.newProvinceDataList[2][_this.multiIndex[2]]
      },
      // 每列滑动的监听
      pickerColumnchange: function(e) {
        var _this = this
        // 第几列滑动
        console.log("第几列滑动 = " + JSON.stringify(e.detail.column))
        // 第几列滑动选中的下标
        console.log("第几列滑动选中的下标 = " + JSON.stringify(e.detail.value))
        // 第一列滑动
        if (e.detail.column === 0) {
          _this.multiIndex[0] = e.detail.value
          // 第二列更新相应的数据
          _this.newProvinceDataList[1] = _this.oldpProvinceDataList[_this.multiIndex[0]].city.map((item,
            index) => {
            return item.name
          })
          if (_this.oldpProvinceDataList[_this.multiIndex[0]].city.length === 1) {
            _this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[0].area
              .map((
                item,
                index) => {
                return item
              })
          } else {
            _this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[_this
              .multiIndex[
                1]].area.map((item, index) => {
              return item
            })
          }
          // 第一列滑动  第二列 和第三列 都变为第一个
          _this.multiIndex.splice(1, 1, 0)
          _this.multiIndex.splice(2, 1, 0)
        }
        // 第二列滑动
        if (e.detail.column === 1) {
          _this.multiIndex[1] = e.detail.value
          _this.newProvinceDataList[2] = _this.oldpProvinceDataList[_this.multiIndex[0]].city[_this
            .multiIndex[
              1]].area.map((item, index) => {
            return item
          })
          // 第二列 滑动 第三列 变成第一个
          _this.multiIndex.splice(2, 1, 0)
        }
        // 第三列滑动
        if (e.detail.column === 2) {
          _this.multiIndex[2] = e.detail.value
        }
      }
    }
  }
</script>

<style lang="scss">
  page {
    background: #f5f5f5;
  }

  .mian {

    .img {
      width: 750rpx;
      height: 400rpx;
      z-index: -1;
    }

    .city {
      display: flex;
      align-items: center;
      font-size: 30rpx;
      font-weight: 600;
      margin-bottom: 30rpx;

      .select {
        font-size: 30rpx;
      }

      .icon {
        color: red;
        margin-right: 5rpx;
      }
    }

    .textarea {
      font-size: 30rpx;
      font-weight: 600;
      margin-bottom: 30rpx;

      .icon {
        color: red;
        margin-right: 5rpx;
      }
    }

    .li {
      width: 750rpx;
      padding: 40rpx 30rpx;
      // height: 800rpx;
      z-index: 999;
      background: #fff;
      position: relative;
      bottom: 40rpx;
      border-radius: 25rpx 25rpx 0 0;

      .title {
        text-align: center;
        font-size: 32rpx;
        font-weight: 600;

      }

      .name {
        margin-bottom: 30rpx;

        .icon {
          color: red;
          margin-right: 5rpx;
        }

        .u-block__title {
          font-size: 30rpx;
          font-weight: 600;
        }
      }

      .rule {
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        color: rgb(148, 97, 58);
        font-size: 24rpx;
        line-height: 46rpx;
      }

      .submit {
        width: 160rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        background: skyblue;
        color: #fff;
        font-size: 26rpx;
        font-weight: normal;
        border-radius: 10rpx;
        margin: 0 auto;
        margin-top: 30rpx;
      }
    }
  }
</style>