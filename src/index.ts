// This file is modified from https://github.com/Raidenneox/nonebot_plugin_CyberSensoji, under the MIT license
// Copyright Raidenneox 2022

import { Context, Schema, Random } from 'koishi'
import { qian } from './qian'
import { } from 'koishi-plugin-puppeteer'

export const name = 'cyber-sensoji'

export interface Config {
  imageMode: boolean
}

export const Config: Schema<Config> = Schema.object({
  imageMode: Schema.boolean()
    .description("以图片形式发送签文（需要puppeteer服务）")
    .default(false),
})

export const inject = {optional: ["puppeteer"]}

export function apply(ctx: Context, config: Config) {
  ctx.command("浅草寺抽签", "抽签")
    .action(async ({session}) => {
      const num = Random.int(1, 101)
      if (num >= 5) {
        if (config.imageMode) {
          if (ctx.puppeteer) {
            return ctx.puppeteer.render(
`<html>
  <head>
    <style>
      html {
        width: 25%;
        height: 0;
      }
      p {
        padding: 10px;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
    </style>
  </head>

  <body>
    <p>
${Random.pick(qian)}
    </p>
  </body>
</html>`
)
          } else {
            ctx.logger('cyber-sensoji').warn("未启用puppeteer服务，无法使用图片模式")
            return Random.pick(qian)
          }
        } else {
          return Random.pick(qian)
        }
      } else {
        return "是空签呢"
      }
    })
}
