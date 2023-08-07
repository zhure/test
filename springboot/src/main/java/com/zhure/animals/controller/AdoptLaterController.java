package com.zhure.animals.controller;

import com.zhure.animals.common.Result;
import com.zhure.animals.entity.AdoptLater;
import com.zhure.animals.service.AdoptLaterService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/adopt_later")
public class AdoptLaterController {
    @Resource
    AdoptLaterService adoptLaterService;

    @PostMapping
    public Result<?> save(@RequestBody AdoptLater adoptLater) {
        adoptLaterService.save(adoptLater);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody AdoptLater adoptLater) {
        adoptLaterService.updateById(adoptLater);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findByAdoptId(@PathVariable Integer id) {
        return Result.success(adoptLaterService.selectByAdoptId(id));
    }
}
