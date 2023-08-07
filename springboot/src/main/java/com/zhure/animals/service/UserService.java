package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.User;
import com.zhure.animals.entity.Vet;

public interface UserService extends IService<User> {
    User getByAnWithPw(String username, String password);
    boolean successRegister(User user);
    boolean duplicate(String username);
    Page<User> selectPage(Integer pageNum, Integer pageSize, String search);
    Vet findVetById(Integer id);
}
