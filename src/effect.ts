import { EFFECT_STYLE } from "./effectStyle";
import { ColorArray } from "./global";
import { colorArrayToRgba, throttle } from "./helpers";
import { PixelMatrix } from "./PixelMatrix";

export class Effect {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null | undefined = null;
  private bgColor: ColorArray = [0, 0, 0, 1];
  private pxMatrix!: PixelMatrix;
  public mousePos = { x: 0, y: 0 };

  constructor() {
    window.addEventListener("resize", () =>
      this.coverWindowWithEffectCanvas(this.canvas)
    );
    window.addEventListener("DOMContentLoaded", () => this.initEffect());
    window.addEventListener(
      "mousemove",
      throttle((ev: MouseEvent) => {
        this.mousePos.x = ev.clientX;
        this.mousePos.y = ev.clientY;
        this.pxMatrix.updateCanvas();
      }, 50)
    );
    document.addEventListener("click", () => {
      this.pxMatrix.euclideanPopAnimation();
    });
  }
  private initEffect() {
    this.canvas = document.querySelector<HTMLCanvasElement>("#effect-canvas");
    this.ctx = this.canvas?.getContext("2d");
    this.coverWindowWithEffectCanvas(this.canvas);

    this.pxMatrix = new PixelMatrix(this.canvas, this.ctx, this.mousePos, {
      themeStyle: EFFECT_STYLE.numbers,
      options: {
        pos: {
          x: 100,
          y: 100,
        },
      },
    });

    if (!this.canvas || !this.ctx) return;
    this.canvas.style.backgroundColor = colorArrayToRgba(this.bgColor);
    this.pxMatrix.paintMatrix();
    this.pxMatrix.updateCanvas();
  }
  private coverWindowWithEffectCanvas(canvas: HTMLCanvasElement | null) {
    if (!canvas) return;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }
}

new Effect();
