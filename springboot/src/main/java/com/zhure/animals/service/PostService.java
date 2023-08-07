package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Post;

import java.util.List;

public interface PostService extends IService<Post> {
    List<Post> selectAll(Integer isPass);
    List<Post> selectByUserId(Integer userId);
    List<Post> selectByAnimalId(Integer animalId);
    Post selectById(Integer id);
}
