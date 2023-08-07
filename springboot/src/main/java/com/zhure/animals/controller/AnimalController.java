package com.zhure.animals.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Animal;
import com.zhure.animals.service.AnimalService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/animal")
public class AnimalController {
    @Resource
    AnimalService animalService;

    @PostMapping
    public Result<?> save(@RequestBody Animal animal) {
        if(animalService.getByType(animal)) {
            animalService.save(animal);
            return Result.success();
        } else {
            return Result.error("-1", "已存在，若未找到可能待审核");
        }
    }

    @PutMapping
    public Result<?> update(@RequestBody Animal animal) {
        animalService.updateById(animal);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        animalService.removeById(id);
        return Result.success();
    }

    @GetMapping
    public Result<?> findAll(@RequestParam(defaultValue = "1") Integer isPass) {
        List<Animal> animalList = animalService.selectAll(isPass);
        return Result.success(animalList);
    }
}
