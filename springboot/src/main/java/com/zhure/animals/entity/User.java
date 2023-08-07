package com.zhure.animals.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@TableName("user")
@Data
public class User {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String username;
    private String nickName;
    private String password;
    private String sex;

    @JsonFormat(pattern="yyyy-MM-dd", timezone="GMT+8")
    private Date birthday;
    private String phoneNum;
    private String email;
    private String address;
    private Integer userType;
    private String headImg;

    @TableField(exist = false)
    private Vet vet;

    @TableField(exist = false)
    private List<Post> posts;
}
