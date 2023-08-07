package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.AdoptLater;

public interface AdoptLaterService extends IService<AdoptLater> {
    AdoptLater selectByAdoptId(Integer adoptId);
}
