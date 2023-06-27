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
                ${this.computeEditButton}
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
  get computeEditButton() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `
    <button onclick="app.HousesController.drawEditForm('${this.id}')" class="btn btn-success">Edit Listing</button>
    `
  }

  get EditForm() {
    return /*html*/`
    <div class="card card-body">
        <form onsubmit="app.HousesController.editHouse(event, '${this.id}')">

          <div>
            <label for="houseYear">Year Built</label>
            <input type="text" id="houseYear" minlength="4" maxlength="30" required name="year" value=${this.year}>
          </div>

          <div>
            <label for="housebedrooms">Number of Bedrooms</label>
            <input type="number" id="houseBedrooms" required name="bedrooms" value=${this.bedrooms}>
          </div>

          <div>
            <label for="housebathrooms">Number of Bathrooms</label>
            <input type="number" id="houseBathrooms" required name="bathrooms" value=${this.bathrooms}>
          </div>

          <div>
            <label for="houseDescription">Description</label>
            <textarea id="houseDescription" name="description" rows="10" class="w-50" value=${this.description}>
          </textarea>
          </div>

          <div>
            <label for="houseLevels">Number of Levels</label>
            <input type="number" id="houseLevels" required name="levels" value=${this.levels}>
          </div>

          <div>
            <label for="housePrice">Price</label>
            <input type="number" id="housePrice" required name="price" value=${this.price}>
          </div>

          <div>
            <label for="houseImg">Image URL</label>
            <input type="url" id="houseImg" maxlength="300" required name="imgUrl">
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    `
  }
}




