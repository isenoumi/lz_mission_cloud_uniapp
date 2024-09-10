/**
 * 显示消息提示框
 * @param content 提示的标题
 */
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}
// /**
//  * 是否登录
//  */
// export function isLogin() {
//   if (!uni.getStorageSync('phone')) {
//     uni.showToast({
//       title: '请登录!',
//       icon: 'none',
//       mask: true,
//     })
//     setTimeout(() => {
//       uni.switchTab({
//         url: '/pages/center/index'
//       })
//     }, 1000)
//     return true
//   } else return false
// }
/**
 * 是否登录
 */
export function isLogin() {
  if (!uni.getStorageSync('phone')) {
    showConfirm('当前用户未登录, 请前往登录?').then(res => {
      if (res.confirm) {
        uni.reLaunch({
          url: '/pages/center/index',
        })

      }


    })
    return true
  } else {
    return false
  }
}

/**
 * 显示模态弹窗
 * @param content 提示的标题
 */
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}

export function preloadImage(image) {

  const keys = Object.keys(image)

  // 遍历属性名数组
  keys.forEach(key => {
    setImage(image[key], key)
  })
}

function setImage(src, storageName) {
  uni.getImageInfo({
    src,
    success: res => {
      uni.setStorageSync(storageName, res.path)
    },
  })
}