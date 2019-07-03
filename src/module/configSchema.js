import { TypeCheckers } from '@spotahome/soyuz-graphql-modules';

export const transformationSchema = {
  /*
    Defines how imgproxy will resize the source image. Supported resizing types are:
      * fit: resizes the image while keeping aspect ratio to fit given size;
      * fill: resizes the image while keeping aspect ratio to fill given size and cropping projecting parts;
      * auto: if both source and resulting dimensions have the same orientation (portrait or landscape),
      imgproxy will use fill. Otherwise, it will use fit.
  */
  resize: TypeCheckers.string,
  /*
    Defines the width of the resulting image.
    When set to 0, imgproxy will calculate the resulting width using the defined height and source aspect ratio.
  */
  width: TypeCheckers.number,
  /*
    Defines the height of the resulting image. ç
    When set to 0, imgproxy will calculate resulting height using the defined width and source aspect ratio.
  */
  height: TypeCheckers.number,
  /*
    When set, imgproxy will multiply the image dimensions according to this factor for HiDPI (Retina) devices.
    The value must be greater than 0.
  */
  dpr: TypeCheckers.number,
  /*
    If set to 0, imgproxy will not enlarge the image if it is smaller than the given size.
    Whatever any other value, imgproxy will enlarge the image.
  */
  enlarge: TypeCheckers.boolean,
  /*
    If set to 0, imgproxy will not extend the image if the resizing result is smaller than the given size.
    Whatever any other value, imgproxy will extend the image to the given size.
  */
  extend: TypeCheckers.number,
  /*
    When imgproxy needs to cut some parts of the image, it is guided by the gravity.
    * position - specifies the gravity type. Available values:
      no: north (top edge);
      so: south (bottom edge);
      ea: east (right edge);
      we: west (left edge);
      noea: north-east (top-right corner);
      nowe: north-west (top-left corner);
      soea: south-east (bottom-right corner);
      sowe: south-west (bottom-left corner);
      ce: center.
    * xOffset, yOffset - (optional) specify gravity offset by X and Y axes.
  */
  gravity: TypeCheckers.shape({
    position: TypeCheckers.string,
    xOffset: TypeCheckers.number,
    yOffset: TypeCheckers.number
  }),
  /*
    Defines an area of the image to be processed (crop before resize).
    * width and height - define the size of the area.
      When width or height is set to 0, imgproxy will use the full width/height of the source image.
    * position, xOffset, yOffset - accepts the same values as gravity options.
  */
  crop: TypeCheckers.shape({
    width: TypeCheckers.number,
    height: TypeCheckers.number,
    position: TypeCheckers.string,
    xOffset: TypeCheckers.number,
    yOffset: TypeCheckers.number
  }),
  /*
    Redefines quality of the resulting image, percentage from 0-100
    i.e. {quality: "60%"}
  */
  quality: TypeCheckers.string,
  /*
    When set, imgproxy will fill the resulting image background with the specified color.
    R, G, and B are red, green and blue channel values of the background color (0-255).
    hex_color is a hex-coded value of the color. Useful when you convert an image with alpha-channel to JPEG.

    i.e. {background: "255.255.255"}
  */
  background: TypeCheckers.string,
  /*
    When set, imgproxy will apply the gaussian blur filter to the resulting image.
    sigma defines the size of a mask imgproxy will use.

    i.e. {blur: "0.1"}
  */
  blur: TypeCheckers.number,
  /*
    When set, imgproxy will apply the sharpen filter to the resulting image.
    sigma the size of a mask imgproxy will use.

    As an approximate guideline, use 0.5 sigma for 4 pixels/mm (display resolution),
    1.0 for 12 pixels/mm and 1.5 for 16 pixels/mm (300 dpi == 12 pixels/mm).

    i.e. {sharpen: "1"}
  */
  sharpen: TypeCheckers.number,
  /*
    Puts watermark on the processed image.
    * opacity - watermark opacity modifier.
    * position - (optional) specifies the position of the watermark. Available values:
      ce: (default) center;
      no: north (top edge);
      so: south (bottom edge);
      ea: east (right edge);
      we: west (left edge);
      noea: north-east (top-right corner);
      nowe: north-west (top-left corner);
      soea: south-east (bottom-right corner);
      sowe: south-west (bottom-left corner);
      re: replicate watermark to fill the whole image;
    * xOffset, yOffset - (optional) specify watermark offset by X and Y axes. Not applicable to re position;
    * scale - (optional) floating point number that defines watermark size relative to the resulting image size.
      When set to 0 or omitted, watermark size won't be changed.
  */
  watermark: TypeCheckers.shape({
    opacity: TypeCheckers.number,
    position: TypeCheckers.string,
    xOffset: TypeCheckers.number,
    yOffset: TypeCheckers.number,
    scale: TypeCheckers.number
  }),
  /*
    Apply a defined list of presets to be used by imgproxy.
  */
  preset: TypeCheckers.string,
  /*
    Extension specifies the format of the resulting image.
    At the moment, imgproxy supports jpg, png, webp, gif, ico and heic
  */
  extension: TypeCheckers.string,
  format: TypeCheckers.string
};

export default {
  salt: TypeCheckers.string.isRequired,
  key: TypeCheckers.string.isRequired,
  baseUrl: TypeCheckers.string,
  defaultTransformations: TypeCheckers.shape(transformationSchema)
};
