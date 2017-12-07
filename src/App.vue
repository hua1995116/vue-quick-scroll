<template>
  <div id="app">
    <vue-scroll :onGetInfo="getInfo" :listData="listData.length">
      <div v-if="listData.length > 0" v-for="item in listData">
        <photo-message :img=item.picUrl :link="item.msgUrl" :title="item.msgTitle" :content="item.msgBody" :time="item.msgTime" v-if="item.picUrl"></photo-message>
        <common-message v-else :title="item.msgTitle" :content="item.msgBody" :time="item.msgTime"></common-message>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
  import photoMessage from './component/photo-message';
  import commonMessage from './component/common-message';
  // import refresh from './component/refresh'
  export default {
    name: 'app',
    data() {
      return {
        listData: [],
        pages: {
          index: 1,
          count: 10,
        },
      }
    },
    mounted() {
      this.getInfo();
    },
    methods: {
      async getInfo(done) {
        try {
          // const response = await getMsgList(this.pages);
          const response = {
            msgEntryDTOList: [{
              picUrl: '',
              msgUrl: '',
              msgTitle: '消息中心1',
              msgBody: '1221',
              msgTime: 1512612787796,
            }, {
              picUrl: '',
              msgUrl: '',
              msgTitle: '消息中心1',
              msgBody: '1221',
              msgTime: 1512612787796,
            }, {
              picUrl: '',
              msgUrl: '',
              msgTitle: '消息中心1',
              msgBody: '1221',
              msgTime: 1512612787796,
            },{
              picUrl: '',
              msgUrl: '',
              msgTitle: '消息中心1',
              msgBody: '1221',
              msgTime: 1512612787796,
            }, {
              picUrl: '',
              msgUrl: '',
              msgTitle: '消息中心1',
              msgBody: '1221',
              msgTime: 1512612787796,
            },{
              picUrl: '',
              msgUrl: '',
              msgTitle: '消息中心1',
              msgBody: '1221',
              msgTime: 1512612787796,
            }, {
              picUrl: '',
              msgUrl: '',
              msgTitle: '消息中心1',
              msgBody: '1221',
              msgTime: 1512612787796,
            }]
          }
          if (done) {
            this.pages.index = 1;
            done(3);
          } else {
            this.pages.index += 1;
          }

          if (this.pages.index > 1 && response.msgEntryDTOList) {
            this.listData.push(...response.msgEntryDTOList);
          } else if (!response.msgEntryDTOList) {} else {
            this.listData = response.msgEntryDTOList;
          }
        } catch (e) {
          if (done) {
            done(4);
          }
        }
      }
    },
    components: {
      // 'refresh': refresh,
      'photo-message': photoMessage,
      'common-message': commonMessage
    }
  }

</script>

<style>
  body,
  html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  body,
  .mx-webview {
    background: #f5f5f5;
  }

  .left .mx-icon-left {
    color: #000;
  }

</style>
