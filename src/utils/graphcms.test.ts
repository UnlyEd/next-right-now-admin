import { prepareGraphCMSLocaleHeader, sanitizeMutationUpdateData } from './graphcms';
import { simpleMutation } from './mocks/mutations';

describe(`utils/graphcms.ts`, () => {
  describe(`prepareGraphCMSLocaleHeader`, () => {
    describe(`should clean properly the header locale`, () => {
      test(`when using 1 language`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr'])).toEqual(`FR`);
      });

      test(`when using 2 languages`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr', 'en'])).toEqual(`FR, EN`);
      });

      test(`when using 3 languages`, async () => {
        expect(prepareGraphCMSLocaleHeader(['fr', 'en', 'es'])).toEqual(`FR, EN, ES`);
      });
    });
  });

  describe(`sanitizeMutationUpdateData`, () => {
    describe(`should sanitize data and only keep actual changes`, () => {
      test(`when using a simple mutation`, async () => {
        expect(sanitizeMutationUpdateData(simpleMutation.data, simpleMutation.previousData)).toEqual({
          id: 'cjvzab1w104fi0910mr86obva',
          price: 5,
        });
      });
    });
  });
});
