import { Injectable, Scope, ConsoleLogger } from '@nestjs/common'
const moment = require('moment')
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  minTs = 3
  //   logger = new Logger()
  timeMonitor(name: string, startTime: number) {
    const usedTime = moment().unix() - startTime
    if (usedTime > this.minTs) {
      this.log(name + ' used:' + usedTime)
    }
    // this.log('Please feed the cat!')
  }
}
