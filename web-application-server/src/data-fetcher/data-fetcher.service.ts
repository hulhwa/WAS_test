import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonitoringDocument } from '../monitoring/monitoring.model'; 
import { MonitoringResultDocument } from '../monitoring/monitoringResult.model';
import airports from '../json/IATA_airport';

@Injectable()
export class DataFetcherService {
  private isMonitoring: boolean = false;
  private monitoringProcess: NodeJS.Timeout;

  constructor(
    @InjectModel('Monitoring') private monitoringModel: Model<MonitoringDocument>,
    @InjectModel('MonitoringResult') private monitoringResultModel: Model<MonitoringResultDocument> // MonitoringResult 모델 추가
  ) {}


  async toggleMonitoring() {
    this.isMonitoring = !this.isMonitoring;

    if (this.isMonitoring) {
      // 감시 시작
      this.startMonitoring();
    } else {
      // 감시 중지
      this.stopMonitoring();
    }

    return { status: this.isMonitoring ? 'Monitoring started' : 'Monitoring stopped' };
  }

  public async startMonitoring() {
    // MongoDB에서 데이터 가져오기 및 Spiderbot에 전송하는 로직
    const monitorings = await this.monitoringModel.find().exec();

    for (const monitoring of monitorings) {
      if (!this.isMonitoring) break; // 감시 중지 시 루프 탈출

      await new Promise(resolve => setImmediate(resolve)); //중간에 다른 요청받을시

      const response = await this.sendToSpiderMonitoring(monitoring.flightData.stopover);
      if(response){ //false일 경우.
        await this.handleMonitoringFound(monitoring);
      }
    }

    if (this.isMonitoring) {
      // 모든 작업 완료 후 1초 대기
      this.monitoringProcess = setTimeout(() => this.startMonitoring(), 1000);
    }
  }

  private async sendToSpiderMonitoring(stopover): Promise<any> {
    // Spider/monitoring에 stopover 데이터를 보내고 응답을 기다리는 로직
    const response = await axios.post('http://180.230.174.144:8000/spiderbot/monitor', stopover);
    return response.data;
    
    //console.log('\n@@@@@@@@@@@@');
    
  }
  private async handleMonitoringFound(monitoring: MonitoringDocument) {
    // monitoring 객체를 일반 객체로 변환
    const monitoringData = monitoring.toObject();
    

    // 필요한 모든 필드를 새 객체에 복사
    const monitoringResultData = {
        ...monitoringData,
        flightData: { ...monitoringData.flightData },
        // 여기에 다른 중첩된 객체나 배열 필드가 있다면 복사
    };

    // 새로운 _id 생성을 위해 기존 _id 필드 제거
    delete monitoringResultData._id;

    // 새로운 monitoringResult 문서 생성 및 저장
    const monitoringResult = new this.monitoringResultModel(monitoringResultData);
    await monitoringResult.save();

    const emailContent = this.createEmailContent(monitoring);

    // 이메일 전송
    await axios.post('http://13.125.146.225:8080/mailserver', {
      email: monitoring.email,
      content: emailContent
    });
    // monitoring 컬렉션에서 데이터 삭제
    await this.monitoringModel.deleteOne({ _id: monitoring._id });
  }

  private createEmailContent(monitoring: MonitoringDocument): string {
    let emailContent = "🛫 귀하가 찾으신 비행편 정보입니다 🛬\n\n";

    monitoring.flightData.stopover.forEach((stopover, index) => {
        const departureAirport = airports.find(a => a.IATA === stopover.departure);
        const destinationAirport = airports.find(a => a.IATA === stopover.destination);  

        if (monitoring.flightData.stopover.length > 1) {
            emailContent += `🌐 ${index + 1}번째 경유지 정보 🌐\n`;
        }
        emailContent += `항공사: ${stopover.airline}\n`;
        emailContent += `비행편 번호: ${stopover.flightNumber}\n`;
        emailContent += `출발지: ${departureAirport?.airportName_ko || stopover.departure} (${stopover.departureDate})\n`;
        emailContent += `도착지: ${destinationAirport?.airportName_ko || stopover.destination} (${stopover.destinationDate})\n`;
        emailContent += `가격: ${stopover.price}\n`;
        emailContent += `링크: ${stopover.link})\n`;
        emailContent += `소요시간: ${stopover.timeTaken}\n\n`;
    });

    emailContent += "🎉 좌석을 찾았습니다! 빠른 예약을 추천드립니다! 🎉";

    return emailContent;
}

  private stopMonitoring() {
    if (this.monitoringProcess) {
      clearTimeout(this.monitoringProcess);
    }
  }
}
