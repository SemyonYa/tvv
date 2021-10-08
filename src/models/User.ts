export class User {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    role: 'admin' | 'user';
    birth: Date;
    activated: boolean;
}