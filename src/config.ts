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

import { join } from "@std/path";

type Arch = "x86_64" | "aarch64";

export interface WindowsConfig {
  arch?: Arch;
  compiler?: "mingw" | "msvc";
  customPath?: string;
}

export interface LinuxConfig {
  arch?: Arch;
  customPath?: string;
}

export interface DarwinConfig {
  arch?: Arch;
  customPath?: string;
}

interface LibConfig {
  windows?: WindowsConfig;
  linux?: LinuxConfig;
  darwin?: DarwinConfig;
}

let currentConfig: LibConfig = {
  windows: { arch: Deno.build.arch, compiler: "msvc" }, // MSVC como padrão seguro
  linux: { arch: Deno.build.arch },
  darwin: { arch: Deno.build.arch },
};

export function setupConfig(userConfig: LibConfig) {
  currentConfig = {
    windows: { ...currentConfig.windows, ...userConfig.windows },
    linux: { ...currentConfig.linux, ...userConfig.linux },
    darwin: { ...currentConfig.darwin, ...userConfig.darwin },
  };
}

export function getLibPath(): string {
    const currentDir = import.meta.dirname;
    const rootDir = join(currentDir!, "..");
    const os = Deno.build.os;

    if (os === "windows") {
        const cfg = currentConfig.windows;
        if (cfg?.customPath) return cfg.customPath;
        
        const compiler = cfg?.compiler || "msvc";
        
        return join(rootDir, "lib", "windows", `raylib_win64_${compiler}.dll`);
    }

    if (os === "linux") {
        const cfg = currentConfig.linux;
        if (cfg?.customPath) return cfg.customPath;

        return join(rootDir, "lib", "linux", "libraylib_linux_amd64.so");
    }
    
    if (os === "darwin") {
        const cfg = currentConfig.darwin;
        if (cfg?.customPath) return cfg.customPath;

        return join(rootDir, "lib", "darwin", `libraylib.dylib`);
    }

    const error = `[rl-deno] Ops: Unsuported Platform (${os}).`;
    console.error(error);
    throw new Error(error);
}