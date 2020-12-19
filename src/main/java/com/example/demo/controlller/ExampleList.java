package com.example.demo.controlller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/9/14 11:51
 */
public class ExampleList {
    private static List<String> items = new ArrayList<>();

    static {
        items.add("A");
        items.add("BC");
        items.add("C");
        items.add("BD");
        items.add("E");
    }

    public static void main(String[] args) {
        //Java8之前操作List
        for(String item:items){
            System.out.println(item);
        }



        //Java8 lambda遍历list
        items.forEach(c-> System.out.println(c));

        items.forEach(item->{
            if("C".equals(item)){
                System.out.println(item);
            }
        });

        System.out.println("--------");

        //先过滤
        items.stream().filter(s->s.contains("B")).forEach(c1-> System.out.println(c1));

        HashMap<String, String> map = new HashMap<>();
        map.put("key1","val1");
        map.put("key2","val2");
        map.put("key3","val3");
        map.put("key4","val4");
        map.forEach((key,value)-> {
            System.out.println(key+"   "+value);
        });
    }
}