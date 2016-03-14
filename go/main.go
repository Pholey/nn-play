package main

//
import "github.com/fxsjy/gonn"

import (
	"fmt"
	"image"
	"image/jpeg"
	"os"
)

func init() {
	// damn important or else At(), Bounds() functions will
	// caused memory pointer error!!
	image.RegisterFormat("jpeg", "jpeg", jpeg.Decode, jpeg.DecodeConfig)
}

func main() {
	imgfile, err := os.Open("./img.jpg")

	if err != nil {
		fmt.Println("Test image not found")
		os.Exit(1)
	}

	defer imgfile.Close()

	// get image height and width with image/jpeg
	// change accordinly if file is png or gif
	imgCfg, _, err := image.DecodeConfig(imgfile)

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	width := imgCfg.Width
	height := imgCfg.Height

	fmt.Println("Width : ", width)
	fmt.Println("Height : ", height)

	// we need to reset the io.Reader again for image.Decode() function below to work
	// otherwise we will  - panic: runtime error: invalid memory address or nil pointer dereference
	// there is no build in rewind for io.Reader, use Seek(0,0)
	imgfile.Seek(0, 0)

	// get the image
	img, _, err := image.Decode(imgfile)

	var inputs [][]float64
	var outputs [][]float64

	// fmt.Println(img.At(10, 10).RGBA())

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			r, g, b, a := img.At(x, y).RGBA()
			cart := []float64{float64(x / width), float64(y / height)}
			expected := []float64{float64(r / 255), float64(g / 255), float64(b / 255), float64(a / 100)}
			inputs = append(inputs, cart)
			outputs = append(outputs, expected)
		}
	}

	nn := gonn.DefaultNetwork(2, 2, 1, true)

}
