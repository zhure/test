package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Comment;

import java.util.List;

public interface CommentService extends IService<Comment> {
    List<Comment> selectAll(Integer postId);
    boolean deleteById(Integer id);
}
