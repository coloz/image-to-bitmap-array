import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConverterProvider } from '../../providers/converter/converter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ConverterProvider]
})
export class HomePage {

  imageData;
  image;
  result: string;
  endian = 'big';
  fileFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
  @ViewChild("myCanvas") myCanvas;

  constructor(
    private sanitizer: DomSanitizer,
    private converter: ConverterProvider
  ) {
  }

  choseImage(event) {
    console.log("chose image");
    var file = event.currentTarget.files[0];
    if (!this.fileFilter.test(file.type)) {
      alert("你上传的不是图片文件");
      return;
    }
    this.imageData = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

    let context = this.myCanvas.nativeElement.getContext("2d");
    this.image = new Image();
    this.result = 'const unsigned char arduino[] = {';
    this.image.src = window.URL.createObjectURL(file);
    this.image.onload = () => {
      context.drawImage(this.image, 0, 0);
      for (var y = 0; y < this.image.height; y++) {
        let next_value = 0
        for (var x = 0; x < this.image.width; x++) {

          let imageData = context.getImageData(x, y, 1, 1).data;
          let Gray = (imageData[0] * 1 + imageData[1] * 2 + imageData[2] * 1) >> 2;

          if (Gray < 200) {
            context.fillStyle = "#000";
            next_value += Math.pow(2, (7 - (x % 8)));
          } else {
            context.fillStyle = "#FFF";
          }
          context.fillRect(x, y, 1, 1);
          if (((x + 1) % 8 == 0 || x == this.image.width - 1) && (x > 0)) {
            if (this.endian == 'big') {
              next_value = this.reverseBit(next_value);
            }
            this.result += '0x' + ('00' + next_value.toString(16)).substr(-2) + ',';
            next_value = 0;
          }
        }
      }
      this.result = this.result.slice(0, this.result.length - 1) + '};';
    }

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
