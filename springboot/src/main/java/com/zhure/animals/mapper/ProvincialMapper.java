package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhure.animals.entity.Provincial;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ProvincialMapper extends BaseMapper<Provincial> {

    @Select("SELECT * FROM `provincial`")
    List<Provincial> selectAll();
}
