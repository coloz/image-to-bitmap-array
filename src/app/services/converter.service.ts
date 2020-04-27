import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  img2BitmapArray(context, image, opts): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let result = '';
      for (var y = 0; y < image.height; y++) {
        let next_value = 0
        for (var x = 0; x < image.width; x++) {

          let n = (y * image.width + x) * 4
          let gray = (image.data[n] * 4 + image.data[n + 1] * 10 + image.data[n + 2] * 2) >> 4; // 4位精度

          let inverse: boolean;
          if (opts.color) {
            inverse = gray > opts.threshold
          } else {
            inverse = gray < opts.threshold
          }
          if (inverse) {
            context.fillStyle = "#000";
            next_value += Math.pow(2, (7 - (x % 8)));
          } else {
            context.fillStyle = "#FFF";
          }
          context.fillRect(x, y, 1, 1);

          // 灰度转网点

          if (((x + 1) % 8 == 0 || x == image.width - 1) && (x > 0)) {
            if (opts.endian) {
              next_value = this.reverseBit(next_value);
            }
            result += '0x' + ('00' + next_value.toString(16)).substr(-2) + ',';
            next_value = 0;
          }
        }
      }

      result = result.slice(0, result.length - 1) + '};';
      console.log("转换成功");
      // this.dither(context)
      resolve(result);
    });
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


  dither(context) {
    let idataSrc = context.getImageData(0, 0, 128, 64),
      idataTrg = context.createImageData(128, 64),
      dataSrc = idataSrc.data,
      dataTrg = idataTrg.data,
      len = dataSrc.length, luma;
    // convert to grayscale
    for (let i = 0; i < len; i += 4) {
      luma = dataSrc[i] * 0.2126 + dataSrc[i + 1] * .7152 + dataSrc[i + 2] * .0722;
      dataTrg[i] = dataTrg[i + 1] = dataTrg[i + 2] = luma;
      dataTrg[i + 3] = dataSrc[i + 3];
    }

    for (let i = 0; i < len; i += 4) {
      if (dataTrg[i + (128 * 4)] === -1 || dataTrg[i + 4] === -1) {
        break;
      } else {
        let oldPixel = dataTrg[i];

        let newPixel = this.findClosestPalCol(dataTrg[i]);

        dataTrg[i] = dataTrg[i + 1] = dataTrg[i + 2] = newPixel;
        let quantError = oldPixel - newPixel;
        dataTrg[i + 4] = dataTrg[i + 4] + quantError * (7 / 16);
        dataTrg[i + (128 * 4)] = dataTrg[i + (128 * 4)] + quantError * (5 / 16);
        dataTrg[i + (128 * 4 - 4)] = dataTrg[i + (128 * 4 - 4)] + quantError * (3 / 16);
        dataTrg[i + (128 * 4 + 4)] = dataTrg[i + (128 * 4 + 4)] + quantError * (1 / 16);
      }

    }

    context.putImageData(idataTrg, 0, 0);

  };

  findClosestPalCol(srcPx) {
    if (256 - srcPx < 256 / 2) {
      return 255;
    } else {
      return 0;
    }

  }

}
