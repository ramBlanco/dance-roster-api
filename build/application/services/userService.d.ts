import { UserInterface } from '~src/domain/interfaces/userInterface';
export declare class UserService {
    private userRepository;
    sayHello(): Promise<string>;
    getUserByEmail(email: string): Promise<UserInterface>;
}
