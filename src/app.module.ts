import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PersonasModule } from './personas/personas.module';
import { ContactosModule } from './contactos/contactos.module';
import { InstitucionesModule } from './instituciones/instituciones.module';
import { AuthModule } from './auth/auth.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { IngresosModule } from './ingresos/ingresos.module';
import { EgresosModule } from './egresos/egresos.module';
import { ProductosModule } from './productos/productos.module';
import { ServiciosModule } from './servicios/servicios.module';
import { DetallesModule } from './detalles/detalles.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { TareasModule } from './tareas/tareas.module';
import { BeneficiariosModule } from './beneficiarios/beneficiarios.module';
import { ObservacionesModule } from './observaciones/observaciones.module';
import { MiembrosModule } from './miembros/miembros.module';
import { TiposProyectosModule } from './tipos-proyectos/tipos-proyectos.module';
import { AvancesModule } from './avances/avances.module';
import { ArchivosModule } from './archivos/archivos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      database:process.env.DB_DATABASE,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    PersonasModule,
    ContactosModule,
    InstitucionesModule,
    AuthModule,
    ProyectosModule,
    IngresosModule,
    EgresosModule,
    ProductosModule,
    ServiciosModule,
    DetallesModule,
    InventariosModule,
    TareasModule,
    BeneficiariosModule,
    ObservacionesModule,
    MiembrosModule,
    TiposProyectosModule,
    AvancesModule,
    ArchivosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
