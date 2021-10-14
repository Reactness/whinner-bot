import { Injectable, Logger } from "@nestjs/common";
import { InjectBot, On, Start, Update } from "nestjs-telegraf";
import { Context, Scenes, Telegraf } from "telegraf";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { stringSimilarity } from "string-similarity-js";
import { CoreService } from "../core/core.service";


interface TelegrafContext extends Scenes.SceneContext {}

@Injectable()
@Update()
export class TelegramService {
  private readonly logger = new Logger('Telegram');
  constructor(private schedulerRegistry: SchedulerRegistry,
              private coreService: CoreService,
              @InjectBot() private bot: Telegraf<TelegrafContext>) {
  }

  @Start()
  async sendScheduled(ctx: Context): Promise<void> {
    const user = ctx.from
    await this.coreService.createUser({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      userName: user.username,
      createdAt: new Date(),
    })
    const message = `Шось не нравиця?`
    const jobName = `MessageFor${user.username}`
    const job = new CronJob(` 00 12 * * 0-6`, async () => {
      await ctx.reply(message)
    }, async () => {
      this.logger.log(`Sent scheduled message at ${job.nextDate()}`)
    }, undefined, 'Europe/Moscow');
    const exists = this.schedulerRegistry.doesExists('cron', jobName)
    await ctx.reply(message)
    if (exists) {
      this.schedulerRegistry.deleteCronJob(jobName);
    }
    try {
      this.schedulerRegistry.addCronJob(jobName, job);
    job.start();
    this.logger.log(`Scheduled message at ${job.nextDate()}`)
    return
    } catch (e) {
      this.logger.error(e)
    }
  }

  @On('message')
  async onMessage(ctx: Context) {
    const initial = 'Шо не нравиця?'
    // @ts-ignore
    const message = ctx.message?.text;
    let response: string
    const user = ctx.from
    const responseMessage = `Ну шось не нравиця`
    const similarity1 = stringSimilarity(message, initial)
    const similarity2 = stringSimilarity(message, responseMessage)
    const similarity3 = stringSimilarity(message, 'А шо') > 0.8
    const similarity4 = stringSimilarity(message, 'Ты хто') > 0.6
    if (similarity1 > 0.6 && similarity1 > similarity2) {
      response = (await ctx.reply(responseMessage)).text
    }
    if (similarity2 > 0.6 && similarity2 > similarity1) {
      response = (await ctx.reply('А шо?')).text
    }
    if (similarity3) {
      response = (await ctx.reply('Шось')).text
    }
    if (similarity4) {
      response = (await ctx.reply('Хтось')).text
    }
    if (stringSimilarity(message, 'Шо ты делаешь') > 0.6) {
      response = (await ctx.reply('Шось делаю')).text
    }
    if (stringSimilarity(message, 'Це шо') > 0.6 || stringSimilarity(message, 'Шо це') > 0.6 || stringSimilarity(message, 'Шо это') > 0.6 || stringSimilarity(message, 'Это шо') > 0.6) {
      response = (await ctx.reply('Шось')).text
    }
    if (stringSimilarity(message, 'Ты бот') > 0.6) {
      response = (await ctx.reply('Я Арнольд')).text
    }
    if (stringSimilarity(message, 'Арнольд') > 0.6) {
      response = (await ctx.reply('Бот')).text
    }
    if (stringSimilarity(message, 'Как дела') > 0.6) {
      response = (await ctx.reply('Да')).text
    }
    if (stringSimilarity(message, 'Привет') > 0.6) {
      response = (await ctx.reply('Шось не нравится?')).text
    }
    if (!response) {
      response = (await ctx.reply('Ладно')).text
    }
    await this.coreService.processMessage(user, message, response);
  }
}
