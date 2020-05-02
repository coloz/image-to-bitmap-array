# convert image to C bitmap array  
一个纯前端的图片取模程序，可将图片转换为C语言数组形式，用于单片机/arduino显示图片。

## 演示地址  
http://tools.clz.me/  

## 抖动取模  
利用 [Floyd-Steinberg-Dither](https://en.wikipedia.org/wiki/Floyd–Steinberg_dithering) 进行取模，可以将灰度转换成点密度。  

| 原图                    | 阀值取模                | 抖动取模                |
| ----------------------- | ----------------------- | ----------------------- |
| ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/k1.png?raw=true)  | ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/k2.png?raw=true)  | ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/k3.png?raw=true)  |
| ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/b1.png?raw=true)  | ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/b2.png?raw=true)  | ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/b3.png?raw=true)  |
| ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/lm1.png?raw=true) | ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/lm2.png?raw=true) | ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/lm3.png?raw=true) |
| ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/qy1.png?raw=true) | ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/qy2.png?raw=true) | ![](https://github.com/coloz/image-to-bitmap-array/blob/master/src/assets/qy3.png?raw=true) |

抖动取模代码来自项目[canvas-floyd-steinberg-dither](https://github.com/tgiachett/canvas-floyd-steinberg-dither)  

## 在线乞讨  
觉得不错，就请star一下  

## 更新  
2017.2.8  取模软件好多，选择困难症又犯了，为了自救，所以自己做了个  
2020.4.28  这个小软件意外受欢迎，那我再更新下吧  
2020.5.1 新增抖动取模功能  

## 编译  
```
npm i
ng build --prod
```

## 其他  
推荐使用 [u8g2](https://github.com/olikraus/u8g2) 配合本软件进行图片显示  
[基于Arduino的演示](https://www.arduino.cn/thread-42174-1-1.html)  
