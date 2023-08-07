package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@TableName("adopt_later")
@Data
public class AdoptLater {
    @TableId(type = IdType.AUTO)
    private Integer adoptId;
    private Integer userId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS", timezone = "GMT+8")
    private Date time;
    private String content;

    @TableField(exist = false)
    private User user;
}
