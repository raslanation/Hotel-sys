import Fastify from 'fastify';
import { PrismaClient, RoomType, RoomStatus } from '@prisma/client';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// 1. Create a new Room
fastify.post('/api/rooms', async (request, reply) => {
  const { roomNumber, type, pricePerNight } = request.body as {
    roomNumber: string;
    type: RoomType;
    pricePerNight: number;
  };

  try {
    const room = await prisma.room.create({
      data: { roomNumber, type, pricePerNight },
    });
    return reply.status(201).send(room);
  } catch (error) {
    return reply.status(400).send({ error: 'Room number already exists.' });
  }
});

// 2. Create a Booking (With Overlap Collision Check)
fastify.post('/api/bookings', async (request, reply) => {
  const { roomId, guestId, checkIn, checkOut, totalAmount } = request.body as {
    roomId: string;
    guestId: string;
    checkIn: string;   // "2026-07-10"
    checkOut: string;  // "2026-07-15"
    totalAmount: number;
  };

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Overlap Collision Logic: (StartA < EndB) AND (EndA > StartB)
  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      roomId: roomId,
      status: 'CONFIRMED',
      checkInDate: { lt: checkOutDate },
      checkOutDate: { gt: checkInDate },
    },
  });

  if (conflictingBooking) {
    return reply.status(409).send({ 
      error: 'This room is already booked for the selected dates.' 
    });
  }

  const booking = await prisma.booking.create({
    data: {
      roomId,
      guestId,
      checkInDate,
      checkOutDate,
      totalAmount,
    },
  });

  return reply.status(201).send(booking);
});

const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
    console.log('Backend PMS engine running on http://localhost:5000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();