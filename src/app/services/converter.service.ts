import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() {
    console.log('Hello ConverterProvider Provider');
  }

  img2BitmapArray(context, image, opts): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let result = '';
      for (var y = 0; y < image.height; y++) {
        let next_value = 0
        for (var x = 0; x < image.width; x++) {

          let n = (y * image.width + x) * 4
          // let pixel = image.data[x];
          let gray = (image.data[n] * 1 + image.data[n + 1] * 2 + image.data[n + 2] * 1) >> 2;
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
          if (((x + 1) % 8 == 0 || x == image.width - 1) && (x > 0)) {
            if (opts.endian) {
              next_value = this.reverseBit(next_value);
            }
            result += '0x' + ('00' + next_value.toString(16)).substr(-2) + ',';
            next_value = 0;
          }
          // locked = true;
        }
      }
      // window.clearInterval(t);
      result = result.slice(0, result.length - 1) + '};';
      console.log("转换成功");
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

}
