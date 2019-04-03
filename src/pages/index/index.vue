<template>
  <div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div>
      ajax结果:{{msg}}
    </div>
  </div>
</template>

<script>
  import Api from '../../apis/api'

  export default {
    data () {
      return {
        msg: null
      }
    },

    methods: {},

    onLoad () {
      let that = this
      let data = {format: 'json', scope: '103', appid: '379020', bk_key: 'hello'}
      Api.demoAjax(data, function (res) {
        that.msg = JSON.stringify(res.data)
      }, function (res) {
        that.msg = JSON.stringify(res.data)
      })
    }
  }
</script>

<style scoped>
</style>
