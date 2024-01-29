#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 */
// https://stackoverflow.com/a/42817956/1123955
// https://github.com/motdotla/dotenv/issues/89#issuecomment-587753552
import 'dotenv/config.js'

import {
  Wechaty,
  Contact,
  Message,
  ScanStatus,
  WechatyBuilder,
  log,
}                  from 'wechaty'
import { PuppetWhatsapp } from '@juzi/wechaty-puppet-whatsapp'

import qrcodeTerminal from 'qrcode-terminal'

import {
  memberJson,
  messageJson,
}                       from './schema.js'
import {
  upsertContact,
  insertMessage
}                       from './db.js'
import { analyze } from './llm.js'

let onDuty = false

function onScan (qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('')
    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

    qrcodeTerminal.generate(qrcode, { small: true })  // show qrcode on console

  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

async function onLogin (this: Wechaty, user: Contact) {
  log.info('StarterBot', '%s login', user)
}

function onLogout (user: Contact) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (this: Wechaty, msg: Message) {
  log.info('StarterBot', msg.toString())

  if (msg.text() === 'ding') {
    onDuty = !onDuty
    await msg.say('dong - onDuty: ' + onDuty)

    if (onDuty) {
      await updateMembers(this)
    }
  }

  if (onDuty) {
    // Convert message to json and add sentiment analysis
    await insertMessage({
      ...messageJson(msg),
      ...await analyze(msg.text()),
    })
  }
}

async function onReady () {
  log.info('onReady', 'onReady() fired')
}

async function updateMembers (wechaty: Wechaty) {
  log.info('StarterBot', 'updateMembers()')

  try {
    const room = await wechaty.Room.find({ topic: /LPM/i })
    if (room) {
      const members = await room.memberAll()
      log.info('StarterBot', 'onLogin() room.find() room.memberAll() %s', members.length)

      for (const member of members) {
        await upsertContact(memberJson(member))
      }

    } else {
      log.warn('StarterBot', 'onLogin() room.find() not found')
    }
  } catch (e) {
    log.error('StarterBot', 'onLogin() room.find() rejection: %s', e)
  }
}

async function main () {
  const bot = WechatyBuilder.build({
    name: 'wechaty-service',
    puppet: new PuppetWhatsapp() as any,
  })

  bot.on('scan',    onScan)
  bot.on('login',   onLogin)
  bot.on('logout',  onLogout)
  bot.on('message', onMessage)
  bot.on('ready',   onReady)

  try {
    await bot.start()
    log.info('StarterBot', 'Starter Bot Started.')
  } catch (e) {
    log.error('StarterBot', e)
  }

}

await main()
