import { TrmInfraestructureService } from './modules/trm/Infraestructure/TrmInfraestructure.service';
import { TrmAplicationService } from './modules/trm/Aplication/services/TrmAplicationService.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrmModule } from './modules/trm/trm.module';
import { TrmPresentationController } from './modules/trm/Presentation/Controllers/TrmPresentationController.controller';

@Module({
  imports: [TrmModule],
  controllers: [TrmPresentationController, AppController],
  providers: [TrmInfraestructureService, TrmAplicationService, AppService],
})
export class AppModule {}
