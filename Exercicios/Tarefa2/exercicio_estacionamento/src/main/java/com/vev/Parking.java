package com.vev;

import java.util.Date;

public class Parking {
    /** Must be between 8AM and 2AM the following day */
    private Date entryTime;
    /** Must be before 2AM or after 8AM the following day */
    private Date exitTime;
    /** Has 50% discount */
    private boolean isVIP;

    public Parking(Date entryTime, Date exitTime, boolean isVIP) {
        if (entryTime.after(exitTime)) {
            throw new IllegalArgumentException("Entry time must be before exit time");
        }

        int entryHour = entryTime.getHours();
        int exitHour = exitTime.getHours();
        if (entryHour >= 2 && entryHour < 8) {
            throw new IllegalArgumentException("Entry time must be between 8AM and 2AM the following day");
        }

        if (exitHour > 2 && exitHour < 8) {
            throw new IllegalArgumentException("Exit time must be before 2AM or after 8AM the following day");
        }

        this.entryTime = entryTime;
        this.exitTime = exitTime;
        this.isVIP = isVIP;
    }
    
    public Date getEntryTime() {
        return entryTime;
    }
    
    public Date getExitTime() {
        return exitTime;
    }
    
    public boolean isVIP() {
        return isVIP;
    }
    
    /**
     * Returns the duration of the parking in minutes.
     */
    public int getDuration() {
        long timeDifference = exitTime.getTime() - entryTime.getTime();
        long timeDifferenceMinutes = timeDifference / 60000;
        return (int) timeDifferenceMinutes;
    }

    /**
     * Returns whether the parking was overnight.
     * 
     * A parking is considered overnight if the exit time is after 8:00 AM the next day.
     */
    public boolean isOvernight() {
        int entryTimeHours = entryTime.getHours();
        int exitTimeHours = exitTime.getHours();
        int entryDay = entryTime.getDate();
        int exitDay = exitTime.getDate();
        int differenceDays = exitDay - entryDay;
        boolean enteredAfterMidnight = entryTimeHours >= 0 && entryTimeHours < 2;
        boolean exitBeforeClosing = exitTimeHours < 2;
        boolean exitAfterReOpening = exitTimeHours >= 8;

        if (differenceDays > 1) {
            return true;
        } else if (differenceDays == 1) {
            return enteredAfterMidnight || exitAfterReOpening;
        } else if (differenceDays == 0) {
            return enteredAfterMidnight && (!exitBeforeClosing || exitAfterReOpening);
        } else {
            return false;
        }
    }

    /**
     * Returns the price of the parking.
     */
    public double getPrice() {
        long duration = getDuration();
        double price = 0;
        
        if (duration <= 15) {
            return price;
        }
        
        boolean isOvernight = isOvernight();
        if (duration <= 120) {
            price = 5.9;
        } else if (!isOvernight) {
            int hoursParked = (int) (duration / 60);
            int extraHoursParked = hoursParked - 2;
            double hourlyIncrement = 2.5;
            price = 5.9 + extraHoursParked * hourlyIncrement;
        } else if (isOvernight) {
            int daysParked = (int) (duration / (24 * 60));
            if (daysParked == 0) {
                daysParked = 1;
            }
            price = 50 * daysParked;
        }

        if (isVIP) {
            price = price * 0.5;
        }

        return price;
    }
}