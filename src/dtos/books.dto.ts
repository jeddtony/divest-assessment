import { IsString, IsNotEmpty, IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  public genre: string;

  @IsBoolean()
  @IsNotEmpty()
  public is_available: boolean;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsNumber()
  @IsNotEmpty()
  public stock_quantity: number;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsDate()
  @IsNotEmpty()
  public created_at: Date;

  @IsDate()
  @IsNotEmpty()
  public updated_at: Date;
}

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  public genre: string;

  @IsBoolean()
  @IsNotEmpty()
  public is_available: boolean;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsNumber()
  @IsNotEmpty()
  public stock_quantity: number;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsDate()
  @IsNotEmpty()
  public updated_at: Date;
}