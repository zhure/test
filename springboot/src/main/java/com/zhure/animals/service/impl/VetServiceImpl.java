package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.extension.toolkit.SqlHelper;
import com.zhure.animals.entity.User;
import com.zhure.animals.entity.Vet;
import com.zhure.animals.mapper.UserMapper;
import com.zhure.animals.mapper.VetMapper;
import com.zhure.animals.service.VetService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class VetServiceImpl extends ServiceImpl<VetMapper, Vet> implements VetService {

    @Resource
    UserMapper userMapper;

    @Resource
    VetMapper vetMapper;


    @Override
    public boolean realSave(Long id) {
        User user = userMapper.selectById(id);
        user.setUserType(2);
        Vet vet = vetMapper.selectById(id);
        vet.setIsPass(2);
        if(SqlHelper.retBool(userMapper.updateById(user)) && SqlHelper.retBool(vetMapper.updateById(vet))){
            return true;
        }
        return false;
    }


    @Override
    public boolean delete(Long id) {
        User user = userMapper.selectById(id);
        user.setUserType(1);
        if(SqlHelper.retBool(userMapper.updateById(user)) && SqlHelper.retBool(vetMapper.deleteById(id))){
            return true;
        }
        return false;
    }
}
