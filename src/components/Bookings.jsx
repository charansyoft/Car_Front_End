import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBookings = async () => {
  const { data } = await axios.get("http://localhost:5000/api/bookings");
  return data;
};

const Bookings = () => {
  const { data: bookings, isLoading, isError } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings, // Ensure it's a function reference
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching bookings</p>;

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <h4>{booking.title}</h4>
            <img
              src={`http://localhost:5000${booking.image}`} // Handle static uploads
              alt={booking.title}
              width="100"
            />
            <p>Price: {booking.price}</p>
            <p>Fuel Type: {booking.fuelType}</p>
            <p>Transmission: {booking.transmission}</p>
            <p>Booked At: {new Date(booking.bookedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;