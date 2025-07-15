import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsDate()
  @IsNotEmpty()
  public order_date: Date;

}