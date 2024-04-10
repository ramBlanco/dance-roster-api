import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { StudentService } from "../../../application/services/studentService";
import { StudentsRepository } from "../../../infrastructure/repositories/studentRepository";
import { StudentIndexUseCase } from "../../../application/useCases/students/studentIndexUseCase";

export function studentDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.services.studentService]: asFunction(
      ({ studentRepository }) => new StudentService(studentRepository),
      { lifetime: Lifetime.SCOPED }
    )
  })

  container.register({
    [INJECTIONS.repositories.studentRepository]: asFunction(
      () => new StudentsRepository(),
      { lifetime: Lifetime.SINGLETON }
    )
  })

  container.register({
    [INJECTIONS.useCases.students.indexUseCase]: asFunction(
      ({ studentService }) => new StudentIndexUseCase(studentService),
      { lifetime: Lifetime.SCOPED }
    )
  })
}