export class MonitoringTicketDto {
  //title: string;
  flightData: {
    stopover?: Stopover[];
  };
  email: string;
}

export interface Stopover {
  flightNumber: string;
  departure: string;
  destination: string;
  departureDate: Date;
  destinationDate: Date;
  price: number;
  isSoldOut: boolean;
  link: string;
  airline: string;
  timeTaken : string;
}