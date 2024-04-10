import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { QueryFilterHandler } from '../../handlers/queryFilterHandler'
import { PersonService } from '~src/application/services/personService';
import { Person } from '~src/infrastructure/database/postgresql/models/person.model';
import { IPersonIndexRequest } from '~src/domain/interfaces/requests/persons/indexPersonRequest';

export class PersonIndexUseCase extends UseCaseBase {
  constructor(
    private readonly personService: PersonService
  ) {
    super()
  }

  override async handler(params: IPersonIndexRequest): Promise<Person[]> {
    const queryFilterHandler = new QueryFilterHandler()
    const filters = queryFilterHandler.getParams<IPersonIndexRequest>(params)
    const persons = await this.personService.getAllByFilter(filters)
    return persons
  }
}