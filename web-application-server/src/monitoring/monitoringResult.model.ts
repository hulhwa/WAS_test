// monitoringResult.model 파일

import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { StopoverSchema, Stopover } from './monitoring.model';

export const MonitoringResultSchema = new mongoose.Schema({
    flightData: {
        stopover: [StopoverSchema],
      },
      email: String,
      request_id: String,
      status: Number,
});

export interface MonitoringResultDocument extends Document {
  //title: string;
  flightData: {
    stopover: Stopover[];
  };
  email: string;
  request_id: string;
  status: Number;
}

export const MonitoringResultModel = mongoose.model<MonitoringResultDocument>('MonitoringResult', MonitoringResultSchema);
