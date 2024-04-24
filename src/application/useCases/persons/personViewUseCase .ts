import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { PersonService } from '../../../application/services/personService'
import { Person } from '../../../infrastructure/database/postgresql/models/person.model'

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