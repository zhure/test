package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.AdoptFav;
import com.zhure.animals.mapper.AdoptFavMapper;
import com.zhure.animals.service.AdoptFavService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AdoptFavServiceImpl extends ServiceImpl<AdoptFavMapper, AdoptFav> implements AdoptFavService {

    @Resource
    AdoptFavMapper adoptFavMapper;

    @Override
    public AdoptFav findOne(Integer userId, Integer adoptId) {
        return adoptFavMapper.selectOne(Wrappers
                .<AdoptFav>lambdaQuery()
                .eq(AdoptFav::getUserId, userId)
                .eq(AdoptFav::getAdoptId, adoptId));
    }

    @Override
    public List<AdoptFav> selectByUserId(Integer userId) {
        return adoptFavMapper.selectByUserId(userId);
    }


}
