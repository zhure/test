"use strict";(self["webpackChunkstray_animal_rescue_system"]=self["webpackChunkstray_animal_rescue_system"]||[]).push([[55],{4055:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var l=a(6252),n=a(3577),s=a(9963);const i=e=>((0,l.dD)("data-v-582749ae"),e=e(),(0,l.Cn)(),e),o=["src"],r=i((()=>(0,l._)("div",{style:{margin:"10px"}},[(0,l._)("span",{style:{color:"#675e5e","font-family":"华文宋体"}},"以上均来源于网络，参考网站如下"),(0,l._)("a",{href:"https://www.sohu.com/a/166237131_722596"},[(0,l._)("p",null,"【干货】全国各地流浪动物保护机构（团队）联系方式，持续更新中……")])],-1))),c={id:"all",style:{height:"475px"}},d=i((()=>(0,l._)("div",{id:"allmap"},null,-1)));function u(e,t,a,i,u,m){const p=(0,l.up)("van-nav-bar"),v=(0,l.up)("van-swipe-item"),h=(0,l.up)("van-swipe"),_=(0,l.up)("van-notice-bar"),g=(0,l.up)("van-collapse-item"),w=(0,l.up)("van-collapse");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",null,[(0,l.Wm)(p,{title:"流浪动物救助系统"})]),(0,l._)("div",null,[(0,l.Wm)(h,{class:"my-swipe",autoplay:3e3,"lazy-render":""},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(i.images,(e=>((0,l.wg)(),(0,l.j4)(v,{key:e},{default:(0,l.w5)((()=>[(0,l._)("img",{style:{width:"100%",height:"100%"},src:e},null,8,o)])),_:2},1024)))),128))])),_:1}),(0,l.Wm)(_,{"left-icon":"volume-o",text:"我们提倡，领养代替购买。"})]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(u.bases,(e=>((0,l.wg)(),(0,l.iD)("div",null,[(0,l.Wm)(w,{modelValue:i.activeNames,"onUpdate:modelValue":t[0]||(t[0]=e=>i.activeNames=e)},{default:(0,l.w5)((()=>[(0,l.Wm)(g,{title:e.name,name:e.id},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.contactWay),1)])),_:2},1032,["title","name"])])),_:2},1032,["modelValue"])])))),256)),r,(0,l._)("div",c,[(0,l.wy)((0,l._)("input",{type:"text",id:"suggestId",name:"address_detail",placeholder:"地址","onUpdate:modelValue":t[1]||(t[1]=e=>u.address_detail=e),class:"input_style"},null,512),[[s.nr,u.address_detail]]),d])],64)}var m=a(7515),p=a.n(m),v=a(4471),h=a(2262),_={name:"Mhome",setup(){const e=["http://120.79.190.143:9090/files/stray_cat","http://120.79.190.143:9090/files/stray_dog","http://120.79.190.143:9090/files/kiss_bird"],t=(0,h.iH)(["1"]);return{images:e,activeNames:t}},data(){return{address_detail:null,userlocation:{lng:"",lat:""},posts:[],bases:[]}},created(){this.getProvincial(),this.load()},mounted(){this.$nextTick((function(){var e=this,t=new(p().Map)("allmap"),a=new(p().Point)(109.46881355223,24.346570436871);t.centerAndZoom(a,15),t.enableScrollWheelZoom();var l,n=new(p().Autocomplete)({input:"suggestId",location:t});function s(){function a(){e.userlocation=n.getResults().getPoi(0).point,t.centerAndZoom(e.userlocation,18),t.addOverlay(new(p().Marker)(e.userlocation))}t.clearOverlays();var n=new(p().LocalSearch)(t,{onSearchComplete:a});n.search(l),t.addEventListener("click",(function(t){console.log(e.userlocation.lng),console.log(e.userlocation.lat)}))}n.addEventListener("onconfirm",(function(e){var t=e.item.value;l=t.province+t.city+t.district+t.street+t.business,this.address_detail=l,s()}))}))},methods:{load(){v.Z.get("/base/province",{params:{id:this.search}}).then((e=>{this.bases=e.data}))},getProvincial(){v.Z.get("/provincial").then((e=>{this.provincial=e.data}))}}},g=a(3744);const w=(0,g.Z)(_,[["render",u],["__scopeId","data-v-582749ae"]]);var f=w}}]);
//# sourceMappingURL=55.edac4a89.js.map