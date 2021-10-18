import { Injectable, Logger } from "@nestjs/common";
import { InjectBot, On, Start, Update } from "nestjs-telegraf";
import { Context, Scenes, Telegraf } from "telegraf";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
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


  @Cron(CronExpression.EVERY_DAY_AT_NOON, {
    timeZone: 'Europe/Kiev'
  })
  async sendScheduled(): Promise<void> {
    try {
      const chats = await this.coreService.getChats();
      const message = `Шо не нравиця?`
      for (const chat of chats) {
        await this.bot.telegram.sendMessage(chat, message);
      }
    } catch (e) {
      this.logger.error(e)
    }
  }

  @Start()
  async start(ctx: Context): Promise<void> {
    try {
      const user = ctx.from
      const chat: string = ctx.chat.id.toString();
      const initial = 'Шо не нравиця?'
      await this.coreService.createUser({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        userName: user.username,
        createdAt: new Date(),
        chatId: chat,
      })
      await ctx.reply(initial);
    } catch (e) {
      this.logger.error(e)
    }
  }


  @On('message')
  async onMessage(ctx: Context) {
    try {
      // @ts-ignore
      const message = ctx.message?.text;
      const user = ctx.from
      let response: string
      if (message) {
      const initial = 'Шо не нравиця?'
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
    } else {
        response = (await ctx.reply('Ладно')).text
      }
      await this.coreService.processMessage(user, message, response);
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
