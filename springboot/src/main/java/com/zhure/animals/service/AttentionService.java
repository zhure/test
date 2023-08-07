package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Attention;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AttentionService extends IService<Attention> {
    List<Attention> selectAttention(Integer userId);
    List<Attention> selectFans(Integer attentionId);
    Attention findOne(Integer userId, Integer attentionId);
}
