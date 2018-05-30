// 获取全局应用程序实例对象
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()
let timer = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basedomain: app.data.basedomain,
    contactdomain: app.data.contactdomain,
    active: -1,
    page: 0,
    playStatus: false,
    animationData: {},
    showImg: '',
    listArr: []
  },
  play (e) {
    if (e.currentTarget.dataset.index === this.data.active) return this.PausePlay()
    this.setData({
      active: e.currentTarget.dataset.index,
      playStatus: true,
      bText: this.data.listArr[e.currentTarget.dataset.index].name,
      showImg: this.data.listArr[e.currentTarget.dataset.index].image
    })
    this.playMusic()
    this.setAnimation()
  },
  setAnimation () {
    if (timer) clearInterval(timer)
    /*eslint-disable*/
    let width1 = 0,
      width2 = 0,
      that = this
    setTimeout(() => {
      wx.createSelectorQuery().select('.v-b-t').fields({
        size: true
      }, function(res){
        width1 = res.width
        wx.createSelectorQuery().select('.v-b-tt').fields({
          size: true
        }, function(res2){
          width2 = res2.width
          if (width2 - width1 <= 0) return that.setData({animationData: {}})
          let duration = width2 - width1 < 100 ? 2000 : (width2 - width1) / 100 * 10000
          if (duration > 5000) duration = 5000
          console.log(duration)
          let animation2 = wx.createAnimation({
            duration: 10,
            timingFunction: 'linear',
          })
          that.animation = animation2
          animation2.translateX(0).step()
          that.setData({
            animationData: animation2.export()
          })
          let animation = wx.createAnimation({
            duration,
            timingFunction: 'linear',
          })
          that.animation = animation
          that.setData({
            animationData: animation.export()
          })
          animation.translateX(-(width2 - width1)).step().translateX(0).step()
          that.setData({
            animationData:animation.export()
          })
          timer = setInterval(() => {
            animation.translateX(-(width2 - width1)).step().translateX(0).step()
            that.setData({
              animationData:animation.export()
            })
          }, duration * 2)
        }).exec()
      }).exec()
    }, 1000)
  },
  control (e) {
    if (e.currentTarget.dataset.type === 'current') {
      this.PausePlay()
    } else if (e.currentTarget.dataset.type === 'prev') {
      if (this.data.active * 1 === 0) return app.setToast(this, {content: '没有上一首啦'})
      this.setData({
        active: this.data.active * 1 - 1,
        playStatus: true
      })
      this.playMusic()
      this.setAnimation()
    } else if (e.currentTarget.dataset.type === 'next') {
      if (this.data.active * 1 === this.data.listArr.length - 1) return app.setToast(this, {content: '没有下一首啦'})
      this.setData({
        active: this.data.active * 1 + 1,
        playStatus: true
      })
      this.playMusic()
      this.setAnimation()
    }
  },
  // 播放
  playMusic () {
    let that = this
    wx.playBackgroundAudio({
      dataUrl: that.data.contactdomain + that.data.listArr[that.data.active].music
    })
  },
  // 暂停/播放
  PausePlay () {
    this.setData({
      playStatus: !this.data.playStatus
    })
    if (this.data.playStatus) backgroundAudioManager.play()
    else backgroundAudioManager.pause()
  },
  // 停止
  stop () {
    this.setData({
      playStatus: false,
      active: -1
    })
    backgroundAudioManager.stop()
  },
  getData (catId) {
    let that = this
    app.wxrequest({
      url: `${app.data.basedomain}?g=Api&m=Index&a=musicList`,
      data: {
        p: ++this.data.page,
        catId
      },
      success (res) {
        wx.hideLoading()
        if (res.data.status === 200) {
          if (res.data.data.list.length) {
            for (let v of res.data.data.list) {
              v.add_time = new Date(v.add_time * 1000).toLocaleDateString().replace(/\//g, '-')
            }
          }
          that.setData({
            listArr: that.data.listArr.concat(res.data.data.list),
            more: res.data.data.list.length < 10 ? 1 : 0
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    app.setBar(options.name)
    let that = this
    backgroundAudioManager.onEnded(function () {
      that.setData({
        playStatus: false,
        active: -1
      })
    })
    this.setData({
      options
    })
    this.getData(options.id)
    // TODO: onLoad
  },
  onReachBottom () {
    if (this.data.more) return app.setToast(this, {content: '没有更多内容了'})
    this.getData(this.data.options.id)
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
