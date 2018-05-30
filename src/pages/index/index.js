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
    tabText: [{t: 'Travel•新疆公路之旅', tt: 'Travel•新疆公路之旅', a: 'routeTour'}, {t: 'FM•新疆公路之声', tt: 'FM•新疆公路之声', a: 'routeMusic'}, {t: 'Time', tt: 'Unforgettable Time•旅行拍摄', a: 'tourPhoto'}],
    showText: 'Travel•新疆公路之旅',
    active: 1,
    page: 0,
    articleList: []
  },
  change (e) {
    this.setData({
      active: e.currentTarget.dataset.index,
      showText: this.data.tabText[e.currentTarget.dataset.index - 1].tt,
      page: 0,
      articleList: []
    })
    app.setBar(this.data.tabText[this.data.active - 1].t)
    this.getData(this.data.tabText[this.data.active - 1].a)
  },
  getData (a) {
    let that = this
    app.wxrequest({
      url: `${app.data.basedomain}?g=Api&m=Index&a=${a}`,
      data: {
        p: ++this.data.page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          that.setData({
            adList: res.data.data.adList,
            articleList: that.data.articleList.concat(res.data.data.articleList),
            more: res.data.data.articleList.length < 10 ? 1 : 0
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    app.setBar(this.data.tabText[0].t)
    this.getData(this.data.tabText[0].a)
  },
  onReachBottom () {
    if (this.data.more) return app.setToast(this, {content: '没有更多内容了'})
    this.getData(this.data.tabText[this.data.active - 1].a)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // console.log(' ---------- onUnload ----------')
  },
  onShareAppMessage () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // console.log(' ---------- onPullDownRefresh ----------')
  }
})
