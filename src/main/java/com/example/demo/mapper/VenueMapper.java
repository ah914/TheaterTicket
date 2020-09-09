package com.example.demo.mapper;

import com.example.demo.entity.Venue;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author anhao
 * @version 1.0
 * @date 2020/7/28 9:50
 */
@Mapper
public interface VenueMapper {

    public Venue selectVenueById(String id ) ;

    public void deleteVenueById(String id ) ;

    public void insertVenue(Venue venue) ;

}
