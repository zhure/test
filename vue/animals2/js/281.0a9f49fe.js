"use strict";(self["webpackChunkstray_animal_rescue_system"]=self["webpackChunkstray_animal_rescue_system"]||[]).push([[281],{4281:function(e,t,s){s.r(t),s.d(t,{default:function(){return $}});var n=s(6252),a=s(3577);const l=e=>((0,n.dD)("data-v-4ccadabb"),e=e(),(0,n.Cn)(),e),i={style:{display:"block",padding:"20px"}},m={class:"title"},o=["src"],r={style:{"margin-left":"10px"}},d={class:"time"},u=["innerHTML"],p=l((()=>(0,n._)("div",{style:{flex:"1",padding:"10px"}},"评论区",-1))),c={key:0,style:{padding:"10px"}},g={key:1,style:{padding:"10px"}},h=["src"],_=(0,n.Uk)("评论"),w=["onClick","src"],y={class:"contents"},k=["onClick"],C={class:"time"},f=["onClick"],v=["onClick","src"],W={class:"contents"},I=["onClick"],x={class:"time"},z={key:1},D=["src"],U=(0,n.Uk)("回复"),b=(0,n.Uk)("取消");function q(e,t,s,l,q,H){const S=(0,n.up)("el-col"),V=(0,n.up)("el-row"),N=(0,n.up)("el-card"),$=(0,n.up)("el-input"),M=(0,n.up)("el-button"),Y=(0,n.up)("el-divider");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(N,{class:"detail",shadow:"never"},{default:(0,n.w5)((()=>[(0,n._)("div",i,[(0,n._)("span",m,(0,a.zw)(q.post.title),1)]),(0,n.Wm)(V,null,{default:(0,n.w5)((()=>[(0,n.Wm)(S,{span:1},{default:(0,n.w5)((()=>[(0,n._)("img",{class:"avatar",onClick:t[0]||(t[0]=e=>H.toUser(q.user.id)),src:q.user.headImg,alt:"头像"},null,8,o)])),_:1}),(0,n.Wm)(S,{span:21},{default:(0,n.w5)((()=>[(0,n._)("div",r,[(0,n._)("span",{class:"nick",onClick:t[1]||(t[1]=e=>H.toUser(q.user.id))},(0,a.zw)(q.user.nickName),1),(0,n._)("span",d,(0,a.zw)(q.post.time),1)])])),_:1})])),_:1}),(0,n._)("div",{style:{margin:"20px"},innerHTML:q.post.content},null,8,u)])),_:1}),(0,n.Wm)(N,{class:"detail",shadow:"never"},{default:(0,n.w5)((()=>[p,q.me?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("div",c,"要登录才能进行评论哦~")),q.me?((0,n.wg)(),(0,n.iD)("div",g,[(0,n.Wm)(V,null,{default:(0,n.w5)((()=>[(0,n.Wm)(S,{span:2},{default:(0,n.w5)((()=>[(0,n._)("img",{class:"avatar",style:{"margin-left":"27px"},src:q.me.headImg,alt:"头像"},null,8,h)])),_:1}),(0,n.Wm)(S,{span:19},{default:(0,n.w5)((()=>[(0,n.Wm)($,{modelValue:q.myComment.content,"onUpdate:modelValue":t[2]||(t[2]=e=>q.myComment.content=e),size:"large",placeholder:"来留下你的评论吧",style:{padding:"7px"}},null,8,["modelValue"])])),_:1}),(0,n.Wm)(S,{span:2},{default:(0,n.w5)((()=>[(0,n.Wm)(M,{onClick:H.submit,size:"large",type:"warning",style:{margin:"7px"},plain:""},{default:(0,n.w5)((()=>[_])),_:1},8,["onClick"])])),_:1})])),_:1})])):(0,n.kq)("",!0),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(q.comments,((e,s)=>((0,n.wg)(),(0,n.iD)("div",null,[e.parentId?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(V,{key:0,style:{padding:"10px"}},{default:(0,n.w5)((()=>[(0,n.Wm)(S,{span:2},{default:(0,n.w5)((()=>[(0,n._)("img",{class:"avatar",onClick:t=>H.toUser(e.user["id"]),style:{"margin-left":"27px"},src:e.user["headImg"],alt:"头像"},null,8,w)])),_:2},1024),(0,n.Wm)(S,{span:21},{default:(0,n.w5)((()=>[(0,n._)("div",y,[(0,n._)("span",{style:{size:"13px",color:"#501818",cursor:"pointer"},onClick:t=>H.toUser(e.user["id"])},(0,a.zw)(e.user["nickName"]),9,k),(0,n._)("span",null,(0,a.zw)(e.content),1),(0,n._)("span",C,[(0,n.Uk)((0,a.zw)(e.time)+" ",1),(0,n._)("span",{onClick:t=>{q.myComment.parentId=e.id,e.isReply=!0}},"回复",8,f)])]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(q.children,((t,s)=>((0,n.wg)(),(0,n.iD)("div",null,[e.id===t.parentId?((0,n.wg)(),(0,n.j4)(V,{key:0,style:{"margin-top":"20px"}},{default:(0,n.w5)((()=>[(0,n.Wm)(S,{span:1},{default:(0,n.w5)((()=>[(0,n._)("img",{class:"min-avatar",onClick:e=>H.toUser(t.user["id"]),src:t.user["headImg"]},null,8,v)])),_:2},1024),(0,n.Wm)(S,{span:21},{default:(0,n.w5)((()=>[(0,n._)("div",W,[(0,n._)("span",null,[(0,n._)("span",{style:{size:"13px",color:"#932727","margin-right":"10px",cursor:"pointer"},onClick:e=>H.toUser(t.user["id"])},(0,a.zw)(t.user["nickName"]),9,I),(0,n._)("span",null,(0,a.zw)(t.content),1)]),(0,n._)("span",x,(0,a.zw)(t.time),1)])])),_:2},1024)])),_:2},1024)):(0,n.kq)("",!0)])))),256))])),_:2},1024),(0,n.Wm)(Y)])),_:2},1024)),e.isReply&&q.me?((0,n.wg)(),(0,n.iD)("div",z,[(0,n.Wm)(V,null,{default:(0,n.w5)((()=>[(0,n.Wm)(S,{span:2},{default:(0,n.w5)((()=>[(0,n._)("img",{class:"avatar",style:{"margin-left":"27px"},src:q.me.headImg,alt:"头像"},null,8,D)])),_:1}),(0,n.Wm)(S,{span:18},{default:(0,n.w5)((()=>[(0,n.Wm)($,{modelValue:q.myComment.content,"onUpdate:modelValue":t[3]||(t[3]=e=>q.myComment.content=e),size:"normal",placeholder:"输入要回复的信息",style:{padding:"7px"}},null,8,["modelValue"])])),_:1}),(0,n.Wm)(S,{span:3},{default:(0,n.w5)((()=>[(0,n.Wm)(M,{onClick:H.submit,size:"normal",type:"warning",style:{margin:"5px"},plain:""},{default:(0,n.w5)((()=>[U])),_:1},8,["onClick"]),(0,n.Wm)(M,{onClick:t=>{q.myComment.parentId="",e.isReply=!1},size:"normal",style:{margin:"5px"}},{default:(0,n.w5)((()=>[b])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024),(0,n.Wm)(Y)])):(0,n.kq)("",!0)])))),256))])),_:1})],64)}var H=s(4471),S={name:"PostDetail",data(){return{postId:"",me:{},post:{},user:{},myComment:{},total:"",comments:[],children:[]}},created(){this.me=JSON.parse(sessionStorage.getItem("user"))?JSON.parse(sessionStorage.getItem("user")):"",this.postId=this.$route.query.postId,this.getPost(),this.getComments()},methods:{getPost(){H.Z.get("/post/"+this.postId).then((e=>{this.post=e.data,this.user=this.post.user}))},getComments(){H.Z.get("/comment/show",{params:{postId:this.postId}}).then((e=>{console.log(e),this.comments=e.data,this.children=e.data}))},toUser(e){sessionStorage.getItem("user")?this.$router.push({path:"/userinfo",query:{userid:e}}):this.$message({type:"warning",message:"请先登录"})},submit(){this.myComment.userId=this.me.id,this.myComment.postId=this.postId,this.myComment.time=this.getDate(),H.Z.post("/comment",this.myComment).then((e=>{"0"===e.code?(this.$message({type:"success",message:"评论成功"}),this.myComment={},this.getComments()):this.$message({type:"error",message:e.msg})}))},getDate(){const e=new Date,t=e.getFullYear(),s=e.getMonth()+1,n=e.getDate(),a=e.getHours(),l=e.getMinutes(),i=e.getSeconds(),m=t+"-"+this.convert(s)+"-"+this.convert(n)+" "+this.convert(a)+":"+this.convert(l)+":"+this.convert(i);return m},convert(e){return e<10?"0"+e:e}}},V=s(3744);const N=(0,V.Z)(S,[["render",q],["__scopeId","data-v-4ccadabb"]]);var $=N}}]);
//# sourceMappingURL=281.0a9f49fe.js.map