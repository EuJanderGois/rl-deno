// @raylib/mod.ts

/**
 * The real, maintened, documented raylib bindings for deno.
 * @module
 */

export * from "./src/types.ts";
export * from "./src/utils.ts";

export { 
    initWindow,
    closeWindow,
    beginDrawing
} from "./src/ffi.ts";