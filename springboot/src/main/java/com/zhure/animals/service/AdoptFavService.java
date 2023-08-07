package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.AdoptFav;

import java.util.List;

public interface AdoptFavService extends IService<AdoptFav> {
    AdoptFav findOne(Integer userId, Integer adoptId);
    List<AdoptFav> selectByUserId(Integer userId);
}
