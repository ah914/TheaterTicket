package com.example.demo.entity;

import lombok.Data;

import java.util.List;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/22 8:33
 */
@Data
public class Venue {

    private String id ;

    private String state ;

    private String name ;

    private String startX ;

    private String startY ;

    private String endX ;

    private String endY ;

    private List<Seat> seats ;

}
