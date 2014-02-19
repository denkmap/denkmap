denkmap
=======

DenkMap is a location-based mobile app dedicated to monuments.
It's name is a play of words of the German term for monument (_Denkmal_) and map.

This project was started at the [Zurich Hacknights](http://opendata.ch/projects/open-data-zuerich-hacknights/) organised by [Open Data Zürich](http://www.stadt-zuerich.ch/opendata).
You can find more information about this project on the [make.opendata.ch Wiki](http://make.opendata.ch/wiki/project:denkmalfuehrer).

## Build

Denkmap is built using [Travis CI](https://travis-ci.org):

[![Build Status](https://api.travis-ci.org/denkmap/denkmap.png?branch=develop)](http://travis-ci.org/denkmap/denkmap)

The app is deployed on [Heroku](https://www.heroku.com/): http://denkmap.herokuapp.com

## Installation

Run the install script:

```bash
./scripts/install.sh
./scripts/import_db.sh
```

Make sure you have [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download) installed on your development machine.

### Convert WFS to GeoJSON

1. Download WFS Service as GML: http://maps.zh.ch/wfs/DenkmalschutzWFS?service=wfs&version=1.1.0&request=GetFeature&typeName=denkmalschutzobjekte
2. Install ogr2ogr (apt-get install gdal-bin)
3. Convert the GML to a GeoJSON: `ogr2ogr -f geoJSON -s_srs EPSG:21781 -t_srs EPSG:4326 denkmal.geojson DenkmalschutzWFS.gml`

### Convert GeoJSON to MongoDB-importable JSON

1. Remove surounding FeatureCollection
2. Ensure that 1 object on 1 line
3. Rename MultiPoint to Point and remove the extra array

### Deployment to Heroku

Please ensure that there is a running MongoDB instance on Heroku. Currently the MongoLab add-on is used for this.
To activate it run:

```bash
heroku addons:add mongolab
```

## Credits

### Zurich Hacknight Team ("Denkmalführer")

* Pirmin Kalberer
* Thomas Husmann
* Stefan Oderbolz
* Adi Herzog
* Priska Haller
* Andi Vonlaufen
* Beat Estermann
* Oliver Berchtold

### Logo

* [Map](http://thenounproject.com/noun/map/#icon-No5260) designed by [Jonathan Higley](http://thenounproject.com/jonathan) from The Noun Project.
* [Thought Bubble](http://thenounproject.com/noun/thought-bubble/#icon-No14958) designed by [irene hoffman](http://thenounproject.com/i) from The Noun Project

### Maps

* Geo data: [OpenStreetMap](http://www.openstreetmap.org/copyright) (ODbL)
* Tiles: [CloudMade](http://cloudmade.com/) (CC-BY-SA)
