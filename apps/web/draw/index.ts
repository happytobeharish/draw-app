import { HTTP_BACKEND } from "../config";
import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

// Extend the window object to include selectedTool
declare global {
  interface Window {
    selectedTool?: "rect" | "circle" | "pencil";
  }
}

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  
  let existingShapes: Shape[] = await getExistingShapes(roomId);
  clearCanvas(existingShapes, canvas, ctx);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape.shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e: MouseEvent) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e: MouseEvent) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;

    const selectedTool = window.selectedTool;
    let shape: Shape | null = null;

    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius,
        centerX: startX + radius,
        centerY: startY + radius,
      };
    }

    if (!shape) return;

    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId,
      })
    );
  });

  canvas.addEventListener("mousemove", (e: MouseEvent) => {
    if (!clicked) return;

    const width = e.clientX - startX;
    const height = e.clientY - startY;
    clearCanvas(existingShapes, canvas, ctx);

    const selectedTool = window.selectedTool;
    ctx.strokeStyle = "rgba(255, 255, 255)";

    if (selectedTool === "rect") {
      ctx.strokeRect(startX, startY, width, height);
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      const centerX = startX + radius;
      const centerY = startY + radius;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  });
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const shape of existingShapes) {
    ctx.strokeStyle = "rgba(255, 255, 255)";
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  }
}

async function getExistingShapes(roomId: string): Promise<Shape[]> {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data.messages;

  return messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape;
  });
}
