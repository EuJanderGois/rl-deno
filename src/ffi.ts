// raylib/main.ts
import {
  color,
  cstr
} from "./utils.ts";

const libPath = "./lib/libraylib.so";

const dylib = Deno.dlopen(libPath, {
  InitWindow: { parameters: ["i32", "i32", "buffer"], result: "void" },
  WindowShouldClose: { parameters: [], result: "bool" },
  CloseWindow: { parameters: [], result: "void" },
  SetTargetFPS: { parameters: ["i32"], result: "void" },
  BeginDrawing: { parameters: [], result: "void" },
  EndDrawing: { parameters: [], result: "void" },
  ClearBackground: { parameters: ["u32"], result: "void" }, // Cor é u32 (RGBA) ou struct
  DrawText: { parameters: ["buffer", "i32", "i32", "i32", "u32"], result: "void" },
  DrawFPS: { parameters: ["i32", "i32"], result: "void" },
} as const);

function initWindow(
  width: number,
  height: number,
  title: string
): void {
  dylib.symbols.InitWindow(
    width,
    height,
    cstr(title) as unknown as BufferSource
  );
}

function windowShouldClose(): boolean {
  return dylib.symbols.WindowShouldClose();
}

function closeWindow(): void {
  dylib.symbols.CloseWindow();
}

function setTargetFPS(fps: number): void {
  dylib.symbols.SetTargetFPS(fps);
}

function beginDrawing(): void {
  dylib.symbols.BeginDrawing();
}

function endDrawing(): void {
  dylib.symbols.EndDrawing();
}

function clearBackground(colorHex: number): void {
  dylib.symbols.ClearBackground(colorHex);
}

function drawText(
  text: string,
  x: number,
  y: number,
  fontSize: number,
  colorHex: number
): void {
  dylib.symbols.DrawText(
    cstr(text) as unknown as BufferSource, 
    x,
    y,
    fontSize,
    colorHex
  );
}

function drawFPS(x: number, y: number): void {
  dylib.symbols.DrawFPS(x, y);
}

export {
  initWindow,
  closeWindow,
  windowShouldClose,
  setTargetFPS,
  beginDrawing,
  endDrawing,
  clearBackground,
  drawFPS,
  drawText,
}

/**
 * Collection of helpers,
 * usefull to compatibility
 */
export const helpers = {
  color,
}

export const LIGHTGRAY = 0xC8C8C8FF; 
export const WHITE = 0xFFFFFFFF;
export const BLACK = 0x000000FF;