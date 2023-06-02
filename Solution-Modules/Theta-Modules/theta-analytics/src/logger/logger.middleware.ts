import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { LoggerService } from './logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...')
    var crypto = require('crypto')
    // var name = 'braitsch';
    if (req.body.query) {
      const { parse, print } = require('graphql')
      const object = print(parse(req.body.query))
      console.log(object)
      const hash = crypto.createHash('md5').update(object).digest('hex')
      try {
        this.loggerService.addQueryLog(object, hash)
      } catch (e) {
        console.error(e)
      }
    }

    // await
    next()
  }
}
