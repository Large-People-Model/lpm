#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test } from 'tstest'

import {
  insertMessage,
  mongoDbClose,
  mongoDbConnect,
  upsertContact,
}                   from './db.js'

test('upsertMembers', async t => {
  await mongoDbConnect()
  await upsertContact({
    id: 'id',
    name: 'name',
    friend: true,
  })
  await insertMessage({
    id: 'messageId',
    talkerName: 'talkerName',
    talkerId: 'talkerId',
    text: 'text',
  })

  await mongoDbClose()

  t.ok('check the db')
})
