<template>
  <div style="margin: 20px">
    <van-tabs v-model:active="active">
      <van-tab title="登录">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
                v-model="form.username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <!-- 通过 validator 进行函数校验 -->
            <van-field
                v-model="form.password"
                name="password"
                label="密码"
                placeholder="密码"
                type="password"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-model="fieldValue.text"
                is-link
                readonly
                label="用户类型"
                placeholder="选择"
                @click="showPicker = true"
            />
            <van-popup v-model:show="showPicker" round position="bottom">
              <van-picker
                  :columns="columns"
                  @cancel="showPicker = false"
                  @confirm="onConfirm"
              />
            </van-popup>

          </van-cell-group>

          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>

      </van-tab>
      <van-tab title="注册">
        <van-form @submit="register">
          <van-cell-group inset>
            <van-field
                v-model="form.username"
                name="username"
                label="用户名"
                placeholder="请输入用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="form.nickName"
                name="nickName"
                label="昵称"
                placeholder="请输入昵称，默认为用户名"
            />
            <van-field
                v-model="form.password"
                name="password"
                label="密码"
                type="password"
                placeholder="请输入密码"
                :rules="[{ validator: checkpw, message:'以字母开头，长度在6-18之间，只能包含字符、数字和下划线。' }]"
            />
            <van-field name="sex" label="性别">
              <template #input>
                <van-radio-group v-model="form.sex" direction="horizontal">
                  <van-radio name="男">男</van-radio>
                  <van-radio name="女">女</van-radio>
                  <van-radio name="未知">未知</van-radio>
                </van-radio-group>
              </template>
            </van-field>

            <van-field
                v-model="form.birthday"
                is-link
                readonly
                name="birthday"
                label="生日"
                placeholder="点击选择日期"
                @click="showCalendar = true"
            />
            <van-calendar v-model:show="showCalendar" :min-date="minDate" @confirm="pickADay" />


            <van-field
                v-model="form.phoneNum"
                name="phoneNum"
                label="电话号码"
                placeholder="请输入电话号码"
                :rules="[{ required: true, message: '请输入电话号码' },{ phoneReg, message:'电话号码格式错误' }]"
            />
            <van-field
                v-model="form.email"
                name="email"
                label="邮箱"
                placeholder="请输入邮箱地址"
                :rules="[{ emailReg, message:'请输入正确的邮箱' }]"
            />
          </van-cell-group>
          <van-cell-group inset>
            <van-field
                v-model="form.address"
                center
                clearable
                label="住址"
                placeholder="请输入地址或点击图标获得定位"
            >
              <template #button>
                <Locate @childFn="parentFn"></Locate>
              </template>
            </van-field>
          </van-cell-group>

          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>

      </van-tab>
    </van-tabs>
  </div>


</template>

<script>
import request from "@/utils/request";
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router/index.js'
import { Notify } from 'vant';

import Locate from "@/components/Locate";

export default {
  name: "Mlogin",
  components: {Locate},
  setup() {
    // 登录
    const active = ref(0);
    const store = useStore();
    let form = ref({
      username: '',
      password: '',
      userType: '',
      nickName: '',
      sex: '未知',
      birthday: '',
      phoneNum: '',
      email: '',
      address: '',
    });
    const columns = [
      { text: '普通用户', value: '1' },
      { text: '医疗人员', value: '2' }
    ];
    const fieldValue = ref({ text:'', value:''});
    const showPicker = ref(false);

    const onConfirm = ( value, index ) => {
      console.log(value)
      showPicker.value = false;
      fieldValue.value = value;
    };

    const onSubmit = (values) => {
      console.log('submit', values);
      form.value.userType = fieldValue.value.value
      request.post("/user/login", {
        username: form.value.username,
        password: form.value.password,
        userType: form.value.userType,
      }).then(res => {
        if(res.code === '0') {
          Notify({ type: 'success', message: '登录成功' });
          request.get("/user/" + form.value.username).then(res => {
            store.commit('login', res.data)
          })
          router.push("/")
        } else {
          Notify({ type: 'danger', message: res.msg });
        }
      })
    };

    // 注册
    //校验规则
    const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const checkpw = (val) => /^[a-zA-Z]\w{5,17}$/.test(val);

    // const validator = (val) => /1\d{10}/.test(val);
    // let checkPhone = (rule, value, callback) => {
    //   let phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
    //   if (!value && form.value.email == '') {
    //     callback(new Error('电话号码或邮箱必须填一个'))
    //   } else {
    //     setTimeout(() => {
    //
    //       if (!Number.isInteger(+value)) {
    //         callback(new Error('请输入数字值'))
    //       } else {
    //         if (phoneReg.test(value) || !value) {
    //           callback()
    //         } else {
    //           callback(new Error('电话号码格式错误'))
    //         }
    //       }
    //     }, 100)
    //   }
    // };
    // let checkEmail = (rule, value, callback) => {
    //   let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    //   if(!value && form.value.phoneNum == '') {
    //     callback(new Error('电话号码或邮箱必须填一个'))
    //   } else {
    //     setTimeout(() => {
    //       if (emailReg.test(value) || !value) {
    //         callback()
    //       } else {
    //         callback(new Error("邮箱格式错误"))
    //       }
    //     }, 100)
    //   }
    // };
    // let checkName = (rule, value, callback) => {
    //   if(value == '') {
    //     callback(new Error("用户名不能为空"))
    //   }
    //   setTimeout(() => {
    //     if(value.length > 31) {
    //       callback(new Error("长度应小于32"))
    //     } else {
    //       callback()
    //     }
    //   })
    // }
    // let checkpw = (rule, value, callback) => {
    //   if(value == '') {
    //     callback(new Error("请输入密码"))
    //   } else if(value.length < 6 || value.length > 32) {
    //     callback(new Error("长度应大于等于6并小于等于32"))
    //   }
    //   else {
    //     if(form.value.confirm !== '') {
    //       this.$refs.ruleFormRef.validateField('confirm')
    //     }
    //     callback()
    //   }
    // }
    // let checkpw2 = (rule, value, callback) => {
    //   if(value == '') {
    //     callback(new Error("请再次输入密码"))
    //   } else if (value !== form.value.password) {
    //     callback(new Error('两次输入密码不一致！'))
    //   } else {
    //     callback()
    //   }
    // }
    //日期
    // const result = ref('');

    //日历
    const showCalendar = ref(false);
    const pickADay = (date) => {
      form.value.birthday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      showCalendar.value = false;
    };
    //定位
    const showLocate = ref(false);
    const parentFn = (address) => {
      form.value.address = address
    }
    //提交
    const register = () => {
      request.post("user/register", form.value).then(res => {
        if(res.code === '0') {
          Notify({ type: 'success', message: '注册成功' });
          request.get("/user/" + form.value.username).then(res => {
            store.commit('login', res.data)
          })
          router.push("/")
        } else {
          Notify({ type: 'danger', message: '注册失败' });
        }
      })
    }


    return {
      active,
      form,
      fieldValue,
      columns,
      onConfirm,
      showPicker,
      onSubmit,
      //校验规则
      phoneReg,
      emailReg,
      checkpw,
      //日期
      minDate: new Date(1949, 10, 1),
      showCalendar,
      pickADay,
      //定位
      showLocate,
      parentFn,
      register,
    };
  },
}
</script>

<style scoped>

</style>