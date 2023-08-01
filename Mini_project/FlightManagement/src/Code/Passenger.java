package Code;

class Passenger {
    private String name;
    private String passportNumber;

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassportNumber() {
		return passportNumber;
	}

	public void setPassportNumber(String passportNumber) {
		this.passportNumber = passportNumber;
	}

	public Passenger(String name, String passportNumber) {
        this.name = name;
        this.passportNumber = passportNumber;
    }

    // Getters and setters

    @Override
    public String toString() {
        return "Passenger " + name + " (Passport: " + passportNumber + ")";
    }
}
