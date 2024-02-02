/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { TrmInfraestructureService } from '../../Infraestructure/TrmInfraestructure.service';
import * as parser from 'xml2js';
import { Trm } from '../../Domain/Interfaces/Trm';

@Injectable()
export class TrmAplicationService {
  constructor(private readonly _managementTrm: TrmInfraestructureService) {}
  async getTRM(): Promise<Trm> {
    try {
      const response = await this._managementTrm.getTRM();
      const result = await parser.parseStringPromise(response, {
        explicitArray: false,
      });

      if (
        result &&
        result['soap:Envelope'] &&
        result['soap:Envelope']['soap:Body'] &&
        result['soap:Envelope']['soap:Body']['ns2:queryTCRMResponse'] &&
        result['soap:Envelope']['soap:Body']['ns2:queryTCRMResponse']['return']
      ) {
        const jsonResponse: Trm =
          result['soap:Envelope']['soap:Body']['ns2:queryTCRMResponse'][
            'return'
          ];
        return jsonResponse;
      } else {
        console.error(
          'Estructura del objeto resultante no es la esperada:',
          result,
        );
        // Manejar de manera apropiada el caso en que la estructura no es la esperada
      }
    } catch (error) {
      console.error('Error al convertir XML a JSON:', error);
    }
  }

  async getToken(): Promise<any> {
    try {
      const response = await this._managementTrm.getToken();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTrm(): Promise<any> {
    try {
      const trm = await this.getTRM();
      const valueTrm = trm.value;
      const token = await this._managementTrm.getToken();
      const acess_token = token.access_token;
      const response = await this._managementTrm.updateTrm(
        acess_token,
        valueTrm,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
