
export enum ReservationStatus {
  Pending = 'pendente',
  Confirmed = 'confirmado',
  Completed = 'concluído',
  Canceled = 'cancelado',
  Rejected = 'rejeitado',
}

export interface User {
  id: number;
  name: string;
  city: string;
  favorites: number[];
}

export interface Goalkeeper {
  id: number;
  name: string;
  age: number;
  city: string;
  region: string;
  pricePerHour: number;
  rating: number;
  availability: {
    [day: string]: string[];
  };
  photoUrl: string;
  description: string;
}

export interface Reservation {
  id: number;
  userId: number;
  goalkeeperId: number;
  date: string;
  time: 'manhã' | 'tarde' | 'noite';
  duration: number;
  totalPrice: number;
  status: ReservationStatus;
}
