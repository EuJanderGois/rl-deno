// raylib/main.ts
import {
  color,
  cstr
} from "@utils";

const libPath = "./lib/libraylib.so";

const dylib = Deno.dlopen(libPath, {
  InitWindow: { parameters: ["i32", "i32", "buffer"], result: "void" },
  CloseWindow: { parameters: [], result: "void" },
  WindowShouldClose: { parameters: [], result: "bool" },
  IsWindowReady: { parameters: [], result: "bool"},
  IsWindowFullscreen: { parameters: [], result: "bool"},
  IsWindowHidden: { parameters: [], result: "bool"},
  IsWindowMinimized: { parameters: [], result: "bool"},
  IsWindowMaximized: { parameters: [], result: "bool"},
  IsWindowFocused: { parameters: [], result: "bool"},
  IsWindowResized: { parameters: [], result: "bool"},

  // unordened

  SetConfigFlags: { parameters: ["u32"], result: "void" },
  SetWindowState: { parameters: ["u32"], result: "void" },
  ClearWindowState: { parameters: ["u32"], result: "void" },

  // input
  IsKeyPressed: { parameters: ["i32"], result: "bool" },
  IsKeyDown: { parameters: ["i32"], result: "bool" },
  IsMouseButtonPressed: { parameters: ["i32"], result: "bool" },
  IsMouseButtonDown: { parameters: ["i32"], result: "bool" },

  SetTargetFPS: { parameters: ["i32"], result: "void" },
  BeginDrawing: { parameters: [], result: "void" },
  EndDrawing: { parameters: [], result: "void" },
  ClearBackground: { parameters: ["u32"], result: "void" }, // Cor é u32 (RGBA) ou struct
  DrawText: { parameters: ["buffer", "i32", "i32", "i32", "u32"], result: "void" },
  DrawFPS: { parameters: ["i32", "i32"], result: "void" },
} as const);

/**
 * Initialize window and OpenGL context
 * @param width the width of window
 * @param height the height of window
 * @param title the title displayed on top of window
 */
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

/**
 * Close window and unload OpenGL context
 */
function closeWindow(): void {
  dylib.symbols.CloseWindow();
}

/**
 * Check if application should close
 * @returns boolean
 */
function windowShouldClose(): boolean {
  return dylib.symbols.WindowShouldClose();
}

/**
 * Check if window has been initialized successfully
 * @returns boolean
 */
function isWindowReady(): boolean {
  return dylib.symbols.IsWindowReady();
}

/**
 * Check if window is currently fullscreen
 * @returns boolean
 */
function isWindowFullscreen(): boolean {
  return dylib.symbols.IsWindowFullscreen();
}

/**
 * Check if window is currently hidden
 * @returns boolean
 */
function isWindowHidden(): boolean {
  return dylib.symbols.IsWindowHidden();
}

/**
 * Check if window is currently minimized
 * @returns boolean
 */
function isWindowMinimized(): boolean {
  return dylib.symbols.IsWindowMinimized();
}

/**
 * Check if window is currently maximized
 * @returns boolean
 */
function isWindowMaximized(): boolean {
  return dylib.symbols.IsWindowMaximized();
}

/**
 * Check if window is currently focused
 * @returns boolean
 */
function isWindowFocused(): boolean {
  return dylib.symbols.IsWindowFocused();
}

/**
 * Check if window has been resized last frame
 * @returns boolean
 */
function isWindowResized(): boolean {
  return dylib.symbols.IsWindowResized();
}

// unordened

function setConfigFlags(flags: number): void {
  dylib.symbols.SetConfigFlags(flags);
}

function setWindowState(flags: number): void {
  dylib.symbols.SetWindowState(flags);
}

function clearWindowState(flags: number): void {
  dylib.symbols.ClearWindowState(flags);
}

// Funções de input usando enums
function isKeyPressed(key: number): boolean {
  return dylib.symbols.IsKeyPressed(key);
}

function isKeyDown(key: number): boolean {
  return dylib.symbols.IsKeyDown(key);
}

function isMouseButtonPressed(button: number): boolean {
  return dylib.symbols.IsMouseButtonPressed(button);
}

function isMouseButtonDown(button: number): boolean {
  return dylib.symbols.IsMouseButtonDown(button);
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
  isWindowReady,
  isWindowFullscreen,
  isWindowHidden,
  isWindowMinimized,
  isWindowMaximized,
  isWindowFocused,
  isWindowResized,

  setConfigFlags,
  setWindowState,
  clearWindowState,
  isKeyPressed,
  isKeyDown,
  isMouseButtonPressed,
  isMouseButtonDown,

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