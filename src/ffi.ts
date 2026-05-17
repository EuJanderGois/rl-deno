
/**
 * 
 * Copyright 2026 eujandergois
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the “Software”), to deal in the Software without 
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR 
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

import {
  color,
  cstr
} from "@utils";

const os = Deno.build.os;
const libPath =  os === "windows" ? "./lib/raylib.dll" : "./lib/libraylib.so";

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

/**
 * Setup init configuration flags
 * @param flags uint flags
 */
function setConfigFlags(flags: number): void {
  dylib.symbols.SetConfigFlags(flags);
}

/**
 * Set window configuration state using flags
 * @param flags uint flags
 */
function setWindowState(flags: number): void {
  dylib.symbols.SetWindowState(flags);
}

/**
 * Clear window configuration state flags
 * @param flags uint flags
 */
function clearWindowState(flags: number): void {
  dylib.symbols.ClearWindowState(flags);
}


/**
 * Check if a key has been pressed once
 * @param key key to check
 * @returns boolean
 */
function isKeyPressed(key: number): boolean {
  return dylib.symbols.IsKeyPressed(key);
}

/**
 * Check if a key has been pressed again
 * @param key key to check
 * @returns boolean
 */
function isKeyDown(key: number): boolean {
  return dylib.symbols.IsKeyDown(key);
}

/**
 * Check if a mouse button has been pressed once
 * @param button button to check
 * @returns boolean
 */
function isMouseButtonPressed(button: number): boolean {
  return dylib.symbols.IsMouseButtonPressed(button);
}

/**
 * Check if a mouse button is being pressed
 * @param button button to check
 * @returns boolean
 */
function isMouseButtonDown(button: number): boolean {
  return dylib.symbols.IsMouseButtonDown(button);
}

/**
 * Set target FPS (maximum)
 * @param fps fps max value
 */
function setTargetFPS(fps: number): void {
  dylib.symbols.SetTargetFPS(fps);
}

/**
 * Setup canvas (framebuffer) to start drawing
 */
function beginDrawing(): void {
  dylib.symbols.BeginDrawing();
}

/**
 * End canvas drawing and swap buffers (double buffering)
 */
function endDrawing(): void {
  dylib.symbols.EndDrawing();
}

/**
 * Set background color (framebuffer clear color)
 * @param colorHex clear color
 */
function clearBackground(colorHex: number): void {
  dylib.symbols.ClearBackground(colorHex);
}

/**
 * Draw text (using default font)
 * @param text text to draw
 * @param x text x position
 * @param y text y position
 * @param fontSize text font size
 * @param colorHex text color
 */
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

/**
 * Draw current FPS
 * @param x fps x text position
 * @param y fps y text position
 */
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