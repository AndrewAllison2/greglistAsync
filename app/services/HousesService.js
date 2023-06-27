import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js"

class HousesService {


  async getHouses() {
    const res = await api.get('api/houses')

    const builtHouses = res.data.map(h => new House(h))

    AppState.houses = builtHouses
    console.log('appstate houses', AppState.houses);
  }

  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)

    console.log('House Created?', res.data);
    const newHouse = new House(res.data)

    AppState.houses.push(newHouse)

    AppState.emit('houses')
  }

  async deleteHouse(houseId) {
    const res = await api.delete(`api/houses/${houseId}`)

    console.log('deleted house', res.data);

    const houseIndex = AppState.houses.findIndex(h => h.id == houseId)

    if (houseIndex == -1) {
      throw new Error('This doesnt exist buddy...')
    }

    AppState.houses.splice(houseIndex, 1)

    AppState.emit('houses')
  }

  async editHouse(houseData, houseId) {
    const res = await api.put(`api/houses/${houseId}`, houseData)

    console.log('edited car', res.data);

    const updatedHouse = new House(res.data)
    const oldHouseIndex = AppState.houses.findIndex(h => h.id == houseId)

    if (oldHouseIndex == -1) {
      throw new Error('Nothing there my guy')
    }
    AppState.houses.splice(oldHouseIndex, 1, updatedHouse)
    AppState.emit('houses')
  }
}

export const housesService = new HousesService()