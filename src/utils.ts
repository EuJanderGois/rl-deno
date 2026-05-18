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

import { ConfigFlags, type Image } from "@types"

// deno-lint-ignore no-explicit-any
export function toNativeString(text: string): any {
  // deno-lint-ignore no-explicit-any
  return new TextEncoder().encode(text + "\0") as any;
}

export function fromNativeString(ptr: Deno.PointerValue): string | null {
  if (ptr === null) {
    return null
  }

  const view = new Deno.UnsafePointerView(ptr);
  return view.getCString();
}

// deno-lint-ignore no-explicit-any
export function toNativeImage(image: Image): any {
  const buffer = new Uint8Array(24); // Exatos 24 bytes!
  const view = new DataView(buffer.buffer);
  
  const ptrValue = image.data === null ? 0n : BigInt(Deno.UnsafePointer.value(image.data));
  
  view.setBigUint64(0, ptrValue, true);
  view.setInt32(8, image.width, true);
  view.setInt32(12, image.height, true);
  view.setInt32(16, image.mipmaps, true);
  view.setInt32(20, image.format, true);
  
  // deno-lint-ignore no-explicit-any
  return buffer as any;
}

export function fromNativeImage(buffer: Uint8Array): Image {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  
  return {
    data: Deno.UnsafePointer.create(view.getBigUint64(0, true)), 
    width: view.getInt32(8, true),   // offset 8
    height: view.getInt32(12, true), // offset 12
    mipmaps: view.getInt32(16, true),// offset 16
    format: view.getInt32(20, true), // offset 20
  };
}

/**
 * Convert the RGBA to collor buffer
 * This is used for compatibility of
 * typescript types with C struct.
 * 
 * @param r Red (0-255)
 * @param g Green (0-255)
 * @param b Blue (0-255)
 * @param a Alpha (0-255)
 * @returns The buffer of 32 bits integer.
 */
export function color(r: number, g: number, b: number, a: number = 255): number {

  // create one buffer of 4 bytes
  const buffer = new Uint8Array([r, g, b, a]); 

  // read as single 32 bits integer
  return new Uint32Array(buffer.buffer)[0];
}

/**
 * Combine flags using bitwise OR
 */
export function combineFlags(...flags: number[]): number {
  return flags.reduce((acc, flag) => acc | flag, 0);
}

/**
 * Check if a flag is active
 */
export function hasFlag(value: number, flag: number): boolean {
  return (value & flag) === flag;
}

/**
 * Add a flag to current value
 */
export function addFlag(value: number, flag: number): number {
  return value | flag;
}

/**
 * Remove a flag from current value
 */
export function removeFlag(value: number, flag: number): number {
  return value & ~flag;
}

/**
 * Window config related helper
 */
export class WindowConfig {
  private flags: number = 0;

  constructor() {}

  add(flag: ConfigFlags): WindowConfig {
    this.flags = addFlag(this.flags, flag);
    return this;
  }

  remove(flag: ConfigFlags): WindowConfig {
    this.flags = removeFlag(this.flags, flag);
    return this;
  }

  has(flag: ConfigFlags): boolean {
    return hasFlag(this.flags, flag);
  }

  getFlags(): number {
    return this.flags;
  }

  vsync(): WindowConfig {
    return this.add(ConfigFlags.FLAG_VSYNC_HINT);
  }

  resizable(): WindowConfig {
    return this.add(ConfigFlags.FLAG_WINDOW_RESIZABLE);
  }

  fullscreen(): WindowConfig {
    return this.add(ConfigFlags.FLAG_FULLSCREEN_MODE);
  }

  transparent(): WindowConfig {
    return this.add(ConfigFlags.FLAG_WINDOW_TRANSPARENT);
  }

  // ... TODO
}
