import { typograpy } from './typography'

const Base = {
  fontSize: 16,
  fontFamily: typograpy.primary,
}

const Base_Bold = {
  fontSize: 16,
  fontFamily: typograpy.primaryBold,
}

const Bold = {
  fontWeight: 'bold',
  fontFamily: typograpy.Bold,
}

export const presets = {
  default: Base,
  Bold: Bold,
  h1: {
    ...Bold,
    fontSize: 32,
  },
  h2: {
    ...Bold,
    fontSize: 26,
  },

  h3: {
    ...Bold,
    fontSize: 22,
  },

  h4: {
    ...Bold,
    fontSize: 16,
  },
  small: {
    ...Bold,
    fontSize: 14,
  },
}
