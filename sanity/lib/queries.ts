import { defineQuery } from "next-sanity";

export const PROJECT_QUERIES = defineQuery(`*[_type == "project" && defined(slug.current)]{
  _id, 
  title, 
  slug,
  _rev,
  _type,
  _updatedAt,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`)
