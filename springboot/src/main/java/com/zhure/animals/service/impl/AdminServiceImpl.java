package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Admin;
import com.zhure.animals.mapper.AdminMapper;
import com.zhure.animals.service.AdminService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AdminServiceImpl extends ServiceImpl<AdminMapper, Admin> implements AdminService {

    @Resource
    AdminMapper adminMapper;

    @Override
    public Admin getByAnWithPw(String accountNum, String password) {
        Admin admin = adminMapper.selectOne(Wrappers
                .<Admin>lambdaQuery()
                .eq(Admin::getAccountNum, accountNum)
                .eq(Admin::getPassword, password)
        );
        return admin;
    }
}
