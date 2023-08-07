"use strict";(self["webpackChunkstray_animal_rescue_system"]=self["webpackChunkstray_animal_rescue_system"]||[]).push([[908],{8336:function(e,t,s){s.r(t),s.d(t,{default:function(){return J}});var a=s(6252),i=s(3577),o=s(9963);const d=e=>((0,a.dD)("data-v-eae40b4a"),e=e(),(0,a.Cn)(),e),r=["src"],p={style:{"margin-left":"10px"}},n={class:"time"},l=(0,a.Uk)("领养"),m=(0,a.Uk)("已申请"),g={style:{padding:"10px"}},u={class:"detail"},c=["src"],h={class:"contents"},y={style:{size:"13px",color:"#932727","margin-right":"10px",cursor:"pointer"}},w=(0,a.Uk)("选择"),_={key:1,style:{margin:"10px"}},f=d((()=>(0,a._)("span",{style:{margin:"10px",color:"#545151"}},"后续...",-1))),v=["src"],k={style:{"margin-left":"10px"}},I={class:"nick"},A={class:"time"},W=(0,a.Uk)("编辑"),C=["innerHTML"],L={key:1},S=d((()=>(0,a._)("div",{id:"toolbar-container",style:{"z-index":"101"}},null,-1))),z=d((()=>(0,a._)("div",{id:"editor-container",style:{"z-index":"100","min-height":"300px"}},null,-1))),F=(0,a.Uk)("保存"),x=(0,a.Uk)("取消");function $(e,t,s,d,$,M){const N=(0,a.up)("el-col"),Z=(0,a.up)("star"),U=(0,a.up)("el-icon"),b=(0,a.up)("star-filled"),D=(0,a.up)("el-button"),E=(0,a.up)("el-row"),J=(0,a.up)("el-image"),O=(0,a.up)("el-divider"),q=(0,a.up)("el-popconfirm"),H=(0,a.up)("el-card");return(0,a.wg)(),(0,a.j4)(H,{class:"details",shadow:"never"},{default:(0,a.w5)((()=>[(0,a.Wm)(E,null,{default:(0,a.w5)((()=>[(0,a.Wm)(N,{span:1},{default:(0,a.w5)((()=>[(0,a._)("img",{class:"avatar",src:$.user.headImg,alt:"头像"},null,8,r)])),_:1}),(0,a.Wm)(N,{span:18},{default:(0,a.w5)((()=>[(0,a._)("div",p,[(0,a._)("span",{class:"nick",onClick:t[0]||(t[0]=(...e)=>M.toUser&&M.toUser(...e))},(0,i.zw)($.user.nickName),1),(0,a._)("span",n,(0,i.zw)($.adopt.time),1)])])),_:1}),(0,a.Wm)(N,{span:1},{default:(0,a.w5)((()=>[(0,a.wy)((0,a.Wm)(U,{onClick:M.collect,class:"icon",size:"30px",color:"orange"},{default:(0,a.w5)((()=>[(0,a.Wm)(Z)])),_:1},8,["onClick"]),[[o.F8,!$.isFavorite]]),(0,a.wy)((0,a.Wm)(U,{onClick:M.notCollect,class:"icon",size:"35px",color:"orange"},{default:(0,a.w5)((()=>[(0,a.Wm)(b)])),_:1},8,["onClick"]),[[o.F8,$.isFavorite]])])),_:1}),(0,a.Wm)(N,{span:2},{default:(0,a.w5)((()=>[(0,a.wy)((0,a.Wm)(D,{onClick:M.applyAdopt,style:{"margin-left":"20px"},size:"normal",type:"warning",plain:""},{default:(0,a.w5)((()=>[l])),_:1},8,["onClick"]),[[o.F8,!$.isAdopt&&!$.isMe&&void 0===$.myApply.id]]),(0,a.wy)((0,a.Wm)(D,{style:{"margin-left":"20px"},size:"normal",disabled:""},{default:(0,a.w5)((()=>[m])),_:1},512),[[o.F8,!$.isAdopt&&!$.isMe&&void 0!==$.myApply.id]])])),_:1})])),_:1}),(0,a._)("div",g,[(0,a.Wm)(E,null,{default:(0,a.w5)((()=>[(0,a.Wm)(N,{span:8},{default:(0,a.w5)((()=>[(0,a.Wm)(J,{class:"image","preview-teleported":"true",src:$.adopt.img,"preview-src-list":[$.adopt.img],fit:"cover"},null,8,["src","preview-src-list"])])),_:1}),(0,a.Wm)(N,{span:16},{default:(0,a.w5)((()=>[(0,a._)("div",u,[(0,a._)("span",null,"名字："+(0,i.zw)($.adopt.name),1),(0,a._)("span",null,"描述："+(0,i.zw)($.adopt.detail),1),(0,a._)("span",null,"地址："+(0,i.zw)($.adopt.address),1)])])),_:1})])),_:1})]),(0,a.Wm)(O),$.isAdopt?(0,a.kq)("",!0):((0,a.wg)(!0),(0,a.iD)(a.HY,{key:0},(0,a.Ko)($.apply,(e=>((0,a.wg)(),(0,a.j4)(E,null,{default:(0,a.w5)((()=>[(0,a.Wm)(N,{span:1},{default:(0,a.w5)((()=>[(0,a._)("img",{class:"min-avatar",src:e.user["headImg"]},null,8,c)])),_:2},1024),(0,a.Wm)(N,{span:18},{default:(0,a.w5)((()=>[(0,a._)("div",h,[(0,a._)("span",null,[(0,a._)("span",y,(0,i.zw)(e.user["nickName"]),1),(0,a._)("span",null,"申请领养 "+(0,i.zw)($.adopt.name),1)])])])),_:2},1024),(0,a.Wm)(N,{span:5},{default:(0,a.w5)((()=>[(0,a.Wm)(q,{title:"确定选择ta为动物的新朋友?",onConfirm:t=>M.choose(e.user["id"])},{reference:(0,a.w5)((()=>[$.isMe?((0,a.wg)(),(0,a.j4)(D,{key:0,type:"warning",size:"normal"},{default:(0,a.w5)((()=>[w])),_:1})):(0,a.kq)("",!0)])),_:2},1032,["onConfirm"])])),_:2},1024),(0,a.Wm)(O)])),_:2},1024)))),256)),$.isAdopt?((0,a.wg)(),(0,a.iD)("div",_,[f,(0,a.Wm)(E,null,{default:(0,a.w5)((()=>[(0,a.Wm)(N,{span:1,offset:1},{default:(0,a.w5)((()=>[(0,a._)("img",{class:"avatar",src:$.adoptLater.user["headImg"],alt:"头像"},null,8,v)])),_:1}),(0,a.Wm)(N,{span:19},{default:(0,a.w5)((()=>[(0,a._)("div",k,[(0,a._)("span",I,(0,i.zw)($.adoptLater.user["nickName"]),1),(0,a._)("span",A,(0,i.zw)($.adoptLater.time),1)])])),_:1}),(0,a.Wm)(N,{span:3},{default:(0,a.w5)((()=>[$.isMe&&!$.isEdit?((0,a.wg)(),(0,a.j4)(D,{key:0,onClick:M.handleEdit,type:"warning",size:"normal",plain:""},{default:(0,a.w5)((()=>[W])),_:1},8,["onClick"])):(0,a.kq)("",!0)])),_:1})])),_:1}),$.isEdit?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",{key:0,style:{margin:"25px"},innerHTML:$.adoptLater.content},null,8,C)),$.isEdit?((0,a.wg)(),(0,a.iD)("div",L,[S,z,(0,a.Wm)(D,{onClick:M.save,type:"warning",size:"normal"},{default:(0,a.w5)((()=>[F])),_:1},8,["onClick"]),(0,a.Wm)(D,{onClick:M.cancel,type:"warning",size:"normal",plain:""},{default:(0,a.w5)((()=>[x])),_:1},8,["onClick"])])):(0,a.kq)("",!0)])):(0,a.kq)("",!0)])),_:1})}var M=s(4471),N=s(7877);let Z,U=null;var b={name:"AdoptDetail",data(){return{adoptId:"",adopt:{},user:{},adoptFav:{},myApply:{},isFavorite:!1,isMe:!1,isAdopt:!1,isEdit:!1,apply:[],adoptLater:{},editorConfig:{placeholder:"请输入内容",MENU_CONF:{uploadImage:{server:"http://120.79.190.143:9090/files/editor/upload",fieldName:"file",base64LimitSize:5120}}}}},async created(){this.adoptId=this.$route.query.adoptId,await this.getAdopt(),this.getApply(),sessionStorage.getItem("user")&&(this.getFavorite(),this.isMe||0!==this.adopt.isAdopt||this.getIsApply()),1===this.adopt.isAdopt&&(this.isMe=!1,await this.getAdoptLater(),this.isAdopt=!0),console.log(this.adoptLater)},beforeUnmount(){null!=U&&U.destroy()},methods:{async handleEdit(){this.isEdit=!0,await this.$nextTick((()=>{U=(0,N.Jh)({selector:"#editor-container",config:this.editorConfig,mode:"simple",html:this.adoptLater.content}),Z=(0,N.k5)({editor:U,selector:"#toolbar-container",mode:"simple"})}))},save(){this.adoptLater.content=U.getHtml(),M.Z.put("/adopt_later",this.adoptLater).then((e=>{"0"===e.code?(this.$message({type:"success",message:"编辑成功"}),U.destroy(),this.isEdit=!1,this.getAdoptLater()):this.$message({type:"error",message:e.msg})}))},cancel(){U.destroy(),this.isEdit=!1,this.getAdoptLater()},async getAdopt(){await M.Z.get("/adoption/"+this.adoptId).then((e=>{this.adopt=e.data,this.user=this.adopt.user})),JSON.parse(sessionStorage.getItem("user"))&&this.user.id===JSON.parse(sessionStorage.getItem("user")).id&&(this.isMe=!0)},async getAdoptLater(){await M.Z.get("/adopt_later/"+this.adoptId).then((e=>{this.adoptLater=e.data})),JSON.parse(sessionStorage.getItem("user"))&&this.adoptLater.user["id"]===JSON.parse(sessionStorage.getItem("user")).id&&(this.isMe=!0)},getApply(){M.Z.get("/apply/"+this.adoptId).then((e=>{this.apply=e.data}))},getFavorite(){M.Z.get("/adopt_fav",{params:{userId:JSON.parse(sessionStorage.getItem("user")).id,adoptId:this.adoptId}}).then((e=>{null!==e.data&&(this.adoptFav=e.data,this.isFavorite=!0)}))},getIsApply(){M.Z.get("/apply",{params:{userId:JSON.parse(sessionStorage.getItem("user")).id,adoptId:this.adoptId}}).then((e=>{null!=e.data&&(this.myApply=e.data)}))},applyAdopt(){sessionStorage.getItem("user")?(this.myApply.userId=JSON.parse(sessionStorage.getItem("user")).id,this.myApply.adoptId=this.adoptId,M.Z.post("/apply",this.myApply).then((e=>{"0"===e.code?this.$message({type:"success",message:"已申请，请等待..."}):this.$message({type:"error",message:e.msg})}))):this.$message({type:"warning",message:"请先登录"})},async choose(e){this.adoptLater.adoptId=this.adoptId,this.adoptLater.userId=e,this.adoptLater.time=this.getDate(),this.adopt.isAdopt=1,await M.Z.put("/adoption",this.adopt),await M.Z["delete"]("/apply/"+this.adoptId),await M.Z.post("/adopt_later",this.adoptLater).then((e=>{"0"===e.code?this.$message({type:"success",message:"操作成功"}):this.$message({type:"error",message:e.msg})}))},toUser(){sessionStorage.getItem("user")?this.$router.push({path:"/userinfo",query:{userid:this.user.id}}):this.$message({type:"warning",message:"请先登录"})},collect(){sessionStorage.getItem("user")?(this.adoptFav.userId=JSON.parse(sessionStorage.getItem("user")).id,this.adoptFav.adoptId=this.adoptId,M.Z.post("/adopt_fav",this.adoptFav).then((e=>{"0"===e.code?(this.$message({type:"success",message:"收藏成功"}),this.isFavorite=!0):this.$message({type:"error",message:e.msg})}))):this.$message({type:"warning",message:"请先登录"})},notCollect(){M.Z["delete"]("/adopt_fav/"+this.adoptFav.id).then((e=>{"0"===e.code?(this.$message({type:"success",message:"取消收藏成功"}),this.isFavorite=!1):this.$message({type:"error",message:e.msg})}))},getDate(){const e=new Date,t=e.getFullYear(),s=e.getMonth()+1,a=e.getDate(),i=e.getHours(),o=e.getMinutes(),d=e.getSeconds(),r=t+"-"+this.convert(s)+"-"+this.convert(a)+" "+this.convert(i)+":"+this.convert(o)+":"+this.convert(d);return r},convert(e){return e<10?"0"+e:e}}},D=s(3744);const E=(0,D.Z)(b,[["render",$],["__scopeId","data-v-eae40b4a"]]);var J=E}}]);
//# sourceMappingURL=908.a9809c0b.js.map