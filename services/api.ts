import { Goalkeeper, User, Reservation, ReservationStatus } from '../types';

let users: User[] = [
  { id: 1, name: 'Carlos Silva', city: 'São Paulo', favorites: [2, 4] },
  { id: 2, name: 'Ana Pereira', city: 'Rio de Janeiro', favorites: [1] },
];

const goalkeeperPhoto = 'https://img.freepik.com/fotos-gratis/close-up-do-goleiro_23-2147813141.jpg';

let goalkeepers: Goalkeeper[] = [
  {
    id: 1,
    name: 'Muralha',
    age: 28,
    city: 'São Paulo',
    region: 'Zona Leste',
    pricePerHour: 50,
    rating: 4.8,
    availability: { 'Segunda': ['noite'], 'Quarta': ['tarde', 'noite'], 'Sexta': ['noite'] },
    photoUrl: goalkeeperPhoto,
    description: 'Goleiro ágil com excelente reflexo. Experiência em campeonatos amadores e muita vontade de vencer.',
  },
  {
    id: 2,
    name: 'Fábio Costa',
    age: 32,
    city: 'São Paulo',
    region: 'Zona Sul',
    pricePerHour: 70,
    rating: 4.9,
    availability: { 'Terça': ['noite'], 'Quinta': ['noite'], 'Sábado': ['manhã', 'tarde'] },
    photoUrl: goalkeeperPhoto,
    description: 'Liderança em campo e ótimo posicionamento. Segurança para sua zaga.',
  },
  {
    id: 3,
    name: 'Jefferson',
    age: 25,
    city: 'Rio de Janeiro',
    region: 'Copacabana',
    pricePerHour: 60,
    rating: 4.7,
    availability: { 'Segunda': ['manhã'], 'Quarta': ['manhã'], 'Domingo': ['tarde'] },
    photoUrl: goalkeeperPhoto,
    description: 'Velocidade e boa saída do gol. Perfeito para times que jogam com a linha adiantada.',
  },
  {
    id: 4,
    name: 'Marcos',
    age: 35,
    city: 'São Paulo',
    region: 'Zona Oeste',
    pricePerHour: 80,
    rating: 5.0,
    availability: { 'Sábado': ['tarde', 'noite'], 'Domingo': ['manhã'] },
    photoUrl: goalkeeperPhoto,
    description: 'Campeão de tudo! Experiência de sobra para garantir a tranquilidade do seu time. Defende até pensamento.',
  },
  {
    id: 5,
    name: 'Cássio',
    age: 36,
    city: 'Belo Horizonte',
    region: 'Pampulha',
    pricePerHour: 90,
    rating: 4.9,
    availability: { 'Segunda': ['noite'], 'Sexta': ['noite'], 'Domingo': ['manhã'] },
    photoUrl: goalkeeperPhoto,
    description: 'Gigante no gol, especialista em defender pênaltis. Traz segurança e experiência de campeão.'
  },
  {
    id: 6,
    name: 'Weverton',
    age: 34,
    city: 'Salvador',
    region: 'Barra',
    pricePerHour: 85,
    rating: 4.8,
    availability: { 'Terça': ['tarde', 'noite'], 'Quinta': ['noite'] },
    photoUrl: goalkeeperPhoto,
    description: 'Goleiro de seleção, muito seguro e com ótimo jogo com os pés.'
  },
  {
    id: 7,
    name: 'Gatito Fernández',
    age: 34,
    city: 'Porto Alegre',
    region: 'Moinhos de Vento',
    pricePerHour: 75,
    rating: 4.6,
    availability: { 'Quarta': ['noite'], 'Sábado': ['tarde', 'noite'] },
    photoUrl: goalkeeperPhoto,
    description: 'Paredão paraguaio, especialista em defesas difíceis e com muita garra.'
  },
  {
    id: 8,
    name: 'João Ricardo',
    age: 33,
    city: 'Curitiba',
    region: 'Centro Cívico',
    pricePerHour: 65,
    rating: 4.5,
    availability: { 'Segunda': ['manhã'], 'Quarta': ['tarde'] },
    photoUrl: goalkeeperPhoto,
    description: 'Experiente e regular, um goleiro confiável para qualquer partida.'
  },
  {
    id: 9,
    name: 'Léo Jardim',
    age: 28,
    city: 'Belo Horizonte',
    region: 'Savassi',
    pricePerHour: 70,
    rating: 4.7,
    availability: { 'Terça': ['noite'], 'Sábado': ['manhã'] },
    photoUrl: goalkeeperPhoto,
    description: 'Goleiro moderno, com bom reflexo e agilidade para defesas incríveis.'
  },
  {
    id: 10,
    name: 'Everson',
    age: 32,
    city: 'São Paulo',
    region: 'Centro',
    pricePerHour: 80,
    rating: 4.8,
    availability: { 'Quinta': ['noite'], 'Domingo': ['tarde', 'noite'] },
    photoUrl: goalkeeperPhoto,
    description: 'Ótimo com os pés, funciona como um líbero. Defesas seguras e boa reposição de bola.'
  }
];

let reservations: Reservation[] = [
  { id: 1, userId: 1, goalkeeperId: 2, date: '2024-08-10', time: 'noite', duration: 2, totalPrice: 140, status: ReservationStatus.Confirmed },
  { id: 2, userId: 1, goalkeeperId: 4, date: '2024-07-25', time: 'tarde', duration: 1, totalPrice: 80, status: ReservationStatus.Completed },
  { id: 3, userId: 2, goalkeeperId: 1, date: '2024-08-12', time: 'noite', duration: 2, totalPrice: 100, status: ReservationStatus.Pending },
];

const simulateDelay = <T,>(data: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), 500));

// --- Goalkeeper Functions ---
export const getGoalkeepers = () => simulateDelay(goalkeepers);
export const getGoalkeeperById = (id: number) => simulateDelay(goalkeepers.find(g => g.id === id));

// --- User Functions ---
export const getUsersForLogin = () => simulateDelay(users.map(u => ({ id: u.id, name: u.name })));
export const getGoalkeepersForLogin = () => simulateDelay(goalkeepers.map(g => ({ id: g.id, name: g.name })));
export const getUserById = (id: number) => simulateDelay(users.find(u => u.id === id));

export const toggleFavoriteApi = async (userId: number, goalkeeperId: number): Promise<User | undefined> => {
  const user = users.find(u => u.id === userId);
  if (user) {
    const favIndex = user.favorites.indexOf(goalkeeperId);
    if (favIndex > -1) {
      user.favorites.splice(favIndex, 1);
    } else {
      user.favorites.push(goalkeeperId);
    }
    return simulateDelay(user);
  }
  return undefined;
};

// --- Reservation Functions ---
export const createReservation = async (reservationData: Omit<Reservation, 'id' | 'status'>): Promise<Reservation> => {
  const newId = reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1;
  const newReservation: Reservation = {
    ...reservationData,
    id: newId,
    status: ReservationStatus.Pending,
  };
  reservations.push(newReservation);
  return simulateDelay(newReservation);
};

export const getReservationsByUserId = (userId: number) => 
  simulateDelay(reservations.filter(r => r.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

export const getReservationsByGoalkeeperId = (goalkeeperId: number) => 
  simulateDelay(reservations.filter(r => r.goalkeeperId === goalkeeperId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

export const updateReservationStatus = async (reservationId: number, status: ReservationStatus): Promise<Reservation | undefined> => {
  const reservation = reservations.find(r => r.id === reservationId);
  if (reservation) {
    reservation.status = status;
    return simulateDelay(reservation);
  }
  return undefined;
};