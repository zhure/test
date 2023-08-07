package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Apply;

import java.util.List;

public interface ApplyService extends IService<Apply> {
    Apply findOne(Integer userId, Integer adoptId);
    List<Apply> selectByAdoptId(Integer adoptId);
}
