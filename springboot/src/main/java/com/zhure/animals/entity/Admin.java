package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("admin")
@Data
public class Admin {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String accountNum;
    private String password;
    private String phoneNum;
    private Integer power;
}
