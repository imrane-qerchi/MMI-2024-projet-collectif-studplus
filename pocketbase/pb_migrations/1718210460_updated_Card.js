/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ohez4sttuo4npj8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dowoxefa",
    "name": "dimanche",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ohez4sttuo4npj8")

  // remove
  collection.schema.removeField("dowoxefa")

  return dao.saveCollection(collection)
})
