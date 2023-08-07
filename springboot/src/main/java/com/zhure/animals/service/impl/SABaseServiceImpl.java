package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.SABase;
import com.zhure.animals.mapper.SABaseMapper;
import com.zhure.animals.service.SABaseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SABaseServiceImpl extends ServiceImpl<SABaseMapper, SABase> implements SABaseService {

    @Resource
    SABaseMapper saBaseMapper;

    @Override
    public List<SABase> selectByPid(Integer pid) {
        if(pid == null) {
            return saBaseMapper.selectList(null);
        } else {
            return saBaseMapper.selectList(Wrappers.<SABase>lambdaQuery()
                    .eq(SABase::getPId, pid));
        }
    }
}
