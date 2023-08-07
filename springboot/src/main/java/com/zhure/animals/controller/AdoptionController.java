package com.zhure.animals.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Adoption;
import com.zhure.animals.service.AdoptionService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/adoption")
public class AdoptionController {
    @Resource
    AdoptionService adoptionService;

    @PostMapping
    public Result<?> save(@RequestBody Adoption adoption) {
        if(adoptionService.save(adoption)) {
            return Result.success();
        } else {
            return Result.error("-1", "");
        }
    }
    @PutMapping
    public Result<?> update(@RequestBody Adoption adoption) {
        adoptionService.updateById(adoption);
        return Result.success();
    }
    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        if(adoptionService.removeById(id)) {
            return Result.success();
        }
        return Result.error("-1", "删除失败");
    }
    @GetMapping
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search,
                              @RequestParam(defaultValue = "1") Integer isPass){
        LambdaQueryWrapper<Adoption> wrapper = Wrappers.<Adoption>lambdaQuery();
        wrapper.eq(Adoption::getIsPass, isPass);
        if (StrUtil.isNotBlank(search)) {
            wrapper.eq(Adoption::getAnimalId, search);
        }
        Page<Adoption> postPage = adoptionService.page(new Page<>(pageNum, pageSize), wrapper);
        return Result.success(postPage);
    }

    @GetMapping("/show")
    public Result<?> findAll(@RequestParam(defaultValue = "1") Integer isPass,
                             @RequestParam(defaultValue = "1") Integer isAdopt,
                             @RequestParam(defaultValue = "") Integer animalId) {
        return Result.success(adoptionService.selectAll(isPass, isAdopt, animalId));
    }

    @GetMapping("/user/{id}")
    public Result<?> findByUserId(@PathVariable Integer id) {
        return Result.success(adoptionService.selectByUserId(id));
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Integer id) {
        return Result.success(adoptionService.selectById(id));
    }
}
