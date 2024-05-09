package main

import (
	"bytes"
	"fmt"
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

func convertToJPEG(w io.Writer, r io.Reader) error {
	img, err := png.Decode(r)
	if err != nil {
		return err
	}
	return jpeg.Encode(w, img, &jpeg.Options{Quality: 100})
}

func convertJPEGToPNG(this js.Value, args []js.Value) interface{} {
	fmt.Println("Go: File Recieved")
	input := make([]byte, args[0].Get("length").Int())
	js.CopyBytesToGo(input, args[0])
	toType := "png"
	if len(args) > 1 {
		toType = args[1].String()
	}
	fmt.Println("Go: toType", toType)
	var out_img bytes.Buffer
	if toType == "png" {
		convertToPNG(&out_img, bytes.NewReader(input))
	} else if toType == "jpeg" {
		convertToJPEG(&out_img, bytes.NewReader(input))
	}
	js_out := js.Global().Get("Uint8Array").New(len(out_img.Bytes()))
	js.CopyBytesToJS(js_out, out_img.Bytes())
	return js_out
}

func main() {
	c := make(chan struct{}, 0)
	js.Global().Set("convertJPEGToPNG", js.FuncOf(convertJPEGToPNG))
	<-c
}
