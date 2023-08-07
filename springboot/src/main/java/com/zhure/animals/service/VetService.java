package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Vet;

public interface VetService extends IService<Vet> {
    boolean realSave(Long id);
    boolean delete(Long id);
}
