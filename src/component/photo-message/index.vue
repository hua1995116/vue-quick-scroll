<template>
  <div class="photo-message">
    <common-message :title="title" :content="content" :time="time">
      <div class="photo-message__img">
        <!-- <img v-lazy="img" alt="" src=""> -->
      </div>
      <div class="photo-message__more" @click="handleLink">
        <span>查看详情</span>
        <span>></span>
      </div>
    </common-message>
  </div>
</template>
<script>
import commonMessage from '../common-message/index.vue';
export default {
  props: {
    img: {
      type: String,
      default: '32',
    },
    content: {
      type: String,
      default: '123',
    },
    title: {
      type: String,
      default: '123',
    },
    link: {
      type: String,
      default: '123',
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleLink() {
        console.log(1);
    }
  },
  computed: {
    getTime() {
        return hanldeTime(this.time);
    }
  },
  component: {
      'common-message': commonMessage
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
