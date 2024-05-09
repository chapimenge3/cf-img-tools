import wasmModule from "../main.wasm";

export async function onRequest({ request }) {

    return new Response(wasmModule, {
        headers: {
            "Content-Type": "application/wasm",
        },
    });
}