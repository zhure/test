package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@TableName("comment")
@Data
public class Comment {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer userId;
    private Integer postId;
    private Integer parentId;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS", timezone = "GMT+8")
    private Date time;

    @TableField(exist = false)
    private User user;
//    @TableField(exist = false)
//    private Post post;
//    @TableField(exist = false)
//    private List<Comment> comments;
}
