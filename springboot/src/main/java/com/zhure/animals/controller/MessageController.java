package com.zhure.animals.controller;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.zhure.animals.common.Result;
import com.zhure.animals.entity.Message;
import com.zhure.animals.service.MessageService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/message")
public class MessageController {
    @Resource
    MessageService messageService;

    @PostMapping
    public Result<?> save(@RequestBody Message message) {
        messageService.save(message);
        return Result.success();
    }

    @PutMapping("/{id}")
    public Result<?> update(@PathVariable Integer id) {
        UpdateWrapper<Message> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("to_id", id).set("is_read", 1);
//        Message message = new Message();
//        message.setIsRead(1);
        messageService.update(null, updateWrapper);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Integer id) {
        messageService.removeById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findByToId(@PathVariable Integer id) {
        return Result.success(messageService.selectByToId(id));
    }

    @GetMapping("/new/{id}")
    public Result<?> getNews(@PathVariable Integer id) {
        List<Message> messageList = messageService.list(Wrappers.<Message>lambdaQuery()
                .eq(Message::getToId, id)
                .eq(Message::getIsRead, 0));
        if(messageList.isEmpty())
            return Result.success(false);
        return Result.success(true);
    }
}
