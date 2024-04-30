import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { QueryFilterHandler } from '../../handlers/queryFilterHandler'
import { IEventIndexRequest } from '../../../domain/interfaces/requests/events/indexEventRequest'
import { Event } from "../../../infrastructure/database/postgresql/models/event.model";
import { IPaginationResponseRepository } from '../../../domain/interfaces/paginationResponseRepositoryInterface';
import { SignParamsWithJWT } from '../../../domain/interfaces/jwtInterfaces';
import { PersonService } from '../../../application/services/personService';
import { IGetBirthdaysRequest } from '../../../domain/interfaces/requests/persons/getBirthdaysRequest';
import { Person } from '../../../infrastructure/database/postgresql/models/person.model';

export class GetBirthdaysUseCase extends UseCaseBase {
  constructor(
    private readonly personService: PersonService
  ) {
    super()
  }

  override async handler(params: {
    filters: IGetBirthdaysRequest,
    userSession: SignParamsWithJWT
  }): Promise<IPaginationResponseRepository<Person>> {
    const queryFilterHandler = new QueryFilterHandler()
    const filters = queryFilterHandler.getParams<IGetBirthdaysRequest>(params.filters)
    filters.where = { ...filters.where, tenantId: params.userSession.tenantId }

    const events = await this.personService.getBirthdays(filters)
    return events
  }
}