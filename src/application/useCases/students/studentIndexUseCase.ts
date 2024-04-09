import { StudentService } from '~src/application/services/studentService'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { QueryFilterHandler } from '../../handlers/queryFilterHandler'
import { EventService } from '../../services/eventService'

export class StudentIndexUseCase extends UseCaseBase {
  constructor(
    private readonly studentService: StudentService
  ) {
    super()
  }

  override async handler(params: {}): Promise<[]> {
    const queryFilterHandler = new QueryFilterHandler()
    const filters = queryFilterHandler.getParams<{}>(params)

    const collections = await this.studentService.getAllByFilter(filters)
    return collections
  }
}
