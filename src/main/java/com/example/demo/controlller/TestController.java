package com.example.demo.controlller;

import com.example.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/18 10:31
 */
@RestController
public class TestController {

    @Autowired
    TestService testService ;

    @RequestMapping("test")
    public void test(){
        testService.test();
    }

}
