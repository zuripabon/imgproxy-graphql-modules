<p align="center">
  <h1 align="center">ImgProxy GraphQL Module</h1>
</p>


## Description

The ImgProxy GraphQL module provides an [ImgProxy](https://github.com/imgproxy/imgproxy) URL generator. It exposes a GraphQL query which receives an image URL and the transformations to be applied to that image and returns a new secured URL which you can use to download the image with the specified transformations already applied.

## Installation

To install `imgproxy-graphql-module`, use the following:

```sh
yarn add @spotahome/imgproxy-graphql-module

# or with npm

npm install --save @spotahome/imgproxy-graphql-module
```

## Usage

Once `imgproxy-graphql-module` is installed, add to your GraphQL server like this:

```js
import ImgProxyModule from '@spotahome/imgproxy-graphql-module';
import { createSchema } from '@spotahome/soyuz-graphql-modules';

const schema = createSchema(ImgProxyModule, {
  ImgProxy: {
    salt: '<SECRET_SALT>', // required
    key: '<SECRET_KEY>', // required
    baseUrl: '<BASE_URL>', // optional - Normally points to the imgproxy server location (currently the monolith)
    defaultTransformations: {}, // optional - This is quite handy if want to apply same transformation to all your images (i.e. the watermark, the quality output image level, the output format or even a predefined preset)
  }
});
```

Then, for your client side code, run the GraphQL Query like this:

```js
query {
  imgProxyUrl(
    url: "<SOURCE_IMAGE_URL>"
    transformations: {
      width: 300
      height: 400
      resize: fill
      format: jpg
    }
  ) {
    url
  }
}
        
```

Wanna know all available image transformations? check out the transformations schema [here]()
