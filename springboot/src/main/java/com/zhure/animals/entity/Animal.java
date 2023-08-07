package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("animal")
@Data
public class Animal {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String type;
    private Integer isPass;
}
