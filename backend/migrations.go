package main

import (
	"os"
	"strings"

	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	_ "mnlr.de/MNLRBase/migrations"
)

func (app *application) useMigrations() {
	// loosely check if it was executed using "go run"
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app.pb, app.pb.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Dashboard
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
		Dir:         "migrations",
	})
}
