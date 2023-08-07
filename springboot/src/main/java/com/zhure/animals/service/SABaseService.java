package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.SABase;

import java.util.List;

public interface SABaseService extends IService<SABase> {
    List<SABase> selectByPid(Integer pid);
}
