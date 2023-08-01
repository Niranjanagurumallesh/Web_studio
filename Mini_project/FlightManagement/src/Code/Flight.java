package Code;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
class Flight {
    private String flightNumber;
    private String destination;
    private LocalDateTime departureTime;
    public String getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public LocalDateTime getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(LocalDateTime departureTime) {
		this.departureTime = departureTime;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public int getBookedSeats() {
		return bookedSeats;
	}

	public void setBookedSeats(int bookedSeats) {
		this.bookedSeats = bookedSeats;
	}

	private int capacity;
    private int bookedSeats;

    public Flight(String flightNumber, String destination, LocalDateTime departureTime, int capacity) {
        this.flightNumber = flightNumber;
        this.destination = destination;
        this.departureTime = departureTime;
        this.capacity = capacity;
        this.bookedSeats = 0;
    }

    // Getters and setters

    public boolean checkAvailability() {
        return bookedSeats < capacity;
    }

    public void bookSeat() {
        if (checkAvailability()) {
            bookedSeats++;
            System.out.println("Seat booked successfully!");
        } else {
            System.out.println("Sorry, no seats available.");
        }
    }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return "Flight " + flightNumber + " to " + destination + " at " + departureTime.format(formatter)
                + " (" + bookedSeats + "/" + capacity + " seats booked)";
    }
}