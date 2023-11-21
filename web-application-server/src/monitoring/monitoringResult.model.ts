// monitoringResult.model 파일

import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const MonitoringResultSchema = new mongoose.Schema({
    result_id: String,
});

export interface MonitoringResultDocument extends Document {
    result_id: string;
}

export const MonitoringResultModel = mongoose.model<MonitoringResultDocument>('MonitoringResult', MonitoringResultSchema);
