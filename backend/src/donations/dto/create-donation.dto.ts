import { IsNotEmpty, IsNumber, IsEnum, IsUUID} from 'class-validator';
import { PaymentMethods } from '../types/donation.types';
import { Status } from '../types/donation.types';
import { ApiProperty } from "@nestjs/swagger";

export class CreateDonationDto {

    @ApiProperty({
    example: "e66a6ecf-e6c0-4df7-b2a2-58a029017529",
    description: "ID do usuário que está criando a doação",
    })
    @IsNotEmpty({ message: "O usuário da postagem não pode ser vazio" })
    @IsUUID()
    userId: string;

    @ApiProperty({
    example: "150.00",
    description: "Quantia da doação",
    })
    @IsNotEmpty({ message: 'O campo valor não pode ser vazio.' })
    @IsNumber({}, { message: 'O campo valor deve ser um número.' })
    amount: number;

    @ApiProperty({
    example: "PIX",
    description: "Método de pagamento da doação. Pode ser 'Cartão de Crédito', 'Cartão de Débito' ou 'PIX'.",
    })
    @IsNotEmpty({ message: 'O campo método de pagamento não pode ser vazio.' })
    @IsEnum(PaymentMethods, { message: 'O campo método de pagamento deve ser um dos seguintes valores: Cartão de Crédio, Cartão de Débito ou PIX.' })
    paymentMethod: PaymentMethods;

    @ApiProperty({
    example: "Aprovado",
    description: "Status da doação. Pode ser 'Aprovado', 'Negado' ou 'Em Processamento'.",
    })
    @IsNotEmpty({ message: 'O campo status não pode ser vazio.' })
    @IsEnum(Status, { message: 'O campo status deve ser um dos seguintes valores: Aprovado, Negado ou Em Processamento.' })
    status: Status;
}
