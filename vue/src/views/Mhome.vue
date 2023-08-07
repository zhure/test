<template>
  <div>
    <van-nav-bar title="流浪动物救助系统" />
  </div>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img style="width: 100%; height: 100%;" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
        left-icon="volume-o"
        text="我们提倡，领养代替购买。"
    />
  </div>
  <div v-for="base in bases">
    <van-collapse v-model="activeNames">
      <van-collapse-item :title="base.name" :name="base.id">
        {{ base.contactWay }}
      </van-collapse-item>
    </van-collapse>
  </div>
  <div style="margin: 10px">
    <span style="color: #675e5e; font-family: 华文宋体;">以上均来源于网络，参考网站如下</span>
    <a href="https://www.sohu.com/a/166237131_722596">
      <p>【干货】全国各地流浪动物保护机构（团队）联系方式，持续更新中……</p>
    </a>
  </div>

  <div id="all" style="height: 475px">
    <input type="text" id="suggestId" name="address_detail" placeholder="地址" v-model="address_detail" class="input_style">
    <div id="allmap"></div>
  </div>
</template>

<script>
import BMap from 'BMap'
import request from "@/utils/request";
import { ref } from "vue"

export default {
  name: "Mhome",
  setup() {
    const images = [
      'http://120.79.190.143:9090/files/stray_cat',
      'http://120.79.190.143:9090/files/stray_dog',
      'http://120.79.190.143:9090/files/kiss_bird',
    ];
    const activeNames = ref(['1']);
    return { images, activeNames };
  },
  data() {
    return {
      address_detail: null,
      userlocation: {lng: "", lat: ""},
      posts:[],
      bases: [],
    }
  },
  created() {
    this.getProvincial()
    this.load()
  },
  mounted(){
    this.$nextTick(function () {
      var th = this
      // 创建Map实例
      var map = new BMap.Map("allmap");
      // 初始化地图,设置中心点坐标，
      var point = new BMap.Point(109.46881355223,24.346570436871);
      // 创建点坐标，汉得公司的经纬度坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom();

      //建立一个自动完成的对象
      var ac = new BMap.Autocomplete({
        "input": "suggestId" ,
        "location": map
      })

      var myValue
      //鼠标点击下拉列表后的事件
      ac.addEventListener("onconfirm", function (e) {
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        this.address_detail = myValue
        setPlace();
      });

      function setPlace() {
        //清除地图上所有覆盖物
        map.clearOverlays();
        function myFun() {
          //获取第一个智能搜索的结果
          th.userlocation = local.getResults().getPoi(0).point;
          map.centerAndZoom(th.userlocation, 18);
          //添加标注
          map.addOverlay(new BMap.Marker(th.userlocation));
        }

        //智能搜索
        var local = new BMap.LocalSearch(map, {
          onSearchComplete: myFun
        });
        local.search(myValue);

        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener("click",function(e){
          //经度
          console.log(th.userlocation.lng);
          //维度
          console.log(th.userlocation.lat);
        })
      }
    })
  },
  methods: {
    load() {
      // console.log(this.search)
      request.get('/base/province', {
        params: {
          id: this.search
        }
      }).then(res => {
        this.bases = res.data
      })
    },
    getProvincial() {
      request.get('/provincial').then(res => {
        this.provincial = res.data
      })
    },
  }
}

</script>

<style scoped>
#suggestId{
  width: 100%;
  height: 35px;
}
#allmap{
  width: 100%;
  height: 390px;
  border: 1px solid green;
}
.my-swipe {
  height: 270px;
  line-height: 50px;
  text-align: center;
}
</style>