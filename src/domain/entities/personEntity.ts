import { Person } from "../../infrastructure/database/postgresql/models/person.model";

export type PersonEntity = Pick<Person, "birthDate" | "email" | "firstName" | "lastName">