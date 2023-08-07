package com.zhure.animals.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Post;
import com.zhure.animals.entity.SABase;
import com.zhure.animals.service.SABaseService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/base")
public class SABaseController {
    @Resource
    SABaseService saBaseService;

    @PostMapping
    public Result<?> save(@RequestBody SABase base) {
        saBaseService.save(base);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody SABase base) {
        saBaseService.updateById(base);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        saBaseService.removeById(id);
        return Result.success();
    }

    @GetMapping
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search,
                              @RequestParam(defaultValue = "") Integer pId) {
        LambdaQueryWrapper<SABase> wrapper = Wrappers.<SABase>lambdaQuery();
        if (StrUtil.isNotBlank(search)) {
            wrapper.like(SABase::getName, search);
        }
        if (pId != null) {
            wrapper.eq(SABase::getPId, pId);
        }
        Page<SABase> basePage = saBaseService.page(new Page<>(pageNum, pageSize), wrapper);
        return Result.success(basePage);
    }

    @GetMapping("/province")
    public Result<?> findByPid(@RequestParam(defaultValue = "") Integer id) {
        return Result.success(saBaseService.selectByPid(id));
    }
}
