
run:
	@echo "Go compiling to wasm"
	GOOS=js GOARCH=wasm go build -o main.wasm