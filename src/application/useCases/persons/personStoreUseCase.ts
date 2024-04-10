import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { ValidationService } from '../../services/validationService'
import { PersonService } from '~src/application/services/personService'
import { Person } from '~src/infrastructure/database/postgresql/models/person.model'
import { IStorePersonRequest } from '~src/domain/interfaces/requests/persons/storePersonRequest'

export class PersonStoreUseCase extends UseCaseBase {
  constructor(
    private readonly _validationService: ValidationService,
    private readonly personService: PersonService
  ) {
    super()
  }

  override async handler(params: IStorePersonRequest): Promise<Person[]> {
    const persons = await Promise.all(params.persons.map((person) => this.personService.storePerson(person)))
    return persons
  }
}
