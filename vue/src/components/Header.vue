<template>
  <div class="head">
    <div>
      <img class="img" src="@/assets/img/head.png" alt="head_img">
    </div>
    <div class="title">管 理 台</div>
    <div class="adm-menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ accountNum }}
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="adminInfo">个人主页</el-dropdown-item>
            <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-drawer
        ref="drawerRef"
        v-model="drawer"
        title="个人主页"
        direction="rtl"
        size="30%"
        :show-close="false"
    >
      <el-form
          :model="adminForm"
          size="normal"
          class="adm-info"
      >
<!--        <el-form-item @click="editor=false">-->
        <el-form-item>
          <el-icon><avatar /></el-icon>
          <span style="margin: 5px;">账号：</span>
          <span>{{ adminForm.accountNum }}</span>
<!--          <span v-show="!editor">{{ adminForm.accountNum }}</span>-->
<!--          <el-input v-show="editor" v-model="adminForm.accountNum" style="width: 60%"></el-input>-->
<!--          <el-icon v-show="!editor" @click.stop="editor=true" style="margin-left: 10px"><edit /></el-icon>-->
<!--          <el-icon v-show="editor" @click="editor=false;save"><document-checked /></el-icon>-->
        </el-form-item>
        <el-form-item @click="editor2=false">
          <el-icon><lock /></el-icon>
          <span style="margin: 5px;">密码：</span>
          <span v-show="!editor2">**********</span>
          <el-input v-show="editor2" @click.stop v-model="adminForm.password" style="width: 60%"></el-input>
          <el-icon v-show="!editor2" @click.stop="editor2=true;editor3=false" style="margin-left: 10px"><edit /></el-icon>
          <el-icon v-show="editor2" @click="save"><document-checked /></el-icon>
        </el-form-item>
        <el-form-item @click="editor3=false">
          <el-icon><phone /></el-icon>
          <span style="margin: 5px;">电话号码：</span>
          <span v-show="!editor3">{{ adminForm.phoneNum }}</span>
          <el-input v-show="editor3" @click.stop v-model="adminForm.phoneNum" style="width: 60%"></el-input>
          <el-icon v-show="!editor3" @click.stop="editor3=true;editor2=false" style="margin-left: 10px"><edit /></el-icon>
          <el-icon v-show="editor3" @click="save"><document-checked /></el-icon>
        </el-form-item>
      </el-form>
      <el-divider />
      <div>
        <el-icon><coordinate /></el-icon>
<!--        <span style="margin: 10px;">权限</span>-->
        <div v-if="adminForm.power===9">
          <el-button type="primary" @click="dialogVisible=true">新增</el-button>
          <el-table :data="adminData" style="width: 100%">
            <el-table-column property="accountNum" label="账号"/>
            <el-table-column property="phoneNum" label="电话号码"/>
            <el-table-column property="power" label="权限"/>
            <el-table-column fixed="right" label="操作" width="80px">
              <template #default="scope">
                <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row.id)">
                  <template #reference>
                    <el-button type="text">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin: 10px 0">
            <el-pagination
                v-model:currentPage="currentPage4"
                v-model:page-size="pageSize4"
                :page-sizes="[5, 10, 20]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <div v-if="adminForm.power===1">
          您没有权限
        </div>
        <!--  <div class="admin-rule">-->
        <!--    <h3>管理员细则</h3>-->
        <!--    <ul>-->
        <!--      <li>如无必要不删除</li>-->
        <!--      <li>您将拥有查看与审核数据的权力</li>-->
        <!--    </ul>-->

        <!--  </div>-->
      </div>
    </el-drawer>
  </div>

  <el-dialog title="" center v-model="dialogVisible" width="30%">
    <el-form size="normal" :model="newAdmin" label-width="120px">
      <el-form-item label="账号">
        <el-input size="normal" v-model="newAdmin.accountNum" style="width: 80%;"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input size="normal" v-model="newAdmin.password" style="width: 80%;"/>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input size="normal" v-model="newAdmin.phoneNum" style="width: 80%;"/>
      </el-form-item>
      <el-form-item label="权限">
        <el-select size="normal" v-model="newAdmin.power" class="m-2" placeholder="Select" clearable>
          <el-option label="超级管理员" value="9"/>
          <el-option label="管理员" value="1"/>
        </el-select>
<!--        <el-input size="normal" v-model="newAdmin.power" style="width: 80%;"/>-->
      </el-form-item>
    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button size="normal" @click="cancel">取消</el-button>
            <el-button size="normal" type="primary" @click="add">确认</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Header",
  data() {
    return {
      drawer: false,
      editor: false,
      editor2: false,
      editor3: false,
      dialogVisible: false,
      adminForm: {},
      form: {},
      newAdmin: {},
      adminData: [],
      currentPage4: 1,
      pageSize4: 10,
      total: 1,
      accountNum: this.$store.getters.getAccountNum,
    }
  },
  // computed: {
  //     getName() {
  //       return this.$store.getters.getAccountNum
  //     }
  // },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/administration/login')
    },
    async adminInfo() {
      let accountNum = this.$store.getters.getAccountNum
      await request.get("/admin/" + accountNum).then(res => {
        // console.log(res)
        this.adminForm = res.data
      })
      if(this.adminForm.power === 9) {
        await this.getAdmins()
      }
      this.drawer = true;
      // this.$router.push('/administration/admin_info')
    },
    async getAdmins() {
      request.get('/admin', {
        params: {
          pageNum: this.currentPage4,
          pageSize: this.pageSize4,
          // search: this.search
        }
      }).then(res => {
        this.adminData = res.data.records
        this.total = res.data.total
      })
    },
    edit() {
      this.form = JSON.parse(this.adminForm)
    },
    save() {
      console.log(this.adminForm)
      request.put('admin', this.adminForm).then(res => {
        if (res.code === '0') {
          this.$message({
            type: 'success',
            message: '修改成功',
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleSizeChange() {
      this.getAdmins()
    },
    handleCurrentChange() {
      this.getAdmins()
    },
    add() {
      request.post('/admin', this.newAdmin).then(res => {
        if(res.code === '0'){
          this.$message({
            type: "success",
            message: "新增成功"
          })
          this.getAdmins()
          this.dialogVisible = false
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
    cancel() {
      this.newAdmin = {}
      this.dialogVisible = false
    },
  }
}
</script>

<style lang="less" scoped>
.head{
  background-color: white;

}
.img{
  width:100%;
  height: 30px;
  left: 0;
  top: 70px;
  /*z-index:-1;  !*图片叠层关系*!*/
  position: absolute;
  box-shadow: 2px 2px 1px rgba(57, 152, 246, 0.52);
}
.title{
  font-family: 方正姚体;
  font-size: 32px;
  margin-top: 25px;
  margin-left: 25px;
  color: #266780;
}
.adm-menu{
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 7%;
  right: 20px;
  transform: translateY(-50%);
}
.adm-info{
  color: #49657e;
  background-color: #ffffff;
}
//.admin-rule{
//  margin: 10px;
//  color: darkslateblue;
//  font-family: 华文宋体;
//  >ul{
//    >li{
//      margin: 5px;
//    }
//  }
//}
</style>