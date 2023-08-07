package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Admin;

public interface AdminService extends IService<Admin> {
    Admin getByAnWithPw(String accountNum, String password);
}
