package com.example.demo.controlller;

import com.example.demo.entity.Seat;
import com.example.demo.entity.Venue;
import com.example.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/25 9:28
 */
@RestController
@RequestMapping("/seat")
public class SeatController {

    @Autowired
    TestService testService ;

    @RequestMapping("/add")
    public void addSeat(@RequestBody Venue venue){
        System.out.println(venue);
        testService.addSeat(venue);
    }
    @RequestMapping("/all")
    public Venue allSeat(@RequestBody  String venueId){
        HashMap<String, Object> resultMap = new HashMap<>();
        System.out.println(venueId);
        List<Seat> allSeat = testService.getAllSeat("1");
        Venue venue = testService.getVenueById(venueId);
        venue.setSeats(allSeat);
        return venue ;
    }

    @RequestMapping("generator")
    public Object generator(){
        return testService.generator();
    }
}
