<template>
  <el-row>
    <el-col :span="11">
      <div style="margin-left: 30px" id="all">
        <input type="text" id="suggestId" name="address_detail" placeholder="地址" v-model="address_detail" class="input_style">
        <div id="allmap"></div>
      </div>
    </el-col>
    <el-col :span="13">
      <el-card style="margin-right: 20px" shadow="never">
        <div>
          <el-select v-model="search" class="m-2" placeholder="Select" clearable>
            <el-option
                v-for="item in provincial"
                :key="item.pid"
                :label="item.province"
                :value="item.pid"
            />
          </el-select>
          <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
        </div>
        <el-divider/>
        <el-row class="base-text" v-for="base in bases">
          <el-col :span="9">
            <span>{{ base.name }}</span>
          </el-col>
          <el-col :span="15">
            <span>{{ base.contactWay }}</span>
          </el-col>
          <el-divider/>
        </el-row>
        <div>
          <span>以上均来源于网络，参考网站如下</span>
          <a href="https://www.sohu.com/a/166237131_722596">
            <p>【干货】全国各地流浪动物保护机构（团队）联系方式，持续更新中……</p>
          </a>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import BMap from 'BMap'
import request from "@/utils/request";
export default {
  name: 'BasePosition',
  data(){
    return {
      //详细地址
      address_detail: null,
      userlocation: {lng: "", lat: ""},
      bases: [],
      provincial: [],
      search:'',

    }
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
  created() {
    this.getProvincial()
    this.load()
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
    }
  }
}
</script>
<style lang="less" scoped>
//*{
//  margin: 0;
//  padding: 0;
//  list-style: none;
//}
#suggestId{
  width: 598px;
  height: 35px;
}
#allmap{
  width: 600px;
  height: 600px;
  border: 1px solid green;
}
.base-text {
  span {
    color: #675e5e;
    font-family: 华文宋体;
    //padding: 5px;
    //top:20px;
  }
}
</style>

