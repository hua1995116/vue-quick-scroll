<template>
  <div class="common-message">
    <div class="common-message__time"><span>{{getTime}}</span></div>
    <div class="common-message__section">
      <div class="common-message__title">{{title}}</div>
      <div class="common-message__content">{{content}}</div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { hanldeTime } from '../../utils/index.js';
export default {
  props: {
    title: {
      type: String,
      default: '芝麻认证取消授权',
    },
    content: {
      type: String,
      default: '非常抱歉!您已取消芝麻授权，如要使用零用钱产品，请您重新授权！',
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getTime() {
        return hanldeTime(this.time);
    }
  }
};
</script>
<style lang="scss">

.common-message {
  width: 343px;
  margin: 20px auto 0;

  &__time {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      height: 20px;
      margin: 0 auto;
      padding: 0 10px;
      border-radius: 100px;
      background: #CCCCCC;
      color: #fff;
      font-size: 12px; /*!px*/
      text-align: center;
    }
  }
  &__section {
    margin-top: 8px;
    background: #fff;
    font-size: 14px; /*!px*/
    padding: 16px;
  }
  &__title {
    margin: 4px 0;
    color: #333333;
  }
  &__content {
    color: #999999;
    margin-bottom: 4px;
  }
}
</style>
