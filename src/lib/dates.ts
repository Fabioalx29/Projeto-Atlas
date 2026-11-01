const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/
const DAY_MS = 24 * 60 * 60 * 1000

/** Converte "AAAA-MM-DD" em Date (UTC). Devolve `null` para datas inexistentes (ex.: 2026-02-30). */
export function parseIsoDate(value: string): Date | null {
  const match = ISO_DATE.exec(value)
  if (!match) return null
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])]
  const date = new Date(Date.UTC(year, month - 1, day))
  const valid =
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  return valid ? date : null
}

export function isValidIsoDate(value: string): boolean {
  return parseIsoDate(value) !== null
}

/** Formata uma data "AAAA-MM-DD" no idioma informado, sem deslocar o dia por fuso horário. */
export function formatIsoDate(value: string, locale: string): string {
  const date = parseIsoDate(value)
  if (!date) return value
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(date)
}

/** Quantidade de dias da viagem, contando ida e volta (mesmo dia = 1). */
export function tripLengthInDays(start: string, end: string): number | null {
  const from = parseIsoDate(start)
  const to = parseIsoDate(end)
  if (!from || !to || to < from) return null
  return Math.round((to.getTime() - from.getTime()) / DAY_MS) + 1
}

/** Data de hoje no fuso do usuário, como "AAAA-MM-DD". */
export function todayIso(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}
