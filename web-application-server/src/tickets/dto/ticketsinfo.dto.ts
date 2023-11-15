class StopoverDto {
  airline: string;
  flightNumber: string;
  departureDate: Date;
  destinationDate: Date;
  price: number;
  departure: string;
  destination: string;
  link: string = "#";
  isSoldOut: boolean;
}

class TicketsInfoDto {
  title: string;
  request_id: string;
  flightData: {
  stopover: StopoverDto[];
  }
  email : string;
}
