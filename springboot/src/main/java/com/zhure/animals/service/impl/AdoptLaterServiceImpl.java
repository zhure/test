package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.AdoptLater;
import com.zhure.animals.mapper.AdoptLaterMapper;
import com.zhure.animals.service.AdoptLaterService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AdoptLaterServiceImpl extends ServiceImpl<AdoptLaterMapper, AdoptLater> implements AdoptLaterService {

    @Resource
    AdoptLaterMapper adoptLaterMapper;

    @Override
    public AdoptLater selectByAdoptId(Integer adoptId) {
        return adoptLaterMapper.findByAdoptId(adoptId);
    }
}
