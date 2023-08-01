package Code;


import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class FlightManagementSystem extends AbstractClass{//inheritance
    private List<Flight> Flight;
    private Scanner scanner;//encapsulation
    private Connection connection;

    public FlightManagementSystem() {
        Flight = new ArrayList<>();
        scanner = new Scanner(System.in);
        establishConnection(); // Connect to the MySQL database
    }

    // Method to establish JDBC connection with the MySQL database
 // Method to establish JDBC connection with the MySQL database
    private void establishConnection() {
        String url = "jdbc:mysql://localhost:3306/flight_db";
        String user = "root";
        String password = "tiger";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // Updated driver class name
            connection = DriverManager.getConnection(url, user, password);
            System.out.println("Connected to the database successfully!");
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            System.out.println("Failed to connect to the database.");
        }
    }


    // Method to add a new flight
//    public void addFlight() {
//        try {
//            System.out.println("Enter flight number: ");
//            String flightNumber = scanner.next();
//
//            System.out.println("Enter destination: ");
//            String destination = scanner.next();
//
////            System.out.println("Enter departure date and time (yyyy-MM-dd HH:mm): ");
////            String departureTimeStr = scanner.next();
////            LocalDateTime departureTime = LocalDateTime.parse(departureTimeStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
//            try {
//                // ...
//                System.out.println("Enter departure date and time (yyyy-MM-dd HH:mm): ");
//                String departureDateTimeStr = scanner.nextLine();
//
//                // Check if the input is empty or null
//                if (departureDateTimeStr.isEmpty()) {
//                    System.out.println("Departure date and time cannot be empty.");
//                    return;
//                }
//
//                LocalDateTime departureTime = LocalDateTime.parse(departureDateTimeStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
//                // ...
//            } catch (DateTimeParseException e) {
//                e.printStackTrace();
//                System.out.println("Invalid date and time format. Please use the format 'yyyy-MM-dd HH:mm'.");
//            }
//            System.out.println("Enter capacity: ");
//            int capacity = scanner.nextInt();
//
//            // Insert the new flight into the database
//            String insertQuery = "INSERT INTO flights (flight_number, destination, departure_time, capacity) " +
//                                 "VALUES (?, ?, ?, ?)";
//            PreparedStatement preparedStatement = connection.prepareStatement(insertQuery);
//            preparedStatement.setString(1, flightNumber);
//            preparedStatement.setString(2, destination);
//            preparedStatement.setTimestamp(3, Timestamp.valueOf(departureDateTimeStr));
//            preparedStatement.setInt(4, capacity);
//            preparedStatement.executeUpdate();
//            preparedStatement.close();
//
//            System.out.println("Flight added successfully!");
//        } catch (SQLException e) {
//            e.printStackTrace();
//            System.out.println("Failed to add the flight to the database.");
//        }
//    }
    
    
    public void addFlight() {
        try {
            System.out.println("Enter flight number: ");
            String flightNumber = scanner.next();

            System.out.println("Enter destination: ");
            String destination = scanner.next();

            System.out.println("Enter departure date and time (yyyy-MM-dd HH:mm): ");
            scanner.nextLine(); // Consume the newline character from the previous input
            String departureDateTimeStr = scanner.nextLine();

            // Check if the input is empty or null
            if (departureDateTimeStr.isEmpty()) {
                System.out.println("Departure date and time cannot be empty.");
                return;
            }

            LocalDateTime departureTime = LocalDateTime.parse(departureDateTimeStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

            System.out.println("Enter capacity: ");
            int capacity = scanner.nextInt();

            // Convert LocalDateTime to Timestamp
            Timestamp departureTimestamp = Timestamp.valueOf(departureTime);

            // Insert the new flight into the database
            String insertQuery = "INSERT INTO flights (flight_number, destination, departure_time, capacity) VALUES (?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(insertQuery);
            preparedStatement.setString(1, flightNumber);
            preparedStatement.setString(2, destination);
            preparedStatement.setTimestamp(3, departureTimestamp);
            preparedStatement.setInt(4, capacity);
            preparedStatement.executeUpdate();
            preparedStatement.close();

            System.out.println("Flight added successfully!");
        } catch (DateTimeParseException e) {
            e.printStackTrace();
            System.out.println("Invalid date and time format. Please use the format 'yyyy-MM-dd HH:mm'.");
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Failed to add the flight to the database.");
        }
    }


    // Method to view available flights
    
    
    public void viewFlights() {
        try {
            String selectQuery = "SELECT * FROM flights";
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(selectQuery);

            if (!resultSet.isBeforeFirst()) {
                System.out.println("No flights available.");
            } else {
                System.out.println("=== Available Flights ===");
                while (resultSet.next()) {
                    resultSet.getInt("id");
                    String flightNumber = resultSet.getString("flight_number");
                    String destination = resultSet.getString("destination");
                    LocalDateTime departureTime = resultSet.getTimestamp("departure_time").toLocalDateTime();
                    int capacity = resultSet.getInt("capacity");
                    int bookedSeats = resultSet.getInt("booked_seats");

                    System.out.println("Flight " + flightNumber + " to " + destination +
                            " at " + departureTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) +
                            " (" + bookedSeats + "/" + capacity + " seats booked)");
                }
                System.out.println("=========================");
            }

            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Failed to retrieve flights from the database.");
        }
    }

    // Method to book a seat on a flight
    @Override//polymorphism
    public void bookSeat() {
        viewFlights();

        System.out.println("Enter the flight number: ");
        String flightNumber = scanner.next();

        try {
            // Check if the flight exists in the database
            String selectQuery = "SELECT * FROM flights WHERE flight_number = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(selectQuery);
            preparedStatement.setString(1, flightNumber);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                int capacity = resultSet.getInt("capacity");
                int bookedSeats = resultSet.getInt("booked_seats");

                if (bookedSeats < capacity) {
                    System.out.println("Enter passenger name: ");
                    String name = scanner.next();

                    System.out.println("Enter passport number: ");
                    String passportNumber = scanner.next();

                    // Insert the new passenger into the database
                    String insertQuery = "INSERT INTO passengers (flight_id, name, passport_number) " +
                                         "VALUES (?, ?, ?)";
                    PreparedStatement passengerStatement = connection.prepareStatement(insertQuery);
                    passengerStatement.setInt(1, resultSet.getInt("id"));
                    passengerStatement.setString(2, name);
                    passengerStatement.setString(3, passportNumber);
                    passengerStatement.executeUpdate();
                    passengerStatement.close();

                    // Update the booked seats count for the flight
                    String updateQuery = "UPDATE flights SET booked_seats = ? WHERE id = ?";
                    PreparedStatement updateStatement = connection.prepareStatement(updateQuery);
                    updateStatement.setInt(1, bookedSeats + 1);
                    updateStatement.setInt(2, resultSet.getInt("id"));
                    updateStatement.executeUpdate();
                    updateStatement.close();

                    System.out.println("Seat booked successfully for Passenger " + name +
                                       " (Passport: " + passportNumber + ")");
                } else {
                    System.out.println("Sorry, no seats available on this flight.");
                }
            } else {
                System.out.println("Flight with number " + flightNumber + " not found.");
            }

            resultSet.close();
            preparedStatement.close();
            
            preparedStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Failed to book the seat on the flight.");
        }
    }

    // Method to close the JDBC connection when the application exits
    private void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Connection to the database closed.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Failed to close the database connection.");
        }
    }

    // Method to close resources and exit the application
    public void exit() {
        closeConnection();
        scanner.close();
        System.out.println("Exiting the application. Goodbye!");
        System.exit(0);
    }

    public static void main(String[] args) {
        FlightManagementSystem flightManagementSystem = new FlightManagementSystem();
        Scanner scanner = new Scanner(System.in);

        int choice;
        do {
            System.out.println("=== Flight Management System ===");
            System.out.println("1. Add Flight");
            System.out.println("2. View Available Flights");
            System.out.println("3. Book Seat");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    flightManagementSystem.addFlight();
                    break;
                case 2:
                    flightManagementSystem.viewFlights();
                    break;
                case 3:
                    flightManagementSystem.bookSeat();
                    break;
                case 4:
                    flightManagementSystem.exit();
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 4);

        scanner.close();
    }
}
