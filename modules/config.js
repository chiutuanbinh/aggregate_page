
let mongo_connection_string=process.env.MONGO_CONNECTION_STRING
let mongo_db_name=process.env.MONGO_DB_NAME
let mongo_article_collection=process.env.MONGO_ARTICLE_COLLECTION

module.exports = {
    mongo_connection_string,
    mongo_db_name,
    mongo_article_collection
}