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
    active: -1,
    playStatus: false,
    animationData: {},
    listArr: ['阿卢卡斯的卷发圣诞节范德萨', '阿卢卡斯的卷发圣诞节范德萨阿卢卡斯的卷发圣诞节范德萨', '阿卢卡斯的卷发圣诞节范德萨阿卢卡斯的卷发圣诞节范德萨阿卢卡斯的卷发圣诞节范德萨阿卢卡斯的卷发圣诞节范德萨阿卢卡斯的卷发圣诞节范德萨']
  },
  play (e) {
    if (e.currentTarget.dataset.index === this.data.active) return this.PausePlay()
    this.setData({
      active: e.currentTarget.dataset.index,
      playStatus: true,
      bText: this.data.listArr[e.currentTarget.dataset.index]
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
  playMusic (src) {
    wx.playBackgroundAudio({
      dataUrl: src || 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    backgroundAudioManager.onEnded(function () {
      this.setData({
        playStatus: false,
        active: -1
      })
    })
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
