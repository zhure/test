package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@TableName("adoption")
@Data
public class Adoption {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private Integer userId;
    private Integer animalId;
    private String img;
    private String name;
    private String detail;
    private String address;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS", timezone = "GMT+8")
    private Date time;
    private Integer isAdopt;
    private Integer isPass;

    @TableField(exist = false)
    private User user;
    @TableField(exist = false)
    private Animal animal;
}
