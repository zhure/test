<template>
  <div class="wrap">
<!--    <P>{{address}}</p>-->
    <div id='container'></div>
    <el-icon size="large" style="margin-left: 10px; cursor: pointer" @click="getLocate"><location/></el-icon>
  </div>

</template>

<script>
import BMap from 'BMap'
export default {
  name: 'Locate',
  data() {
    return {
      address: '',

    }
  },
  mounted() {
    this.createMap()
  },

  created() {

  },
  methods: {
    getLocate() {
      this.$emit('childFn', this.address)
    },
    createMap() {
      var that = this;
      var map = new BMap.Map("container");
      var point = new BMap.Point(116.331398, 39.897445);;
      map.centerAndZoom(point, 12);
      var geoc = new BMap.Geocoder();
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          console.log('您的位置：' + r.point.lng + ',' + r.point.lat);

          var pt = r.point;
          geoc.getLocation(pt, function(rs) {
            var addComp = rs.addressComponents;
            that.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
          });


        } else {
          console.log('failed' + this.getStatus());
        }
      }, { enableHighAccuracy: true })
    },
  }
}
</script>