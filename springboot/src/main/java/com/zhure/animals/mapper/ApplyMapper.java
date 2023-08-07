package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface Apply extends BaseMapper<Apply> {
    @Select("SELECT * FROM `apply` WHERE adopt_id = #{adoptId}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick"))
    })
    List<Apply> findByAdoptId(@Param("adoptId") Integer adoptId);
}
