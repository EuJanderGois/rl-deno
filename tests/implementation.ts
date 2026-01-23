// src/main.ts

import { 
    beginDrawing, 
    clearBackground, 
    closeWindow, 
    drawFPS, 
    drawText, 
    endDrawing, 
    initWindow,
    setTargetFPS, 
    windowShouldClose,
    helpers
} from "../raylib/ffi.ts";

const { color } = helpers;

const screenWidth = 800;
const screenHeight = 450;

console.log("Iniciando Raylib via Deno FFI...");

initWindow(screenWidth, screenHeight, "MC - Deno + Raylib Test");
setTargetFPS(60);

while (!windowShouldClose()) {
  beginDrawing();
    clearBackground(color(200, 200, 200, 255));
    drawFPS(10, 10);
    drawText(
        "Parabens! Deno rodando Raylib nativo!",
        190,
        200,
        20,
        color(0, 0, 0, 255)
    );

  endDrawing();
}

closeWindow();