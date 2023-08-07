package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Animal;

import java.util.List;

public interface AnimalService extends IService<Animal> {
    List<Animal> selectAll(Integer isPass);
    boolean getByType(Animal animal);
}
