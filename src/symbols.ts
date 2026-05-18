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

const rlImage = ["pointer", "i32", "i32", "i32", "i32"] as const;
const rlVector2 = ["f32", "f32"] as const;


export const libSymbols = {


  /**
   * Window related functions
   */

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

  IsWindowState: { parameters: ["u32"], result: "bool" },
  SetWindowState: { parameters: ["u32"], result: "void"},
  ClearWindowState: { parameters: ["u32"], result: "void" },
  ToggleFullscreen: { parameters: [], result: "void" },
  ToggleBorderlessWindowed: { parameters: [], result: "void" },
  MaximizeWindow: { parameters: [], result: "void" },
  MinimizeWindow: { parameters: [], result: "void" },
  RestoreWindow: { parameters: [], result: "void" },
  SetWindowIcon: { parameters: [{ struct: rlImage }], result: "void"},
  SetWindowIcons: { parameters: ["buffer", "i32"], result: "void" },
  SetWindowTitle: { parameters: ["buffer"], result: "void" },
  SetWindowPosition: { parameters: ["i32", "i32"], result: "void" },
  SetWindowMonitor: { parameters: ["i32"], result: "void" },
  SetWindowMinSize: { parameters: ["i32", "i32"], result: "void" },
  SetWindowMaxSize: { parameters: ["i32", "i32"], result: "void" },
  SetWindowSize: { parameters: ["i32", "i32"], result: "void" },
  SetWindowOpacity: { parameters: ["f32"], result: "void" },
  SetWindowFocused: { parameters: [], result: "void" },
  // TODO: *GetWindowHandle
  GetScreenWidth: { parameters: [], result: "i32" },
  GetScreenHeight: { parameters: [], result: "i32" },
  GetRenderWidth: { parameters: [], result: "i32" },
  GetRenderHeight: { parameters: [], result: "i32" },
  GetMonitorCount: { parameters: [], result: "i32" },
  GetCurrentMonitor: { parameters: [], result: "i32" },
  GetMonitorPosition: { parameters: ["i32"], result: { struct: rlVector2 } },
  
  // TODO 
  GetMonitorWidth: { parameters: ["i32"], result: "i32" },
  GetMonitorHeight: { parameters: ["i32"], result: "i32" },
  GetMonitorPhysicalWidth: { parameters: ["i32"], result: "i32" },
  GetMonitorPhysicalHeight: { parameters: ["i32"], result: "i32" },
  GetMonitorRefreshRate: { parameters: ["i32"], result: "i32" },
  GetWindowPosition: { parameters: [], result: { struct: rlVector2 } },
  GetWindowScaleDPI: { parameters: [], result: { struct: rlVector2 } },
  GetMonitorName: { parameters: ["i32"], result: "pointer" },
  SetClipboardText: { parameters: ["buffer"], result: "void"},
  GetClipboardText: { parameters: [], result: "pointer" },
  GetClipboardImage: { parameters: [], result: { struct: rlImage } },
  EnableEventWaiting: { parameters: [], result: "void" },
  DisableEventWaiting: { parameters: [], result: "void" },


  // unordened
  SetConfigFlags: { parameters: ["u32"], result: "void" },
  
  LoadImage: { parameters: ["buffer"], result: { struct: rlImage } },
  UnloadImage: { parameters: [{ struct: rlImage }], result: "void" },
  ExportImage: { parameters: [{ struct: rlImage }, "buffer"], result: "bool" },

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