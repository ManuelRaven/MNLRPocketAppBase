package main

import (
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
)

// application holds the core application state and configuration.
type application struct {
	pb     *pocketbase.PocketBase
	config appConfig
}

// appConfig holds the application's configuration settings.
type appConfig struct {
	dbDir string
}

// newApplication creates and initializes a new application instance.
func newApplication() *application {
	dbDir := getEnvOrDefault("DB_DIR", "db")

	return &application{
		pb: pocketbase.NewWithConfig(pocketbase.Config{DefaultDataDir: dbDir}),
		config: appConfig{
			dbDir: dbDir,
		},
	}
}

func main() {
	app := newApplication()
	app.mountFs()
	app.useMigrations()

	log.Fatal(app.pb.Start())
}

// getEnvOrDefault retrieves the value of an environment variable by key.
// If the environment variable is empty or not set, it returns the defaultValue.
func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
