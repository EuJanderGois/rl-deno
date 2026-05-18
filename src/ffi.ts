
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

import { getLibPath, setupConfig } from "@config";
import { libSymbols } from "@symbols";

let dylib: Deno.DynamicLibrary<typeof libSymbols> | null = null;

function fromDyLib() {
  if (!dylib) {
    const path = getLibPath();
    dylib = Deno.dlopen(path, libSymbols);
  }
  return dylib.symbols;
}

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
  fromDyLib().InitWindow(
    width,
    height,
    cstr(title) as unknown as BufferSource
  );
}

/**
 * Close window and unload OpenGL context
 */
function closeWindow(): void {
  fromDyLib().CloseWindow();
}

/**
 * Check if application should close
 * @returns boolean
 */
function windowShouldClose(): boolean {
  return fromDyLib().WindowShouldClose();
}

/**
 * Check if window has been initialized successfully
 * @returns boolean
 */
function isWindowReady(): boolean {
  return fromDyLib().IsWindowReady();
}

/**
 * Check if window is currently fullscreen
 * @returns boolean
 */
function isWindowFullscreen(): boolean {
  return fromDyLib().IsWindowFullscreen();
}

/**
 * Check if window is currently hidden
 * @returns boolean
 */
function isWindowHidden(): boolean {
  return fromDyLib().IsWindowHidden();
}

/**
 * Check if window is currently minimized
 * @returns boolean
 */
function isWindowMinimized(): boolean {
  return fromDyLib().IsWindowMinimized();
}

/**
 * Check if window is currently maximized
 * @returns boolean
 */
function isWindowMaximized(): boolean {
  return fromDyLib().IsWindowMaximized();
}

/**
 * Check if window is currently focused
 * @returns boolean
 */
function isWindowFocused(): boolean {
  return fromDyLib().IsWindowFocused();
}

/**
 * Check if window has been resized last frame
 * @returns boolean
 */
function isWindowResized(): boolean {
  return fromDyLib().IsWindowResized();
}

// unordened

/**
 * Setup init configuration flags
 * @param flags uint flags
 */
function setConfigFlags(flags: number): void {
  fromDyLib().SetConfigFlags(flags);
}

/**
 * Set window configuration state using flags
 * @param flags uint flags
 */
function setWindowState(flags: number): void {
  fromDyLib().SetWindowState(flags);
}

/**
 * Clear window configuration state flags
 * @param flags uint flags
 */
function clearWindowState(flags: number): void {
  fromDyLib().ClearWindowState(flags);
}


/**
 * Check if a key has been pressed once
 * @param key key to check
 * @returns boolean
 */
function isKeyPressed(key: number): boolean {
  return fromDyLib().IsKeyPressed(key);
}

/**
 * Check if a key has been pressed again
 * @param key key to check
 * @returns boolean
 */
function isKeyDown(key: number): boolean {
  return fromDyLib().IsKeyDown(key);
}

/**
 * Check if a mouse button has been pressed once
 * @param button button to check
 * @returns boolean
 */
function isMouseButtonPressed(button: number): boolean {
  return fromDyLib().IsMouseButtonPressed(button);
}

/**
 * Check if a mouse button is being pressed
 * @param button button to check
 * @returns boolean
 */
function isMouseButtonDown(button: number): boolean {
  return fromDyLib().IsMouseButtonDown(button);
}

/**
 * Set target FPS (maximum)
 * @param fps fps max value
 */
function setTargetFPS(fps: number): void {
  fromDyLib().SetTargetFPS(fps);
}

/**
 * Setup canvas (framebuffer) to start drawing
 */
function beginDrawing(): void {
  fromDyLib().BeginDrawing();
}

/**
 * End canvas drawing and swap buffers (double buffering)
 */
function endDrawing(): void {
  fromDyLib().EndDrawing();
}

/**
 * Set background color (framebuffer clear color)
 * @param colorHex clear color
 */
function clearBackground(colorHex: number): void {
  fromDyLib().ClearBackground(colorHex);
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
  fromDyLib().DrawText(
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
  fromDyLib().DrawFPS(x, y);
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

  // helpers
  setupConfig,
  color,
}