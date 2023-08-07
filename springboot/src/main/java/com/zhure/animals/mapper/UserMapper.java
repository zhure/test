package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.entity.Post;
import com.zhure.animals.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper extends BaseMapper<User> {
    @Select("SELECT * FROM `user` WHERE id = #{id}")
    @Results({
            @Result(property = "vet", column = "id",
                    one = @One(select = "com.zhure.animals.mapper.VetMapper.selectById"))
    })
    User findVetById(Integer id);

    @Select("SELECT id, nick_name, head_img  FROM `user` WHERE Id = #{id}")
    User findNick(Integer id);

//    List<User> selectByUsername(Page page, @Param("username") String username, @Param("isPass") Integer isPass);
}
