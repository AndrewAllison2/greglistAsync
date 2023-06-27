import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  const cars = AppState.cars
  let template = ''
  cars.forEach(car => template += car.CardTemplate)
  setHTML('whipsList', template)
}

function _showFormButton() {
  const account = AppState.account

  if (!account) {
    return
  }

  const carFormButton = document.getElementById('carFormButton')
  // @ts-ignore
  carFormButton.classList.remove('d-none')
}


export class CarsController {
  constructor() {
    console.log('cars controller loaded');
    this.getCars()
    this.drawCarForm()

    AppState.on('cars', _drawCars)
    AppState.on('cars', this.drawCarForm)
    AppState.on('account', _drawCars)
    AppState.on('account', _showFormButton)
  }

  drawEditForm(carId) {
    const foundCar = AppState.cars.find(car => car.id == carId)

    const carForm = document.getElementById('car-form')


    // @ts-ignore
    setHTML('car-form', foundCar.EditForm)

    // @ts-ignore
    bootstrap.Collapse.getOrCreateInstance('#carCollapse').show()

    // @ts-ignore
    carForm.scrollIntoView()
  }

  drawCarForm() {
    setHTML('car-form', Car.CreateForm)
  }

  // TODO CRUD ROUTES

  // REVIEW READ / GET
  async getCars() {
    try {
      await carsService.getCars()
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  // REVIEW CREATE
  async createCar(event) {
    try {
      event.preventDefault()

      const form = event.target

      const carData = getFormData(form)

      console.log('car data!', carData);

      await carsService.createCar(carData)

      form.reset()

      // @ts-ignore
      bootstrap.Collapse.getOrCreateInstance('#carCollapse').hide()

    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  // REVIEW DELETE
  async deleteCar(carId) {
    try {
      const wantsToDelete = await Pop.confirm('Are you sure you want to delete this car?')

      if (!wantsToDelete) {
        return
      }


      await carsService.deleteCar(carId)
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  // REVIEW UPDATE
  async editCar(event, carId) {
    try {
      event.preventDefault()

      const form = event.target

      const carData = getFormData(form)

      console.log('car data!', carData);
      console.log('car id!', carId);

      await carsService.editCar(carData, carId)

      // @ts-ignore
      bootstrap.Collapse.getOrCreateInstance('#carCollapse').hide()

    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

}