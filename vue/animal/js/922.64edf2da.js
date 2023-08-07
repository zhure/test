"use strict";(self["webpackChunkstray_animal_rescue_system"]=self["webpackChunkstray_animal_rescue_system"]||[]).push([[922],{9922:function(e,a,l){l.r(a),l.d(a,{default:function(){return v}});var t=l(6252);const s={style:{padding:"10px"}},r={style:{margin:"10px 0"}},i=(0,t.Uk)("查询"),o=(0,t.Uk)("编辑"),n=(0,t.Uk)("删除"),d={style:{margin:"10px 0"}},u=["src"],m={class:"dialog-footer"},p=(0,t.Uk)("Cancel"),c=(0,t.Uk)("Confirm");function g(e,a,l,g,h,f){const w=(0,t.up)("el-input"),b=(0,t.up)("el-button"),y=(0,t.up)("el-table-column"),v=(0,t.up)("el-image"),_=(0,t.up)("el-popconfirm"),C=(0,t.up)("el-table"),W=(0,t.up)("el-pagination"),k=(0,t.up)("el-form-item"),V=(0,t.up)("Plus"),z=(0,t.up)("el-icon"),U=(0,t.up)("el-upload"),P=(0,t.up)("el-form"),S=(0,t.up)("el-dialog");return(0,t.wg)(),(0,t.iD)("div",s,[(0,t._)("div",r,[(0,t.Wm)(w,{modelValue:h.search,"onUpdate:modelValue":a[0]||(a[0]=e=>h.search=e),placeholder:"请输入关键字",style:{width:"20%"},clearable:""},null,8,["modelValue"]),(0,t.Wm)(b,{type:"primary",style:{"margin-left":"5px"},onClick:f.load},{default:(0,t.w5)((()=>[i])),_:1},8,["onClick"])]),(0,t.Wm)(C,{data:h.tableData,stripe:"",border:"",style:{width:"100%"}},{default:(0,t.w5)((()=>[(0,t.Wm)(y,{prop:"userId",label:"userID",sortable:""}),(0,t.Wm)(y,{prop:"nickName",label:"昵称"}),(0,t.Wm)(y,{prop:"vetDescribe",label:"描述"}),(0,t.Wm)(y,{label:"头像"},{default:(0,t.w5)((e=>[(0,t.Wm)(v,{"preview-teleported":"true",style:{width:"100px",height:"100px"},src:e.row.headImg,"preview-src-list":[e.row.headImg],fit:"cover"},null,8,["src","preview-src-list"])])),_:1}),(0,t.Wm)(y,{fixed:"right",label:"Operations",width:"120px"},{default:(0,t.w5)((e=>[(0,t.Wm)(b,{type:"text",onClick:a=>f.handleEdit(e.row)},{default:(0,t.w5)((()=>[o])),_:2},1032,["onClick"]),(0,t.Wm)(_,{title:"Are you sure to delete this?",onConfirm:a=>f.handleDelete(e.row.userId)},{reference:(0,t.w5)((()=>[(0,t.Wm)(b,{type:"text"},{default:(0,t.w5)((()=>[n])),_:1})])),_:2},1032,["onConfirm"])])),_:1})])),_:1},8,["data"]),(0,t._)("div",d,[(0,t.Wm)(W,{currentPage:h.currentPage4,"onUpdate:currentPage":a[1]||(a[1]=e=>h.currentPage4=e),"page-size":h.pageSize4,"onUpdate:page-size":a[2]||(a[2]=e=>h.pageSize4=e),"page-sizes":[5,10,20],layout:"total, sizes, prev, pager, next, jumper",total:h.total,onSizeChange:f.handleSizeChange,onCurrentChange:f.handleCurrentChange},null,8,["currentPage","page-size","total","onSizeChange","onCurrentChange"])]),(0,t.Wm)(S,{modelValue:h.dialogVisible,"onUpdate:modelValue":a[6]||(a[6]=e=>h.dialogVisible=e),title:"Tips",width:"30%"},{footer:(0,t.w5)((()=>[(0,t._)("span",m,[(0,t.Wm)(b,{onClick:a[5]||(a[5]=e=>h.dialogVisible=!1)},{default:(0,t.w5)((()=>[p])),_:1}),(0,t.Wm)(b,{type:"primary",onClick:f.save},{default:(0,t.w5)((()=>[c])),_:1},8,["onClick"])])])),default:(0,t.w5)((()=>[(0,t.Wm)(P,{size:"normal",model:h.form,"label-width":"120px"},{default:(0,t.w5)((()=>[(0,t.Wm)(k,{label:"昵称"},{default:(0,t.w5)((()=>[(0,t.Wm)(w,{modelValue:h.form.nickName,"onUpdate:modelValue":a[3]||(a[3]=e=>h.form.nickName=e),style:{width:"80%"}},null,8,["modelValue"])])),_:1}),(0,t.Wm)(k,{label:"描述"},{default:(0,t.w5)((()=>[(0,t.Wm)(w,{modelValue:h.form.vetDescribe,"onUpdate:modelValue":a[4]||(a[4]=e=>h.form.vetDescribe=e),style:{width:"80%"}},null,8,["modelValue"])])),_:1}),(0,t.Wm)(k,{label:"头像"},{default:(0,t.w5)((()=>[(0,t.Wm)(U,{class:"avatar-uploader",action:"http://120.79.190.143:9090/files/upload","show-file-list":!1,"on-success":f.handleAvatarSuccess,"before-upload":f.beforeAvatarUpload},{default:(0,t.w5)((()=>[h.imageUrl?((0,t.wg)(),(0,t.iD)("img",{key:0,src:h.form.headImg,class:"avatar"},null,8,u)):((0,t.wg)(),(0,t.j4)(z,{key:1,class:"avatar-uploader-icon"},{default:(0,t.w5)((()=>[(0,t.Wm)(V)])),_:1}))])),_:1},8,["on-success","before-upload"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue"])])}var h=l(4471),f=l(610),w={name:"VetManage",components:{},data(){return{form:{},dialogVisible:!1,search:"",currentPage4:1,pageSize4:5,isPass:2,total:1,tableData:[],imageUrl:!1}},created(){this.load()},methods:{load(){h.Z.get("/vet",{params:{pageNum:this.currentPage4,pageSize:this.pageSize4,search:this.search,isPass:this.isPass}}).then((e=>{console.log(e),this.tableData=e.data.records,this.total=e.data.total}))},async save(){await h.Z.put("/vet",this.form).then((e=>{console.log(e),"0"===e.code?this.$message({type:"success",message:"更新成功"}):this.$message({type:"error",message:e.msg})})),this.load(),this.dialogVisible=!1},handleEdit(e){this.form=JSON.parse(JSON.stringify(e)),this.dialogVisible=!0},handleSizeChange(){this.load()},handleCurrentChange(){this.load()},async handleDelete(e){await h.Z["delete"]("/vet/"+e).then((e=>{"0"===e.code?this.$message({type:"success",message:"删除成功"}):this.$message({type:"error",message:e.msg})})),this.load()},beforeAvatarUpload:e=>{let a=["image/jpeg","image/jpg","image/png"];const l=a.includes(e.type);return l?!(e.size/1024/1024>2)||(f.z8.error("图片大小不能超过2MB!"),!1):(f.z8.error("上传图片只能是 JPG、JPEG、PNG 格式!"),!1)},handleAvatarSuccess(e){console.log(e),this.form.headImg=e.data,this.imageUrl=!0}}},b=l(3744);const y=(0,b.Z)(w,[["render",g],["__scopeId","data-v-709ed13c"]]);var v=y}}]);
//# sourceMappingURL=922.64edf2da.js.map