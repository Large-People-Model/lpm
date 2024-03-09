#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { test } from 'tstest'

import {
  proGeminiV1,
}                   from './gemini.js'

test('smoke testing', async t => {
  const prompt = "What's different between these pictures?";
  const response = await proGeminiV1(
    prompt,
    ["tests/fixtures/dog.jpg", "tests/fixtures/cat.jpg"],
  );

  const EXPECTED_REGEX = /(?=.*\bdog\b)(?=.*\bcat\b)|(?=.*\bcat\b)(?=.*\bdog\b)/i
  t.ok(EXPECTED_REGEX.test(response), 'should mention "dog" and "cat" in the response')
})
