import { Injectable, Logger } from "@nestjs/common";
import { On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { stringSimilarity } from "string-similarity-js";
import { CoreService } from "../core/core.service";

@Injectable()
@Update()
export class TelegramService {
  private readonly logger = new Logger('Telegram');
  constructor(private schedulerRegistry: SchedulerRegistry,
              private coreService: CoreService) {
  }

  @Start()
  async sendScheduled(ctx: Context): Promise<void> {
    const user = ctx.from
    await this.coreService.create({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      userName: user.username,
      createdAt: new Date(),
    })
    const message = `Шось не нравиця?`
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

  @On('message')
  async onMessage(ctx: Context) {
    const initial = 'Шо не нравиця?'
    // @ts-ignore
    const message = ctx.message?.text;
    const response = `Ну шось не нравиця`
    const similarity1 = stringSimilarity(message, initial)
    const similarity2 = stringSimilarity(message, response)
    const similarity3 = stringSimilarity(message, 'А шо') > 0.8
    const similarity4 = stringSimilarity(message, 'Ты хто') > 0.6
    if (similarity1 > 0.6 && similarity1 > similarity2) {
       await ctx.reply(response)
      return
    }
    if (similarity2 > 0.8 && similarity2 > similarity1) {
       await ctx.reply('А шо?')
      return
    }
    if (similarity3) {
       await ctx.reply('Шось')
      return
    }
    if (similarity4) {
       await ctx.reply('Хтось')
      return
    }
    if (stringSimilarity(message, 'Шо ты делаешь') > 0.6) {
      await ctx.reply('Шось делаю')
      return
    }
    if (stringSimilarity(message, 'Це шо') > 0.6 || stringSimilarity(message, 'Шо це') > 0.6 || stringSimilarity(message, 'Шо это') > 0.6 || stringSimilarity(message, 'Это шо') > 0.6) {
      await ctx.reply('Шось')
      return
    }
    if (stringSimilarity(message, 'Ты бот') > 0.6) {
      await ctx.reply('Я Арнольд')
      return
    }
    if (stringSimilarity(message, 'Арнольд') > 0.6) {
      await ctx.reply('Бот')
      return
    }
    if (stringSimilarity(message, 'Как дела') > 0.6) {
      await ctx.reply('Да')
      return
    }
    if (stringSimilarity(message, 'Привет') > 0.6) {
      await ctx.reply('Шось не нравится?')
      return
    }
    await ctx.reply('Ладно')
  }
}
