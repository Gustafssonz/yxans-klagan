import { getFormattedVillageName } from './village-name.functions'

describe('Village Name Functions', () => {
  const testChooseFunc = <T>(arr: readonly T[]): T => arr[0]

  describe('getVillageNameList', () => {
    it('should use Swedish list for sv', () => {
      const lang = 'sv'
      const expected = 'Bärnstentunnland'

      const result = getFormattedVillageName(lang, testChooseFunc)

      expect(result).toEqual(expected)
    })

    it('should return English list for en', () => {
      const lang = 'en'
      const expected = 'Amber Acres'

      const result = getFormattedVillageName(lang, testChooseFunc)

      expect(result).toEqual(expected)
    })
  })

  describe('capitalize', () => {
    it('should title case English names', () => {
      const lang = 'en'

      const expected = 'Amber Acres'

      const result = getFormattedVillageName(lang, testChooseFunc)

      expect(result).toEqual(expected)
    })

    it('should sentence case Swedish names', () => {
      const lang = 'sv'

      const expected = 'Bärnstentunnland'

      const result = getFormattedVillageName(lang, testChooseFunc)

      expect(result).toEqual(expected)
    })
  })

  describe('formatVillageName', () => {
    it('should not put space between prefix and suffix', () => {
      const expected = 'Bärnstentunnland'
      const lang = 'sv'
      const result = getFormattedVillageName(lang, testChooseFunc)

      expect(result).toEqual(expected)
    })

    it('should put space between prefix and suffix, and title case', () => {
      const expected = 'Amber Acres'
      const lang = 'en'
      const result = getFormattedVillageName(lang, testChooseFunc)

      expect(result).toEqual(expected)
    })
  })
})
