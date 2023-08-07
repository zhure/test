package com.zhure.animals.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Comment;
import com.zhure.animals.entity.User;
import com.zhure.animals.service.CommentService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Resource
    CommentService commentService;

    @PostMapping
    public Result<?> save(@RequestBody Comment comment) {
        commentService.save(comment);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        if(commentService.deleteById(id))
            return Result.success();
        return Result.error("-1", "删除失败");
    }

    @GetMapping("/show")
    public Result<?> findAll(@RequestParam(defaultValue = "") Integer postId) {
        return Result.success(commentService.selectAll(postId));
    }

    @GetMapping
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search){
        LambdaQueryWrapper<Comment> wrapper = Wrappers.<Comment>lambdaQuery();
        if (StrUtil.isNotBlank(search)) {
            wrapper.eq(Comment::getId, search);
        }
        Page<Comment> commentPage = commentService.page(new Page<>(pageNum, pageSize), wrapper);
        return Result.success(commentPage);
    }
}
