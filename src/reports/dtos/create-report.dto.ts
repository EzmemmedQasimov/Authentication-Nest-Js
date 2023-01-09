import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1950)
  @Max(2023)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  ltd: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  km: number;
}
