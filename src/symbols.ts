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


export const libSymbols = {
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
} as const;