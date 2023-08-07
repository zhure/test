package com.zhure.animals.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zhure.animals.entity.Message;

import java.util.List;

public interface MessageService extends IService<Message> {
    List<Message> selectByToId(Integer ToId);
}
