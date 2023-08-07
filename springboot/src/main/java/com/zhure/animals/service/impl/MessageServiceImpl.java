package com.zhure.animals.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zhure.animals.entity.Message;
import com.zhure.animals.mapper.MessageMapper;
import com.zhure.animals.service.MessageService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements MessageService {

    @Resource
    MessageMapper messageMapper;

    @Override
    public List<Message> selectByToId(Integer ToId) {
        return messageMapper.selectByToId(ToId);
    }
}
