// fs-dev.go
//go:build !production

package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/pocketbase/pocketbase/core"
)

const frontEndDevURL = "http://localhost:5173"

// mountFs configures a reverse proxy to forward all requests
// to the frontend dev server during development.
func (app *application) mountFs() {
	app.pb.OnServe().BindFunc(func(se *core.ServeEvent) error {
		target, err := url.Parse(frontEndDevURL)
		if err != nil {
			return fmt.Errorf("failed to parse proxy target URL: %w", err)
		}

		proxy := httputil.NewSingleHostReverseProxy(target)

		proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
			http.Error(w, fmt.Sprintf("proxy error: %v", err), http.StatusBadGateway)
		}

		se.Router.Any("/{path...}", func(re *core.RequestEvent) error {
			proxy.ServeHTTP(re.Response, re.Request)
			return nil
		})

		return se.Next()
	})
}
