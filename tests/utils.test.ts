import { assertEquals } from "@std/assert";
import { toNativeString } from "@utils";

Deno.test("toNativeString need add null-terminator to native compatibility", ()=> {
    const buffer = toNativeString("rl-deno"); // 7 characters string

    assertEquals(buffer.length, 8); // 8 characters with null-terminator
    assertEquals(buffer[6], 0); // last byte (6 index) need be 0
});