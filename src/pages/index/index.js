// 获取全局应用程序实例对象
const app = getApp()
let timer = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabText: [{t: 'Travel•新疆公路之旅', tt: 'Travel•新疆公路之旅'}, {t: 'FM•新疆公路之声', tt: 'FM•新疆公路之声'}, {t: 'Time', tt: 'Unforgettable Time•旅行拍摄'}],
    showText: 'Travel•新疆公路之旅',
    active: 1
  },
  change (e) {
    this.setData({
      active: e.currentTarget.dataset.index,
      showText: this.data.tabText[e.currentTarget.dataset.index - 1].tt
    })
    app.setBar(this.data.tabText[this.data.active - 1].t)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    app.setBar(this.data.tabText[0].t)
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
    clearInterval(timer)
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    clearInterval(timer)
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
