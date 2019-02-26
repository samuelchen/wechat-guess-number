// pages/guess/guess.js
const app = getApp();
const log = app.logger;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro: "我已想好了4个数字，请猜猜是什么呢\n点击调整下面一排数字选择你的猜测",
    message: "\n\n\n",
    message_style: "",
    base_numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    numbers: [],              // number in my mind
    guess: [],                // you guessed number
    count: 0,
    started: false,
    picking: false,
    result: 0                 // 0 - not finished, 1 - success, -1 fail.
  },

  start: function(e) {
    log.debug('start clicked');
    this.genNumbers();
    this.setData({
      started: true,
      result: 0,
      guess: [1, 2, 3, 4],
      count: 0
    })
  },

  submit: function(e) {
    log.debug('mind: ' + this.data.numbers)
    log.debug('submit clicked ' + this.data.guess);
    var correct = false;
    var n = 0;
    var m = 0;
    var guess = this.data.guess;
    var numbers = this.data.numbers;
    var count = this.data.count;
    var duplicated = false;

    for (var i=0; i<guess.length; i++) {
      var v = guess[i];
      var j = numbers.indexOf(v);
      if (j >= 0) n++;
      if (i == j) m++;

      var k = guess.indexOf(v);
      if (k != i) duplicated = true;
    }
    
    var msg = "";
    if (duplicated) 
      msg = '没有重复数字哦\n\n';
    else if (n == 4 && m == 4) {
      msg = '恭喜你，数字和位置都猜对了！\n\n';
      correct = true;
    }
    else
      msg = "你猜对了" + n + "个数字，\n其中" + m + "个位置也是对的。";

    this.setData({
      message: msg,
      message_style: correct ? "correct" : "incorrect",
      count: ++count,
      result: correct ? 1 : 0
    })

    if (correct) {
      wx.showToast({
        title: '恭喜猜对了',
        icon: 'success',
        duration: 3000
      });
      this.reset();
    }
    
  },

  reset: function(e) {
    log.debug('reset clicked');
    this.setData({
      started: false,
      message: " \n\n\n",
      result: -1,
    })
  },

  pickerChanged: function(e) {
    const val = e.detail.value;
    // log.debug('number changed ' + val );
    this.setData({
      guess: val
    })
  },

  pickerStart: function(e) {
    this.setData({
      picking: true
    })
  },

  pickerEnd: function(e) {
    this.setData({
      picking: false
    })
  },

  genNumbers: function(len) {
    len = len || 4;

    var nums = [];
    var i = 0;
    var base = this.data.base_numbers.slice(0, this.data.base_numbers.length);
    while (nums.length < len) {
      var i = Math.floor((Math.random() * base.length));
      var n = base.splice(i, 1)[0];
      nums.push(n);
      // log.debug(i + ' ' + n);
      // log.debug(base);
      // log.debug(nums);
      // log.debug('----------');
    }
    this.setData({
      numbers: nums
    })
  },

  startTimer: function(seconds) {
    log.debug('set timer to ' + seconds + ' seconds');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    log.debug("Guess loaded.");
    wx.setNavigationBarTitle({
      title: "猜数字游戏",
    });

    this.genNumbers();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})