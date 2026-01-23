function cstr(text: string): Uint8Array {
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
function color(r: number, g: number, b: number, a: number = 255): number {

  // create one buffer of 4 bytes
  const buffer = new Uint8Array([r, g, b, a]); 

  // read as single 32 bits integer
  return new Uint32Array(buffer.buffer)[0];
}

export {
    cstr,
    color
}