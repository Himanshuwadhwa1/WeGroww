import { defineQuery } from "next-sanity";

export const PROJECT_QUERIES = defineQuery(`*[_type == "project" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc){
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

export const PROJECT_BY_ID_QUERY = defineQuery(`*[_type == "project" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio,username,email
  }, 
  views,
  description,
  category,
  image,
    pitch
}`)

export const VIEWS_BY_ID = defineQuery(`*[_type == "project" && _id == $id][0]{
  _id,views
}`)

export const AUTHOR_BY_GITHUB_ID = defineQuery(`
  *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
  `)