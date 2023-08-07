package com.zhure.animals.controller;

import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Attention;
import com.zhure.animals.service.AttentionService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/attention")
public class AttentionController {
    @Resource
    AttentionService attentionService;

    @PostMapping
    public Result<?> save(@RequestBody Attention attention) {
        attentionService.save(attention);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        attentionService.removeById(id);
        return Result.success();
    }

    @GetMapping
    public Result<?> getOne(@RequestParam(defaultValue = "") Integer userId,
                            @RequestParam(defaultValue = "") Integer attentionId) {
        return Result.success(attentionService.findOne(userId, attentionId));
    }

    @GetMapping("/{id}")
    public Result<?> getByUserId(@PathVariable Integer id) {
        return Result.success(attentionService.selectAttention(id));
    }

    @GetMapping("/fan/{id}")
    public Result<?> getByAttentionId(@PathVariable Integer id) {
        return Result.success(attentionService.selectFans(id));
    }
}
