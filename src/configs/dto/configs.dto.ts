import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ConfigsDto {
  @IsString()
  @IsNotEmpty({ message: 'Preencha o Campo Nome!' })
  @MaxLength(30, { message: 'Maximo de Caracteres é de 30' })
  @MinLength(8, { message: 'Minimo de Caracteres é de 8' })
  name: string;

  @IsNotEmpty({ message: 'Preencha o Campo senha!' })
  @MinLength(8, { message: 'Sua Senha Deve Conter no Minimo 8 caracteres!' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Preencha o Campo email!' })
  email: string;
}
