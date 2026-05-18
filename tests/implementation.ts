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
    isKeyPressed,

    // helpers
    setupConfig
} from "@rl-deno";

setupConfig({
  linux: {
    arch: "x86_64"
  },
  
});

const { color, WindowConfig, combineFlags } = utils;

const flags = combineFlags(
  ConfigFlags.FLAG_VSYNC_HINT,
  ConfigFlags.FLAG_MSAA_4X_HINT,
  ConfigFlags.FLAG_WINDOW_RESIZABLE
);

const screenWidth = 800;
const screenHeight = 450;

console.log("Starting rl-deno ...");

setConfigFlags(flags);
initWindow(screenWidth, screenHeight, "rl-deno :: Impl Test");
setTargetFPS(60);

while (!windowShouldClose()) {
  if (isKeyPressed(KeyboardKey.KEY_SPACE)) {
    console.log("SPACE key pressed!");
  }

  beginDrawing();
    clearBackground(color(200, 200, 200, 255));
    drawFPS(10, 10);
    drawText(
        "Hello, rl-deno!",
        190,
        200,
        20,
        color(0, 0, 0, 255)
    );

  endDrawing();
}

closeWindow();