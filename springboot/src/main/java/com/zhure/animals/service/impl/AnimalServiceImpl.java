package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Animal;
import com.zhure.animals.mapper.AnimalMapper;
import com.zhure.animals.service.AnimalService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AnimalServiceImpl extends ServiceImpl<AnimalMapper, Animal> implements AnimalService {

    @Resource
    AnimalMapper animalMapper;

    @Override
    public List<Animal> selectAll(Integer isPass) {
        return animalMapper.selectALL(isPass);
    }

    @Override
    public boolean getByType(Animal animal) {
        if(null == animalMapper.selectOne(Wrappers.<Animal>lambdaQuery().eq(Animal::getType, animal.getType()))){
            return true;
        } else {
            return false;
        }
    }
}
