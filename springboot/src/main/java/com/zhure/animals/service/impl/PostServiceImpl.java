package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Post;
import com.zhure.animals.mapper.PostMapper;
import com.zhure.animals.service.PostService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PostServiceImpl extends ServiceImpl<PostMapper, Post> implements PostService {

    @Resource
    PostMapper postMapper;

    @Override
    public List<Post> selectAll(Integer isPass) {
        return postMapper.selectAll(isPass);
    }

    @Override
    public List<Post> selectByUserId(Integer userId) {
        return postMapper.selectList(Wrappers.<Post>lambdaQuery().eq(Post::getUserId, userId));
    }

    @Override
    public List<Post> selectByAnimalId(Integer animalId) {
        return postMapper.findByAnimalId(animalId);
    }

    @Override
    public Post selectById(Integer id) {
        return postMapper.findById(id);
    }
}
