# rl-deno 🦕 🎮

**The definitive, documented, and maintained Raylib bindings for Deno.**

![Deno](https://img.shields.io/badge/Deno-v2.0-white?logo=deno) ![Raylib](https://img.shields.io/badge/Raylib-6.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

> [!NOTE]
> This project is currently **unstable** and may not work as expected. We are actively mapping the FFI and polishing the API.
> Please be patient and check back for the **Stable Release v0.1.0**.

## ⚡ Why rl-deno?

We know the pain. You want to build games or graphics with Deno, but the existing bindings are outdated, undocumented, or abandoned.
**rl-deno** is here to change that.

* **🛡️ Maintained:** Not a one-off weekend project. We are committed to keeping up with Raylib updates.
* **📚 Documented:** No more guessing parameter types. IntelliSense and JSDocs are first-class citizens here.
* **🚀 Fast:** Built directly on top of Deno's `Foreign Function Interface` (FFI) for near-native performance.

## 📦 Installation

You can add in your project fast:

```bash
deno add jsr:@eujandergois/rl-deno
```

Then add the lib folder from the official [**Raylib**](https://github.com/raysan5/raylib/releases/tag/6.0) repository releases to the project root.

## 🛠️ Usage Preview

This is how simple creating a window will be:

```typescript
// main.ts
import { 
    initWindow,
    closeWindow,
    windowShouldClose,
    beginDrawing,
    endDrawing,
    clearBackground,
    drawText,
    Colors 
} from "@eujandergois/rl-deno";

const { DARKGRAY, RAYWHITE } = Colors;

initWindow(800, 450, "rl-deno :: Basic Window");

while (!windowShouldClose()) {
    beginDrawing();
        clearBackground(RAYWHITE);
        drawText("Congrats! You created your first window!", 190, 200, 20, DARKGRAY);
    endDrawing();
}

closeWindow();
```

And just run your file:

``` bash
deno run --allow-ffi main.js

```

> [!CAUTION]
> JSR does not allow the uploading of `*.dll`, `*.so`, and related files. Download the `lib/` directory from the repository to access them, , or point it to dylib.

## ⚙️ Settings

After your code imports, you can configure the library's behavior. This is useful if you want to use MSVC or MinGW-64 on Windows or tell the library that your Raylib dynamic library is in a different directory, for example.

The library automatically includes x86-64 binaries for Windows, Linux, and macOS. On Windows, the default is MSVC, so make sure you have Microsoft Visual C++ Redistributable. If you have a different architecture or operating system, you can specify the path to the dynamic library downloaded from the official repository or one you compiled yourself.

``` typescript
setupConfig({
  windows: {
    compiler: "msvc",
    customPath: "../raylib.dll"
  }
});
```

## 🤝 Contributing

We are building the best graphics ecosystem for Deno, and we need **you**.

Whether it's implementing missing bindings, writing examples, or fixing bugs, your help is welcome. We have a strict but easy-to-follow standard to ensure quality.

👉 **Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a Pull Request.**

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
