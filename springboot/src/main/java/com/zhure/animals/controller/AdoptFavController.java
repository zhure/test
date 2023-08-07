package com.zhure.animals.controller;

import com.zhure.animals.common.Result;
import com.zhure.animals.entity.AdoptFav;
import com.zhure.animals.service.AdoptFavService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/adopt_fav")
public class AdoptFavController {
    @Resource
    AdoptFavService adoptFavService;

    @PostMapping
    public Result<?> save(@RequestBody AdoptFav adoptFav) {
        adoptFavService.save(adoptFav);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        adoptFavService.removeById(id);
        return Result.success();
    }

    @GetMapping
    public Result<?> getOne(@RequestParam(defaultValue = "") Integer userId,
                            @RequestParam(defaultValue = "") Integer adoptId) {
        return Result.success(adoptFavService.findOne(userId, adoptId));
    }

    @GetMapping("/user/{id}")
    public Result<?> findByUserId(@PathVariable Integer id) {
        return Result.success(adoptFavService.selectByUserId(id));
    }
}
