<script>
  import authorize from "@/common/auth.js"
  var QQMapWX = require('@/common/qqmap-wx-jssdk.min.js');

  var staticUrl = 'http://cdn.cestech.com.cn/'
  export default {
    globalData: {
      systemName: '垃圾分类宣教宝',
      systemKey: 'slaughter',
      baseurl: 'http://sport-manage.api.9dyf.cn',
      qqmapsdk: null,
      locationKey: 'WTYBZ-JZPC2-D2QUB-CRBNE-NXHZ6-NWBLL',
      background: {
        backgroundColor: '#fff',
        // 导航栏背景图
        // background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
        // 还可以设置背景图size属性
        // backgroundSize: 'cover',

        // 渐变色
        // backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
      },
      theme: {
        "$u-main-color": "#303133",
        "$u-content-color": "#606266",
        "$u-tips-color": "#909193",
        "$u-light-color": "#c0c4cc",
        "$u-border-color": "#dadbde",
        "$u-bg-color": "#f3f4f6",
        "$u-disabled-color": "#c8c9cc",
        "$u-primary": "#3BCF99 ",
        "$u-primary-dark": "#26c6da",
        "$u-primary-disabled": "#80deea",
        "$u-primary-light": "#b2ebf2",
        "$u-warning": "#f9ae3d",
        "$u-warning-dark": "#f1a532",
        "$u-warning-disabled": "#f9d39b",
        "$u-warning-light": "#fdf6ec",
        "$u-success": "#5ac725",
        "$u-success-dark": "#53c21d",
        "$u-success-disabled": "#a9e08f",
        "$u-success-light": "#f5fff0",
        "$u-error": "#f56c6c",
        "$u-error-dark": "#e45656",
        "$u-error-disabled": "#f7b2b2",
        "$u-error-light": "#fef0f0",
        "$u-info": "#909399",
        "$u-info-dark": "#767a82",
        "$u-info-disabled": "#c4c6c9",
        "$u-info-light": "#f4f4f5",
        "$theme-background-color": "#fff",



      },
      hasScopeUserInfo: false,
      staticUrl: staticUrl,
      // 首页写死数据
      index: {
        menuLists: [{
            url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/5c881f129dce4103b506b843f9d17d76.png',
            title: '活动管理',
            route: 'pages/activity/index'

          },
          {
            id: '1559063181911056386',
            url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/6f7d47862ffc443790879e0276c4c121.png',
            title: '我要打卡',
            route: '/pageB/signIn/signIn'
          },
          {
            id: '1559063685168816129',
            url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/6052072d889c45a29ee9c5f58a66742c.png',
            title: '答题竞赛',
            route: 'pages/competition/index'
          },
          {
            id: '1717102654634639362',
            url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/75ee142e14564d7285a1f0b876ef2402.png',
            title: '资料下载',
            route: '/pages/knowledge/list'
          },

        ],
        menuList: [{
            id: '1559063181911056386',
            url: 'https://oms.cestech.com.cn/BkpKnowledge/img/2c8ee8b569c3473cbcf1b48804774643/01 (3)(1).png',
            title: '分类基础',
            children: []
          },
          {
            id: '1559063685168816129',
            url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/2d2cb77ecef14e09acc8a2527b3b3b4b.png',
            title: '行业资讯',
            children: []
          },

          // {
          //   id: "1559063685168816129",
          //   url: '/static/assets/home/icon3.png',
          //   title: '专题报告',
          //   children: [{
          //       id: '1572846998715031553',
          //       url: staticUrl + 'static/special1.png',
          //       title: '限塑令',
          //     },
          //     {
          //       id: '1572847071544926210',
          //       url: staticUrl + 'static/special2.png',
          //       title: '光盘行动',
          //     },
          //     {
          //       id: '1572847137819123714',
          //       url: staticUrl + 'static/special3.png',
          //       title: '低碳出行',
          //       children: []
          //     },
          //     {
          //       id: '1572847168588537857',
          //       url: staticUrl + 'static/special4.png',
          //       title: '过度包装',
          //       children: []
          //     },
          //   ]
          // },
          {
            id: '1559063685168816129',
            url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/1d49caec1ae6442eb95e381a2ceed970.png',
            title: '预约收运',
            route: 'pages/reservation/reservation'

          },
          // {
          //   id: '1559063685168816111',
          //   url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/1d49caec1ae6442eb95e381a2ceed970.png',
          //   title: '分类查询',
          //   route: 'pageB/classification/classification'

          // },

        ],
        current: 0,
        swiperList: [{
            id: '1562993914442604545',
            // url: staticUrl + 'static/banner1.png'
            url: 'https://oms.cestech.com.cn/BkpKnowledge/img/f3af537163a148e996d68036a47e276a/01.jpg'
          },
          {
            id: '1562981491304226818',
            // url: 'https://oms.cestech.com.cn/BkpKnowledge/img/3e0e3d560134484fba3b6a70a84e016b/xx.jpg'
            url: 'https://oms.cestech.com.cn/BkpKnowledge/img/44c4e95393c04a1383b591134cd49dd7/02.jpg'

          },
          {
            // id: '1560557218266537986',
            // url: staticUrl + 'static/banner3.jpg'
            url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/e2110a69aa8c4cb8b2aa1ccbccd7d340.png'

          },
        ],
        list1: [{
            id: '1659136580062810113',
            url: `https://oms.cestech.com.cn/BkpKnowledge/img/db2bc4ab7c7b4c769478b27f9314b128/下载.png`,
            title: '市区共建互进，绘好新时代文明实践发展画卷',
            type: '行业资讯'

          },
          {
            id: '1684741378852044802',
            url: `http://cdn.cestech.com.cn/BkpKnowledge/img/35711c412385458a96b0996d32caab18.png`,
            title: '生活垃圾分类达人 | 讲师王盟：让生活垃圾分类“声入人心',
            type: '专题报告'

          },

        ],
        list2: [{
            id: '1714613242839482370',
            url: `https://oms.cestech.com.cn/BkpKnowledge/img/18b8d74ebc8648bebe919ee22de35a85/1 (1).jpg`,
            title: '泸县：创新举措扎实推进农村生活垃圾治理',
            type: '行业资讯',
          },
          {
            id: '1731870147517952001',
            url: `https://oms.cestech.com.cn/BkpKnowledge/img/17d95caa1ab4497ca7afe1906952c912/2.png`,
            title: '垃圾分类进校园 环保理念入童心',
            type: '专题报告',
          },
        ],
      }

    },
    onLaunch: function() {
      this.globalData.qqmapsdk = new QQMapWX({
        key: this.globalData.locationKey
      });
      // if(uni.getStorageSync('avatarUrl')){
      this.login()
      // }



    },

    onPageNotFound: function() {
      // 跳转到 404 页面：
      uni.$u.route({
        url: 'pages/error/404'

      })
    },
    onHide: function() {},
    methods: {
      // 获取客户地区列表
      getUserRegion() {
        this.$store.commit('setRegions')
        this.$store.commit('setDefaultRegion')

      },
      async login() {
        await authorize.login()
        // const launch = uni.getLaunchOptionsSync()
        // const noLaunch = ["pages/education/detail"]


        // if (noLaunch.indexOf(launch.path) == -1) {
        //     this.checkAuth()
        // }
        // this.checkAuth()
        this.getUserRegion()
      },
      checkAuth() {
        if (!this.$store.state.token || !this.$store.state.user.phone || !this.$store.state.user
          .reg_status) {
          this.$u.route({
            type: 'navigateTo',
            url: 'pages/auth/register',

          })
          return;
        }
      }
    }


  }
</script>

<style lang="scss">
  @import "colorui/main.css";
  @import "colorui/icon.css";
  /*每个页面公共css */
  @import "@/uni_modules/uview-ui/index.scss";
  @import "common/styles.scss";

  .uni-picker-container .uni-picker .uni-picker-action-confirm {
    color: #d7b57c !important;
  }
</style>