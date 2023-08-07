package com.zhure.animals.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Admin;
import com.zhure.animals.service.AdminService;
import com.zhure.animals.utils.SecretUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Resource
    AdminService adminService;

    @PostMapping("/login")
    public Result<?> login(@RequestBody Admin admin, HttpSession session) {
        // 对 html 标签进行转义，防止 XSS 攻击
        String accountNum = admin.getAccountNum();
        accountNum = HtmlUtils.htmlEscape(accountNum);

        String password = SecretUtil.desEncrypt(admin.getPassword());

        Admin res = adminService.getByAnWithPw(accountNum, password);
        if(null == res) {
            return Result.error("-1", "用户名或密码错误");
        } else {
            session.setAttribute("admin", admin);
            return Result.success();
        }
    }

    @PostMapping
    public Result<?> save(@RequestBody Admin admin) {
        adminService.save(admin);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody Admin admin) {
        adminService.updateById(admin);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        adminService.removeById(id);
        return Result.success();
    }

    @GetMapping("/{accountNum}")
    public Result<?> findOne(@PathVariable String accountNum) {
        Admin admin = adminService.getOne(Wrappers.<Admin>lambdaQuery()
                .eq(Admin::getAccountNum, accountNum)
                .select(Admin::getId, Admin::getAccountNum, Admin::getPhoneNum, Admin::getPower));
        return Result.success(admin);
    }

    @GetMapping
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search) {
        LambdaQueryWrapper<Admin> wrapper = Wrappers.<Admin>lambdaQuery();
        wrapper.select(Admin::getId, Admin::getAccountNum, Admin::getPhoneNum, Admin::getPower);
        if (StrUtil.isNotBlank(search)) {
            wrapper.like(Admin::getAccountNum, search);
            wrapper.eq(Admin::getPower, search);
        }
        Page<Admin> adminPage = adminService.page(new Page<>(pageNum, pageSize), wrapper);
        return Result.success(adminPage);
    }
}
