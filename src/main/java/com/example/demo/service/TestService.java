package com.example.demo.service;

import com.example.demo.entity.Price;
import com.example.demo.entity.Seat;
import com.example.demo.entity.Venue;

import java.util.List;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/18 10:31
 */
public interface TestService {

    public void test();

    public void addPrice(List<Price> prices);

    public List<Price> getAllPrice();

    public void addSeat(Venue venue);

    public List<Seat> getAllSeat(String venueId);

    public Venue getVenueById(String id) ;

    public Object generator();
}
