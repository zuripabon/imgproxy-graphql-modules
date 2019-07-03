import { sign, toBase64 } from '../utils/url';

import ImgProxyModel from './model';

const config = {
  baseUrl: 'http://imgproxy.spotahome.com/',
  salt: '',
  key: ''
};
let model;

describe('ImgProxyModel', () => {
  beforeEach(() => {
    model = new ImgProxyModel(config);
  });

  describe('generateTransformationsUrl()', () => {
    it('should return empty string if no transformations are given', () => {
      const actualResult = model.generateTransformationsUrl();
      const expectedResult = '';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle width transformation', () => {
      const actualResult = model.generateTransformationsUrl({ width: 200 });
      const expectedResult = 'w:200';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle height transformation', () => {
      const actualResult = model.generateTransformationsUrl({ height: 200 });
      const expectedResult = 'h:200';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle resize transformation', () => {
      const actualResult = model.generateTransformationsUrl({ resize: 'auto' });
      const expectedResult = 'rt:auto';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle enlarge transformation', () => {
      const actualResult = model.generateTransformationsUrl({ enlarge: 1 });
      const expectedResult = 'el:1';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle extend transformation', () => {
      const actualResult = model.generateTransformationsUrl({ extend: 1 });
      const expectedResult = 'ex:1';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle dpr transformation', () => {
      const actualResult = model.generateTransformationsUrl({ dpr: 1 });
      const expectedResult = 'dpr:1';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle sharpen transformation', () => {
      const actualResult = model.generateTransformationsUrl({ sharpen: 0.71 });
      const expectedResult = 'sh:0.71';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle blur transformation', () => {
      const actualResult = model.generateTransformationsUrl({ blur: 0.1 });
      const expectedResult = 'bl:0.1';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle quality transformation', () => {
      const actualResult = model.generateTransformationsUrl({ quality: '60%' });
      const expectedResult = 'q:60%';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle extension transformation', () => {
      const actualResult = model.generateTransformationsUrl({
        extension: 'png'
      });
      const expectedResult = 'ext:png';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle background RGB transformation', () => {
      const actualResult = model.generateTransformationsUrl({
        background: '255:255:255'
      });
      const expectedResult = 'bg:255:255:255';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle preset transformation', () => {
      const actualResult = model.generateTransformationsUrl({
        preset: ['spotahome-basic', 'spotahome-landlord']
      });
      const expectedResult = 'pr:spotahome-basic:spotahome-landlord';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle gravity transformation', () => {
      const actualResult = model.generateTransformationsUrl({
        gravity: {
          position: 'no'
        }
      });
      const expectedResult = 'g:no:0:0';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle crop transformation', () => {
      const actualResult = model.generateTransformationsUrl({
        crop: {
          width: 100,
          height: 100,
          position: 'no'
        }
      });
      const expectedResult = 'c:100:100:no:0:0';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle watermark transformation', () => {
      const actualResult = model.generateTransformationsUrl({
        watermark: {
          opacity: 0.2,
          scale: 0.5
        }
      });
      const expectedResult = 'wm:0.2:ce:0:0:0.5';

      expect(actualResult).toEqual(expectedResult);
    });

    it('should handle multiple transformation', () => {
      const actualResult = model.generateTransformationsUrl({
        width: 200,
        height: 200,
        resize: 'fill'
      });
      const expectedResult = 'rt:fill/w:200/h:200';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle complex transformation', () => {
      const actualResult = model.generateTransformationsUrl({
        width: 200,
        height: 200,
        resize: 'fill',
        gravity: {
          position: 'no'
        }
      });
      const expectedResult = 'rt:fill/w:200/h:200/g:no:0:0';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should handle default transformations', () => {
      model = new ImgProxyModel({
        ...config,
        defaultTransformations: {
          quality: '80%'
        }
      });
      const actualResult = model.generateTransformationsUrl({
        width: 200,
        height: 200,
        resize: 'fill',
        gravity: {
          position: 'no'
        }
      });
      const expectedResult = 'rt:fill/w:200/h:200/g:no:0:0/q:80%';

      expect(actualResult).toEqual(expectedResult);
    });
    it('should not overwrite transformation param with defaults', () => {
      model = new ImgProxyModel({
        ...config,
        width: 400
      });
      const actualResult = model.generateTransformationsUrl({
        width: 200,
        height: 200,
        resize: 'fill',
        gravity: {
          position: 'no'
        }
      });
      const expectedResult = 'rt:fill/w:200/h:200/g:no:0:0';

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('generateSecureImgProxyUrl', () => {
    it('should fail to sign the url if no salt and key are given ', () => {
      model = new ImgProxyModel({
        ...config,
        salt: undefined,
        key: undefined
      });
      const transformationsUrl = 'rt:fill/w:200/h:200/g:no:0:0';
      expect(() =>
        model.generateSecureImgProxyUrl(transformationsUrl)
      ).toThrow();
    });
    it('should sign the url', () => {
      const salt = 'salt';
      const key = 'key';
      model = new ImgProxyModel({
        ...config,
        salt,
        key
      });
      const transformationsUrl = 'rt:fill/w:200/h:200/g:no:0:0';
      const signedUrl = sign(transformationsUrl, salt, key);

      const actualResult = model.generateSecureImgProxyUrl(transformationsUrl);
      const expectedResult = `${signedUrl}/rt:fill/w:200/h:200/g:no:0:0`;

      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('execute', () => {
    it('should return signed relative url if no baseUrl is given', () => {
      const salt = 'salt';
      const key = 'key';
      model = new ImgProxyModel({
        ...config,
        salt,
        key,
        baseUrl: undefined
      });
      const originalUrl = 'http://somewhere/a/picture_with_@escaping.jpg';
      const transformations = {
        width: 200,
        height: 200,
        resize: 'fill',
        gravity: {
          position: 'no'
        }
      };
      const signedUrl = sign(
        `rt:fill/w:200/h:200/g:no:0:0/${toBase64(originalUrl)}`,
        salt,
        key
      );

      const actualResult = model.execute(originalUrl, transformations);
      const expectedResult = {
        url: `${signedUrl}/rt:fill/w:200/h:200/g:no:0:0/${toBase64(
          originalUrl
        )}`
      };

      expect(actualResult).toEqual(expectedResult);
    });
    it('should return signed absolute url if baseUrl is given', () => {
      const salt = 'salt';
      const key = 'key';
      const baseUrl = 'https://imgproxy.spotahome.com/';
      model = new ImgProxyModel({
        ...config,
        salt,
        key,
        baseUrl
      });
      const originalUrl =
        'http://somewhere/a/picture_with_@&%·324_characters.jpg';
      const transformations = {
        width: 200,
        height: 200,
        resize: 'fill',
        gravity: {
          position: 'no'
        }
      };
      const signedUrl = sign(
        `rt:fill/w:200/h:200/g:no:0:0/${toBase64(originalUrl)}`,
        salt,
        key
      );

      const actualResult = model.execute(originalUrl, transformations);
      const expectedResult = {
        url: `${baseUrl}${signedUrl}/rt:fill/w:200/h:200/g:no:0:0/${toBase64(
          originalUrl
        )}`
      };

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
