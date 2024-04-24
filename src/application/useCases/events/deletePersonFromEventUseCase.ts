import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { ValidationService } from '../../services/validationService'
import { EventPersonService } from '~src/application/services/eventPersonService'
import { IDeletePersonFromEventRequest } from '~src/domain/interfaces/requests/events/deletePersonFromEventRequest'

export class DeletePersonFromEventUseCase extends UseCaseBase {
  constructor(
    private readonly validationService: ValidationService,
    private readonly eventPersonService: EventPersonService
  ) {
    super()
  }

  override async handler(params: IDeletePersonFromEventRequest): Promise<number> {

    const response = await this.eventPersonService.delete({
      eventId: params.eventId,
      eventPersonId: params.eventPersonId,
      tenantId: params.tenantId
    })

    return response
  }
}
