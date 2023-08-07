package com.zhure.animals.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Apply;
import com.zhure.animals.service.ApplyService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/apply")
public class ApplyController {
    @Resource
    ApplyService applyService;

    @PostMapping
    public Result<?> save(@RequestBody Apply apply) {
        applyService.save(apply);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        applyService.remove(Wrappers.<Apply>lambdaQuery()
                .eq(Apply::getAdoptId,id));
        return Result.success();
    }

    @GetMapping
    public Result<?> getOne(@RequestParam(defaultValue = "") Integer userId,
                            @RequestParam(defaultValue = "") Integer adoptId) {
        return Result.success(applyService.findOne(userId, adoptId));
    }

    @GetMapping("/{id}")
    public Result<?> findByAdoptId(@PathVariable Integer id) {
        return Result.success(applyService.selectByAdoptId(id));
    }
}
