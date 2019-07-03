import { transformationSchema } from '../module/configSchema';

const getOrElse = (transformation, value, defaultValue = '') =>
  value ? `${transformation}:${value}` : defaultValue;

const getFnOrElse = (transformation, value, defaultValue = '') =>
  value ? transformation(value) : defaultValue;

const merge = (...args) => Object.assign(...args);

const getTransformationNamesFromSchema = schema => Object.keys(schema);

const resolveTransformation = (transformation, value) => {
  switch (transformation) {
    case 'resize':
      return getOrElse('rt', value);
    case 'width':
      return getOrElse('w', value);
    case 'height':
      return getOrElse('h', value);
    case 'enlarge':
      return getOrElse('el', value);
    case 'extend':
      return getOrElse('ex', value);
    case 'dpr':
      return getOrElse('dpr', value);
    case 'sharpen':
      return getOrElse('sh', value);
    case 'blur':
      return getOrElse('bl', value);
    case 'quality':
      return getOrElse('q', value);
    case 'extension':
    case 'format':
      return getOrElse('ext', value);
    case 'background':
      return getOrElse('bg', value);
    case 'preset':
      return getFnOrElse(preset => `pr:${preset.join(':')}`, value);
    case 'gravity':
      return getFnOrElse(
        ({ position = 'ce', xOffset = '0', yOffset = '0' }) =>
          `g:${position}:${xOffset}:${yOffset}`,
        value
      );
    case 'crop':
      return getFnOrElse(
        ({
          width = '0',
          height = '0',
          position = 'ce',
          xOffset = '0',
          yOffset = '0'
        }) => `c:${width}:${height}:${position}:${xOffset}:${yOffset}`,
        value
      );
    case 'watermark':
      return getFnOrElse(
        ({
          opacity = '1',
          scale = '1',
          position = 'ce',
          xOffset = '0',
          yOffset = '0'
        }) => `wm:${opacity}:${position}:${xOffset}:${yOffset}:${scale}`,
        value
      );
    default:
      throw new Error(`${transformation} not supported`);
  }
};

export default (...transformations) => {
  const mergedTransformations = merge(...transformations);
  return getTransformationNamesFromSchema(transformationSchema).map(
    transformation =>
      resolveTransformation(
        transformation,
        mergedTransformations[transformation]
      )
  );
};
