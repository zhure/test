"use strict";(self["webpackChunkstray_animal_rescue_system"]=self["webpackChunkstray_animal_rescue_system"]||[]).push([[465],{8465:function(e,t,l){l.r(t),l.d(t,{default:function(){return D}});var a=l(6252),s=l(3577),i=l(9963);const o={style:{padding:"10px"}},n={style:{margin:"10px 0"}},r=(0,a.Uk)("查询"),d=(0,a.Uk)("新增"),m=(0,a.Uk)("查看用户信息"),u=(0,a.Uk)("查看内容"),h=(0,a.Uk)("编辑"),p=(0,a.Uk)("删除"),c={style:{margin:"10px 0"}},g=["innerHTML"],f=(0,a.Uk)("管理员"),w=(0,a._)("div",{id:"toolbar-container"},null,-1),_=(0,a._)("div",{id:"editor-container"},null,-1),b={class:"dialog-footer"},y=(0,a.Uk)("Cancel"),C=(0,a.Uk)("Confirm");function W(e,t,l,W,k,v){const z=(0,a.up)("el-input"),V=(0,a.up)("el-button"),U=(0,a.up)("el-table-column"),x=(0,a.up)("el-popconfirm"),P=(0,a.up)("el-table"),D=(0,a.up)("el-pagination"),S=(0,a.up)("el-form-item"),A=(0,a.up)("el-form"),I=(0,a.up)("el-dialog"),$=(0,a.up)("el-card"),Z=(0,a.up)("el-option"),M=(0,a.up)("el-select");return(0,a.wg)(),(0,a.iD)("div",o,[(0,a._)("div",n,[(0,a.Wm)(z,{modelValue:k.search,"onUpdate:modelValue":t[0]||(t[0]=e=>k.search=e),placeholder:"请输入关键字",style:{width:"20%"},clearable:""},null,8,["modelValue"]),(0,a.Wm)(V,{type:"primary",style:{"margin-left":"5px"},onClick:v.load},{default:(0,a.w5)((()=>[r])),_:1},8,["onClick"]),(0,a.Wm)(V,{type:"primary",style:{"margin-left":"5px"},onClick:v.add},{default:(0,a.w5)((()=>[d])),_:1},8,["onClick"])]),(0,a.Wm)(P,{data:k.tableData,style:{width:"100%"}},{default:(0,a.w5)((()=>[(0,a.Wm)(U,{prop:"id",label:"ID"}),(0,a.Wm)(U,{label:"用户信息"},{default:(0,a.w5)((e=>[(0,a.Wm)(V,{size:"small",type:"default",plain:"",onClick:t=>v.searchUser(e.row.userId)},{default:(0,a.w5)((()=>[m])),_:2},1032,["onClick"])])),_:1}),(0,a.Wm)(U,{prop:"animalId",label:"animalId"}),(0,a.Wm)(U,{prop:"title",label:"标题"}),(0,a.Wm)(U,{label:"内容"},{default:(0,a.w5)((e=>[(0,a.Wm)(V,{size:"small",onClick:t=>v.details(e.row.content)},{default:(0,a.w5)((()=>[u])),_:2},1032,["onClick"])])),_:1}),(0,a.Wm)(U,{prop:"time",label:"时间"}),(0,a.Wm)(U,{fixed:"right",label:"Operations",width:"120px"},{default:(0,a.w5)((e=>[(0,a.Wm)(V,{type:"text",onClick:t=>v.handleEdit(e.row)},{default:(0,a.w5)((()=>[h])),_:2},1032,["onClick"]),(0,a.Wm)(x,{title:"Are you sure to delete this?",onConfirm:t=>v.handleDelete(e.row.id)},{reference:(0,a.w5)((()=>[(0,a.Wm)(V,{type:"text"},{default:(0,a.w5)((()=>[p])),_:1})])),_:2},1032,["onConfirm"])])),_:1})])),_:1},8,["data"]),(0,a._)("div",c,[(0,a.Wm)(D,{currentPage:k.currentPage4,"onUpdate:currentPage":t[1]||(t[1]=e=>k.currentPage4=e),"page-size":k.pageSize4,"onUpdate:page-size":t[2]||(t[2]=e=>k.pageSize4=e),"page-sizes":[5,10,20],layout:"total, sizes, prev, pager, next, jumper",total:k.total,onSizeChange:v.handleSizeChange,onCurrentChange:v.handleCurrentChange},null,8,["currentPage","page-size","total","onSizeChange","onCurrentChange"])]),(0,a.Wm)(I,{title:"用户信息",modelValue:k.showUser,"onUpdate:modelValue":t[3]||(t[3]=e=>k.showUser=e),width:"30%"},{default:(0,a.w5)((()=>[(0,a.Wm)(A,{size:"normal"},{default:(0,a.w5)((()=>[(0,a.Wm)(S,null,{default:(0,a.w5)((()=>[(0,a._)("span",null,"用户名："+(0,s.zw)(k.user.username),1)])),_:1}),(0,a.Wm)(S,null,{default:(0,a.w5)((()=>[(0,a._)("span",null,"昵称："+(0,s.zw)(k.user.nickName),1)])),_:1}),(0,a.Wm)(S,null,{default:(0,a.w5)((()=>[(0,a._)("span",null,"性别："+(0,s.zw)(k.user.sex),1)])),_:1}),(0,a.Wm)(S,null,{default:(0,a.w5)((()=>[(0,a._)("span",null,"生日："+(0,s.zw)(k.user.birthday),1)])),_:1}),(0,a.Wm)(S,null,{default:(0,a.w5)((()=>[(0,a._)("span",null,"电话号码："+(0,s.zw)(k.user.phoneNum),1)])),_:1}),(0,a.Wm)(S,null,{default:(0,a.w5)((()=>[(0,a._)("span",null,"电子邮箱："+(0,s.zw)(k.user.email),1)])),_:1}),(0,a.Wm)(S,null,{default:(0,a.w5)((()=>[(0,a._)("span",null,"住址："+(0,s.zw)(k.user.address),1)])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,a.Wm)(I,{title:"内容",modelValue:k.vis,"onUpdate:modelValue":t[4]||(t[4]=e=>k.vis=e),width:"50%"},{default:(0,a.w5)((()=>[(0,a.Wm)($,{shadow:"never"},{default:(0,a.w5)((()=>[(0,a._)("div",{innerHTML:k.detail},null,8,g)])),_:1})])),_:1},8,["modelValue"]),(0,a.Wm)(I,{title:"Tips",modelValue:k.dialogVisible,"onUpdate:modelValue":t[7]||(t[7]=e=>k.dialogVisible=e),width:"60%","before-close":v.beforeClose},{footer:(0,a.w5)((()=>[(0,a._)("span",b,[(0,a.Wm)(V,{onClick:v.cancel},{default:(0,a.w5)((()=>[y])),_:1},8,["onClick"]),(0,a.Wm)(V,{type:"primary",onClick:v.save},{default:(0,a.w5)((()=>[C])),_:1},8,["onClick"])])])),default:(0,a.w5)((()=>[(0,a.Wm)(A,{ref:"form",model:k.form,rules:k.rules,size:"normal","label-width":"100px"},{default:(0,a.w5)((()=>[(0,a.wy)((0,a.Wm)(S,{label:"发帖人",prop:"userId"},{default:(0,a.w5)((()=>[f])),_:1},512),[[i.F8,k.isAdmin]]),(0,a.Wm)(S,{label:"动物种类",prop:"animalId"},{default:(0,a.w5)((()=>[(0,a.Wm)(M,{modelValue:k.form.animalId,"onUpdate:modelValue":t[5]||(t[5]=e=>k.form.animalId=e),class:"m-2",placeholder:"Select"},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(k.animals,(e=>((0,a.wg)(),(0,a.j4)(Z,{key:e.id,label:e.type,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),(0,a.Wm)(S,{label:"标题",prop:"title"},{default:(0,a.w5)((()=>[(0,a.Wm)(z,{modelValue:k.form.title,"onUpdate:modelValue":t[6]||(t[6]=e=>k.form.title=e),style:{width:"80%"}},null,8,["modelValue"])])),_:1}),(0,a.Wm)(S,{label:"内容",prop:"content"},{default:(0,a.w5)((()=>[(0,a.Wm)($,{shadow:"never","body-style":"padding:2px;min-height:200px"},{default:(0,a.w5)((()=>[w,_])),_:1})])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["modelValue","before-close"])])}var k=l(4471),v=l(7877);let z,V=null;var U={name:"PostManage",data(){return{tableData:[],animals:[],user:{},form:{},detail:"",showUser:!1,vis:!1,dialogVisible:!1,isAdmin:!1,search:"",currentPage4:1,pageSize4:5,isPass:1,total:1,Check:"Check",Close:"Close",editorConfig:{placeholder:"请输入内容",MENU_CONF:{uploadImage:{server:"http://localhost:9090/files/editor/upload",fieldName:"file",base64LimitSize:5120}}},rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],animalId:[{required:!0,message:"请选择动物种类",trigger:"change"}]}}},created(){this.load()},methods:{load(){k.Z.get("/post",{params:{pageNum:this.currentPage4,pageSize:this.pageSize4,search:this.search,isPass:this.isPass}}).then((e=>{this.tableData=e.data.records,this.total=e.data.total}))},async getAnimal(){await k.Z.get("animal",this.isPass).then((e=>{this.animals=e.data}))},handleSizeChange(){this.load()},handleCurrentChange(){this.load()},async searchUser(e){await k.Z.get("/user/post/"+e).then((e=>{this.user=e.data})),this.showUser=!0},details(e){this.detail=e,console.log(this.detail),this.vis=!0},handleDelete(e){k.Z["delete"]("/post/"+e).then((e=>{"0"===e.code?(this.$message({type:"success",message:"删除成功"}),this.load()):this.$message({type:"error",message:e.msg})}))},async handleEdit(e){this.form=e,await this.getAnimal(),this.dialogVisible=!0,await this.$nextTick((()=>{V=(0,v.Jh)({selector:"#editor-container",config:this.editorConfig,mode:"simple",html:this.form.content}),z=(0,v.k5)({editor:V,selector:"#toolbar-container",mode:"simple"})}))},add(){this.form.userId=1,this.getAnimal(),this.isAdmin=!0,this.dialogVisible=!0,this.$nextTick((()=>{V=(0,v.Jh)({selector:"#editor-container",config:this.editorConfig,mode:"simple"}),z=(0,v.k5)({editor:V,selector:"#toolbar-container",mode:"simple"})}))},save(){this.form.content=V.getHtml(),this.form.isPass=1,this.form.time=this.getDate(),console.log(this.form.time),console.log(this.form.id);let e=this;this.$refs["form"].validate((t=>{t&&(void 0===this.form.id?k.Z.post("/post",this.form).then((t=>{"0"===t.code?(this.$message({type:"success",message:"添加成功"}),V.destroy(),e.dialogVisible=!1,e.isAdmin=!1,e.load()):this.$message({type:"error",message:t.msg})})):k.Z.put("/post",this.form).then((e=>{"0"===e.code?(this.$message({type:"success",message:"修改成功"}),V.destroy(),this.dialogVisible=!1,this.isAdmin=!1,this.load()):this.$message({type:"error",message:e.msg})})))}))},beforeClose(e){null!==V&&(V.destroy(),this.isAdmin=!1,this.form={}),e()},cancel(){V.destroy(),this.dialogVisible=!1,this.isAdmin=!1,this.form={}},getDate(){const e=new Date,t=e.getFullYear(),l=e.getMonth()+1,a=e.getDate(),s=e.getHours(),i=e.getMinutes(),o=e.getSeconds(),n=t+"-"+this.convert(l)+"-"+this.convert(a)+" "+this.convert(s)+":"+this.convert(i)+":"+this.convert(o);return n},convert(e){return e<10?"0"+e:e}}},x=l(3744);const P=(0,x.Z)(U,[["render",W]]);var D=P}}]);
//# sourceMappingURL=465.f41065e3.js.map