package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("vet")
@Data
public class Vet {
    @TableId
    private Integer userId;
    private String nickName;
    private String vetDescribe;
    private String headImg;
    private String realInfo;
    private Integer isPass;
}
