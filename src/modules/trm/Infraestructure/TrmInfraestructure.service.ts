/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Trm } from '../Domain/Interfaces/Trm';
import { format } from 'date-fns';

@Injectable()
export class TrmInfraestructureService {
  async getTRM(): Promise<Trm> {
    const url =
      'https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl';
    const xml = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:act="http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/">
      <soapenv:Header/>
      <soapenv:Body>
        <act:queryTCRM>
        </act:queryTCRM>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
    try {
      const response = await axios.post(url, xml, {
        headers: {
          'Content-Type': 'text/xml',
        },
      });
      return response.data;
    } catch (error) {}
  }

  async getToken(): Promise<any> {
    const url =
      'https://develop-hbtp-kv1pbgwc.authentication.us10.hana.ondemand.com/oauth/token';
    const body = {
      client_id:
        'sb-f604a0fa-30a0-4229-931d-d22f0563d631!b208647|market-data-MRM-MRM_BYOD!b1736',
      client_secret:
        'ab796cb2-0c3c-4b38-9b3e-3e04259ac951$8qhueRQC51EyJRbX99v-GBjcBlw2q-9r1IuEZ08_VSU=',
      grant_type: 'client_credentials',
      response_type: 'token',
    };
    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTrm(token, trm): Promise<any> {
    try {
      const url =
        'https://mrmawsus10-mrm-mrm-byod-market-data-upload.cfapps.us10.hana.ondemand.com/uploadMarketData';
      const date = new Date();
      const body = [
        {
          providerCode: 'Y001',
          marketDataSource: 'BYOR',
          marketDataCategory: '01',
          key1: 'USD',
          key2: 'COP',
          marketDataProperty: 'MID',
          effectiveDate: format(date, 'yyyy-MM-dd'),
          effectiveTime: '00:00:00',
          marketDataValue: trm,
          securityCurrency: null,
          fromFactor: 1,
          toFactor: 1,
          priceQuotation: null,
          additionalKey: null,
        },
      ];
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status)
      if (response.status == 201) {
        return body;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
