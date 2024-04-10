import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { PersonService } from '~src/application/services/personService'
import { Person } from '~src/infrastructure/database/postgresql/models/person.model'

export class PersonViewUseCase extends UseCaseBase {
  constructor(
    private readonly personService: PersonService
  ) {
    super()
  }

  override async handler(id: string): Promise<Person> {
    return await this.personService.viewPerson(id)
  }
}