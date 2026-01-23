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
    utils,
    setConfigFlags,
    ConfigFlags,
    KeyboardKey,
    isKeyPressed
} from "@raylib";

const { color, WindowConfig, combineFlags } = utils;

const flags = combineFlags(
  ConfigFlags.FLAG_VSYNC_HINT,
  ConfigFlags.FLAG_MSAA_4X_HINT,
  ConfigFlags.FLAG_WINDOW_UNDECORATED
);

const screenWidth = 800;
const screenHeight = 450;

console.log("Iniciando Raylib via Deno FFI...");

setConfigFlags(flags);
initWindow(screenWidth, screenHeight, "MC - Deno + Raylib Test");
setTargetFPS(60);

while (!windowShouldClose()) {
  if (isKeyPressed(KeyboardKey.KEY_SPACE)) {
    console.log("Espaço pressionado!");
  }
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