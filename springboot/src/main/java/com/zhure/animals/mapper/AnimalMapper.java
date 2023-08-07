package com.zhure.animals.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zhure.animals.entity.Animal;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalMapper extends BaseMapper<Animal> {
    @Select("SELECT * FROM animal WHERE is_pass = #{isPass}")
    List<Animal> selectALL(Integer isPass);
}
