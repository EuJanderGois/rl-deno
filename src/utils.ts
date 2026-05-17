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

import { ConfigFlags } from "@types"

export function cstr(text: string): Uint8Array {
  return new TextEncoder().encode(text + "\0");
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
