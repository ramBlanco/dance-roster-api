import { TenantRepository } from "../../infrastructure/repositories/tenantRepository";

export class TenantService {
  constructor(
    private readonly tenantRepository: TenantRepository,
  ) {
    
  }
}