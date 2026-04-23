import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Mohannad' })
  @MinLength(3)
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Shazly' })
  @MinLength(3)
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password1',
    description: 'Must contain at least one uppercase letter and one number',
  })
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'password must contain at least one uppercase letter and one number',
  })
  password: string;
}
