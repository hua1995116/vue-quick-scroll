<template>
  <div class="message-container">
    <div @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" class="message-scroll"
      :class="{'down':(state===0),'up':(state==1),'refreshing':(state===2),'success':(state===3), 'fail':(state===4), 'touch': touching}">
      <div class="message-scroll__inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)', '-webkit-transform': 'translate3d(0, ' + top + 'px, 0)' }">
        <div class="message-refresh">
          <span class="message-refresh__down">下拉更新</span>
          <!-- state0 -->
          <span class="message-refresh__up">松开更新</span>
          <!-- state1 -->
          <span class="message-refresh__refreshing">
            <i class="iconfont icon-loading action-spin"></i>
          </span>
          <!-- state2 -->
          <span class="message-refresh__success">
            <i class="iconfont icon-1"></i>&nbsp;刷新成功
          </span>
          <!-- state3 -->
          <span class="message-refresh__fail">
            <i class="iconfont icon-shibai1"></i>&nbsp;刷新失败
          </span>
          <!-- state4 -->
        </div>
        <div v-if="listData.length === 0" class="message-scroll__error">
          <img src="https://pic.51zhangdan.com/u51/storage/5a/52c5ed1d-2b28-0091-e459-a55ac4ec435a.png" />
          <p>暂无消息</p>
        </div>
        <slot></slot>
        <!-- <div class="message-scroll__loading" v-show="loadingIsNeed"><i class="iconfont icon-loading action-spin"></i></div>-->
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'vue-scroll',
    props: {
      onGetInfo: {
        type: Function,
        default: undefined
      },
      listData: {
        type: Number,
        default: 0
      },
      propstate: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        offset: 60,
        top: 0,
        startY: 0,
        touching: false, // 是否在刷新
        state: 0, // 状态
        timing: false, // 防止多次快速刷新
      };
    },
    methods: {
      touchStart(e) {
        const doc = window.document;
        const el = doc.querySelector('.message-scroll');
        if (el.scrollTop > 0) {
          return;
        }
        // 判断是否正在刷新，是否到顶部
        if (this.touching && this.top > 0 && this.timing) {
          return;
        }
        this.state = 0;
        this.startY = e.targetTouches[0].pageY;
        this.startScroll = this.$el.scrollTop || 0;
        this.touching = true;
      },
      touchMove(e) {
        if (this.$el.scrollTop > 0 || !this.touching || this.timing) {
          return;
        }
        const diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
        if (diff > 0) e.preventDefault(); // 阻尼弹性
        this.top = window.Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);
        if (this.state === 2) {
          // 刷新中
          return;
        }
        if (this.top >= this.offset) {
          this.state = 1;
        } else {
          this.state = 0;
        }
      },
      touchEnd() {
        const _this = this;
        _this.touching = false;
        _this.timing = true;
        if (this.state === 2) {
          // 刷新中
          this.state = 2;
          this.top = this.offset;
          return;
        }
        if (this.top >= this.offset) {
          // 刷新
          this.refresh();
        } else {
          // 取消刷新
          this.state = 0;
          this.top = 0;
        } // 防止多次刷新
        setTimeout(function () {
          _this.timing = false;
        }, 1000)
      },
      refresh() {
        this.state = 2;
        this.top = this.offset;
        this.onGetInfo(this.refreshDone);
      },
      refreshDone(num) {
        this.state = num;
        setTimeout(() => {
          this.top = 0;
        }, 500);
      }, // onScroll() {
      //   const doc = this.window.document;
      //   const el = doc.querySelector(".message-scroll");
      //   const loading = doc.querySelector(".message-scroll__loading");
      //   const loadingTop = parseInt(loading.getBoundingClientRect().top, 10);
      //   if (loadingTop >= 0 && loadingTop <= this.window.screen.height * 2) {
      //     // 判断列表长度是否大于10，小于就不显示最后的loading
      //     if (this.listData >= 10 && this.loadingIsNeed) {
      //       this.loadingIsNeed = false;
      //       this.onGetInfo();
      //     }
      //   }
      //   if (el.scrollTop <= 0) {
      //     this.scrollBar = true;
      //   } else {
      //     this.scrollBar = false;
      //   }
      // }
    },
    components: {}
  };

</script>
<style lang="scss">
  .action-spin:before {
    display: inline-block;
    -webkit-animation: loadingCircle 1s infinite linear;
    animation: loadingCircle 1s infinite linear;
  }

  @keyframes loadingCircle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .message-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .message-scroll {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    .message-refresh {
      width: 100%;
      height: 20px;
      display: flex;
      font-size: 12px;
      align-items: center;
      justify-content: center;
      .iconfont {
          font-size: 12px;
      }
    }
    .message-refresh__down {
      display: none;
    }
    .message-refresh__up {
      display: none;
    }
    .message-refresh__refreshing {
      display: none;
    }
    .message-refresh__success {
      display: none;
    }
    .message-refresh__fail {
      display: none;
    }
    &.down .message-refresh__down {
      display: block;
    }
    &.up .message-refresh__up {
      display: block;
    }
    &.fail .message-refresh__fail {
      display: block;
    }
    &.refreshing .message-refresh__refreshing {
      display: block;
    }
    &.success .message-refresh__success {
      display: block;
    }
  }

  .message-scroll .message-scroll__inner {
    width: 100%;
    margin-top: -20px;
    transition-duration: 300ms;
  }

  .message-scroll.touch .message-scroll__inner {
    transition-duration: 0ms;
  }

  .message-scroll__loading {
    width: 100%;
    margin: 10px 0;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .message-scroll__error {
    width: 100%;
    margin: 50px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

</style>
