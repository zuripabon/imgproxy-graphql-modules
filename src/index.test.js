import { execute } from 'graphql';
import { createSchema } from '@spotahome/soyuz-graphql-modules';
import gql from 'graphql-tag';

import ImgProxyModule from './index';

describe('ImgProxyModule', () => {
  describe('config schema', () => {
    it('should fail if no salt is given', () => {
      expect(() =>
        createSchema(ImgProxyModule, {
          ImgProxy: {
            key: ''
          }
        })
      ).toThrow();
    });
    it('should fail if no key is given', () => {
      expect(() =>
        createSchema(ImgProxyModule, {
          ImgProxy: {
            salt: ''
          }
        })
      ).toThrow();
    });
    it('should not fail if key and salt are given', () => {
      expect(() =>
        createSchema(ImgProxyModule, {
          ImgProxy: {
            salt: 'salt',
            key: 'key'
          }
        })
      ).not.toThrow();
    });
  });
  describe('execute query [integration]', () => {
    it('should return img proxy url signed', async () => {
      const schema = createSchema(ImgProxyModule, {
        ImgProxy: {
          salt: 'salt',
          key: 'key',
          baseUrl: 'https://imgproxy.spotahome.com/'
        }
      });

      const result = await execute({
        schema,
        document: gql`
          query {
            imgProxyUrl(
              url: "https://landlord-thumbnails-local.s3-accelerate.amazonaws.com/images-test/e…d32e-5a93-48f3-b026-dfa6070c3d67/702816/1562001222674.9b57fe4f5a7130cc.jpg"
              transformations: {
                width: 300
                height: 400
                resize: fill
                format: jpg
                gravity: { position: no, xOffset: 0, yOffset: 100 }
                crop: {
                  width: 250
                  height: 250
                  position: nowe
                  xOffset: 200
                  yOffset: 100
                }
              }
            ) {
              url
            }
          }
        `
      });

      const actualResult = result.data.imgProxyUrl.url;
      const expectedResult =
        'https://imgproxy.spotahome.com/hvLDa4m4XWqxMsJE4wmXsEJ4Zd_Hb-VDfDs6FeFgHlk/rt:fill/w:300/h:400/g:no:0:100/c:250:250:nowe:200:100/ext:jpg/aHR0cHM6Ly9sYW5kbG9yZC10aHVtYm5haWxzLWxvY2FsLnMzLWFjY2VsZXJhdGUuYW1hem9uYXdzLmNvbS9pbWFnZXMtdGVzdC9l4oCmZDMyZS01YTkzLTQ4ZjMtYjAyNi1kZmE2MDcwYzNkNjcvNzAyODE2LzE1NjIwMDEyMjI2NzQuOWI1N2ZlNGY1YTcxMzBjYy5qcGc';

      expect(result.errors).toBeFalsy();
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
