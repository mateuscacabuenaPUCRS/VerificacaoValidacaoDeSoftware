package com.vev;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;

import org.junit.jupiter.api.Test;


public class ParkingTests {
    private Parking parking;
    private int currentYear = 2024;
    private int testMonth = 3;
    private int testDate = 28;
    
    @Test
    public void upTo15MinutesIsFree() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 8, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate, 8, 15);
        parking = new Parking(entryTime, exitTime, false);

        double price = parking.getPrice();

        assertEquals(0.0, price);
    }

    @Test
    public void upTo120MinutesIsFixedPrice() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 8, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate, 10, 0);
        parking = new Parking(entryTime, exitTime, false);

        double price = parking.getPrice();

        assertEquals(5.9, price);
    }

    @Test
    public void upTo120MinutesIsFixedPriceAndHalfForVIP() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 8, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate, 10, 0);
        parking = new Parking(entryTime, exitTime, true);

        double price = parking.getPrice();

        assertEquals(2.95, price);
    }

    @Test
    public void over120MinutesNotOvernightHasAdditionalFee() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 8, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate, 12, 0);
        parking = new Parking(entryTime, exitTime, false);

        double price = parking.getPrice();

        assertEquals(10.9, price);
    }

    @Test
    public void over120MinutesNotOvernightHasAdditionalFeeAndHalfForVIP() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 8, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate, 12, 0);
        parking = new Parking(entryTime, exitTime, true);

        double price = parking.getPrice();

        assertEquals(5.45, price);
    }

    @Test
    public void over120MinutesNotOvernightButAlmostHasAditionalFee() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 22, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate + 1, 1, 0);
        parking = new Parking(entryTime, exitTime, false);

        double price = parking.getPrice();

        assertEquals(8.4, price);
    }

    @Test
    public void over120MinutesNotOvernightButAlmostHasAditionalFeeAndHalfForVIP() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 22, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate + 1, 1, 0);
        parking = new Parking(entryTime, exitTime, true);

        double price = parking.getPrice();

        assertEquals(4.2, price);
    }

    @Test
    public void overnightHasDifferentPrice() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 8, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate + 1, 8, 0);
        parking = new Parking(entryTime, exitTime, false);

        double price = parking.getPrice();

        assertEquals(50.0, price);
    }

    @Test
    public void overnightHasDifferentPriceAndHalfForVIP() {
        Date entryTime = new Date(currentYear, testMonth, testDate, 8, 0);
        Date exitTime = new Date(currentYear, testMonth, testDate + 1, 8, 0);
        parking = new Parking(entryTime, exitTime, true);

        double price = parking.getPrice();

        assertEquals(25.0, price);
    }
}