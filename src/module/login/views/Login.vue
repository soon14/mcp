<template>
  <section>
    <div class="login-fatherbox">
      <div class="login-header">
        <div class="left"></div>
        <!--<div class="right">-->
        <!--<i class="mf mf-network"></i><span>中国站</span><i class="mf mf-bottom"></i>-->
        <!--</div>-->
      </div>
      <div class="login-wrapper">
        <div class="left">
          <!-- 会动的球在这里 -->
          <div class="login">
            <div class="from_data">
              <div class="from_left">
                <div id="earth_nav">
                  <div id="earth">
                  </div>
                  <div class="lines">

                  </div>
                  <div class="pics">
                  </div>
                  <div class="gion">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <div class="avatar mf mf-yonghu1"></div>
            <h3 class="title">用户登录</h3>
            <el-form-item prop="account" style="height: 30px;">
              <i class="acc-icon mf mf-yonghu"></i>
              <input type="text"  @keydown="enterLogin" class="myaccount" v-model="ruleForm.account" auto-complete="off" placeholder="请输入用户名">
            </el-form-item>
            <el-form-item prop="checkPass"  style="height: 30px;">
              <i class="pwd-icon mf mf-mima"></i>
              <input type="password" @keydown="enterLogin" class="mypassword" ref="pwdValue" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入密码">
              <transition name="fade">
                <div class="capslock-reminder" v-if="messageBoxShow">
                  <i class="triangle"></i>
                  <div class="message-box">账号或者密码错误,请重试</div>
                </div>
              </transition>
            </el-form-item>
            <el-form-item style="width:100%;height: 30px;">
              <el-button type="primary" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
            <!--<a class="forgetPwd" href="http://mipnew.midea.com/#ModuleView">忘记密码?</a>-->
          </el-form>
        </div>
      </div>
      <!-- 登陆页脚部 -->
      <div class="login-foot">
        <p class="super-link">
          <router-link to="/websiteinfo/contactus">联系我们</router-link><span>&nbsp;|&nbsp;</span>
          <router-link to="/websiteinfo/serviceterm">服务条款</router-link><span>&nbsp;|&nbsp;</span>
          <router-link to="/websiteinfo/privatepolicy">隐私政策</router-link>
        </p>
        <p class="copyright">Copyright&copy; 1968-2017 美的集团 版权所有</p>
      </div>
    </div>
  </section>
</template>

<script>
  /*
   *
   * 用户账号是 cjhtest1，密码是 zeb5p4，角色 admin， 邮件是 cjhtest1@midea.com.cn
   *  用户账号是 cjhtest2，密码是 zdFUC4，角色 operator，邮件是 cjhtest2@midea.com.cn
   *  用户账号是 cjhtest3，密码是 z6QRh4，角色 operator，邮件是 cjhtest3@midea.com.cn
   * 用户账号是 cjhtest4，密码是 zNu374，角色 operator，邮件是 cjhtest4@midea.com.cn
   * 用户账号是 cjhtest5，密码是 zqieb4，角色 operator，邮件是 cjhtest5@midea.com.cn
   * 用户账号是 cjhtest6，密码是 zOQFY4，角色 member，邮件是 cjhtest6@midea.com.cn
   * 用户账号是 cjhtest7，密码是 z42HN4，角色 member，邮件是 cjhtest7@midea.com.cn
   * 用户账号是 cjhtest8，密码是 zTejT4，角色 member，邮件是 cjhtest8@midea.com.cn
   * 用户账号是 cjhtest9，密码是 z7jpJ4，角色 member，邮件是 cjhtest9@midea.com.cn
   * 用户账号是 cjhtest10，密码是 z6nYQ4，角色 member，邮件是 cjhtest10@midea.com.cn
   * */
  import * as srv from '../api/service';
  import "babel-polyfill";
  export default {
    mounted() {
//      console.log('mos_iaas', 'mosiaas@123');
      this.animate();
    },
    data() {
      return {
        logining: false,
        enterLoading:true,
        ruleForm: {
          account: '',
          checkPass: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true,
        isCapsLock: false,
        messageBoxShow: false,
        errorCount: 1,
      };
    },
    methods: {
      contactus() {
          this.$router.push({path: '//websiteinfo/contactus'})
      },

      handleSubmit() {
        var _this = this;
        _this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { account: this.ruleForm.account.trim(), password: this.ruleForm.checkPass.trim() };
            srv.requestLogin(loginParams).then(data => {
              this.logining = false;
              let { msg, code, user } = data;
              if (code.toString() === "200") {
                this.$router.push('/authority');
              } else{
                this.messageBoxShow = true;
              }
            },err=>{
               this.$notify({
                 title: '提示',
                 message: '系统内部错误',
                 type: 'error'
               });
            });
          } else {
            return false;
          }
          this.messageBoxShow = false;
        });
      },
      // 回车登陆
      enterLogin(event) {
        var e = event || window.event;
        var keyCode = e.keyCode || e.which;
        if(keyCode == 13) {
          this.handleSubmit();
        }
      },
      // 球特效的函数
      animate() {
        var gion = document.getElementsByClassName("gion");
        var lines = document.getElementsByClassName("lines");
        var pics = document.getElementsByClassName("pics");
        var earth_nav = document.getElementById("earth_nav");
        var earth = document.getElementById("earth");

        var linesHtml = '';
        var picsHtml = '';
        for (var m = 0; m < 159;m++) {
          linesHtml += "<div class='line_" + (m+1) + "'></div>";
        }
        lines[0].innerHTML = linesHtml;
        window.setTimeout(function(){
          for (var i = 0; i < 14; i++) {
            picsHtml += "<div class='pic_" + (i+1) + "'></div>";
          }
          pics[0].innerHTML = picsHtml;
        },3100)
        earth_nav.setAttribute('class','earth_nav');
        earth.setAttribute('class','earth');
      },
      // 监听大小写的方法
      listenCapslock() {
        let pwdValue = this.$refs.pwdValue.value;
        let pwdVauleLastCase = pwdValue.substr(pwdValue.length - 1, 1);
        if ( /^[A-Z]+$/.test(pwdVauleLastCase) ) {
          this.capsLockShow = true;
        } else {
          this.capsLockShow = false;
          return;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/animates.css';
  @import '../styles/login.css';
  input[type="password"]::-ms-clear { display: none;}
  input[type="password"]::-ms-reveal { display: none;}
  .font {
    font-size: 20px;
  }
  .login-fatherbox {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/static/images/loginImg/loginbackground.png") no-repeat;
    background-size: cover;
    .login-header {
      .left {
        position: absolute;
        top: 30px;
        left: 20px;
        height: 30px;
        width: 170px;
        background: url("/static/images/loginImg/logo.png") no-repeat;
        background-size: contain;

      }
      .right {
        position: absolute;
        top: 40px;
        right: 20px;
        color: #fff;
        span {
          margin: 0 6px;
        }
      }
    }
    .login-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 558px;
      height: 356px;
      box-shadow: 0 0 50px 1px #747474;
      .left {
        width: 279px;
        height: 100%;
        background-image: url("/static/images/loginImg/ball.png");
        background-size: contain;
      }
      .right {
        .login-container {
          position: absolute;
          right: 0;
          top: 0;
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          background-clip: padding-box;
          padding: 35px 50px 0 50px;
          background: #e6e4ea;
          border: 1px solid #eaeaea;
          font-size: 0;
          .el-form-item {
            margin-bottom: 26px;
            .el-form-item__content {
              position: relative;
              height: 30px !important;
              line-height: 30px !important;
              .myaccount, .mypassword {
                width: 100%;
                height: 30px;
                line-height: 30px;
                padding: 3px 10px 3px 30px;
                font-size: 12px;
                border: 1px solid rgba(33, 30, 46, .9);
                border-radius: 5px;
                box-sizing: border-box;
                background-color: #e6e3eb;
                color: rgba(33, 30, 46, .9);
                outline: none;
                &:focus {
                  outline: none;
                  box-shadow: 0 0 8px 0px #bbbbbe;
                }
                &::-webkit-input-placeholder { /* WebKit browsers */
                  color: rgba(33, 30, 46, .9);
                  font-size: 12px;
                }
                &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                  color: rgba(33, 30, 46, .9);
                  font-size: 12px;
                }
                &::-moz-placeholder { /* Mozilla Firefox 19+ */
                  color: rgba(33, 30, 46, .9);
                  font-size: 12px;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10+ */
                  color: rgba(33, 30, 46, .9);
                  font-size: 12px;
                }
              }
              .capslock-reminder {
                position: absolute;
                left: 0;
                top: -86px;
                margin-top: 3px;
                z-index: 50;
                width: 100%;
                height: 26px;
                line-height: 26px;
                border: 1px solid #fff;
                border-radius: 4px;
                padding: 0 3px;
                text-align: left;
                background: #302e46;
                font-size: 12px;
                box-sizing: border-box;
                padding-left: 15px;
                color: rgba(255, 255, 255, .8);
                opacity: 0;
                &.fade-enter-active, &.fade-leave-active {
                  transition: opacity 500ms 1400ms ease-out;
                }
                &.fade-enter, &.fade-leave-active {
                  opacity: 0;
                }
                &.fade-enter, &.fade-leave {
                  opacity: 1;
                }
                .triangle {
                  position: absolute;
                  left: 28%;
                  bottom: -30%;
                  transform: translateX(-50%);
                  width: 0;
                  height: 0;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;
                  border-top: 8px solid #302e46;
                }
                .message-box {
                  /*position: absolute;*/
                }
              }
              .code-box {
                box-sizing: border-box;
                height: 30px;
                width: 30%;
                border: 1px solid red;
              }
              .acc-icon, .pwd-icon {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                content: '';
                font-size: 12px;
                color: rgba(33, 30, 46, .9)
              }
              button {
                width: 100%;
                height: 30px;
                font-size: 12px;
                border: none;
                border-radius: 5px;
                background: #302d45;
                color: #e6e4ea;
                &:active {
                  background: linear-gradient(to bottom, #23212f 0%,#5a5865 100%);
                  color: #fff;
                  -webkit-tap-highlight-color: transparent;
                  -webkit-tap-highlight-color: rgba(0,0,0,0);
                }
              }
            }
          }
          .avatar {
            display: block;
            width: 18px;
            height: 18px;
            margin: 0 auto 10px;
            font-size: 18px;
            color: rgba(33, 30, 46, .9);
            margin-top: 19px;
          }
          .title {
            font-size: 14px;
            font-weight: 500;
            margin: 0px auto 36px;
            text-align: center;
            color: #4f4d5a;
          }
          .myaccount {
            font-size: 20px;
          }
        }
      }
    }
    .login-foot {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      min-width: 100%;
      .super-link, .copyright {
        font-size: 12px;
        a {
          text-decoration: none;
          color: #ced0cf;
          &:hover {
            text-decoration: underline;
          }
        }
        span {
          display: inline-block;
          color: #ced0cf;
        }
      }
      .copyright {
        margin-top: 4px;
        color: #ced0cf;
        bottom: 12px;
      }
    }
  }
</style>
