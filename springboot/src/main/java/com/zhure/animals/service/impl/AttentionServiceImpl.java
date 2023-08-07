package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Attention;
import com.zhure.animals.mapper.AttentionMapper;
import com.zhure.animals.service.AttentionService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AttentionServiceImpl extends ServiceImpl<AttentionMapper, Attention> implements AttentionService {

    @Resource
    AttentionMapper attentionMapper;

    @Override
    public List<Attention> selectAttention(Integer userId) {
        return attentionMapper.selectAttention(userId);
    }

    @Override
    public List<Attention> selectFans(Integer attentionId) {
        return attentionMapper.selectFans(attentionId);
    }

    @Override
    public Attention findOne(Integer userId, Integer attentionId) {
        return attentionMapper.selectOne(Wrappers
                .<Attention>lambdaQuery()
                .eq(Attention::getUserId, userId)
                .eq(Attention::getAttentionId, attentionId));
    }
}
