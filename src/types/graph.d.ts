export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]!\n  participants: [User]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: String!\n  lng: String!\n  address: String!\n  isFav: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Ride {\n  id: Int!\n  status: String!\n  driver: User!\n  passenger: User!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  distance: String!\n  duration: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype User {\n  id: Int!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  email: String\n  verifiedEmail: Boolean!\n  password: String\n  age: Int\n  phoneNumber: String\n  verifiedPhoneNumber: String!\n  profilePhoto: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  fbId: String\n  chat: Chat\n  ridesAsPassenger: [Ride]\n  ridesAsDriver: [Ride]\n  messages: [Message]\n  verifications: [Verification]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  user: User\n}\n\ntype Verification {\n  id: Int!\n  user: User!\n  target: String!\n  payload: String!\n  key: String!\n  used: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  user: User | null;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string | null;
  email: string | null;
  verifiedEmail: boolean;
  password: string | null;
  age: number | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: string;
  profilePhoto: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  fbId: string | null;
  chat: Chat | null;
  ridesAsPassenger: Array<Ride> | null;
  ridesAsDriver: Array<Ride> | null;
  messages: Array<Message> | null;
  verifications: Array<Verification> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  messages: Array<Message>;
  participants: Array<User>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Ride {
  id: number;
  status: string;
  driver: User;
  passenger: User;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Verification {
  id: number;
  user: User;
  target: string;
  payload: string;
  key: string;
  used: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string;
  lat: string;
  lng: string;
  address: string;
  isFav: boolean;
  createdAt: string;
  updatedAt: string | null;
}
