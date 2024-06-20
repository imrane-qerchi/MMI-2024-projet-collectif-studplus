/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ohez4sttuo4npj8")

  // remove
  collection.schema.removeField("a5keotpc")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ohez4sttuo4npj8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a5keotpc",
    "name": "fav",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
