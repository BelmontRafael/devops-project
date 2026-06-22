import { InjectModel } from "@nestjs/sequelize";
import { ContactMessage } from "src/models";
import { CreateContactMessage, UpdateContactMessage } from "./types/contact-message.types";
import { FindContactMessagesQueryDto } from "./dto/find-contact-messages-query.dto";

export class ContactMessagesRepository {
    constructor(
        @InjectModel(ContactMessage)
        private readonly contactMessageModel: typeof ContactMessage
    ) {}

    async create(data: CreateContactMessage) {
        const createdContactMessage = await this.contactMessageModel.create(data);

        return createdContactMessage;
    }

    async findAll(findContactMessagesQuery: FindContactMessagesQueryDto) {
        const { page, limit, email, orderBy, orderDirection } = findContactMessagesQuery;
        const offset = (page - 1) * limit;

        const where: any = {};
        if (email) where.email = email;
        
        const { rows, count } = await this.contactMessageModel.findAndCountAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
        });

        return {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        likes: rows,
        };
    }

    async findById(id: string) {
        const contactMessage = await this.contactMessageModel.findByPk(id);

        return contactMessage;
    }

    async update(id: string, data: UpdateContactMessage) {
        const contactMessage = await this.findById(id);

        return await contactMessage!.update(data);
    }

    async delete(id: string) {
        const contactMessage = await this.findById(id);
        await contactMessage!.destroy();

        return;
    }
}