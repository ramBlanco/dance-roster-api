import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { StudentsRepository } from "../../infrastructure/repositories/studentRepository";

export class StudentService {
  constructor(private readonly studentRepository: StudentsRepository) { }

  async getAllByFilter(filters: IQueryFilterHandlerResponse): Promise<[]> {
    return await this.studentRepository.getAll()
  }
}