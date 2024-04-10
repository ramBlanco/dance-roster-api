import { Location } from "../../infrastructure/database/postgresql/models/location.model";

export type LocationEntity = Pick<Location, "name" | "tenantId" | "address">