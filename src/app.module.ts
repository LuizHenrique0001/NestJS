import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigsModule } from './configs/configs.module';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { Configs } from './configs/config.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123',
      database: 'users',
      entities: [UserEntity, Configs],
      migrationsTableName: 'migration_table',
      migrations: ['migration/*.js '],
    }),
    TypeOrmModule.forFeature([UserEntity, Configs]),
    UsersModule,
    AuthModule,
    ConfigsModule,
  ],
})
export class AppModule {}
