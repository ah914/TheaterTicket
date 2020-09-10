package com.example.demo.mapper.extend;

import com.example.demo.entity.Seat;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/9/10 15:11
 */
@Mapper
public interface SeatExtendMapper {
    List<Seat> selectAllSeatByVenue(String venueId);

    void deleteVenueSeat(String venueId) ;

    void insertSeat(Seat seat) ;
}
