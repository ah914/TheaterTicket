package com.example.demo.controlller;

import com.example.demo.entity.Price;
import com.example.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/22 10:51
 */
@RestController
@RequestMapping("/price")
public class PriceController {

    @Autowired
    TestService testService ;

    @RequestMapping("/add")
    public void addPrice(@RequestBody List<Price> prices){
        System.out.println(prices);
        testService.addPrice(prices);
    }

    @RequestMapping("/all")
    public List<Price> addPrice(){
        return testService.getAllPrice();
    }

}
