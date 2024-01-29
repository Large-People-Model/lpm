#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test } from 'tstest'

import {
  analyze,
}                   from './llm.js'

test('smoke testing', async t => {
  const sentiment = "i love it";
  const json = await analyze(sentiment);

  const EXPECTED_JSON = {
    sentiment: 1,
    flagged: 0,
  } as const

  t.same(json, EXPECTED_JSON, 'should get the expected json')
})

test('smoke testing for negative sentiment', async t => {
  const sentiment = "i hate it";
  const json = await analyze(sentiment);

  const EXPECTED_JSON = {
    sentiment: -1,
    flagged: 0,
  } as const

  t.same(json, EXPECTED_JSON, 'should get sentiment to be -1')
})

test('set flagged for sex related', async t => {
  const sentiment = "get naked baby";
  const json = await analyze(sentiment);

  const EXPECTED_FLAGGED = 1

  t.same(json?.flagged, EXPECTED_FLAGGED, 'should get the `flagged` to be 1')
})
