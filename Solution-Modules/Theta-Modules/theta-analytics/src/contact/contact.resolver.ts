import { Args, Mutation, Resolver, Query, ResolveField } from '@nestjs/graphql'
import { ContactEntity } from './contact.entity'
import { ContactType } from './contact.model'
import { ContactService } from './contact.service'

@Resolver(() => ContactType)
export class ContactResolver {
  constructor(private contactService: ContactService) {}
  @Mutation((returns) => ContactEntity)
  async newMsg(
    @Args({
      name: 'first_name'
    })
    fName: string,
    @Args({
      name: 'last_name'
    })
    lName: string,

    @Args({
      name: 'email'
    })
    email: string,

    @Args({
      name: 'content'
    })
    content: string
  ) {
    return await this.contactService.addMsg(fName, lName, content, email)
  }

  //   @Query(() => ContactType)
  //   async Contact() {
  //     return {}
  //   }

  //   @ResolveField(() => [ContactEntity])
  //   async msgs() {
  //     return await this.contactService.msgs()
  //   }
}
