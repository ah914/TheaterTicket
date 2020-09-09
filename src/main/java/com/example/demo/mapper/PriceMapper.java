package com.example.demo.mapper;

import com.example.demo.entity.Price;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/22 10:17
 */
@Mapper
public interface PriceMapper {
    List<Price> getAllPrice() ;

    void delAllPrice();

    void addPrice(Price price);
}
