const isProduction = import.meta.env.PROD

const noop = () => {}

export const logger = {
  log: isProduction ? noop : console.log.bind(console),
  info: isProduction ? noop : console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  debug: isProduction ? noop : console.debug.bind(console),
  table: isProduction ? noop : console.table.bind(console),
  group: isProduction ? noop : console.group.bind(console),
  groupEnd: isProduction ? noop : console.groupEnd.bind(console),
}

if (isProduction) {
  window.console.log = noop
  window.console.info = noop
  window.console.debug = noop
  window.console.table = noop
  window.console.group = noop
  window.console.groupEnd = noop
}
