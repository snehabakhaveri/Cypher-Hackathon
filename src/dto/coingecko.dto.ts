import { IsAlphanumeric, MaxLength, MinLength } from "class-validator/types/decorator/decorators";

export class CoinGeckoList{
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(20)
  name:string;
}