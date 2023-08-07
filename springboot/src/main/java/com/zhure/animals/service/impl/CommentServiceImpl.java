package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Comment;
import com.zhure.animals.mapper.CommentMapper;
import com.zhure.animals.service.CommentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

    @Resource
    CommentMapper commentMapper;

    @Override
    public List<Comment> selectAll(Integer postId) {
//        System.out.println(postId);
        return commentMapper.selectAll(postId);
    }

    @Override
    public boolean deleteById(Integer id) {
        Comment comment = commentMapper.selectById(id);
        List<Comment> comments = commentMapper.selectList(Wrappers.<Comment>lambdaQuery()
                .eq(Comment::getParentId, id));
        if(comments.isEmpty()) {
            commentMapper.deleteById(id);
        } else {
            comment.setContent("评论已删除");
            commentMapper.updateById(comment);
        }
        return true;
    }
}
