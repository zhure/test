package com.zhure.animals.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Post;
import com.zhure.animals.service.PostService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/post")
public class PostController {
    @Resource
    PostService postService;

    @PostMapping
    public Result<?> save(@RequestBody Post post) {
        if(postService.save(post)) {
            return Result.success();
        } else {
            return Result.error("-1", "");
        }
    }

    @PutMapping
    public Result<?> update(@RequestBody Post post) {
        postService.updateById(post);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        if(postService.removeById(id))
            return Result.success();
        return Result.error("-1", "删除失败");
    }

    @GetMapping
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search,
                              @RequestParam(defaultValue = "1") Integer isPass){
        LambdaQueryWrapper<Post> wrapper = Wrappers.<Post>lambdaQuery();
        wrapper.eq(Post::getIsPass, isPass);
        if (StrUtil.isNotBlank(search)) {
            wrapper.like(Post::getTitle, search);
        }
        Page<Post> postPage = postService.page(new Page<>(pageNum, pageSize), wrapper);
        return Result.success(postPage);
    }

    @GetMapping("/show")
    public Result<?> findAll(@RequestParam(defaultValue = "1") Integer isPass) {
        return Result.success(postService.selectAll(isPass));
    }

    @GetMapping("/user/{id}")
    public Result<?> findByUserId(@PathVariable Integer id) {
        return Result.success(postService.selectByUserId(id));
    }

    @GetMapping("/animal/{id}")
    public Result<?> findByAnimalId(@PathVariable Integer id) {
        return Result.success(postService.selectByAnimalId(id));
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Integer id) {
        return Result.success(postService.selectById(id));
    }
}
