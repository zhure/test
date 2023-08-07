package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@TableName("message")
@Data
public class Message {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer toId;
    private Integer fromId;
    private String content;
    private Integer isRead;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS", timezone = "GMT+8")
    private Date time;
//    @TableField(exist = false)
//    private User toUser;
    @TableField(exist = false)
    private User fromUser;
}
