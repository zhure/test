package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Provincial;
import com.zhure.animals.mapper.ProvincialMapper;
import com.zhure.animals.service.ProvincialService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ProvincialServiceImpl extends ServiceImpl<ProvincialMapper, Provincial> implements ProvincialService {

    @Resource
    ProvincialMapper provincialMapper;

    @Override
    public List<Provincial> selectAll() {
        return provincialMapper.selectAll();
    }
}
