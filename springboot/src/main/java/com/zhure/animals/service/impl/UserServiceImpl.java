package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.User;
import com.zhure.animals.entity.Vet;
import com.zhure.animals.mapper.UserMapper;
import com.zhure.animals.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import javax.annotation.Resource;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Resource
    UserMapper userMapper;

    @Override
    public User getByAnWithPw(String username, String password) {
        return userMapper.selectOne(Wrappers
                .<User>lambdaQuery()
                .eq(User::getUsername, username)
                .eq(User::getPassword, password)
        );
    }

    @Override
    public boolean successRegister(User user) {
        String username = user.getUsername();
        String nickName = user.getNickName();
        if(nickName.equals("")){
            nickName = username;
        }
//        String password = user.getPassword();
//        String sex = user.getSex();
        String phoneNum = user.getPhoneNum();
        String email = user.getEmail();
        String address = user.getAddress();

        username = HtmlUtils.htmlEscape(username);
        user.setUsername(username);
        nickName = HtmlUtils.htmlEscape(nickName);
        user.setNickName(nickName);
        phoneNum = HtmlUtils.htmlEscape(phoneNum);
        user.setPhoneNum(phoneNum);
        email = HtmlUtils.htmlEscape(email);
        user.setEmail(email);
        address = HtmlUtils.htmlEscape(address);
        user.setAddress(address);

        user.setUserType(1);

        if (duplicate(username)) {
            userMapper.insert(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean duplicate(String username) {
        return null == userMapper.selectOne(Wrappers.<User>lambdaQuery().eq(User::getUsername, username));
    }

    @Override
    public Page<User> selectPage(Integer pageNum, Integer pageSize, String search) {
        return null;
    }

    @Override
    public Vet findVetById(Integer id) {
        return userMapper.findVetById(id).getVet();
    }
}
