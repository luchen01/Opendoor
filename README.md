# Backend Data Challenge.

## API endpoint
https://s3.amazonaws.com/opendoor-problems/listing-details.csv

API:
GET /listings?min_price=100000&max_price=200000&min_bed=2&max_bed=2&min_bath=2&max_bath=2

min_price: The minimum listing price in dollars.
max_price: The maximum listing price in dollars.
min_bed: The minimum number of bedrooms.
max_bed: The maximum number of bedrooms.
min_bath: The minimum number of bathrooms.
max_bath: The maximum number of bathrooms.


### Database
1. Mongoose


### Response type
The expected response is a GeoJSON FeatureCollection of listings:

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [-112.1,33.4]},
      "properties": {
  "id": "123ABC", # CSV id
  "price": 200000, # Price in Dollars
  "street": "123 Walnut St",
        "bedrooms": 3, # Bedrooms
        "bathrooms": 2, # Bathrooms
        "sq_ft": 1500 # Square Footage
      }
    },
    ...
  ]
}

At a minimum:
- Your API endpoint URL is /listings
- Your API responds with valid GeoJSON (you can check the output using http://geojson.io)
- Your API should correctly filter any combination of API parameters
- Use a datastore

Bonus Points:
- Pagination via web linking (http://tools.ietf.org/html/rfc5988)
