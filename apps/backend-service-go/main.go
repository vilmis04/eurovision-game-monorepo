package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/vilmis04/eurovision-game-monorepo/tree/main/apps/backend-service-go/admin"
	"github.com/vilmis04/eurovision-game-monorepo/tree/main/apps/backend-service-go/country"
	"github.com/vilmis04/eurovision-game-monorepo/tree/main/apps/backend-service-go/user"
)

func loadEnvVars() {
	PORT := os.Getenv("PORT")
	fmt.Printf("the port: %v!", PORT)
	if PORT == "" {
		err := godotenv.Load()
		if err != nil {
			log.Fatalf("[Server] Failed to load environment variables")
		}
	}
}

func init() {
	loadEnvVars()
}

func main() {
	app := gin.Default()
	apiRoutes := app.Group("api")

	apiRoutes.GET("health", func(c *gin.Context) {
		c.JSON(200, gin.H{"health": "OK"})
	})

	user.NewRouter(app)
	admin.NewRouter(app)
	country.NewRouter(app)

	app.Run()
}
