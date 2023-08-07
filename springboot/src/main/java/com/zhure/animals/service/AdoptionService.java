package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Adoption;

import java.util.List;

public interface AdoptionService extends IService<Adoption> {
    List<Adoption> selectAll(Integer isPass, Integer isAdopt, Integer animalId);
    List<Adoption> selectByUserId(Integer userId);
    Adoption selectById(Integer id);
}
