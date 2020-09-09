package com.example.demo.mapper;

import com.example.demo.entity.Seat;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/24 15:00
 */
@Mapper
public interface SeatMapper {

    List<Seat> selectAllSeatByVenue(String venueId);

    void deleteVenueSeat(String venueId) ;

    void insertSeat(Seat seat) ;
}
