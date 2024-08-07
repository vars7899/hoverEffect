import { EFFECT_STYLE } from "./effectStyle";
import { Coordinates, Dimension, type ColorArray } from "./global";
import { Pixel } from "./Pixel";

export const defConfig = {
  matrixPos: { x: 0, y: 0 },
  themeStyle: EFFECT_STYLE.numbers,
  bgColor: [255, 255, 8, 1] as ColorArray,
  pxColor: [255, 255, 8, 1] as ColorArray,
  pxHoverColor: [255, 186, 8, 1] as ColorArray,
  pxSize: 20,
  pxContentSize: 12,
  pxGap: 2,
  txFont: "Arial",
  maxProximityDistance: 300,
  propagationValue: 500,
  maxPropagatedProximity: 3000,
  minPropagatedProximity: 300,
};

export type PixelMatrixArgs = {
  themeStyle: string[];
  options?: {
    pos?: Coordinates;
  };
};

export class PixelMatrix {
  // HTML canvas ref
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null | undefined = null;

  // matrix properties
  private pos: Coordinates = defConfig.matrixPos;
  private themeStyle: string[] = defConfig.themeStyle;
  private matrix: Array<Array<Pixel>> = [];

  private dimension: Dimension = { col: 0, row: 0 };

  private bgColor: ColorArray = defConfig.bgColor;

  // pixel properties
  private pxGap: number = defConfig.pxGap;
  private pxSize: number = defConfig.pxSize;
  private pxContentSize: number = defConfig.pxContentSize;
  private pxColor: ColorArray = defConfig.pxColor;
  private pxHoverColor: ColorArray = defConfig.pxHoverColor;

  // proximity properties
  private maxProximityDistance: number = defConfig.maxProximityDistance;
  private propagationValue: number = defConfig.propagationValue;
  private maxPropagatedProximity: number = defConfig.maxPropagatedProximity;
  private minPropagatedProximity: number = defConfig.minPropagatedProximity;

  // animation
  private mousePos!: { x: number; y: number };
  private interval: number | undefined = undefined;
  private intervalTime: number = 10;
  private flowDirection: "OUT" | "IN" = "OUT";

  constructor(
    canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D | null | undefined,
    mousePos: Coordinates,
    args: PixelMatrixArgs
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mousePos = mousePos;
    this.themeStyle = args.themeStyle ?? this.themeStyle;

    this.pos = args.options?.pos ?? this.pos;

    this.populate();
  }
  paintMatrix() {
    for (const pixelRow of this.matrix) {
      for (const pixel of pixelRow) {
        // pixel.paintProximityHeat();
        pixel.paint();
        pixel.paintProximity();
      }
    }
  }
  updateCanvas() {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paintPxMatrixProximity();
    this.paintMatrix();
  }
  euclideanPopAnimation() {
    if (this.interval !== undefined) return;
    this.interval = setInterval(() => {
      if (this.flowDirection === "OUT") {
        if (this.maxProximityDistance < this.maxPropagatedProximity) {
          this.maxProximityDistance += this.propagationValue;
          this.updateProximityDistance(this.maxProximityDistance);
        } else {
          this.flowDirection = "IN";
        }
      } else {
        if (this.maxProximityDistance > this.minPropagatedProximity) {
          this.maxProximityDistance -= this.propagationValue;
          this.updateProximityDistance(this.maxProximityDistance);
        } else {
          clearInterval(this.interval);
          this.interval = undefined;
          this.flowDirection = "OUT";
        }
      }
      this.updateCanvas();
    }, this.intervalTime);
  }
  private updateProximityDistance(updatedValue: number) {
    for (const pixelRow of this.matrix) {
      for (const pixel of pixelRow) {
        pixel.updateProximityDistance(updatedValue);
      }
    }
  }
  private paintPxMatrixProximity() {
    for (const pixelRow of this.matrix) {
      for (const pixel of pixelRow) {
        pixel.calcProximityIndex(this.mousePos);
        pixel.paintProximity();
      }
    }
  }
  private populate() {
    if (!this.canvas || !this.ctx) return;
    this.calcMatrixDimension();
    for (let i = 0; i < this.dimension.row; i++) {
      let rowData: Pixel[] = [];
      for (let j = 0; j < this.dimension.col; j++) {
        rowData.push(
          new Pixel({
            ctx: this.ctx,
            x: this.pos.x + j * (this.pxSize + this.pxGap),
            y: this.pos.y + i * (this.pxSize + this.pxGap),
            content: "0",
            properties: {
              size: this.pxSize,
              contentSize: this.pxContentSize,
              color: this.pxColor,
              maxProximityDistance: this.maxProximityDistance,
            },
          })
        );
      }
      this.matrix.push(rowData);
    }
  }
  private calcMatrixDimension() {
    if (!this.canvas || !this.ctx) return;
    this.dimension.row = Math.floor(
      this.canvas.height / this.pxSize + 2 * this.pxGap
    );
    this.dimension.col = Math.floor(
      this.canvas.width / this.pxSize + 2 * this.pxGap
    );
  }
}
