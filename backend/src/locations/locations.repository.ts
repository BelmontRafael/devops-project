import { InjectModel } from "@nestjs/sequelize";
import { Location } from "src/models";
import { FindLocationsQueryDto } from "./dto/find-locations-query.dto";
import { Op } from "sequelize";
import { CreateLocation, UpdateLocation } from "./types/locations.types";

export class LocationsRepository {
  constructor(
    @InjectModel(Location)
    private readonly locationModel: typeof Location
  ) {}

  async create(data: CreateLocation) {
    const createdLocation = await this.locationModel.create(data);
    return createdLocation;
  }

  async findAll(findLocationsQuery: FindLocationsQueryDto) {
    const {
      page,
      limit,
      name,
      city,
      state,
      uf,
      orderBy,
      orderDirection,
    } = findLocationsQuery;

    const offset = (page - 1) * limit;

    const where: any = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (city) where.city = { [Op.iLike]: `%${city}%` };
    if (state) where.state = { [Op.iLike]: `%${state}%` };
    if (uf) where.uf = uf;

    const { rows, count } = await this.locationModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      locations: rows,
    };
  }

  async findById(id: string) {
    const location = await this.locationModel.findByPk(id);
    return location;
  }

  async update(id: string, data: UpdateLocation) {
    const location = await this.findById(id);
    return await location!.update(data);
  }

  async delete(id: string) {
    const location = await this.findById(id);
    await location!.destroy();
  }
}
