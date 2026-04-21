import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Mohannad Shazli',
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    example: 'mohannadshazli@gmail.com',
    description: 'User email',
  })
  email: string;
}
