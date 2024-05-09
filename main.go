package main

import (
	"bytes"
	"image/jpeg"
	"image/png"
	"io"
	"syscall/js"
)

func convertToPNG(w io.Writer, r io.Reader) error {
	img, err := jpeg.Decode(r)
	if err != nil {
		return err
	}
	return png.Encode(w, img)
}

func convertJPEGToPNG(this js.Value, args []js.Value) interface{} {
	print("File Recieved")
	input := make([]byte, args[0].Get("length").Int())
	js.CopyBytesToGo(input, args[0])
	var png_img bytes.Buffer
	convertToPNG(&png_img, bytes.NewReader(input))
	js.Global().Call("alert")
	js_out := js.Global().Get("Uint8Array").New(len(png_img.Bytes()))
	js.CopyBytesToJS(js_out, png_img.Bytes())
	return js_out
}

func main() {
	c := make(chan struct{}, 0)
	js.Global().Set("convertJPEGToPNG", js.FuncOf(convertJPEGToPNG))

	<-c
}
