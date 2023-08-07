package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhure.animals.entity.AdoptFav;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface AdoptFavMapper extends BaseMapper<AdoptFav> {
    @Select("SELECT * FROM `adopt_favorite` WHERE user_id = #{userId}")
    @Results({
            @Result(property = "adoption", column = "adopt_id",
            one = @One(select = "com.zhure.animals.mapper.AdoptionMapper.selectById"))
    })
    List<AdoptFav> selectByUserId(@Param("userId") Integer userId);
}
