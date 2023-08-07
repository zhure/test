package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.entity.Post;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface PostMapper extends BaseMapper<Post> {
    @Select("SELECT * FROM `post` WHERE is_pass = #{isPass}")
    @Results({
            @Result(property = "user", column = "user_id",
            one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick")),
            @Result(property = "animal", column = "animal_id",
            one = @One(select = "com.zhure.animals.mapper.AnimalMapper.selectById"))
    })
    List<Post> selectAll(@Param("isPass") Integer isPass);

    @Select("SELECT * FROM `post` WHERE id = #{id}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick")),
            @Result(property = "animal", column = "animal_id",
                    one = @One(select = "com.zhure.animals.mapper.AnimalMapper.selectById"))
    })
    Post findById(@Param("id") Integer id);

    @Select("SELECT * FROM `post` WHERE animal_id = #{animalId}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick"))
    })
    List<Post> findByAnimalId(@Param("animalId") Integer animalId);
}
