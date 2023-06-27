import { AppState } from "../AppState.js"

export class House {
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  get CardTemplate() {
    return /*html*/ `
    <div id="homes-list">
        <div class="col-10 m-auto mb-3">
          <section class="row bg-light elevation-5 house-border p-3">
            <div class="col-12 col-md-4">
              <div class="card" style="width: 18rem;">
                <img src="${this.imgUrl}" class="card-img-top" id="house-picture" alt="House">
              </div>
            </div>
            <div class="col-12 col-md-8 d-flex justify-content-end">
              <div class="card-body">
                <h5 class="card-title">${this.year} ${this.bedrooms} bed ${this.bathrooms} bath</h5>
                <p>Price: $${this.price}</p>
                <p>Number of Floors: ${this.levels}</p>
                <p class="card-text">${this.description}</p>
                <div>
                ${this.computeDeleteButton}
                </div>
              </div>
            </div>
          </section>
        </div>
    `
  }

  get computeDeleteButton() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `
    <button onclick="app.HousesController.deleteHouse('${this.id}')" class="btn btn-info">Delete Listing</button>
    `
  }

  get Edit
}




