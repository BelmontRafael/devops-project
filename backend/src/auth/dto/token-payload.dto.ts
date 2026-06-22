export class TokenPayloadDto {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
