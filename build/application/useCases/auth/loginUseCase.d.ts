import { ILoginBodyRequest } from '../../../domain/interfaces/requests/authRequestInterface';
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface';
import { UserInterface } from '../../../domain/interfaces/userInterface';
export declare class LoginUseCase extends UseCaseBase {
    private userService;
    handler(user: ILoginBodyRequest): Promise<UserInterface>;
}
