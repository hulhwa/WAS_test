import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const StopoverSchema = new mongoose.Schema({
  flightNumber: String,
  departure: String,
  destination: String,
  departureDate: Date,
  destinationDate: Date,
  price: Number,
  isSoldOut: Boolean,
  link: String,
  airline: String,
});

export const MonitoringSchema = new mongoose.Schema({
  title: String,
  flightData: {
    stopover: [StopoverSchema],
  },
  email: String,
  requestId: String,
});

interface Stopover {
  flightNumber: string;
  departure: string;
  destination: string;
  departureDate: Date;
  destinationDate: Date;
  price: number;
  isSoldOut: boolean;
  link: string;
  airline: string;
}

export interface MonitoringDocument extends Document {
  title: string;
  flightData: {
    stopover: Stopover[];
  };
  email: string;
  requestId: string;
}

// 모델 생성
export const MonitoringModel = mongoose.model<MonitoringDocument>('Monitoring', MonitoringSchema);
