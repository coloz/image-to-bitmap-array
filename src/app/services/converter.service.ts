import { Injectable } from '@angular/core';
import { convertOptions } from '../models/convert.model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  context: CanvasRenderingContext2D;
  image: ImageData;
  options: convertOptions;

  convert(context: CanvasRenderingContext2D, image: ImageData, options: convertOptions) {
    return new Promise<string>((resolve, reject) => {
      this.context = context;
      this.image = image;
      this.options = options;
      if (this.options.dither) {
        this.dither()
      } else {
        this.pickColor()
      }
      if (this.options.invert) {
        this.invertColor()
      }
      resolve(this.getBitmapArray())
      // return this.getBitmapArray()
      // return result
    })
  }

  dither() {
    let newImageData = this.context.createImageData(this.image.width, this.image.height)
    let imageArray = newImageData.data
    // convert to grayscale
    for (let i = 0; i < this.image.data.length; i += 4) {
      let gray = (this.image.data[i] * 4 + this.image.data[i + 1] * 10 + this.image.data[i + 2] * 2) >> 4;
      imageArray[i] = imageArray[i + 1] = imageArray[i + 2] = gray;
      imageArray[i + 3] = this.image.data[i + 3];
    }
    for (let i = 0; i < this.image.data.length; i += 4) {
      if (imageArray[i + (this.image.width * 4)] === -1 || imageArray[i + 4] === -1) {
        break;
      } else {
        let oldPixel = imageArray[i];
        let newPixel = this.findClosestPalCol(imageArray[i]);
        imageArray[i] = imageArray[i + 1] = imageArray[i + 2] = newPixel;
        let quantError = oldPixel - newPixel;
        imageArray[i + 4] = imageArray[i + 4] + quantError * (7 / 16);
        imageArray[i + (this.image.width * 4)] = imageArray[i + (this.image.width * 4)] + quantError * (5 / 16);
        imageArray[i + (this.image.width * 4 - 4)] = imageArray[i + (this.image.width * 4 - 4)] + quantError * (3 / 16);
        imageArray[i + (this.image.width * 4 + 4)] = imageArray[i + (this.image.width * 4 + 4)] + quantError * (1 / 16);
      }
    }
    this.context.putImageData(newImageData, 0, 0);
    this.image = newImageData;
  }

  findClosestPalCol(srcPx) {
    if (256 - srcPx < 256 / 2) {
      return 255;
    } else {
      return 0;
    }
  }

  pickColor() {
    let newImageData = this.context.createImageData(this.image.width, this.image.height)
    let imageArray = newImageData.data
    // convert to grayscale
    for (let i = 0; i < this.image.data.length; i += 4) {
      let gray = (this.image.data[i] * 4 + this.image.data[i + 1] * 10 + this.image.data[i + 2] * 2) >> 4;
      if (gray < this.options.threshold) {
        imageArray[i] = imageArray[i + 1] = imageArray[i + 2] = 0
      } else {
        imageArray[i] = imageArray[i + 1] = imageArray[i + 2] = 255
      }
      imageArray[i + 3] = this.image.data[i + 3];
    }
    this.context.putImageData(newImageData, 0, 0);
    this.image = newImageData;
  }

  invertColor() {
    let newImageData = this.context.createImageData(this.image.width, this.image.height)
    let imageArray = newImageData.data
    for (let i = 0; i < imageArray.length; i += 4) {
      imageArray[i] = 255 - this.image.data[i];
      imageArray[i + 1] = 255 - this.image.data[i + 1];
      imageArray[i + 2] = 255 - this.image.data[i + 2];
      imageArray[i + 3] = this.image.data[i + 3];
    }
    this.context.putImageData(newImageData, 0, 0);
    this.image = newImageData;
  }

  getBitmapArray() {
    let result = '';
    for (var y = 0; y < this.image.height; y++) {
      let next_value = 0
      for (var x = 0; x < this.image.width; x++) {
        let n = (y * this.image.width + x) * 4
        let gray = (this.image.data[n] * 4 + this.image.data[n + 1] * 10 + this.image.data[n + 2] * 2) >> 4;
        if (gray == 255) next_value += Math.pow(2, (7 - (x % 8)));

        if (((x + 1) % 8 == 0 || x == this.image.width - 1) && (x > 0)) {
          if (this.options.endian) {
            next_value = this.reverseBit(next_value);
          }
          result += '0x' + ('00' + next_value.toString(16)).substr(-2) + ',';
          next_value = 0;
        }
      }
    }
    result = result.slice(0, result.length - 1);
    return result
  }

  reverseBit(data) {
    let res = 0;
    for (var x = 0; x < 8; x++) {
      res = res << 1
      res = res | (data & 1)
      data = data >> 1
    }
    return res
  }


}
