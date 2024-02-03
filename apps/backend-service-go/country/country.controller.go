package country

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vilmis04/eurovision-game-monorepo/tree/main/apps/backend-service-go/types"
	"github.com/vilmis04/eurovision-game-monorepo/tree/main/apps/backend-service-go/utils"
)

type countryController struct {
	service *CountryService
	router  *gin.RouterGroup
}

func NewController(app *gin.Engine) *countryController {
	return &countryController{
		service: NewService(),
		router:  app.Group("api/country"),
	}
}

func (ctrl *countryController) Use() {
	ctrl.router.POST("/", func(c *gin.Context) {
		id, err := ctrl.service.CreateCountry(c.Request)
		if err != nil {
			utils.HandleServerError(err, c)
			return
		}

		c.Writer.WriteHeader(http.StatusCreated)
		c.Writer.Header().Set(types.HeaderContentType, types.HeaderApplicationJson)
		c.Writer.Write(*id)
	})

	ctrl.router.GET("/:year", func(c *gin.Context) {
		countries, err := ctrl.service.GetCountryList(c.Param("year"), c.Request)
		if err != nil {
			utils.HandleServerError(err, c)
			return
		}

		c.Writer.Header().Set(types.HeaderContentType, types.HeaderApplicationJson)
		c.Writer.Write(*countries)
	})

	ctrl.router.PATCH(":year/:name", func(c *gin.Context) {
		params := map[string]string{
			"year": c.Param("year"),
			"name": c.Param("name"),
		}

		err := ctrl.service.UpdateCountry(params, c.Request)
		if err != nil {
			utils.HandleServerError(err, c)
			return
		}

		c.Writer.WriteHeader(http.StatusOK)
	})

	ctrl.router.DELETE(":year/:name", func(c *gin.Context) {
		params := map[string]string{
			"year": c.Param("year"),
			"name": c.Param("name"),
		}

		err := ctrl.service.DeleteCountry(&params)
		if err != nil {
			utils.HandleServerError(err, c)
			return
		}

		c.Writer.WriteHeader(http.StatusOK)
	})
}
