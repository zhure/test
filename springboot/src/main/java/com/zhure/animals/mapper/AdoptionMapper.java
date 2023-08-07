package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhure.animals.entity.Adoption;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface AdoptionMapper extends BaseMapper<Adoption> {
    @Select("SELECT * FROM `adoption` WHERE is_pass = #{isPass} and is_adopt = #{isAdopt}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick")),
            @Result(property = "animal", column = "animal_id",
                    one = @One(select = "com.zhure.animals.mapper.AnimalMapper.selectById"))
    })
    List<Adoption> selectAll(@Param("isPass") Integer isPass, @Param("isAdopt") Integer isAdopt);

    @Select("SELECT * FROM `adoption` WHERE is_pass = #{isPass} and is_adopt = #{isAdopt} and animal_id = #{animalId}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick")),
            @Result(property = "animal", column = "animal_id",
                    one = @One(select = "com.zhure.animals.mapper.AnimalMapper.selectById"))
    })
    List<Adoption> selectByAnimalId(@Param("isPass") Integer isPass, @Param("isAdopt") Integer isAdopt, @Param("animalId") Integer animalId);

    @Select("SELECT * FROM `adoption` WHERE id = #{id}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick")),
            @Result(property = "animal", column = "animal_id",
                    one = @One(select = "com.zhure.animals.mapper.AnimalMapper.selectById"))
    })
    Adoption findById(@Param("id") Integer id);
}
