"use strict";(self["webpackChunkstray_animal_rescue_system"]=self["webpackChunkstray_animal_rescue_system"]||[]).push([[200],{200:function(e,a,t){t.r(a),t.d(a,{default:function(){return U}});var o=t(6252),l=t(3577),r=t(9963);const s={style:{padding:"10px"}},i=(0,o.Uk)("查询"),n=(0,o.Uk)("导出数据"),d=(0,o.Uk)("新增"),p=["onUpdate:modelValue"],u=["onUpdate:modelValue"],m=["onUpdate:modelValue"],w=["onUpdate:modelValue"],h=["onUpdate:modelValue"],c=(0,o.Uk)("编辑"),g=(0,o.Uk)("取消"),y=(0,o.Uk)("保存"),f={style:{margin:"10px 0"}};function _(e,a,t,_,b,k){const x=(0,o.up)("el-input"),C=(0,o.up)("el-button"),W=(0,o.up)("el-col"),D=(0,o.up)("el-upload"),z=(0,o.up)("el-row"),U=(0,o.up)("el-table-column"),V=(0,o.up)("el-option"),S=(0,o.up)("el-select"),F=(0,o.up)("el-date-picker"),v=(0,o.up)("el-popconfirm"),N=(0,o.up)("el-table"),$=(0,o.up)("el-pagination"),Z=(0,o.up)("Register");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",s,[(0,o.Wm)(z,{style:{margin:"10px 0"}},{default:(0,o.w5)((()=>[(0,o.Wm)(W,{span:18},{default:(0,o.w5)((()=>[(0,o.Wm)(x,{modelValue:b.search,"onUpdate:modelValue":a[0]||(a[0]=e=>b.search=e),placeholder:"请输入用户名或昵称",style:{width:"20%"},clearable:""},null,8,["modelValue"]),(0,o.Wm)(C,{type:"primary",style:{"margin-left":"5px"},onClick:k.load},{default:(0,o.w5)((()=>[i])),_:1},8,["onClick"])])),_:1}),(0,o.Wm)(W,{span:2},{default:(0,o.w5)((()=>[(0,o.Wm)(C,{size:"small",type:"success",icon:b.download,onClick:k.exportData},{default:(0,o.w5)((()=>[n])),_:1},8,["icon","onClick"])])),_:1}),(0,o.Wm)(W,{span:2},{default:(0,o.w5)((()=>[(0,o.Wm)(D,{"show-file-list":!1,"before-upload":k.beforeUpload,"on-success":k.onSuccess,"on-error":k.onError,disabled:b.importDisabled,style:{display:"inline-flex","margin-right":"10px","margin-top":"0.5px"},action:"http://120.79.190.143:9090/user/import"},{default:(0,o.w5)((()=>[(0,o.Wm)(C,{size:"small",disabled:b.importDisabled,type:"success",icon:b.importDataIcon},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(b.importDataText),1)])),_:1},8,["disabled","icon"])])),_:1},8,["before-upload","on-success","on-error","disabled"])])),_:1}),(0,o.Wm)(W,{span:"2"},{default:(0,o.w5)((()=>[(0,o.Wm)(C,{type:"primary",onClick:a[1]||(a[1]=e=>b.registerShow=!0)},{default:(0,o.w5)((()=>[d])),_:1})])),_:1})])),_:1}),(0,o._)("div",null,[(0,o.Wm)(N,{data:b.userData,stripe:""},{default:(0,o.w5)((()=>[(0,o.Wm)(U,{prop:"id",label:"ID",sortable:""}),(0,o.Wm)(U,{prop:"username",label:"用户名"},{default:(0,o.w5)((e=>[(0,o.wy)((0,o._)("input",{type:"text",style:{width:"85%",color:"rgba(94,29,29,0.66)"},"onUpdate:modelValue":a=>e.row.username=a},null,8,p),[[r.nr,e.row.username],[r.F8,e.row.iseditor]]),(0,o.wy)((0,o._)("span",null,(0,l.zw)(e.row.username),513),[[r.F8,!e.row.iseditor]])])),_:1}),(0,o.Wm)(U,{prop:"nickName",label:"昵称"},{default:(0,o.w5)((e=>[(0,o.wy)((0,o._)("input",{type:"text",style:{width:"85%",color:"rgba(94,29,29,0.66)"},"onUpdate:modelValue":a=>e.row.nickName=a},null,8,u),[[r.nr,e.row.nickName],[r.F8,e.row.iseditor]]),(0,o.wy)((0,o._)("span",null,(0,l.zw)(e.row.nickName),513),[[r.F8,!e.row.iseditor]])])),_:1}),(0,o.Wm)(U,{prop:"sex",label:"性别"},{default:(0,o.w5)((e=>[(0,o.wy)((0,o.Wm)(S,{modelValue:e.row.sex,"onUpdate:modelValue":a=>e.row.sex=a},{default:(0,o.w5)((()=>[(0,o.Wm)(V,{label:"未知",value:"未知"}),(0,o.Wm)(V,{label:"男",value:"男"}),(0,o.Wm)(V,{label:"女",value:"女"})])),_:2},1032,["modelValue","onUpdate:modelValue"]),[[r.F8,e.row.iseditor]]),(0,o.wy)((0,o._)("span",null,(0,l.zw)(e.row.sex),513),[[r.F8,!e.row.iseditor]])])),_:1}),(0,o.Wm)(U,{prop:"birthday",label:"生日"},{default:(0,o.w5)((e=>[e.row.iseditor?((0,o.wg)(),(0,o.j4)(F,{key:0,modelValue:e.row.birthday,"onUpdate:modelValue":a=>e.row.birthday=a,type:"date","value-format":"YYYY-MM-DD"},null,8,["modelValue","onUpdate:modelValue"])):(0,o.kq)("",!0),(0,o.wy)((0,o._)("span",null,(0,l.zw)(e.row.birthday),513),[[r.F8,!e.row.iseditor]])])),_:1}),(0,o.Wm)(U,{prop:"phoneNum",label:"电话号码"},{default:(0,o.w5)((e=>[(0,o.wy)((0,o._)("input",{type:"text",style:{width:"85%",color:"rgba(94,29,29,0.66)"},"onUpdate:modelValue":a=>e.row.phoneNum=a},null,8,m),[[r.nr,e.row.phoneNum],[r.F8,e.row.iseditor]]),(0,o.wy)((0,o._)("span",null,(0,l.zw)(e.row.phoneNum),513),[[r.F8,!e.row.iseditor]])])),_:1}),(0,o.Wm)(U,{prop:"email",label:"邮箱"},{default:(0,o.w5)((e=>[(0,o.wy)((0,o._)("input",{type:"text",style:{width:"85%",color:"rgba(94,29,29,0.66)"},"onUpdate:modelValue":a=>e.row.email=a},null,8,w),[[r.nr,e.row.email],[r.F8,e.row.iseditor]]),(0,o.wy)((0,o._)("span",null,(0,l.zw)(e.row.email),513),[[r.F8,!e.row.iseditor]])])),_:1}),(0,o.Wm)(U,{prop:"address",label:"地址","show-overflow-tooltip":""},{default:(0,o.w5)((e=>[(0,o.wy)((0,o._)("input",{type:"text",style:{width:"85%",color:"rgba(94,29,29,0.66)"},"onUpdate:modelValue":a=>e.row.address=a},null,8,h),[[r.nr,e.row.address],[r.F8,e.row.iseditor]]),(0,o.wy)((0,o._)("span",null,(0,l.zw)(e.row.address),513),[[r.F8,!e.row.iseditor]])])),_:1}),(0,o.Wm)(U,{fixed:"right",label:"操作",width:"120px"},{default:(0,o.w5)((e=>[(0,o.wy)((0,o.Wm)(C,{onClick:a=>k.handleEdit(e.row,e),plain:""},{default:(0,o.w5)((()=>[c])),_:2},1032,["onClick"]),[[r.F8,!e.row.iseditor]]),(0,o.wy)((0,o.Wm)(C,{type:"text",onClick:a=>k.handleCancel(e.row,e)},{default:(0,o.w5)((()=>[g])),_:2},1032,["onClick"]),[[r.F8,e.row.iseditor]]),(0,o.wy)((0,o.Wm)(C,{type:"text",onClick:a=>k.handleSave(e.row)},{default:(0,o.w5)((()=>[y])),_:2},1032,["onClick"]),[[r.F8,e.row.iseditor]]),(0,o.Wm)(v,{title:"Are you sure to delete this?",onConfirm:a=>k.handleDelete(e.row.id)},{reference:(0,o.w5)((()=>[(0,o.wy)((0,o.Wm)(C,{type:"danger",icon:b.Delete,size:"small"},null,8,["icon"]),[[r.F8,!e.row.iseditor]])])),_:2},1032,["onConfirm"])])),_:1})])),_:1},8,["data"]),(0,o._)("div",f,[(0,o.Wm)($,{currentPage:b.currentPage4,"onUpdate:currentPage":a[2]||(a[2]=e=>b.currentPage4=e),"page-size":b.pageSize4,"onUpdate:page-size":a[3]||(a[3]=e=>b.pageSize4=e),"page-sizes":[5,10,20],layout:"total, sizes, prev, pager, next, jumper",total:b.total,onSizeChange:k.handleSizeChange,onCurrentChange:k.handleCurrentChange},null,8,["currentPage","page-size","total","onSizeChange","onCurrentChange"])])])]),(0,o._)("div",null,[b.registerShow?((0,o.wg)(),(0,o.j4)(Z,{key:0,ref:"refForm",onClose:k.close},null,8,["onClose"])):(0,o.kq)("",!0)])],64)}var b=t(4471),k=t(8447),x=t(3314),C=t(1469),W={name:"UserManage",components:{Register:k.Z},created(){this.load()},data(){return{search:"",currentPage4:1,pageSize4:10,total:1,userData:[],registerShow:!1,flag:!1,form:{},Delete:x.Z,download:C.Z,importDataText:"导入数据",importDataIcon:"Upload",importDisabled:!1}},methods:{load(){b.Z.get("/user",{params:{pageNum:this.currentPage4,pageSize:this.pageSize4,search:this.search}}).then((e=>{this.userData=e.data.records,this.total=e.data.total}))},handleEdit(e,a){e.iseditor=!0},handleCancel(e,a){e.iseditor=!1,this.load()},verification(e){return""===e.phoneNum&&""===e.email?(this.$message({type:"error",message:"手机号和邮箱必须填一个"}),!1):e.username.length>31?(this.$message({type:"error",message:"用户名长度需小于32"}),!1):""===e.phoneNum||/^1[3|4|5|6|7|8][0-9]{9}$/.test(e.phoneNum)?!(""!==e.email&&!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e.email))||(this.$message({type:"error",message:"邮箱格式错误"}),!1):(this.$message({type:"error",message:"电话号码格式错误"}),!1)},async handleSave(e,a){this.form=JSON.parse(JSON.stringify(e)),this.verification(this.form)&&(await b.Z.put("user",this.form).then((e=>{"0"===e.code?this.$message({type:"success",message:"修改成功"}):this.$message({type:"error",message:e.msg})})),e.iseditor=!1,this.load())},close(e){this.registerShow=e,this.load()},handleSizeChange(){this.load()},handleCurrentChange(){this.load()},async handleDelete(e){await b.Z["delete"]("/user/"+e).then((e=>{"0"===e.code?this.$message({type:"success",message:"删除成功"}):this.$message({type:"error",message:e.msg})})),this.load()},exportData(){this.$confirm("此操作将导出用户数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{window.open("http://120.79.190.143:9090/user/export","_parent")})).catch((()=>{this.$message({type:"info",message:"已取消导出"})}))},onError(){this.importDataText="导入数据",this.importDataIcon="el-icon-upload2",this.importDisabled=!1,this.load(),this.$message.error("导入失败！")},onSuccess(){this.importDataText="导入数据",this.importDataIcon="el-icon-upload2",this.importDisabled=!1,this.load(),this.$message.success("导入成功！")},beforeUpload(){this.importDataText="正在导入",this.importDataIcon="el-icon-loading",this.importDisabled=!0}}},D=t(3744);const z=(0,D.Z)(W,[["render",_]]);var U=z}}]);
//# sourceMappingURL=200.d1dae6a8.js.map