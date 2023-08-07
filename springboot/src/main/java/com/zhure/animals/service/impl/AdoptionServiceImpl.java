package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Adoption;
import com.zhure.animals.mapper.AdoptionMapper;
import com.zhure.animals.service.AdoptionService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AdoptionServiceImpl extends ServiceImpl<AdoptionMapper, Adoption> implements AdoptionService {

    @Resource
    AdoptionMapper adoptionMapper;

    @Override
    public List<Adoption> selectAll(Integer isPass, Integer isAdopt, Integer animalId) {
        if(animalId != null) {
//            System.out.println(animalId);
            return adoptionMapper.selectByAnimalId(isPass, isAdopt, animalId);
        }
        return adoptionMapper.selectAll(isPass, isAdopt);
    }

    @Override
    public List<Adoption> selectByUserId(Integer userId) {
        return adoptionMapper.selectList(Wrappers.<Adoption>lambdaQuery().eq(Adoption::getUserId, userId));
    }

    @Override
    public Adoption selectById(Integer id) {
        return adoptionMapper.findById(id);
    }
}
