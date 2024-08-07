import { EFFECT_STYLE } from "./effectStyle";
import { Coordinates, type ColorArray } from "./global";
import { colorArrayToRgba } from "./helpers";

export type PixelArgs = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  content: string;
  properties: {
    contentSize: number;
    size: number;
    color: ColorArray;
    maxProximityDistance: number;
  };
};

export class Pixel {
  charArray: string[] = EFFECT_STYLE.foodEmojis;
  ctx: CanvasRenderingContext2D | null = null;

  pos: Coordinates = {
    x: 0,
    y: 0,
  };

  content: string = "";
  //   proximity
  proximityIndex: string = "0.0";
  maxProximityDistance: number = 0;

  // properties
  size: number = 0;
  contentSize: number = 0;
  color: ColorArray = [255, 255, 255, 1];
  bgColor: ColorArray = [255, 186, 8, 0];

  constructor(args: PixelArgs) {
    this.ctx = args.ctx;
    this.pos.x = args.x;
    this.pos.y = args.y;
    this.content = args.content;
    this.contentSize = args.properties.contentSize;

    this.size = args.properties.size;
    this.color = args.properties.color;
    this.maxProximityDistance = args.properties.maxProximityDistance;
  }
  paint() {
    if (!this.ctx) return;
    this.ctx.fillStyle = colorArrayToRgba(this.bgColor);
    this.ctx.beginPath();
    this.ctx.rect(this.pos.x, this.pos.y, this.size, this.size);
    this.ctx.fill();
  }
  updateColor(color: ColorArray) {
    this.bgColor = color;
  }
  isCenter(mousePos: Coordinates): boolean {
    if (
      mousePos.x >= this.pos.x &&
      mousePos.x <= this.pos.x + this.size &&
      mousePos.y >= this.pos.y &&
      mousePos.y <= this.pos.y + this.size
    ) {
      return true;
    }
    return false;
  }

  calcProximityIndex(mousePos: Coordinates) {
    const dx = mousePos.x - this.pos.x;
    const dy = mousePos.y - this.pos.y;
    const distance = parseFloat(Math.sqrt(dx * dx + dy * dy).toFixed(3));

    if (distance === 0) {
      this.proximityIndex = "1";
    } else {
      const rawProximity =
        (this.maxProximityDistance - distance + this.size / 2) /
        this.maxProximityDistance;
      this.proximityIndex = Math.max(0, rawProximity).toFixed(1);
    }
  }

  paintProximity() {
    if (!this.ctx) return;
    this.ctx.font = `${this.contentSize}px Arial`;
    this.ctx.fillStyle = `red`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      //   this.proximityIndex,
      this.charArray[parseFloat(this.proximityIndex) * 10],
      this.pos.x + this.size / 2,
      this.pos.y + this.size / 2
    );
  }

  paintProximityHeat() {
    this.bgColor = [
      this.bgColor[0],
      this.bgColor[1],
      this.bgColor[2],
      parseFloat(this.proximityIndex),
    ];
  }
  updateProximityDistance(updatedValue: number) {
    this.maxProximityDistance = updatedValue;
  }
}
