import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { ContactEntity } from './contact.entity'

@Injectable()
export class ContactService {
  constructor(
    @InjectEntityManager('contact')
    private entityManager: EntityManager
  ) {}

  async addMsg(fName: string, lName: string, content: string, email: string) {
    return await this.entityManager.save(
      this.entityManager.create(ContactEntity, {
        first_name: fName,
        last_name: lName,
        content: content,
        email: email
      })
    )
  }

  async msgs() {
    return await this.entityManager.find(ContactEntity)
  }
}
