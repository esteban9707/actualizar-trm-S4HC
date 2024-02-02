import { Controller, Get } from '@nestjs/common';
import { TrmAplicationService } from '../../Aplication/services/TrmAplicationService.service';
import { Trm } from '../../Domain/Interfaces/Trm';
@Controller('trm')
export class TrmPresentationController {
  constructor(private readonly _managementTRM: TrmAplicationService) {}

  @Get('/get-trm')
  async getTRM(): Promise<Trm> {
    try {
      const result = await this._managementTRM.getTRM();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/get-token')
  async getToken(): Promise<any> {
    try {
      const result = await this._managementTRM.getToken();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/update-trm')
  async updateTrm(): Promise<any> {
    try {
      const result = await this._managementTRM.updateTrm();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
