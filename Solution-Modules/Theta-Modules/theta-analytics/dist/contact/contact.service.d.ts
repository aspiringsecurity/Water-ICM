import { EntityManager } from 'typeorm';
import { ContactEntity } from './contact.entity';
export declare class ContactService {
    private entityManager;
    constructor(entityManager: EntityManager);
    addMsg(fName: string, lName: string, content: string, email: string): Promise<ContactEntity>;
    msgs(): Promise<ContactEntity[]>;
}
