import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['ADMIN', 'USER'], {
    message: 'Role must be either ADMIN or USER',
  })
  role: 'ADMIN' | 'USER';

  @IsEmail()
  email: string;
}
