// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basedomain: app.data.basedomain,
    contactdomain: app.data.contactdomain,
    bgImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    wechatImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
  },
  saveToPhoto () {
    wx.downloadFile({
      url: this.data.wechatImg,
      success (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success () {
            wx.showToast({
              title: '保存成功'
            })
          },
          fail () {
            wx.showToast({
              title: '未授权，无法保存'
            })
          }
        })
      }
    })
  },
  // 提交表单
  confirm (e) {
    if (!e.detail.value.content.trim().length) return app.setToast(this, {content: '请输入反馈内容'})
    this.upDat(e)
  },
  getUs () {
    let that = this
    app.wxrequest({
      url: `${app.data.basedomain}?g=Api&m=Index&a=contactUs`,
      data: {},
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            info: res.data.data.info
          })
        }
      }
    })
  },
  upDat (e) {
    // let that = this
    app.wxrequest({
      url: `${app.data.basedomain}?g=Api&m=Index&a=guestBook`,
      data: {
        full_name: e.detail.value.name || '未填写',
        email: e.detail.value.phone || '未填写',
        title: '用户留言',
        msg: e.detail.value.content || '未填写',
        address: e.detail.value.address || '未填写'
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          wx.showToast({
            title: '留言成功'
          })
        }
      }
    })
  },
  call () {
    app.call(this.data.info.phone)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    if (options.type * 1 === 1) {
      app.setBar('留言你的故事')
    } else {
      app.setBar('在线咨询')
      this.setData({
        wechat: true
      })
    }
    this.getUs()
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
