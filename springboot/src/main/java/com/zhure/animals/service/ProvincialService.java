package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Provincial;

import java.util.List;

public interface ProvincialService extends IService<Provincial> {
    List<Provincial> selectAll();
}
