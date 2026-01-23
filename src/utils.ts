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
 * Combina múltiplas flags usando bitwise OR
 */
export function combineFlags(...flags: number[]): number {
  return flags.reduce((acc, flag) => acc | flag, 0);
}

/**
 * Verifica se uma flag específica está ativa
 */
export function hasFlag(value: number, flag: number): boolean {
  return (value & flag) === flag;
}

/**
 * Adiciona uma flag ao valor atual
 */
export function addFlag(value: number, flag: number): number {
  return value | flag;
}

/**
 * Remove uma flag do valor atual
 */
export function removeFlag(value: number, flag: number): number {
  return value & ~flag;
}

/**
 * Helper para configuração de janela
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

  // Métodos helper específicos
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

  // ... outros métodos helper
}
