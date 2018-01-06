import { Injectable } from '@angular/core';

/*
  Generated class for the ConverterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConverterProvider {

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
          // let gray = 0;
          // console.log(image.data[n].toString() + " " + image.data[n + 1].toString() + " " + image.data[n + 2].toString());
          // console.log(gray);
          if (gray < 170) {
            context.fillStyle = "#000";
            next_value += Math.pow(2, (7 - (x % 8)));
          } else {
            context.fillStyle = "#FFF";
          }
          context.fillRect(x, y, 1, 1);
          if (((x + 1) % 8 == 0 || x == image.width - 1) && (x > 0)) {
            if (opts.endian == 'big') {
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
      resolve(result);
    });
  }

  // img2BitmapArray2(context, image, opts): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     let result = '';
  //     // var locked = false;
  //     let next_value = 0
  //     let y = 0;
  //     let x = 0;
  //     let t = window.setInterval(() => {
  //       // for (var i = 0; y < 2; i++) {
  //       let imageData = context.getImageData(x, y, 1, 1).data;
  //       let gray = (imageData[0] * 1 + imageData[1] * 2 + imageData[2] * 1) >> 2;
  //       // let gray = 0;
  //       if (gray < 100) {
  //         context.fillStyle = "#000";
  //         next_value += Math.pow(2, (7 - (x % 8)));
  //       } else {
  //         context.fillStyle = "#FFF";
  //       }
  //       context.fillRect(x, y, 1, 1);
  //       if (((x + 1) % 8 == 0 || x == image.width - 1) && (x > 0)) {
  //         if (opts.endian == 'big') {
  //           next_value = this.reverseBit(next_value);
  //         }
  //         result += '0x' + ('00' + next_value.toString(16)).substr(-2) + ',';
  //         next_value = 0;
  //       }
  //       x++;
  //       if (x == image.width) {
  //         y++;
  //         x = 0;
  //         console.log(y);
  //       }
  //       if (y == image.height) {
  //         window.clearInterval(t);
  //         result = result.slice(0, result.length - 1) + '};';
  //         resolve(result);
  //       }
  //       // }
  //     }, 1);

      // for (var y = 0; y < image.height; y++) {
      //   let next_value = 0
      //   for (var x = 0; x < image.width; x++) {

      //     // locked = true;
      //   }
      // window.clearInterval(t);
      // result = result.slice(0, result.length - 1) + '};';
      // resolve(result);
  //   });
  // }

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
