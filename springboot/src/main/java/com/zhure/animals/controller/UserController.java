package com.zhure.animals.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.User;
import com.zhure.animals.service.UserService;
import com.zhure.animals.utils.POIUtils;
import com.zhure.animals.utils.SecretUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.HtmlUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    UserService userService;

    @PostMapping("/login")
    public Result<?> login(@RequestBody User user, HttpSession session) {
        // 对 html 标签进行转义，防止 XSS 攻击
        String username = user.getUsername();
        username = HtmlUtils.htmlEscape(username);

//        String password = SecretUtil.desEncrypt(user.getPassword());

        User res = userService.getByAnWithPw(username, user.getPassword());
        if(null == res) {
            return Result.error("-1", "用户名或密码错误");
        } else {
            System.out.println(user);
            System.out.println(res);
            if(user.getUserType().equals(2) && res.getUserType().equals(1)) {
               return Result.error("-1", "您还不是医疗人员");
            }
            session.setAttribute("user", user);
        }
        return Result.success();
    }

    @PostMapping("/register")
    public Result<?> register(@RequestBody User user) {
        if(userService.successRegister(user)) {
            return Result.success();
        } else {
            return Result.error("-1", "用户名已被注册");
        }
    }

    @PutMapping
    public Result<?> update(@RequestBody User user) {
        if(userService.duplicate(user.getUsername()) || userService.getById(user.getId()).getUsername().equals(user.getUsername())){
            if(userService.updateById(user)) {
                return Result.success();
            }
            return Result.error("-1", "未知错误");
        } else {
            return Result.error("-1", "用户名重复");
        }
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        if(userService.removeById(id))
            return Result.success();
        return Result.error("-1", "删除失败");
    }

    @GetMapping("/post/{id}")
    public Result<?> getByID(@PathVariable Long id) {
        LambdaQueryWrapper<User> wrapper = Wrappers.<User>lambdaQuery();
        wrapper.select(User::getId, User::getUsername, User::getNickName, User::getSex, User::getBirthday, User::getHeadImg)
                .eq(User::getId, id);
        User user = userService.getOne(wrapper);
        return Result.success(user);
    }

    @GetMapping
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search){
        LambdaQueryWrapper<User> wrapper = Wrappers.<User>lambdaQuery();
        wrapper.select(User::getId, User::getUsername, User::getNickName, User::getSex, User::getBirthday, User::getPhoneNum, User::getEmail, User::getAddress);
        if (StrUtil.isNotBlank(search)) {
            wrapper.like(User::getUsername, search)
                    .or().like(User::getNickName, search);
        }
        Page<User> userPage = userService.page(new Page<>(pageNum, pageSize), wrapper);
        return Result.success(userPage);
    }

    @GetMapping("/{username}")
    public Result<?> findOne(@PathVariable String username) {
        User user = userService.getOne(Wrappers.<User>lambdaQuery()
                .eq(User::getUsername, username)
                .select(User::getId, User::getUsername, User::getNickName, User::getSex, User::getBirthday, User::getPhoneNum, User::getEmail, User::getAddress, User::getHeadImg, User::getUserType));
        if(user.getUserType() == 2)
            user.setVet(userService.findVetById(user.getId()));
        System.out.println(user);
        return Result.success(user);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportData() {
        LambdaQueryWrapper<User> wrapper = Wrappers.<User>lambdaQuery();
        wrapper.select(User::getId, User::getUsername, User::getNickName, User::getSex, User::getBirthday, User::getPhoneNum, User::getEmail, User::getAddress);

        List<User> userList = userService.list(wrapper);
        return POIUtils.user2Excel(userList);
    }

    @CrossOrigin
    @PostMapping("/import")
    public Result<?> importData(MultipartFile file) throws IOException {
        List<User> list = POIUtils.excel2User(file);
        for (User user : list) {
            System.out.println(user.toString());
        }
        if(userService.saveBatch(list)) {
            return Result.success();
        }
        return Result.error("-1","上传失败！");
    }
}
