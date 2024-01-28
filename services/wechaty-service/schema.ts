import type {
  Contact,
  Message,
}                     from 'wechaty'

export function messageJson(message: Message) {
  const messageJson = {
    id: message.id,
    talkerName: message.talker().name(),
    talkerId: message.talker().id,
    text: message.text(),
  }
  return messageJson
}

export function memberJson(member: Contact) {
  const memberJson = {
    id: member.id,
    name: member.name(),
    friend: member.friend(),
  }
  return memberJson
}
