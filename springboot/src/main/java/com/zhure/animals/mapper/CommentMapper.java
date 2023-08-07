package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhure.animals.entity.Comment;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface CommentMapper extends BaseMapper<Comment> {
    @Select("SELECT * FROM `comment` WHERE post_id = #{postId}")
    @Results({
            @Result(property = "user", column = "user_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick"))
    })
    List<Comment> selectAll(@Param("postId") Integer postId);

    @Select("SELECT * FROM `comment` WHERE parent_id = #{parentId}")
    List<Comment> findByParentId(@Param("parentId") Integer parentId);
}
