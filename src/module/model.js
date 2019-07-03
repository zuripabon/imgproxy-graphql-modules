import transformationMapper from '../utils/transformations';
import { compose, toBase64, sign } from '../utils/url';

class ImgProxyModel {
  constructor({ baseUrl, salt, key, defaultTransformations = {} }) {
    this.baseUrl = baseUrl;
    this.defaultTransformations = defaultTransformations;
    this.salt = salt;
    this.key = key;
  }

  generateTransformationsUrl(transformations) {
    return compose(
      ...transformationMapper(this.defaultTransformations, transformations)
    );
  }

  generateSecureImgProxyUrl(transformationsUrl) {
    return compose(
      sign(transformationsUrl, this.salt, this.key),
      transformationsUrl
    );
  }

  execute(sourceImageUrl, transformations = {}) {
    const transformationsUrl = compose(
      this.generateTransformationsUrl(transformations),
      toBase64(sourceImageUrl)
    );

    return {
      url: compose(
        this.baseUrl,
        this.generateSecureImgProxyUrl(transformationsUrl)
      )
    };
  }
}

export default ImgProxyModel;
