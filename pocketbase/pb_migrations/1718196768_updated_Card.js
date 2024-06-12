/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ohez4sttuo4npj8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fetajbqs",
    "name": "newPrice",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kbatkfyf",
    "name": "oldPrice",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ivkjj7tm",
    "name": "detail",
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
  collection.schema.removeField("fetajbqs")

  // remove
  collection.schema.removeField("kbatkfyf")

  // remove
  collection.schema.removeField("ivkjj7tm")

  return dao.saveCollection(collection)
})
