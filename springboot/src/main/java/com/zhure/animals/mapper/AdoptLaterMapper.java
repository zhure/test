package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhure.animals.entity.AdoptLater;
import org.apache.ibatis.annotations.*;


public interface AdoptLaterMapper extends BaseMapper<AdoptLater> {
    @Select("SELECT * FROM `adopt_later` WHERE adopt_id = #{adoptId}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick"))
    })
    AdoptLater findByAdoptId(@Param("adoptId") Integer adoptId);
}
