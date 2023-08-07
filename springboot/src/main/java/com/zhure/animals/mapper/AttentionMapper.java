package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhure.animals.entity.Attention;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface AttentionMapper extends BaseMapper<Attention> {
    @Select("SELECT * FROM `attention` WHERE user_id = #{userId}")
    @Results({
            @Result(property = "user", column = "attention_id",
            one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick"))
    })
    List<Attention> selectAttention(@Param("userId") Integer userId);
    @Select("SELECT * FROM `attention` WHERE attention_id = #{attentionId}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick"))
    })
    List<Attention> selectFans(@Param("attentionId") Integer attentionId);

}
