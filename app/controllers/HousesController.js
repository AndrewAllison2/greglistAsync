import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


function _drawHouses() {
  const houses = AppState.houses
  let template = ''
  houses.forEach(h => template += h.CardTemplate)
  setHTML('homes-list', template)
}

export class HousesController {
  constructor() {
    console.log('Houses Controller Mounted');
    this.getHouses()

    AppState.on('houses', _drawHouses)
    AppState.on('account', _drawHouses)
  }
  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      Pop.error(error.message)
    }
  }

  async createHouse(event) {
    try {
      event.preventDefault()

      const form = event.target

      const houseData = getFormData(form)
      console.log('House Data bby', houseData);

      await housesService.createHouse(houseData)
      form.reset()
    } catch (error) {
      Pop.error(error.message)
    }
  }

  async deleteHouse(houseId) {
    try {
      const wantsToDelete = await Pop.confirm('Are you sure you want to do that?')

      if (!wantsToDelete) {
        return
      }

      await housesService.deleteHouse(houseId)
    } catch (error) {
      Pop.error(error.message)
    }
  }

  async editHouse(event, houseId) {
    try {
      // event.preventDefault()

      const form = event.target
      const houseData = getFormData(form)

      await housesService.editHouse(houseData, houseId)
    } catch (error) {
      Pop.error(error.message)
    }
  }
}