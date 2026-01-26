# rl-deno 🦕 🎮

**The definitive, documented, and maintained Raylib bindings for Deno.**

![Deno](https://img.shields.io/badge/Deno-v2.0-white?logo=deno) ![Raylib](https://img.shields.io/badge/Raylib-5.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

> 🚧 **STATUS: PRE-ALPHA / HEAVY CONSTRUCTION** 🚧
>
> **Note:** This project is currently **unstable** and may not work as expected. We are actively mapping the FFI and polishing the API.
> Please be patient and check back for the **Stable Release v0.1.0** in a few days.

---

## ⚡ Why rl-deno?

We know the pain. You want to build games or graphics with Deno, but the existing bindings are outdated, undocumented, or abandoned.
**rl-deno** is here to change that.

* **🛡️ Maintained:** Not a one-off weekend project. We are committed to keeping up with Raylib updates.
* **📚 Documented:** No more guessing parameter types. IntelliSense and JSDocs are first-class citizens here.
* **🚀 Fast:** Built directly on top of Deno's `Foreign Function Interface` (FFI) for near-native performance.

## 📦 Installation (Coming Soon)

Once stable, you will be able to add in your project fast:

```bash
deno add jsr:@eujandergois/rl-deno
```

## 🛠️ Usage Preview

This is how simple creating a window will be:

```typescript
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

const { LIGHTGRAY, RAYWHITE } = new Colors();

initWindow(800, 450, "rl-deno :: Basic Window");

while (!windowShouldClose()) {
    beginDrawing();
        clearBackground(RAYWHITE);
        drawText("Congrats! You created your first window!", 190, 200, 20, LIGHTGRAY);
    endDrawing();
}

closeWindow();
```

## 🤝 Contributing

We are building the best graphics ecosystem for Deno, and we need **you**.

Whether it's implementing missing bindings, writing examples, or fixing bugs, your help is welcome. We have a strict but easy-to-follow standard to ensure quality.

👉 **Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a Pull Request.**

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.