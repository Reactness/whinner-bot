import { Injectable, Logger } from "@nestjs/common";
import {  Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
@Update()
export class TelegramService {
  private readonly logger = new Logger('Telegram');
  constructor(private schedulerRegistry: SchedulerRegistry) {
  }

  @Start()
  async sendScheduled(ctx: Context): Promise<void> {
    const user = ctx.from
    const message = `Шо не нравиця?`
    const jobName = `MessageFor${user.username}`
    const job = new CronJob(` 00 12 * * 0-6`,  async () => {
      await ctx.reply(message)
    },  async () => {
      this.logger.log(`Sent scheduled message at ${job.nextDate()}`)
    }, undefined, 'Europe/Moscow');
    const exists = this.schedulerRegistry.doesExists('cron', jobName)
    await ctx.reply(message)
    if (exists) {
      this.schedulerRegistry.deleteCronJob(jobName);
    }
      this.schedulerRegistry.addCronJob(jobName, job);
      job.start();
      this.logger.log(`Scheduled message at ${job.nextDate()}`)
      return
  }
}
