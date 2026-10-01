import type { Register } from 'claude-code'

const COLORS: Record<string, string> = {
  purple: '#5b21b6',
  blue: '#1e3a8a',
  indigo: '#3730a3',
  teal: '#115e59',
  green: '#166534',
  burgundy: '#881337',
  rust: '#9a3412',
  gold: '#854d0e',
  gray: '#3a3d42',
}
const DEFAULT = 'purple'
const names = Object.keys(COLORS).join(', ')

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'promptcolor',
      description: `Set the background color of your prompt lines (${names})`,
    })
    return next(e)
  })

  on('command.run', { command: 'promptcolor' }, async ($, e) => {
    const arg = e.args.trim().toLowerCase()
    const current = ((await $.store.get('color')) as string | undefined) ?? DEFAULT
    if (!arg) return { text: `Prompt color: ${current}. Options: ${names}. Or a hex value like #5b21b6.` }
    const valid = arg in COLORS || /^#[0-9a-f]{6}$/.test(arg)
    if (!valid) return { text: `Unknown color "${arg}". Options: ${names}, or a #rrggbb hex value.` }
    await $.store.set('color', arg)
    $.ui.invalidate('ui.render')
    return { text: `Prompt color set to ${arg}.` }
  })

  on(
    'ui.render',
    { component: 'UserMessage', props: { origin: { kind: 'composer' } } },
    async ($, e, next) => {
      if (e.props.isExpanded) return next(e)
      const { Box, Text } = $.ui.resolve(e)
      const pick = ((await $.store.get('color')) as string | undefined) ?? DEFAULT
      const bg = COLORS[pick] ?? pick
      return (
        <Box backgroundColor={bg}>
          <Text color="#ffffff" backgroundColor={bg}>
            {'> '}
            {e.props.text}
          </Text>
        </Box>
      )
    },
  )
}
