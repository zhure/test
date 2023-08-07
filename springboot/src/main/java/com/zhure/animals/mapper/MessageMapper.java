package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhure.animals.entity.Message;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface MessageMapper extends BaseMapper<Message> {
    @Select("SELECT * FROM `message` WHERE to_id = #{toId}")
    @Results({
            @Result(property = "fromUser", column = "from_id",
                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick"))
    })
    List<Message> selectByToId(@Param("toId") Integer toId);
//    @Select("SELECT * FROM `message` WHERE from_id = #{fromId}")
//    @Results({
//            @Result(property = "user", column = "to_id",
//                    one = @One(select = "com.zhure.animals.mapper.UserMapper.findNick"))
//    })
//    List<Message> selectByFromId(@Param("fromId") Integer fromId);
}
