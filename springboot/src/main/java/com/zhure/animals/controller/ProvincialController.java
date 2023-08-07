package com.zhure.animals.controller;

import com.zhure.animals.common.Result;
import com.zhure.animals.service.ProvincialService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/provincial")
public class ProvincialController {
    @Resource
    ProvincialService provincialService;

    @GetMapping
    public Result<?> findAll() {
        return Result.success(provincialService.selectAll());
    }
}
