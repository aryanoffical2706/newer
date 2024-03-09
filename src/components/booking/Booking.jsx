import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const Booking = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    userEmail: '',
    startTime: '',
    endTime: '',
    roomType: 'A',
    numberOfPersons: 1,
    roomNumber: 101,
  });

  const [roomCounts, setRoomCounts] = useState({
    A: 10,
    B: 20,
    C: 30,
  });

  const roomTypeCosts = {
    A: 100,
    B: 80,
    C: 50,
  };

  const [editingIndex, setEditingIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const calculateSubtotal = () => {
    const { roomType, startTime, endTime, numberOfPersons, roomNumber } = formData;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const durationInHours = (endDate - startDate) / (1000 * 60 * 60);
    const totalPrice = durationInHours * roomTypeCosts[roomType] * numberOfPersons;

    return {
      userEmail: formData.userEmail,
      startTime: formData.startTime,
      endTime: formData.endTime,
      roomType: formData.roomType,
      numberOfPersons: formData.numberOfPersons,
      roomNumber: roomNumber,
      totalPrice: totalPrice,
    };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const editedBooking = calculateSubtotal();
      const updatedBookings = [...bookings];
      updatedBookings[editingIndex] = editedBooking;

      try {
        const response = await fetch(`http://localhost:3002/api/booking/${editedBooking._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedBooking),
          mode: 'cors',
        });

        const data = await response.json();
        console.log('Success:', data);
        setBookings(updatedBookings);
        setEditingIndex(null);
        onClose();
        setSuccessMessage('Booking updated successfully!');
        setErrorMessage('');
      } catch (error) {
        console.error('Error:', error);
        setSuccessMessage('');
        setErrorMessage('Failed to update booking. Please try again.');
      }
    } else {
      if (roomCounts[formData.roomType] - formData.numberOfPersons >= 0) {
        const newBooking = calculateSubtotal();

        const formattedBooking = {
          roomType: newBooking.roomType,
          pricePerHour: roomTypeCosts[newBooking.roomType],
      
          ...newBooking,
        };

        setBookings([...bookings, formattedBooking]);

        setRoomCounts((prevCounts) => ({
          ...prevCounts,
          [formData.roomType]: prevCounts[formData.roomType] - formData.numberOfPersons,
        }));

        try {
          const response = await fetch('http://localhost:3002/api/booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedBooking),
            mode: 'cors',
          });

          const data = await response.json();
          console.log('Success:', data);
          setFormData({
            userEmail: '',
            startTime: '',
            endTime: '',
            roomType: 'A',
            numberOfPersons: 1,
            roomNumber: 101,
          });
          setSuccessMessage('Booking created successfully!');
          setErrorMessage('');
        } catch (error) {
          console.error('Error:', error);
          setSuccessMessage('');
          setErrorMessage('Failed to create booking. Please try again.');
        }
      } else {
        alert('Not enough available rooms for booking');
      }
    }
  };

  const handleDelete = async (index) => {
    const deletedBooking = bookings[index];

    try {
      const response = await fetch(`http://localhost:3002/api/deleteBooking/${deletedBooking._id}`, {
        method: 'PATCH',
        mode: 'cors',
      });

      const data = await response.json();
      console.log('Success:', data);

      setRoomCounts((prevCounts) => ({
        ...prevCounts,
        [deletedBooking.roomType]: prevCounts[deletedBooking.roomType] + deletedBooking.numberOfPersons,
      }));

      const updatedBookings = [...bookings];
      updatedBookings.splice(index, 1);
      setBookings(updatedBookings);
      setSuccessMessage('Booking deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to delete booking. Please try again.');
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/bookings', {
          mode: 'cors',
        });

        const data = await response.json();

        // Check if data is an array before setting state
        if (Array.isArray(data)) {
          console.log('Success:', data);
          setBookings(data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Box marginBottom={50} marginLeft={300} marginRight={300}>
      <h2 className='bh2'> New Booking</h2>

      <Box my={4}>
        <FormControl>
          <form onSubmit={handleFormSubmit}>
            <FormLabel>User Email</FormLabel>
            <Input
              className='in'
              type="text"
              placeholder="User Email"
              value={formData.userEmail}
              onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
            />

            <FormLabel mt={4}>Start Time</FormLabel>
            <Input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />

            <FormLabel mt={4}>End Time</FormLabel>
            <Input
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />

            <FormLabel mt={4}>Room Type</FormLabel>
            <Select
              value={formData.roomType}
              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
            >
              <option value="A">Type A</option>
              <option value="B">Type B</option>
              <option value="C">Type C</option>
            </Select>

            <FormLabel mt={4}>Number of Persons</FormLabel>
            <Input
              type="number"
              min="1"
              value={formData.numberOfPersons}
              onChange={(e) => setFormData({ ...formData, numberOfPersons: parseInt(e.target.value, 10) })}
            />

            <FormLabel mt={4}>Room Number</FormLabel>
            <Input
              type="number"
              min="101" // Change this to your minimum room number
              value={formData.roomNumber}
              onChange={(e) => setFormData({ ...formData, roomNumber: parseInt(e.target.value, 10) })}
            />

            <Button type="submit" mt={4} colorScheme="teal">
              {editingIndex !== null ? 'Save Changes' : 'Book Room'}
            </Button>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        </FormControl>
      </Box>

      <Box className='box4' my={4}>
        <h3 className='box4h'>Subtotal: {` ${calculateSubtotal().totalPrice} Rs`}</h3>
        <p className='box4p'></p>
      </Box>

      <Box my={4}>
        <h3>Bookings</h3>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User Email</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Room Type</Th>
              <Th>Number of Persons</Th>
              <Th>Room Number</Th>
              <Th>Available Rooms</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map((booking, index) => (
              <Tr key={index}>
                <Td>{booking.userEmail}</Td>
                <Td>{booking.startTime}</Td>
                <Td>{booking.endTime}</Td>
                <Td>{booking.roomType}</Td>
                <Td>{booking.numberOfPersons}</Td>
                <Td>{booking.roomNumber}</Td>
                <Td>{roomCounts[booking.roomType]}</Td>
                <Td className='btnb'>
                  <Button onClick={() => setEditingIndex(index)} size="md" mr={2} colorScheme="blue">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(index)} size="md" mr={2} colorScheme="red">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={() => { onClose(); setEditingIndex(null); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingIndex !== null ? 'Edit Booking' : 'New Booking'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>User Email</FormLabel>
              <Input
                type="text"
                placeholder="User Email"
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
              />

              <FormLabel mt={4}>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />

              <FormLabel mt={4}>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />

              <FormLabel mt={4}>Room Type</FormLabel>
              <Select
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
              >
                <option value="A">Type A</option>
                <option value="B">Type B</option>
                <option value="C">Type C</option>
              </Select>

              <FormLabel mt={4}>Number of Persons</FormLabel>
              <Input
                type="number"
                min="1"
                value={formData.numberOfPersons}
                onChange={(e) => setFormData({ ...formData, numberOfPersons: parseInt(e.target.value, 10) })}
              />

              <FormLabel mt={4}>Room Number</FormLabel>
              <Input
                type="number"
                min="101" // Change this to your minimum room number
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: parseInt(e.target.value, 10) })}
              />

              <Button type="submit" mt={2} colorScheme="teal">
                {editingIndex !== null ? 'Save Changes' : 'Book Room'}
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Booking;
