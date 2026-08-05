const express = require("express");

const country = express.Router();
const countryService = require('../../services/admin/countryCodeService')

country.get("/country",  countryService.getCountriesService);
country.post("/country",  countryService.createCountriesService);

module.exports = country;