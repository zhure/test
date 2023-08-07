package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("adopt_favorite")
@Data
public class AdoptFav {
    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer userId;
    private Integer adoptId;

    @TableField(exist = false)
    private Adoption adoption;
}
