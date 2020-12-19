package com.example.demo.service.impl;

import com.example.demo.mapper.SeatMapper;
import com.example.demo.entity.Price;
import com.example.demo.entity.Seat;
import com.example.demo.entity.Venue;
import com.example.demo.mapper.PriceMapper;
import com.example.demo.mapper.SeatBAKMapper;
import com.example.demo.mapper.VenueMapper;
import com.example.demo.mapper.extend.SeatExtendMapper;
import com.example.demo.model.SeatExample;
import com.example.demo.service.TestService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/18 10:47
 */
@Service
public class TestServiceImpl implements TestService {

    @Resource
    PriceMapper priceMapper;

    @Resource
    SeatExtendMapper seatExtendMapper ;

    @Resource
    VenueMapper venueMapper;

    @Resource
    SeatMapper seat1Mapper;


    @Override
    public void test() {
        System.out.println(priceMapper.getAllPrice());
        ;
    }

    @Override
    public void addPrice(List<Price> prices) {
        priceMapper.delAllPrice();
        for (Price price : prices) {
            price.setId(UUID.randomUUID().toString());
            priceMapper.addPrice(price);
        }
    }

    @Override
    public List<Price> getAllPrice() {
        return priceMapper.getAllPrice();
    }

    /*@Override
    public void addSeat(Venue venue) {

    }

    @Override
    public List<Seat> getAllSeat(String venueId) {
        return null;
    }*/

     @Override
     public void addSeat(Venue venue) {
         venueMapper.deleteVenueById("1");
         venue.setId("1");
         venueMapper.insertVenue(venue);
         seatExtendMapper.deleteVenueSeat("1");
         for (Seat seat : venue.getSeats()) {
             seat.setId(UUID.randomUUID().toString());
             seat.setVenueId("1");
             seatExtendMapper.insertSeat(seat);
         }
     }

     @Override
     public List<Seat> getAllSeat(String venueId) {
         return seatExtendMapper.selectAllSeatByVenue(venueId);
     }
    @Override
    public Venue getVenueById(String id) {
        return venueMapper.selectVenueById(id);
    }

    @Override
    public Object generator() {
        SeatExample seatExample = new SeatExample();
        seatExample.createCriteria().andIdEqualTo("020abbe0-73e5-48f6-931d-9a6de0ff8ddc")
                .andVenueIdIsNotNull()
                .andNumberIsNull();
        return seat1Mapper.selectByExample(seatExample);
    }

    public static void main(String[] args) {
        int num = Integer.valueOf("11", 36);
        System.out.println(num);
//        System.out.println(Character.MAX_RADIX);
    }
}
