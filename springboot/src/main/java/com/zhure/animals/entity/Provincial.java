package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("provincial")
@Data
public class Provincial {
    @TableId(type = IdType.AUTO)
    private Integer pid;
    private String province;
}
