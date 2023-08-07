package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Apply;
import com.zhure.animals.mapper.ApplyMapper;
import com.zhure.animals.service.ApplyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ApplyServiceImpl extends ServiceImpl<ApplyMapper, Apply> implements ApplyService {

    @Resource
    ApplyMapper applyMapper;

    @Override
    public Apply findOne(Integer userId, Integer adoptId) {
        return applyMapper.selectOne(Wrappers
                .<Apply>lambdaQuery()
                .eq(Apply::getUserId, userId)
                .eq(Apply::getAdoptId, adoptId));
    }

    @Override
    public List<Apply> selectByAdoptId(Integer adoptId) {
        return applyMapper.findByAdoptId(adoptId);
    }
}
