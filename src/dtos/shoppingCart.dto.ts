import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateShoppingCartDto {
  @IsNumber()
  @IsNotEmpty()
  public user_id: number;
}

export class AddBookToShoppingCartDto {
  @IsNumber()
  @IsNotEmpty()
  public user_id: number;
  @IsNumber()
  @IsNotEmpty()
  public book_id: number;
}
