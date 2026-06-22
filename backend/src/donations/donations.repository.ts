import { InjectModel } from "@nestjs/sequelize";
import { Donation } from "src/models";
import { CreateDonation, UpdateDonation } from "./types/donation.types";
import { FindDonationsQueryDto } from "./dto/find-donations-query.dto";

export class DonationsRepository {
    constructor(
        @InjectModel(Donation)
        private readonly donationModel: typeof Donation
    ) {}

    async create(data: CreateDonation) {
        const createdDonation = await this.donationModel.create(data);

        return createdDonation;
    }

    async findAll(findDonationsQuery: FindDonationsQueryDto) {
        const { page, limit, userId, orderBy, orderDirection } = findDonationsQuery;
        const offset = (page - 1) * limit;

        const where: any = {};
        if (userId) where.userId = userId;
        
        const { rows, count } = await this.donationModel.findAndCountAll({
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
        const donation = await this.donationModel.findByPk(id);

        return donation;
    }

    async update(id: string, data: UpdateDonation) {
        const donation = await this.findById(id);

        return await donation!.update(data);
    }

    async delete(id: string) {
        const donation = await this.findById(id);
        await donation!.destroy();

        return;
    }
}