package com.zhure.animals.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Vet;
import com.zhure.animals.service.VetService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/vet")
public class VetController {
    @Resource
    VetService vetService;

    @PostMapping("/register")
    public Result<?> register(@RequestBody Vet vet) {
        if(vetService.save(vet)) {
            return Result.success();
        } else {
            return Result.error("-1", "未知错误");
        }
    }

    @PutMapping("/{id}")
    public Result<?> realSave(@PathVariable Long id) {
        if(vetService.realSave(id)) {
            return Result.success();
        }
        return Result.error("-1", "未知错误");
    }

    @PutMapping
    public Result<?> update(@RequestBody Vet vet) {
        if(vetService.updateById(vet)) {
            return Result.success();
        }
        return Result.error("-1", "更新失败");
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        if(vetService.delete(id)){
            return Result.success();
        }
        return Result.error("-1", "删除失败");
    }

//    @GetMapping("/{id}")
//    public Result<?> findById(@PathVariable Integer id) {
//        return Result.success(vetService.getById(id));
//    }

    @GetMapping
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "5") Integer pageSize,
                              @RequestParam(defaultValue = "") String search,
                              @RequestParam(defaultValue = "1") Integer isPass) {
        LambdaQueryWrapper<Vet> wrapper = Wrappers.<Vet>lambdaQuery();
        if (isPass.equals(1))
            wrapper.select(Vet::getRealInfo, Vet::getUserId, Vet::getNickName, Vet::getVetDescribe, Vet::getHeadImg).eq(Vet::getIsPass, isPass);
        else
            wrapper.select(Vet::getUserId, Vet::getNickName, Vet::getVetDescribe, Vet::getHeadImg).eq(Vet::getIsPass, isPass);
        if (StrUtil.isNotBlank(search)) {
            wrapper.like(Vet::getNickName, search)
                    .or().like(Vet::getVetDescribe, search)
                    .or().eq(Vet::getUserId, search);
        }
        Page<Vet> vetPage = vetService.page(new Page<>(pageNum, pageSize), wrapper);
        return Result.success(vetPage);
    }

    @GetMapping("/show")
    public Result<?> findVets() {
        return Result.success(vetService.list(Wrappers.<Vet>lambdaQuery().eq(Vet::getIsPass, 2)));
    }
}
