// fs-prod.go
//go:build production

package main

import (
	"embed"
	"io/fs"

	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

//go:embed dist
var embeddedFiles embed.FS

// mountFs configures the embedded file system for the application's
// front-end assets when building for production.
func (app *application) mountFs() {
	app.pb.OnServe().BindFunc(func(e *core.ServeEvent) error {
		fs, err := fs.Sub(embeddedFiles, "dist")
		if err != nil {
			return err
		}

		e.Router.GET("/{path...}", apis.Static(fs, true))
		return e.Next()
	})
}
