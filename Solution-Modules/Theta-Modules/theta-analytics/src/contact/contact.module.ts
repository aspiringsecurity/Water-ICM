import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContactEntity } from './contact.entity'
import { ContactResolver } from './contact.resolver'
import { ContactService } from './contact.service'

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity], 'contact')],
  providers: [ContactService, ContactResolver],
  exports: []
})
export class ContactModule {}
