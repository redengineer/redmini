<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <view>
        <map :latitude="latitude" :longitude="longitude" :markers="covers" @regionchange="onRegionchange"
          @markertap="onMarkerTap" @tap="onMapTap">
        </map>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
          id: 1,
          latitude: 39.9085,
          longitude: 116.39747,
          // #ifdef APP-PLUS
          iconPath: '../../../static/app-plus/location@3x.png',
          // #endif
          // #ifndef APP-PLUS
          iconPath:
            'https://picasso-static.xiaohongshu.com/fe-platform/2dc836eabf1d27134777c857bd485fa10a926f80/location.png',
          height: 75,
          width: 75,
          // #endif
        },
        {
          id: 2,
          latitude: 39.9,
          longitude: 116.39,
          // #ifdef APP-PLUS
          iconPath: '../../../static/app-plus/location@3x.png',
          // #endif
          // #ifndef APP-PLUS
          iconPath:
            'https://picasso-static.xiaohongshu.com/fe-platform/2dc836eabf1d27134777c857bd485fa10a926f80/location.png',
          height: 75,
          width: 75,
          // #endif
        },
      ],
    }
  },
  methods: {
    onMapTap(e) {
      console.log('onMapTap', e)
    },
    onRegionchange(e) {
      console.log('onRegionchange', e)
    },
    onMarkerTap(e) {
      console.log('onMarkerTap', e)
    }
  },
}
</script>
<style>
map {
  width: 100%;
  height: 600rpx;
}
</style>
