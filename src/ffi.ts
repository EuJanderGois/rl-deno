
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
  toNativeString,
  toNativeImage,
  fromNativeImage,
  fromNativeString
} from "@utils";

import { getLibPath, setupConfig } from "@config";
import { libSymbols } from "@symbols";
import type { Image, Vector2 } from "@types";

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
    toNativeString(title) as unknown as BufferSource
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

/**
 * Check if one specific window flag is enabled
 * @param flags uint flags
 * @returns boolean
 */
function isWindowState(flags: number): boolean {
  return fromDyLib().IsWindowState(flags);
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
 * Toggle window state: fullscreen/windowed, resizes monitor to match window resolution
 */
function toggleFullscreen(): void {
  fromDyLib().ToggleFullscreen();
}

/**
 * Toggle window state: borderless windowed, resizes window to match monitor resolution
 */
function toggleBorderlessWindowed(): void {
  fromDyLib().ToggleBorderlessWindowed();
}

/**
 * Set window state: maximized, if resizable
 */
function maximizeWindow(): void {
  fromDyLib().MaximizeWindow();
}

/**
 * Set window state: minimized, if resizable
 */
function minimizeWindow(): void {
  fromDyLib().MinimizeWindow();
}

/**
 * Restore window from being minimized/maximized
 */
function restoreWindow(): void {
  fromDyLib().RestoreWindow();
}

/**
 * Set icon for window (single image, RGBA 32bit)
 * @param image Image to set as icon
 */
function setWindowIcon(image: Image): void {
  fromDyLib().SetWindowIcon(toNativeImage(image));
}

/**
 * Set icon for window (multiple images, RGBA 32bit)
 * @param images Image list to set as icon
 * @returns 
 */
function setWindowIcons(images: Image[]): void {
  const count = images.length;
  if (count === 0) return;

  const arrBuffer = new Uint8Array(count * 24);

  for (let i = 0; i < count; i++) {
    const imgBuffer = toNativeImage(images[i]) as Uint8Array;
    arrBuffer.set(imgBuffer, i * 24);
  }

  fromDyLib().SetWindowIcons(arrBuffer, count);
}

// TODO: setWindowIcons

/**
 * Set title for window
 * @param title title as string
 */
function setWindowTitle(title: string): void {
  fromDyLib().SetWindowTitle(toNativeString(title) as unknown as BufferSource);
}

/**
 * Set window position on screen
 * @param x x window position
 * @param y y window position
 */
function setWindowPosition(x: number, y: number): void {
  fromDyLib().SetWindowPosition(x, y);
}

/**
 * Set monitor for the current window
 * @param monitor window monitor number
 */
function setWindowMonitor(monitor: number): void {
  fromDyLib().SetWindowMonitor(monitor);
}

/**
 * Set window minimum dimensions (for FLAG_WINDOW_RESIZABLE)
 * @param width window minimum width number
 * @param height window minimum height number
 */
function setWindowMinSize(width: number, height: number): void {
  fromDyLib().SetWindowMinSize(width, height);
}

/**
 * Set window maximum dimensions (for FLAG_WINDOW_RESIZABLE)
 * @param width window maximum width number
 * @param height window maximum height number
 */
function setWindowMaxSize(width: number, height: number): void {
  fromDyLib().SetWindowMaxSize(width, height);
}

/**
 * Set window dimensions
 * @param width window size number
 * @param height window size number
 */
function setWindowSize(width: number, height: number): void {
  fromDyLib().SetWindowSize(width, height);
}

/**
 * Set window opacity [0.0f..1.0f]
 * @param opacity window opacity number
 */
function setWindowOpacity(opacity: number): void {
  fromDyLib().SetWindowOpacity(opacity);
}

/**
 * Set window focused
 */
function setWindowFocused(): void {
  fromDyLib().SetWindowFocused();
}

// TODO: getWindowHandle

/**
 * Get current screen width
 * @returns current screen width number
 */
function getScreenWidth(): number {
  return fromDyLib().GetScreenWidth();
}

/**
 * Get current screen height
 * @returns current screen height number
 */
function getScreenHeight(): number {
  return fromDyLib().GetScreenHeight();
}

/**
 * Get current render width (it considers HiDPI)
 * @returns current render width number
 */
function getRenderWidth(): number {
  return fromDyLib().GetRenderWidth();
}

/**
 * Get current render height (it considers HiDPI)
 * @returns current render height number
 */
function getRenderHeight(): number {
  return fromDyLib().GetRenderHeight();
}

/**
 * Get number of connected monitors
 * @returns connected monitors number
 */
function getMonitorCount(): number {
  return fromDyLib().GetMonitorCount();
}

/**
 * Get current monitor where window is placed
 * @returns current monitor number
 */
function getCurrentMonitor(): number {
  return fromDyLib().GetCurrentMonitor();
}

/**
 * Get specified monitor position
 * @param monitor target monitor number
 * @returns monitor position Vector2
 */
function getMonitorPosition(monitor: number): Vector2 {
  const buffer = fromDyLib().GetMonitorPosition(monitor);

  const view = new DataView(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength
  );

  const x = view.getFloat32(0);
  const y = view.getFloat32(4);

  return {x, y}
}

/**
 * Get specified monitor width (current video mode used by monitor)
 * @param monitor monitor number to get the width
 * @returns monitor width number
 */
function getMonitorWidth(monitor: number): number {
  return fromDyLib().GetMonitorWidth(monitor);
}

/**
 * Get specified monitor height (current video mode used by monitor)
 * @param monitor monitor number to get the height
 * @returns monitor height number
 */
function getMonitorHeight(monitor: number): number {
  return fromDyLib().GetMonitorHeight(monitor);
}

/**
 * Get specified monitor physical width in millimetres
 * @param monitor monitor number to get physical width
 * @returns monitor physical width number
 */
function getMonitorPhysicalWidth(monitor: number): number {
  return fromDyLib().GetMonitorPhysicalWidth(monitor);
}

/**
 * Get specified monitor physical height in millimetres
 * @param monitor monitor number to get physical height
 * @returns monitor physical height number
 */
function getMonitorPhysicalHeight(monitor: number): number {
  return fromDyLib().GetMonitorPhysicalHeight(monitor);
}

/**
 * Get specified monitor refresh rate
 * @param monitor monitor number to get refresh rate
 * @returns monitor refresh rate number
 */
function getMonitorRefreshRate(monitor: number): number {
  return fromDyLib().GetMonitorRefreshRate(monitor);
}

/**
 * Get window position XY on monitor
 * @returns window position Vector2
 */
function getWindowPosition(): Vector2 {
  const buffer = fromDyLib().GetWindowPosition();

  const view = new DataView(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength
  );

  const x = view.getFloat32(0);
  const y = view.getFloat32(4);

  return { x, y }
}

/**
 * Get window scale DPI factor
 * @returns window scale dpi Vector2
 */
function getWindowScaleDPI(): Vector2 {
  const buffer = fromDyLib().GetWindowScaleDPI();

  const view = new DataView(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength
  );

  const x = view.getFloat32(0);
  const y = view.getFloat32(4);

  return { x, y }
}

/**
 * Get the human-readable, UTF-8 encoded name of the specified monitor
 * @param monitor monitor to get name
 * @returns monitor name string
 */
function getMonitorName(monitor: number): string | null {
  return fromNativeString(fromDyLib().GetMonitorName(monitor));
}

/**
 * Set clipboard text content
 * @param text text to set in clipboard
 */
function setClipboardText(text: string): void {
  fromDyLib().SetClipboardText(toNativeString(text));
}

/**
 * Get clipboard text content
 * @returns clipboard text string
 */
function getClipboardText(): string | null {
  return fromNativeString(fromDyLib().GetClipboardText());
}

/**
 * Get clipboard image content
 * @returns image from clipboard
 */
function getClipboardImage(): Image {
  const buffer = fromDyLib().GetClipboardImage();

  return fromNativeImage(buffer);
}

/**
 * Enable waiting for events on EndDrawing(), no automatic event polling
 */
function enableEventWaiting(): void {
  fromDyLib().EnableEventWaiting();
}

/**
 * Disable waiting for events on EndDrawing(), automatic events polling
 */
function disableEventWaiting(): void {
  fromDyLib().DisableEventWaiting();
}

// unordened

function loadImage(fileName: string): Image {
  const buffer = fromDyLib().LoadImage(toNativeString(fileName));

  return fromNativeImage(buffer);
}

function unloadImage(image: Image): void {
  fromDyLib().UnloadImage(toNativeImage(image));
}

function exportImage(image: Image, fileName: string): boolean {
  return fromDyLib().ExportImage(toNativeImage(image), toNativeString(fileName));
}

/**
 * Setup init configuration flags
 * @param flags uint flags
 */
function setConfigFlags(flags: number): void {
  fromDyLib().SetConfigFlags(flags);
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
    toNativeString(text) as unknown as BufferSource, 
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
  isWindowState,
  setWindowState,
  clearWindowState,
  toggleFullscreen,
  toggleBorderlessWindowed,
  maximizeWindow,
  minimizeWindow,
  restoreWindow,
  setWindowIcon,
  setWindowIcons,
  setWindowTitle,
  setWindowPosition,
  setWindowMonitor,
  setWindowMinSize,
  setWindowMaxSize,
  setWindowSize,
  setWindowOpacity,
  setWindowFocused,
  // getWindowHandle
  getScreenWidth,
  getScreenHeight,
  getRenderWidth,
  getRenderHeight,
  getMonitorCount,
  getCurrentMonitor,
  getMonitorPosition,
  getMonitorWidth,
  getMonitorHeight,
  getMonitorPhysicalWidth,
  getMonitorPhysicalHeight,
  getMonitorRefreshRate,
  getWindowPosition,
  getWindowScaleDPI,
  getMonitorName,
  setClipboardText,
  getClipboardText,
  getClipboardImage,
  enableEventWaiting,
  disableEventWaiting,

  loadImage,
  unloadImage,
  exportImage,

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