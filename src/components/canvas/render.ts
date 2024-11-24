export const ONE_SIDE = 400, // canvasの一辺
  RADIUS = 150, // 単位円の半径
  [ORIGIN_X, ORIGIN_Y] = [ONE_SIDE / 2, ONE_SIDE / 2], // 原点
  AXIS_COLOR = "gray"; // 軸の色

export const render = (
  ctx: CanvasRenderingContext2D,
  content: {
    type: string;
    value: number;
  }
) => {
  // 調整
  // (200, 200)が原点
  const trimX = (x: number) => x + ORIGIN_X;
  const trimY = (y: number) => y + ORIGIN_Y;

  const sinValue = (sin: number) => trimY(-RADIUS * sin);
  const cosValue = (cos: number) => trimX(RADIUS * cos);

  // sinの直線を描画
  const drawSinLine = (sin: number) => {
    drawLine(
      0,
      sinValue(sin),
      () => ONE_SIDE,
      (y) => y
    );
  };

  // cosの直線を描画
  const drawCosLine = (cos: number) => {
    drawLine(
      cosValue(cos),
      0,
      (x) => x,
      () => ONE_SIDE
    );
  };

  const drawTanLine = (tan: number) => {
    const right = ORIGIN_X + RADIUS;
    const left = ORIGIN_X - RADIUS;
    drawLine(
      right,
      ORIGIN_Y - tan * RADIUS,
      () => left,
      () => ORIGIN_Y + tan * RADIUS
    );
  };

  // 半径がRADIUSの円を真ん中に描画
  const drawCircle = () => {
    ctx.beginPath();
    ctx.arc(ORIGIN_X, ORIGIN_Y, RADIUS, 0, 2 * Math.PI);
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  };

  const drawLine = (
    x: number,
    y: number,
    xTo = (x: number) => x,
    yTo = (y: number) => y,
    px = 0,
    py = 0,
    style = "#000"
  ) => {
    ctx.beginPath();
    ctx.moveTo(x - px, y - py);
    ctx.lineTo(xTo(x + px), yTo(y + py));
    ctx.strokeStyle = style;
    ctx.stroke();
    ctx.closePath();
  };

  const drawUnitCircle = () => {
    // 単位円の描画
    drawCircle();

    // x軸の描画
    drawLine(
      ORIGIN_X - RADIUS,
      ORIGIN_Y,
      (x) => x + 2 * RADIUS,
      (y) => y,
      40,
      0,
      AXIS_COLOR
    );

    // y軸の描画
    drawLine(
      ORIGIN_X,
      ORIGIN_Y - RADIUS,
      (x) => x,
      (y) => y + 2 * RADIUS,
      0,
      40,
      AXIS_COLOR
    );
  };

  drawUnitCircle();

  // 実行
  switch (content.type) {
    case "sin":
      drawSinLine(content.value);
      break;
    case "cos":
      drawCosLine(content.value);
      break;
    case "tan":
      drawTanLine(content.value);
      break;
    default:
      return;
  }
};
