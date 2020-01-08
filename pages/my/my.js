//my.js 仿照 index.js
//获取应用实例
var WXBizDataCrypt = require('../../utils/WXBizDataCrypt.js')
const app = getApp()
const appSecert = '0d6c9a7583082f0f83a817a16a8555c9'
const appID = 'wx4967a2d91998acc2'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.can
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      // url: '../logs/logs'
      url: '../myinfor/myinfor'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo && app.globalData.openid) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else{
      if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
      app.updateOpenid()
    } 
  },
  //没用了
  getOpenIdTabFromAPP:function(){
    app.updateOpenid()
  },
  //没用了
  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (data) {
        //console.log(data)
        //console.log(getApp().globalData.checkUserUrl)
        if(data.code){
          wx.request({
            //获取openid接口
            url: getApp().globalData.checkUserUrl,
            data: {
              code: data.code
            },
            method: 'GET',
            success: function (res) {
              console.log(res.data)
              app.globalData.openid =  res.data.openid; //获取到的openid 
              app.globalData.session_key = res.data.session_key; //获取到session_key 
            }
          })
        }else{
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  //没用了
  testInfo:function(){
    console.log("in test")
    this.getOpenIdTap()
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo)
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goMyInfo: function () {
    wx.navigateTo({
     url: "../myinfor/myinfor",
    })
  },
})
