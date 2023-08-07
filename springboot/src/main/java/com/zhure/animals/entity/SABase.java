package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("stray_animal_base")
@Data
public class SABase {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String name;
    private String contactWay;
    private Integer pId;
}
