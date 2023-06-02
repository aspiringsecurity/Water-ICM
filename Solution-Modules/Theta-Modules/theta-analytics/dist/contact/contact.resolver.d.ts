import { ContactEntity } from './contact.entity';
import { ContactService } from './contact.service';
export declare class ContactResolver {
    private contactService;
    constructor(contactService: ContactService);
    newMsg(fName: string, lName: string, email: string, content: string): Promise<ContactEntity>;
}
